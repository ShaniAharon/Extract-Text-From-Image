
const express = require('express');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use(cookieParser()); // for the cookie use
app.use(express.json()); //important soo the server could handle json
app.use(cors());

//TEST
app.get('/', (req, res) => {
  res.send('hello');
});



//Google Sheet test

app.post('/api/google', async (req, res) => {
  const { name, price } = req.body; // can get the data from the front and use it in the write func
  console.log('req', req.body);
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = process.env.SHEET_ID;

  //Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  //Read rows from spreadsheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Sheet1!A:A',
  });

  //Write rows to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: 'Sheet1!A:B',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[name, price]],
    },
  });

  res.send(getRows.data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
