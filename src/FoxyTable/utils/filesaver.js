export const trueTypeOf = input => Object.prototype.toString.call(input)
    .replace(/(\[object |\])/ig, '')
    .toLowerCase();

export const createCSV = (headers, dataset) => {
    if (!Array.isArray(headers)) {
    throw new TypeError(`Expected an array of table headers but got ${trueTypeOf(headers)}`);
  }

  if (!Array.isArray(dataset)) {
    throw new TypeError(`Expected an array of dataset items but got ${trueTypeOf(dataset)}`);
  }

  if (dataset[0] && dataset[0].length !== headers.length) {
    throw new RangeError(`Dataset row length is different than headers row length: got ${headers.length} headers and ${dataset[0].length} items`);
  }

  return `${headers}\n${dataset.reduce((acc, curr) => acc.concat(`${curr.join(',').trim()}\n`),'')}`.trim();
}
