const { DateTime } = require('luxon');

module.exports.getDates = () => {
  const dateTimeNow = DateTime.now().toUTC();
  const dateFormat = 'yyyy-MM-dd';
  const startDate = dateTimeNow.minus({days: 5}).toFormat(dateFormat);
  const endDate = dateTimeNow.toFormat(dateFormat);
  const timeNow = dateTimeNow.toFormat('hhmmss');
  const dateNow = endDate;

  return {
    dateFormat,
    dateTimeNow,
    timeNow,
    dateNow,
    startDate,
    endDate,
  }
};

