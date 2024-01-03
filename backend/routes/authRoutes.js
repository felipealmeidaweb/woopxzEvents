const router = require("express").Router();
const bcrypy = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    // Verifica se as senhas fornecidas coincidem
    if (password !== confirmpassword) {
        return res.status(400).json({ error: "As senhas não conferem" });
    }

    // Verifica se o e-mail já está em uso
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
        return res.status(400).json({ error: "O email informado já está em uso, tente outro por favor" });
    }

    // Cria o hash da senha antes de armazenar no banco de dados
    const salt = await bcrypy.genSalt(12);
    const passwordHash = await bcrypy.hash(password, salt);

    // Cria um novo usuário com os dados fornecidos
    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    });

    try {
        // Salva o novo usuário no banco de dados
        const newUser = await user.save();

        // Cria um token para o novo usuário
        const token = jwt.sign(
            // Payload do token
            {
                name: newUser.name,
                id: newUser.id
            },
            "254080"
        );

        // Retorna o token e o ID do novo usuário
        res.json({ error: null, msg: "Cadastro realizado", token: token, userId: newUser._id });
    } catch (error) {
        res.status(400).json({ error: "Erro interno com o banco" });
    }
});

// Rota para autenticar o usuário e realizar o login
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Busca o usuário no banco de dados pelo e-mail fornecido
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: "O usuário não existe" });
        }

        // Verifica se a senha fornecida coincide com a senha armazenada
        const checkPassword = await bcrypy.compare(password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ error: "Senha inválida" });
        }

        // Cria um token para o usuário autenticado
        const token = jwt.sign(
            // Payload do token
            {
                name: user.name,
                id: user.id
            },
            "254080"
        );

        // Retorna o token e o ID do usuário autenticado
        res.json({ error: null, msg: "Login realizado", token: token, userId: user._id });

        // Restante do seu código de autenticação...

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ocorreu um erro ao processar a solicitação" });
    }
});

module.exports = router;
