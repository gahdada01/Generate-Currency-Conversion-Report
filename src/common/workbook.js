const ExcelJS = require('exceljs');
const { dirReports, createDir } = require('./createDir');
const { getDates } = require('./getDates');

const setMetaData = (workbook) => {
  workbook.creator = 'Richard Vergis';
}

const createColumn = (worksheet, rates) => {
  const sheetColumns = [
    { header: 'Currency', key: 'currency', width: 20 },
  ]

  for (const date in rates) {
    if (Object.hasOwnProperty.call(rates, date)) {
      const columnLen = sheetColumns.length;
      sheetColumns[columnLen] = { header: date, key: 'date'+columnLen, width: 20 };
    }
  }

  worksheet.columns = sheetColumns;
}

const createRows = (worksheet, rates) => {
  const rows = {};

  const setupRows = (currencyRates) => {
    for (let [key, currencyRate] of Object.entries(currencyRates)) {
      if (!rows.hasOwnProperty(key)) rows[key] = []
      rows[key].push(currencyRate)
    }
  }

  for (const currencyRates in rates) {
    setupRows(rates[currencyRates]);
  }

  for (const row in rows) {
    const sheetRow = { currency: row }
    for (const [i, data] of  rows[row].entries()) {
      sheetRow['date' + (i+1)] = data;
    }
    worksheet.addRow(sheetRow);
  }

}

const createWorksheet = (workbook, currencyData) => {
  const rates = currencyData.rates;
  const worksheet = workbook.addWorksheet('Currency Data Table',);

  createColumn(worksheet, rates);
  createRows(worksheet, rates)
}

const createReport = async (workbook) => {
  try {
    createDir();
    const datenow = getDates();
    const fileExtension = '.xlsx'
    const fileName = `${datenow.dateNow}-${datenow.timeNow}${fileExtension}`;

    await workbook.xlsx.writeFile(dirReports + fileName);
    console.log("Sucessfully created excel report "+ fileName);
    
  } catch (error) {
    console.log('Error creating excel report')
  }
}

module.exports.generateWorkbook = async (currencyData) => {
  const workbook = new ExcelJS.Workbook();

  setMetaData(workbook);
  createWorksheet(workbook, currencyData);
  await createReport(workbook);
}