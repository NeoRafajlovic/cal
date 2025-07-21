const itemList = document.getElementById("itemList");
const totalCal = document.getElementById("totalCal");
const totalProtein = document.getElementById("totalProtein");
const totalCarbs = document.getElementById("totalCarbs");
const totalFat = document.getElementById("totalFat");

const itemName = document.getElementById("itemName");
const itemCal = document.getElementById("itemCal");
const itemProtein = document.getElementById("itemProtein");
const itemCarbs = document.getElementById("itemCarbs");
const itemFat = document.getElementById("itemFat");

const itemSubmit = document.getElementById("itemSubmit");
const resetButton = document.getElementById("resetButton");

let savedItems = JSON.parse(localStorage.getItem("items")) || [];

let totals = savedItems.reduce(
  (acc, item) => {
    acc.cal += item.cal;
    acc.protein += item.protein;
    acc.carbs += item.carbs;
    acc.fat += item.fat;
    return acc;
  },
  { cal: 0, protein: 0, carbs: 0, fat: 0 }
);

updateTotalsDisplay();

savedItems.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.name} - ${item.cal} kcal, P: ${item.protein}g, C: ${item.carbs}g, F: ${item.fat}g`;
  itemList.append(li);
});

itemSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  const cal = parseInt(itemCal.value);
  const protein = parseInt(itemProtein.value);
  const carbs = parseInt(itemCarbs.value);
  const fat = parseInt(itemFat.value);

  if (!name || isNaN(cal) || isNaN(protein) || isNaN(carbs) || isNaN(fat))
    return;

  const li = document.createElement("li");
  li.textContent = `${name} - ${cal} kcal, P: ${protein}g, C: ${carbs}g, F: ${fat}g`;
  itemList.append(li);

  totals.cal += cal;
  totals.protein += protein;
  totals.carbs += carbs;
  totals.fat += fat;
  updateTotalsDisplay();

  savedItems.push({ name, cal, protein, carbs, fat });
  localStorage.setItem("items", JSON.stringify(savedItems));

  itemName.value = "";
  itemCal.value = "";
  itemProtein.value = "";
  itemCarbs.value = "";
  itemFat.value = "";
});

resetButton.addEventListener("click", () => {
  itemList.innerHTML = "";
  totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  updateTotalsDisplay();
  savedItems = [];
  localStorage.removeItem("items");

  itemName.value = "";
  itemCal.value = "";
  itemProtein.value = "";
  itemCarbs.value = "";
  itemFat.value = "";
});

function updateTotalsDisplay() {
  totalCal.innerText = totals.cal;
  totalProtein.innerText = totals.protein;
  totalCarbs.innerText = totals.carbs;
  totalFat.innerText = totals.fat;
}
