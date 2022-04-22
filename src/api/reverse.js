export const reverse = arr =>{
    let newArr = []
    arr.forEach(element=>{
      newArr.unshift(element)})
      return newArr
    }