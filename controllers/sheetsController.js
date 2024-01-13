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
  const result = {};

  if (sheetData.length < 2) {
    return result;
  }

  const keys = sheetData[0];
  const values = sheetData[1];

  keys.forEach((key, i) => {
    result[key] = values[i] || ''; // Используем пустую строку, если значение отсутствует
  });

  return result;
}

const getData = async (req, res, next) => {
  const spreadsheetId = process.env.SPREADSHEET_ID || '160HBHkGINbqB-z1cxKyCHAOsCnilcKl5qynwHgcyogM';
  const range = process.env.RANGE || 'Vietnam!J12:J13';

  try {
    const sheetData = await getSpreadsheetData(spreadsheetId, range);
    const data = transformSheetDataToObjects(sheetData);

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getData };
