"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.foxyJoin = foxyJoin;
exports.compareBy = compareBy;
exports.sortBy = sortBy;
exports.flipDataSet = flipDataSet;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function foxyJoin(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) {
        // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) {
        // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
}

function compareBy(key) {
    console.log("compare by", key);
    return function (a, b) {
        console.log("compare", a, b);
        console.log("c", a[key] < b[key]);
        if (a[key] < b[key]) return -1;

        if (a[key] > b[key]) return 1;
        return 0;
    };
}

function sortBy(key, stateData) {
    var arrayCopy = [].concat(_toConsumableArray(stateData));
    arrayCopy.sort(this.compareBy(key));
    console.log(arrayCopy);
    return this.setState({ data: arrayCopy });
}

function flipDataSet() {
    var x = this.state.data;
    x.reverse();
    return this.setState({
        data: x
    });
}