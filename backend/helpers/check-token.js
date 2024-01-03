const jwt = require("jsonwebtoken") // Importa a biblioteca para lidar com JWT

// Middleware para validar o token
const checkToken = (req, res, next) => {
    const token = req.header("auth-token") // Obtém o token do cabeçalho da requisição

    // Verifica se o token está ausente
    if (!token) {
        return res.status(401).json({ error: "acesso negado" }) // Retorna um erro se o token estiver ausente
    }

    try {
        // Verifica se o token é válido usando a chave específica
        const verified = jwt.verify(token, "254080") // Verifica se o token JWT é válido usando a chave

        req.user = verified // Adiciona os detalhes do usuário verificado ao objeto de requisição (req)
        next() // Chama a próxima função middleware para continuar o fluxo da requisição
        
    } catch (error) {
        res.status(400).json({ error: "token inválido" }) // Retorna um erro se o token for inválido
    }
}

module.exports = checkToken // Exporta o middleware para ser usado em outros arquivos
