const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const verifyToken = require("../helpers/check-token");
const getUserByToken = require("../helpers/get-user-by-token");

router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({ _id: id }, { password: 0 });
        res.json({ error: null, user });
    } catch (error) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }
});

router.put("/", verifyToken, async (req, res) => {
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const userReqId = req.body.id;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword; // Correção no nome da variável

    const userId = user._id.toString();

    if (userId !== userReqId) { // Correção no operador de comparação
        return res.status(401).json({ error: "Acesso negado" });
    }

    const updateData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (password !== confirmpassword) {
        return res.status(400).json({ error: "As senhas não conferem" });
    } else if (password && password !== null) {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt); // Correção na geração do hash

            updateData.password = passwordHash;
        } catch (err) {
            return res.status(500).json({ error: "Erro ao gerar o hash da senha" });
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $set: updateData }, { new: true });
        res.json({ error: null, msg: "Usuário atualizado com sucesso!", data: updatedUser });
    } catch (error) {
        return res.status(400).json({ error: "Erro interno do banco" });
    }
});

module.exports = router;
