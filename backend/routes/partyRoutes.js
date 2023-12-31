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
    const { title, description, party_date, privacy } = req.body;

    // Validações
    if (!title || !description || !party_date) {
      return res.status(400).json({ error: "Preencha pelo menos título, descrição e data." });
    }

    let photos = [];
    if (req.files && req.files.length > 0) {
      photos = req.files.map(file => file.path); // Caminhos dos arquivos
    }

    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);
    if (!userByToken) {
      return res.status(400).json({ error: "Acesso negado! Usuário não encontrado." });
    }

    const party = new Party({
      title: title,
      description: description,
      partyDate: party_date,
      photos: photos,
      privacy: privacy,
      userId: userByToken._id // Usando diretamente o ID obtido do token
    });

    const newParty = await party.save();

    console.log("Novo evento criado:", newParty);

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

router.get("/userparties", verifyToken, async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido. Acesso negado." });
    }

    const user = await getUserByToken(token);
    if (!user) {
      return res.status(400).json({ error: "Acesso negado!" });
    }

    const userId = user._id.toString();
    const parties = await Party.find({ userId: userId });

    return res.json({ error: null, parties: parties });
  } catch (error) {
    return  res.status(400).json({ error });
  }
});

// get a specific user party

router.get("/userparties/:id" , verifyToken , async (req,res)=>{
   try {
    const token = req.header("auth-token")
    const user = await getUserByToken(token)
    const userId = user._id.toString();
    const partyId = req.params.id

    const party = await Party.findOne({_id:partyId , userId:userId})

    res.json({error:null, party:party})
    
   } catch (error) {
     return res.status(400).json({ error });
    
   }

})

// get party public or private
router.get("/:id" , async (req,res)=>{

  //find party


  try {
    const id  = req.params.id;
    const party = await Party.findOne({_id:id})
    if(party.privacy === false){
      res.json({error:null , party:party})
    } else{

      const token  = req.header("auth-token")

      const user = await getUserByToken(token)

      const userId = user._id.toString()

      const PartyUserId = party.userId.toString()

      // check if  userId is equal to partyId
      if(userId === PartyUserId){
        return res.json({error:null , party:party})
      }
    }
    
  } catch (error) {
    return res.status(400).json({ error });
    
  }

  // public party

 
})


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

  // req data
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.party_date;
  const partyId = req.body.id;
  const partyUserId = req.body.user_id;


  // validations
  if(!title || !description || !partyDate)  {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // verify user 
  const token = req.header("auth-token");

  const userByToken = await getUserByToken(token);
  
  const userId = userByToken._id.toString(); 

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }
// create photos array with path
let photos = [];
if (req.files && req.files.length > 0) {
  photos = req.files.map(file => file.path); // Caminhos dos arquivos
}
  // build party object
  const party = {
    id: partyId,
    title: title,
    description: description,
    partyDate: partyDate,
    photos:photos,
    privacy: req.body.privacy,
    userId: partyUserId
  }; 

  
 
  
  try {      

    // returns updated data
    const updatedParty = await Party.findOneAndUpdate({ _id: partyId, userId: partyUserId }, { $set: party }, {new: true});
    res.json({ error: null, msg: "Evento atualizado com sucesso!", data: updatedParty });

  } catch (error) {

    res.status(400).json({ error })
      
  }

});
module.exports = router;
