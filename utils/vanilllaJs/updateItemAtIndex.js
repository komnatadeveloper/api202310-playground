


/*
  Resource:
  https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  const removeByIndex = (list, index) =>
        [
          ...list.slice(0, index),
          ...list.slice(index + 1)
        ];
          
  output = removeByIndex([33,22,11,44],1) //=> [33,11,44]
        
  console.log(output)
*/


const updateItemAtIndex = ({
  array,
  index,
  newItem
}) => {
  return [
    ...array.slice(0, index),
    newItem,
    ...array.slice(index + 1)
  ];
}

module.exports = { updateItemAtIndex }