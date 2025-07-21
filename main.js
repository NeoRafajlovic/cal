const itemList = document.getElementById("itemList");
const totalCal = document.getElementById("totalCal");
const itemName = document.getElementById("itemName");
const itemCal = document.getElementById("itemCal");
const itemSubmit = document.getElementById("itemSubmit");

itemSubmit.addEventListener("click", (e) => {
  var li = document.createElement("li");
  li.textContent = `${itemName.value} - ${itemCal.value} kcal`;
  itemList.append(li);
  totalCal.innerText = `${
    parseInt(totalCal.innerText) + parseInt(itemCal.value)
  }`;
});
