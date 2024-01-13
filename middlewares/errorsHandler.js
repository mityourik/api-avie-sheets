function errorHandler(err, req, res) {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Внутренняя ошибка сервера',
  });
}

module.exports = errorHandler;
