/* Variáveis */

// main
const itemList = document.querySelector(".container-2")
const mainValue = document.querySelector(".main-value")

// add form
const AddItemFormOpenPopupBtn = document.querySelector(".add-item-form-open-popup")
const addItemForm = document.querySelector(".add-item-form")
const addItemFormType = document.querySelector(".add-item-form-type")
const addItemFormName = document.querySelector(".add-item-form-name")
const addItemFormValue = document.querySelector(".add-item-form-value")
const addItemFormAdd = document.querySelector(".add-item-form-add")
const addItemFormCancel = document.querySelector(".add-item-form-cancel")

//utils
const dimmer = document.querySelector(".dimmer")

// edit service
const editService = document.querySelector(".edit-service-popup")

// list of items
let list = [];

document.addEventListener("DOMContentLoaded", () => {
    addItemFormAdd.addEventListener("click", function(e) {
        e.preventDefault();
        // populate array of objects
        if (addItemFormType.value != "empty" && addItemFormName.value != "" && addItemFormValue.value > 0) {
            let item = {
                id: Date.now(),
                name: addItemFormName.value,
                value: addItemFormValue.value,
                type: addItemFormType.value
            }
            list.push(item);
            console.log(list);
        }
        RefreshList();
    })
})

function RefreshList() {
    itemList.innerHTML = "";
    var totalValue = 0;
    list.map(itm => {
        // create list
        const newLi = document.createElement('li');
        newLi.innerHTML = "";
        newLi.classList.add("list-item");
        // create name item
        const newA = document.createElement('a');
        newA.innerHTML = itm.name;
        newA.classList.add("list-item-name");
        // create value item
        const newSpan = document.createElement('span');
        newSpan.innerHTML = "R$ " + (Math.round(itm.value * 100) / 100).toFixed(2);
        newSpan.classList.add("list-item-value");
        // append items to list item
        newLi.appendChild(newA);
        newLi.appendChild(newSpan);
        // append list item to services list
        itemList.appendChild(newLi);

        // sum the values
        totalValue = totalValue + parseFloat(itm.value);
    })
    mainValue.innerHTML = "R$ " + (Math.round(totalValue * 100) / 100).toFixed(2);
}