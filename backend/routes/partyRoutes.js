const router = require("express").Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Party = require("../models/party");
const User = require("../models/user");
const diskStorage = require("../helpers/file-storage");
const upload = multer({ storage: diskStorage });

const verifyToken = require("../helpers/check-token");
const getUserByToken = require("../helpers/get-user-by-token");

router.post("/", verifyToken, upload.array("photos", 10), async (req, res) => {
  try {
    // Extrai os dados da requisição
    const { title, description, party_date, privacy } = req.body;

    // Validações dos campos obrigatórios
    if (!title || !description || !party_date) {
      return res.status(400).json({ error: "Preencha pelo menos título, descrição e data." });
    }

    // Processamento das imagens anexadas ao evento
    let photos = [];
    if (req.files && req.files.length > 0) {
      photos = req.files.map(file => file.path); // Obtém os caminhos dos arquivos
    }

    // Verificação do token de autenticação para obter o usuário
    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);
    if (!userByToken) {
      return res.status(400).json({ error: "Acesso negado! Usuário não encontrado." });
    }

    // Cria uma nova instância do evento (festa)
    const party = new Party({
      title: title,
      description: description,
      partyDate: party_date,
      photos: photos,
      privacy: privacy,
      userId: userByToken._id // Usa diretamente o ID obtido do token para identificar o usuário do evento
    });

    // Salva o evento no banco de dados
    const newParty = await party.save();

    // Resposta com os dados do novo evento criado
    const responseData = {
      error: null,
      msg: "Evento criado com sucesso!",
      data: {
        party: newParty,
        images: photos
      }
    };

    res.json(responseData);
  } catch (error) {
    console.error("Erro:", error);
    res.status(400).json({ error: error.message || "Ocorreu um erro ao processar a requisição." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const parties = await Party.find({ privacy: false }).sort([["_id", -1]]);
    res.json({ error: null, parties: parties });
  } catch (error) {
    res.status(400).json({ error });
  }
});


   // retorna  todas as festa de um usuario especifico 
router.get("/userparties", verifyToken, async (req, res) => {
  try {
    // Obtém o token de autenticação da requisição
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido. Acesso negado." });
    }

    // Verifica e obtém o usuário a partir do token
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(400).json({ error: "Acesso negado!" });
    }

    // Obtém o ID do usuário autenticado
    const userId = user._id.toString();

    // Busca todas as festas relacionadas ao usuário pelo ID do usuário
    const parties = await Party.find({ userId: userId });

    // Retorna as festas associadas ao usuário autenticado
    return res.json({ error: null, parties: parties });
  } catch (error) {
    return res.status(400).json({ error });
  }
});;





// get a specific party of user

router.get("/userparties/:id", verifyToken, async (req, res) => {
  try {
    // Obtém o token de autenticação da requisição
    const token = req.header("auth-token");

    // Verifica e obtém o usuário a partir do token
    const user = await getUserByToken(token);
    if (!user) {
      return res.status(400).json({ error: "Acesso negado!" });
    }

    // Obtém o ID do usuário autenticado e o ID da festa a ser buscada
    const userId = user._id.toString();
    const partyId = req.params.id;

    // Busca uma festa específica pelo seu ID e pelo ID do usuário relacionado
    const party = await Party.findOne({ _id: partyId, userId: userId });

    // Retorna a festa específica associada ao usuário autenticado, se existir
    res.json({ error: null, party: party });
  } catch (error) {
    return res.status(400).json({ error });
  }
});



 //rota que obtém informações sobre uma festa, considerando sua privacidade:
router.get("/:id", async (req, res) => {
  try {
    // Obtém o ID da festa da requisição
    const id = req.params.id;

    // Busca a festa pelo ID
    const party = await Party.findOne({ _id: id });

    if (party.privacy === false) {
      // Se a festa for pública, retorna os detalhes da festa
      res.json({ error: null, party: party });
    } else {
      // Se a festa for privada, verifica o token de autenticação para verificar se o usuário é dono da festa
      const token = req.header("auth-token");
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(400).json({ error: "Acesso negado!" });
      }

      const userId = user._id.toString();
      const partyUserId = party.userId.toString();

      // Verifica se o ID do usuário autenticado é igual ao ID do usuário dono da festa
      if (userId === partyUserId) {
        return res.json({ error: null, party: party });
      }
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});



// delete a party

router.delete("/" , verifyToken , async(req,res)=>{
    const token = req.header("auth-token")
    const user = await getUserByToken(token)
    const userId = user._id.toString();

    const partyId = req.body.partyId
    

    try {
      
      await Party.deleteOne({_id:partyId , userId:userId})
      
      return res.json({error:null , msg:"evento removido com sucesso"})
    } catch (error) {
      return res.status(400).json({ error:"Acesso negado" });
      
    }

})


router.put("/", verifyToken, upload.array("photos", 10), async (req, res) => {
  console.log(req.body);

  // Extrai os dados da requisição
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.party_date;
  const partyId = req.body.id;
  const partyUserId = req.body.user_id;

  // Validação dos campos obrigatórios
  if (!title || !description || !partyDate) {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // Verifica o token de autenticação para obter o usuário
  const token = req.header("auth-token");
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();

  // Verifica se o usuário existe
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }

  // Cria um array de fotos com os caminhos dos arquivos
  let photos = [];
  if (req.files && req.files.length > 0) {
    photos = req.files.map(file => file.path);
  }

  // Constrói o objeto de festa atualizado
  const party = {
    id: partyId,
    title: title,
    description: description,
    partyDate: partyDate,
    photos: photos,
    privacy: req.body.privacy,
    userId: partyUserId
  };

  try {
    // Atualiza os dados da festa no banco de dados e retorna os dados atualizados
    const updatedParty = await Party.findOneAndUpdate({ _id: partyId, userId: partyUserId }, { $set: party }, { new: true });
    res.json({ error: null, msg: "Evento atualizado com sucesso!", data: updatedParty });
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
