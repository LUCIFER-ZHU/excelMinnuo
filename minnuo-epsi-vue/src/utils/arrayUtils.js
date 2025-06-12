// 一样返回true，不一样返回false
export function arraysAreEqual(array1,array2) {
     if(array1.length !== array2.length){
          return false;
     }

     return array1.every(item => array2.includes(item));
}

// 计算连个数组的差集
export function difference(arr1,arr2) {
     return arr1.filter(item => !arr2.includes(item));
}