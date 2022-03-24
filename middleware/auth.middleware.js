const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {

  const token = req.get('Authorization')
  // Verificar se esta recebendo token
  if (!token) {
    return res.status(401).json( { msg: "Request without token" } );
  }
  // Validação do token
  const tokenWithoutBearer = token.split(' ')[1];
  try {
    const decodedToken = jwt.verify( tokenWithoutBearer, process.env.SENHA_JWT )
    req.user = { ...decodedToken }
    next();
  } catch (error) {

    res.status(401).json( { msg: "Unauthorized", error: error.message } );
  }
}
module.exports = authorization;
