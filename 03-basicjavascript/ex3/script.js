let fruits = [
  { id: 1, name: "apple", color: "red" },
  { id: 2, name: "banana", color: "yellow" },
];

function searchById(arr, id) {
  const searchId = id;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element.id === searchId) {
      return element.name;
    }
  }
}
console.log(searchById(fruits, 2));
