// 
export const errorResponserHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 400
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export const invalidPathHandler = (req, res, next) => {
  const error = new Error('Invalid Path')
  res.status(404)
  res.json({
    message: error.message
  })
}