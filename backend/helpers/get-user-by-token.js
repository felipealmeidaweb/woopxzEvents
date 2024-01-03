// Importando módulos e modelos necessários
const jwt = require("jsonwebtoken") // Importa a biblioteca para lidar com JWT
const User = require("../models/user") // Importa o modelo de usuário

// Função para obter o usuário a partir do token JWT
const getUserByToken = async (token) => {
    // Verifica se o token está presente
    if (!token) {
        return res.status(401).json({ error: "acesso negado" }) // Retorna um erro se o token estiver ausente
    }

    // Decodifica o token JWT usando a chave específica
    const decoded = jwt.verify(token, "254080") // Decodifica o token JWT usando a chave
    const userId = decoded.id // Extrai o ID do usuário do token decodificado

    // Encontra o usuário no banco de dados pelo ID decodificado
    const user = await User.findOne({ _id: userId }) // Busca o usuário com base no ID decodificado

    return user // Retorna o usuário encontrado
}

module.exports = getUserByToken // Exporta a função para ser usada em outros arquivos
