
let _counter = 100000000000;

const generateID = () => {
  let _id = `${_counter.toString()}-${Math.random().toString(36).substring(2, 10)}`;
  _counter++;
  return _id;
};

module.exports = { generateID }
