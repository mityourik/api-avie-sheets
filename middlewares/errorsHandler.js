// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.publicMessage || 'Внутренняя ошибка сервера';

  if (res && typeof res.status === 'function') {
    res.status(statusCode).json({
      status: 'error',
      message,
    });
  } else {
    console.error('Invalid response object:', res);
  }
}

module.exports = { errorHandler };
