require('dotenv').config();
const { getCurrencyRates } = require('./common/getCurrencyRates');
const { generateWorkbook } = require('./common/workbook');
const timeSeriesData = require('../test/mockData/timeSeries.json');

const init = async() => {
  try {
    // using currency api
    const response = await getCurrencyRates();
    await generateWorkbook(response);

    // // using mockData
    // const currencyData = timeSeriesData;
    // await generateWorkbook(currencyData);
    
  } catch (error) {
    console.log('Error in generating work book')
  }
}

init();