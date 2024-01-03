const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifyToken = require("../helpers/check-token");
const getUserByToken = require("../helpers/get-user-by-token");

// Rota para obter informações de um usuário pelo ID
router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        // Busca o usuário no banco de dados pelo ID, excluindo o campo de senha
        const user = await User.findOne({ _id: id }, { password: 0 });
        res.json({ error: null, user });
    } catch (error) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }
});

// Rota para atualizar informações de um usuário
router.patch("/", verifyToken, async (req, res) => {
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const userReqId = req.body.id;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword; // Correção no nome da variável

    const userId = user._id.toString();

    // Verifica se o usuário autenticado é o mesmo que está sendo atualizado
    if (userId !== userReqId) {
        return res.status(401).json({ error: "Acesso negado" });
    }

    const updateData = {
        name: req.body.name,
        email: req.body.email,
    };

    // Verifica se as senhas fornecidas coincidem
    if (password !== confirmpassword) {
        return res.status(400).json({ error: "As senhas não conferem" });
    } else if (password && password !== null) {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt); // Gera o hash da nova senha

            updateData.password = passwordHash;
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar o hash da senha" });
        }
    }

    try {
        // Atualiza as informações do usuário no banco de dados
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $set: updateData }, { new: true });
        res.json({ error: null, msg: "Usuário atualizado com sucesso!", data: updatedUser });
    } catch (error) {
        return res.status(400).json({ error: "Erro interno do banco" });
    }
});

module.exports = router;
