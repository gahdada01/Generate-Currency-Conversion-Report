const got = require('got');
const { getDates, minusDate } = require('./getDates');

module.exports.getCurrencyRates = async () => {
  const dates = getDates();
  const baseCurrency = 'EUR'; // since we can't use switching base currency
  const symbols = 'USD,AUD,EUR,GBP';

  /**
   * Issues in currency API
   * 1. latest enpoint can only be consume
   * 2. timeseries endpoint should be use in this case
   *    but it is not available in free subscription
   * 3  historical endpoint is not efficient to be use in this case
   *    but it can be use as work around
   */
  
  // const params = {
  //   url: `${process.env.CURRENCY_RATE_API}timeseries`,
  //   method: 'GET',
  //   searchParams: {
  //     access_key: process.env.API_ACCESS_KEY,
  //     base: baseCurrency,
  //     symbols: symbols,
  //   },
  //   responseType: 'json',
  // }

  
  const response = { rates: {}};

  for (let i = 4; i >= 0; i--) {
    const subtractedDate = dates.dateTimeNow.minus({ days: i }).toFormat(dates.dateFormat);
    const params = {
      url: `${process.env.CURRENCY_RATE_API}${subtractedDate}`,
      method: 'GET',
      searchParams: {
        access_key: process.env.API_ACCESS_KEY,
        base: baseCurrency,
        symbols: symbols,
      },
      responseType: 'json',
    }

    const res = await got(params);
    response['rates'][subtractedDate] = res.body.rates;
  }

  return response;
  
  // const params = {
  //   url: `${process.env.CURRENCY_RATE_API}latest`,
  //   method: 'GET',
  //   searchParams: {
  //     access_key: process.env.API_ACCESS_KEY,
  //     base: baseCurrency,
  //     symbols: symbols,
  //   },
  //   responseType: 'json',
  // }


  // return got(params);
}


