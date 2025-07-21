const itemList = document.getElementById("itemList");
const totalCal = document.getElementById("totalCal");
const itemName = document.getElementById("itemName");
const itemCal = document.getElementById("itemCal");
const itemSubmit = document.getElementById("itemSubmit");
const resetButton = document.getElementById("resetButton");

// Load saved data from localStorage
let savedItems = JSON.parse(localStorage.getItem("items")) || [];
let calTotal = savedItems.reduce((sum, item) => sum + item.cal, 0);
totalCal.innerText = calTotal;

savedItems.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.name} - ${item.cal} kcal`;
  itemList.append(li);
});

// Add item
itemSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  const cal = parseInt(itemCal.value);

  if (!name || isNaN(cal)) return;

  const li = document.createElement("li");
  li.textContent = `${name} - ${cal} kcal`;
  itemList.append(li);

  calTotal += cal;
  totalCal.innerText = calTotal;

  savedItems.push({ name, cal });
  localStorage.setItem("items", JSON.stringify(savedItems));

  itemName.value = "";
  itemCal.value = "";
});

// Reset all
resetButton.addEventListener("click", () => {
  itemList.innerHTML = "";
  calTotal = 0;
  totalCal.innerText = calTotal;
  savedItems = [];
  localStorage.removeItem("items");
});
