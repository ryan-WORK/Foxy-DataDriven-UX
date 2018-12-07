export function foxyJoin(lookupTable, mainTable, lookupKey, mainKey, select) {
    let l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (let i = 0; i < l; i++) { // loop through l items
        let row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (let j = 0; j < m; j++) { // loop through m items
        let y = mainTable[j];
        let x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
}

export function compareBy(key) {
      console.log("compare by", key);
    return function (a, b) {
        console.log("compare", a,b);
        console.log("c",(a[key] < b[key]));
      if (a[key] < b[key]) return -1;

      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  export function sortBy(key, stateData) {
    let arrayCopy = [...stateData];
    arrayCopy.sort(this.compareBy(key));
    console.log(arrayCopy);
    return this.setState({data: arrayCopy});
  }

  export function flipDataSet(){
        let x = this.state.data;
        x.reverse();
        return this.setState({
            data:x
        })
  }
