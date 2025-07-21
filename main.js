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
    acc.cal += Number(item.cal) || 0;
    acc.protein += Number(item.protein) || 0;
    acc.carbs += Number(item.carbs) || 0;
    acc.fat += Number(item.fat) || 0;
    return acc;
  },
  { cal: 0, protein: 0, carbs: 0, fat: 0 }
);

updateTotalsDisplay();

savedItems.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = formatItemText(item);
  itemList.append(li);
});

itemSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  if (!name) return; // Require a name

  // Parse numbers or default to 0
  const cal = Number(itemCal.value) || 0;
  const protein = Number(itemProtein.value) || 0;
  const carbs = Number(itemCarbs.value) || 0;
  const fat = Number(itemFat.value) || 0;

  const item = { name, cal, protein, carbs, fat };

  const li = document.createElement("li");
  li.textContent = formatItemText(item);
  itemList.append(li);

  totals.cal += cal;
  totals.protein += protein;
  totals.carbs += carbs;
  totals.fat += fat;
  updateTotalsDisplay();

  savedItems.push(item);
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

// Helper to format the item text, skipping zero or missing macros
function formatItemText(item) {
  let parts = [`${item.name} - ${item.cal} kcal`];
  if (item.protein) parts.push(`P: ${item.protein}g`);
  if (item.carbs) parts.push(`C: ${item.carbs}g`);
  if (item.fat) parts.push(`F: ${item.fat}g`);
  return parts.join(", ");
}
