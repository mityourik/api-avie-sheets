const createGoogleSheetsClient = require('../googleSheetsClient');

async function getSpreadsheetData(spreadsheetId, range) {
  const sheets = createGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
}

function transformSheetDataToObjects(sheetData) {
  if (sheetData.length === 0) {
    return {};
  }

  const values = sheetData[0];

  const result = {
    transport: values[0] || '',
    food: values[1] || '',
    apartments: values[2] || '',
    phone: values[3] || '',
    amount: values[4] || '',
  };

  return result;
}

const getData = async (req, res, next) => {
  const spreadsheetId = process.env.SPREADSHEET_ID || '160HBHkGINbqB-z1cxKyCHAOsCnilcKl5qynwHgcyogM';
  const range = process.env.RANGE || 'Vietnam!F13:J13';

  try {
    const sheetData = await getSpreadsheetData(spreadsheetId, range);
    if (!sheetData || sheetData.length === 0) {
      throw new Error('Данные не найдены');
    }

    const data = transformSheetDataToObjects(sheetData);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

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

module.exports = { getData, errorHandler };
