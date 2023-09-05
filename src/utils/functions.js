export function checkDate(today, clickedDate) {
        
    let dateType = 0
    // Extract year, month, and day components for comparison
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const clickedYear = clickedDate.getFullYear();
    const clickedMonth = clickedDate.getMonth();
    const clickedDay = clickedDate.getDate();
  
    if (todayYear === clickedYear && todayMonth === clickedMonth && todayDay === clickedDay) {
      dateType = 1
      console.log('It\'s today, folks!');
      return dateType
    } else if (todayYear <= clickedYear && todayMonth <= clickedMonth && todayDay <= clickedDay){
      console.log('it is the future');
      dateType = 2;
      return dateType;
    }
    else return dateType
    
  }

  export function sortArrayOfObjectsDescending(array, property) {
    // Use the sort method with a custom comparison function
    array.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
  
      // Compare values in descending order
      if (valueA > valueB) {
        return -1;
      }
      if (valueA < valueB) {
        return 1;
      }
      return 0;
    });
  };