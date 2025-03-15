// HeadlessTable.jsx
import { useState } from 'react';

const HeadlessTable = ({ columns, data, children }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = [...data]; //copy data
  //check if sort config is null
  if (sortConfig !== null) {
    //if config not null, invoke sort function on sortedData and compare the arrays' elements with each other

    sortedData.sort((a, b) => {
      //compare to determine their order in terms of descending...
      //e.g. (a[sortConfig.key] < b[sortConfig.key]  where a = { name: 'Alice', age: 25 } and b =  { name: 'Bob', age: 30 } and sortConfig.key = name or age
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      //... and ascending
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  //Create a sort config for the above
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  return children({
    columns,
    sortedData,
    requestSort,
    sortConfig
  });
};

export { HeadlessTable };