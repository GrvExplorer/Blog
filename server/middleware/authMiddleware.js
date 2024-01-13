export const authGuard = async (req, res, next) => {

  if (req.header.authorization && req.header.authorization.startsWith('Bearer ')) {
  try {
    
  } catch (error) {
    let err = new Error('Not Authorized, Token failed')
    err.statusCode = 401;
    next(err)
  }
  }

}
