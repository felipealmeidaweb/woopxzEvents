

const router = require("express").Router();
const bcrypy = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/user")



// register an user

router.post("/register" ,async(req,res)=>{

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    //check  fields

    if(!name || !email || !password ||!confirmpassword){
        return  res.status(400).json({error:"preencha todos os campos"})
    }

    //check if password matchs

    if(password != confirmpassword){
        return res.status(400).json({error:"as senhas não conferem"})
    }

    //check if user exists

    const emailExists = await User.findOne({email:email})

    if(emailExists){
        return res.status(400).json({error:"o email informado já esta em uso, tente outro por favor"})
    }

    // create password

    const salt = await bcrypy.genSalt(12)
    const passwordHash = await bcrypy.hash(password, salt);
    console.log(passwordHash)

    const user = new User({
        name:name,
        email:email,
        password:passwordHash

    });
    try {
        const newUser = await user.save();


        // create token 
        const token = jwt.sign(
            //payload

            {
                name:newUser.name,
                id:newUser.id
            },
            "254080"
        )
        //return token

        res.json({error:null, msg:"cadastro realizado" , token:token , userId: newUser._id})
        
    } catch (error) {
        res.status(400).json({error:"erro interno com o banco"})
        
    }
})



// login router user

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "O usuário não existe" });
        }



        //check if passoword match
        const checkPassword = await bcrypy.compare(password , user.password);
        if(!checkPassword){
            return res.status(404).json({ error: "senha invalida" }) 
        }



         // create token 
         const token = jwt.sign(
            //payload

            {
                name:user.name,
                id:user.id
            },
            "254080"
        )
        //return token

        res.json({error:null, msg:"login realizado" , token:token , userId: user._id})
        

        // Restante do seu código de autenticação...

    } catch (error) {
        console.error(error); // Log do erro no console para debug

        // Se ocorrer um erro durante a busca do usuário, responda com um erro 500 (erro interno do servidor)
        return res.status(500).json({ error: "Ocorreu um erro ao processar a solicitação" });
    }
});

module.exports = router;


