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
const saveToCatalogue = document.getElementById("saveToCatalogue");
const catalogueList = document.getElementById("catalogueList");
const clearCatalogueButton = document.getElementById("clearCatalogueButton");

let savedItems = JSON.parse(localStorage.getItem("items")) || [];
let savedCatalogue = JSON.parse(localStorage.getItem("catalogue")) || [];

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
  const li = createLoggedItem(item);
  itemList.append(li);
});

savedCatalogue.forEach((item) => {
  const li = createCatalogueItem(item);
  catalogueList.append(li);
});

itemSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = itemName.value.trim();
  if (!name) return;

  const cal = Number(itemCal.value) || 0;
  const protein = Number(itemProtein.value) || 0;
  const carbs = Number(itemCarbs.value) || 0;
  const fat = Number(itemFat.value) || 0;

  const item = { name, cal, protein, carbs, fat };

  const li = createLoggedItem(item);
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
  itemName.focus();
});

saveToCatalogue.addEventListener("click", () => {
  const name = itemName.value.trim();
  if (!name) return;

  const cal = Number(itemCal.value) || 0;
  const protein = Number(itemProtein.value) || 0;
  const carbs = Number(itemCarbs.value) || 0;
  const fat = Number(itemFat.value) || 0;

  const item = { name, cal, protein, carbs, fat };
  savedCatalogue.push(item);
  localStorage.setItem("catalogue", JSON.stringify(savedCatalogue));

  const li = createCatalogueItem(item);
  catalogueList.append(li);

  // Clear inputs after saving to catalogue
  itemName.value = "";
  itemCal.value = "";
  itemProtein.value = "";
  itemCarbs.value = "";
  itemFat.value = "";
  itemName.focus();
});

clearCatalogueButton.addEventListener("click", () => {
  if (!confirm("Are you sure you want to clear your entire catalogue?")) return;
  savedCatalogue = [];
  localStorage.removeItem("catalogue");
  catalogueList.innerHTML = "";
});

resetButton.addEventListener("click", () => {
  if (
    !confirm(
      "Are you sure you want to reset everything? This will clear all items."
    )
  )
    return;

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
  itemName.focus();
});

function updateTotalsDisplay() {
  totalCal.innerText = totals.cal || 0;
  totalProtein.innerText = totals.protein || 0;
  totalCarbs.innerText = totals.carbs || 0;
  totalFat.innerText = totals.fat || 0;
}

function formatItemText(item) {
  let parts = [`${item.name} - ${item.cal} kcal`];
  if (item.protein) parts.push(`P: ${item.protein}g`);
  if (item.carbs) parts.push(`C: ${item.carbs}g`);
  if (item.fat) parts.push(`F: ${item.fat}g`);
  return parts.join(", ");
}

function createCatalogueItem(item) {
  const li = document.createElement("li");

  li.classList.add("catalogue-item");

  const textSpan = document.createElement("span");
  textSpan.textContent = formatItemText(item);

  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    savedCatalogue = savedCatalogue.filter((catalogueItem) => {
      return !(
        catalogueItem.name === item.name &&
        catalogueItem.cal === item.cal &&
        catalogueItem.protein === item.protein &&
        catalogueItem.carbs === item.carbs &&
        catalogueItem.fat === item.fat
      );
    });
    localStorage.setItem("catalogue", JSON.stringify(savedCatalogue));
    li.remove();
  });

  li.appendChild(textSpan);
  li.appendChild(removeButton);

  li.addEventListener("click", () => {
    totals.cal += item.cal;
    totals.protein += item.protein;
    totals.carbs += item.carbs;
    totals.fat += item.fat;
    updateTotalsDisplay();
    const newLi = createLoggedItem(item);
    itemList.append(newLi);

    savedItems.push(item);
    localStorage.setItem("items", JSON.stringify(savedItems));
  });

  return li;
}

function createLoggedItem(item) {
  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = formatItemText(item);

  const removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-btn");

  removeButton.addEventListener("click", (e) => {
    e.stopPropagation();

    savedItems = savedItems.filter((savedItem) => {
      return !(
        savedItem.name === item.name &&
        savedItem.cal === item.cal &&
        savedItem.protein === item.protein &&
        savedItem.carbs === item.carbs &&
        savedItem.fat === item.fat
      );
    });
    localStorage.setItem("items", JSON.stringify(savedItems));

    totals.cal -= item.cal;
    totals.protein -= item.protein;
    totals.carbs -= item.carbs;
    totals.fat -= item.fat;
    updateTotalsDisplay();

    li.remove();
  });

  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  li.style.alignItems = "center";

  li.appendChild(textSpan);
  li.appendChild(removeButton);

  return li;
}
