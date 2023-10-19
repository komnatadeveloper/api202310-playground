const xDaysLater = ({ 
  inputDate = Date.now(),
  postponeDayQuantity
}) => {
  let _xDaysLater = new Date( inputDate );
  _xDaysLater.setDate(_xDaysLater.getDate() + postponeDayQuantity );
  return _xDaysLater;
}

module.exports = { xDaysLater }