export function Paginate (array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

let x = Paginate([1,2,3,4,5,6,7,8,9], 5, 2);
x
