const items = [
  { price: 10 },
  { price: 20 },
  { price: 14 },
  { price: 1 },
  { price: 6 },
];

const total = items.reduce((sum, item) => {
  return sum + item.price;
}, 0);

console.log(total);
