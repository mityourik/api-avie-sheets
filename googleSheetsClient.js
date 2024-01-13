const { google } = require('googleapis');

function createGoogleSheetsClient() {
  const encoded = process.env.ENCODED_GOOGLE_API_ACCESS;
  if (!encoded) {
    throw new Error('The ENCODED_GOOGLE_API_ACCESS environment variable is not set.');
  }
  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const keyFile = JSON.parse(decoded);

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

module.exports = createGoogleSheetsClient;
