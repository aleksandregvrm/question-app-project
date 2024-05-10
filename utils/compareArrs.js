function arraysEqual(arr1,arr2) {
    for (let i=0; i < arr1.length; i++){
        if (
          arr1[i].option !== arr2[i].option ||
          arr1[i].isCorrect !== arr2[i].isCorrect
        ) {
          return false;
        }
    }
    
    return true
}
module.exports = arraysEqual;
// This function checks if the contents of the array has been modified and returns relevant boolean value