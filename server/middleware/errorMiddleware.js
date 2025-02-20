const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  console.log('are we never here')

  // Jos virheessä on status, käytetään sitä. Muussa tapauksessa 500.
  const statusCode = err.status || 500

  // Lähetetään virhevastauksena JSON-objekti, jossa on virheen viesti
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  })
}

module.exports = errorHandler
