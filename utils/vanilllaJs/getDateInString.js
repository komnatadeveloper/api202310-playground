function getDateInString (
  date = new Date()
) {
  const _date = date;
  
  //year
  const _year =  _date.getFullYear();
  
  // month
  const _month =  _date.getMonth() + 1;
  
  // day of month
  const _dayOfMonth = _date.getDate();
  
  // hour
  const _hour = _date.getHours();
  
  // // minute
  const _minute = _date.getMinutes()
  
  // second
  const _second = _date.getSeconds();


  // convert to desired format
  const _monthText = _month < 10  ? `0${_month}` : _month;
  const _dayOfMonthMonthText = _dayOfMonth < 10  ? `0${_dayOfMonth}` : _dayOfMonth;
  const _hourText = _hour < 10  ? `0${_hour}` : _hour;
  const _minuteText = _minute < 10  ? `0${_minute}` : _minute;
  const _secondText = _second < 10  ? `0${_second}` : _second;


  const _desiredFormat = _year.toString() + '-' + _monthText + '-' + _dayOfMonthMonthText 

  return _desiredFormat;
}

function getHourMinSec (
  date = new Date()
) {
  const _date = date;
  
  //year
  const _year =  _date.getFullYear();
  
  // month
  const _month =  _date.getMonth() + 1;
  
  // day of month
  const _dayOfMonth = _date.getDate();
  
  // hour
  const _hour = _date.getHours();
  
  // // minute
  const _minute = _date.getMinutes()
  
  // second
  const _second = _date.getSeconds();


  // convert to desired format
  const _monthText = _month < 10  ? `0${_month}` : _month;
  const _dayOfMonthMonthText = _dayOfMonth < 10  ? `0${_dayOfMonth}` : _dayOfMonth;
  const _hourText = _hour < 10  ? `0${_hour}` : _hour;
  const _minuteText = _minute < 10  ? `0${_minute}` : _minute;
  const _secondText = _second < 10  ? `0${_second}` : _second;


  const _desiredFormat = _hourText.toString() + ':' + _minuteText + ':' + _secondText; 

  return _desiredFormat;
}

module.exports = {
  getDateInString,
  getHourMinSec,
}