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

// item info popup
const itemInfoPopup = document.querySelector(".item-info-popup-container")




/** ## ITEMS LIST ## */
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

        // erros e reset
        if (addItemFormType.value == "empty" && addItemFormName.value == "" && addItemFormValue.value <= 0) {
            alert("Por favor preencha todos os campos.")
        } else if (addItemFormType.value == "empty") {
            alert("Por favor selecione o tipo.")
            addItemFormType.focus()
        } else if (addItemFormName.value == "") {
            alert("Por favor insira um nome.")
            addItemFormName.focus()
        } else if (addItemFormValue.value <= 0) {
            alert("O campo valor não pode ser nulo.");
            addItemFormValue.focus()
        } else {
            addItemForm.classList.add("item-hidden");
            dimmer.classList.remove("dimmer-block");
            addItemFormType.value = "empty";
            addItemFormName.value = "";
            addItemFormValue.value = "";
        }
    })
})
// map through array creating li items
function RefreshList() {
    itemList.innerHTML = "";
    list.map(item => {
        // create list
        const newLi = document.createElement('li');
        newLi.innerHTML = "";
        newLi.classList.add("list-item");
        // create name item
        const newA = document.createElement('a');
        newA.innerHTML = item.name;
        newA.classList.add("list-item-name");
        // create value item
        const newSpan = document.createElement('span');
        newSpan.innerHTML = "R$ " + (Math.round(item.value * 100) / 100).toFixed(2);
        newSpan.classList.add("list-item-value");
        // append items to list item
        newLi.appendChild(newA);
        newLi.appendChild(newSpan);
        newLi.onclick = () => ItemInfoPopup(item);
        // append list item to services list
        itemList.appendChild(newLi);
    })
}




/** ## ADD ITEM POPUP FORM ## */

// open popup
document.addEventListener("DOMContentLoaded", () => {
    AddItemFormOpenPopupBtn.addEventListener("click", function(e) {
        e.preventDefault();
        addItemForm.classList.remove("item-hidden");
        dimmer.classList.add("dimmer-block");
    })})
// cancel close popup
document.addEventListener("DOMContentLoaded", () => {
    addItemFormCancel.addEventListener("click", function(e) {
        e.preventDefault();
        addItemForm.classList.add("item-hidden");
        dimmer.classList.remove("dimmer-block");
    })})



 
function ItemInfoPopup(item) {
    // item type
    const itemInfoType = document.createElement('span');
    itemInfoType.innerHTML = "Tipo: "

    const itemInfoTypeVal = document.createElement('span');
    itemInfoTypeVal.innerHTML = item.type;

    // item name
    const itemInfoName = document.createElement('span');
    itemInfoName.innerHTML = "Nome: "

    const itemInfoNameVal = document.createElement('span');
    itemInfoNameVal.innerHTML = item.name;
    // item value
    const itemInfoValue = document.createElement('span');
    itemInfoValue.innerHTML = "Valor: "

    const itemInfoValueVal = document.createElement('span');
    itemInfoValueVal.innerHTML = "R$ " + (Math.round(item.value * 100) / 100).toFixed(2);

    // buttons
    const itemInfoRemoveBtn = document.createElement('button');
    itemInfoRemoveBtn.innerHTML = "Remover";
    itemInfoRemoveBtn.classList.add("item-info-remove-btn", "item-info-buttons");
    itemInfoRemoveBtn.onclick = () => RemoveItem(item);
    const itemInfoContinueBtn = document.createElement('button');
    itemInfoContinueBtn.innerHTML = "Continuar";
    itemInfoContinueBtn.classList.add("item-info-continue-btn", "item-info-buttons");
    itemInfoContinueBtn.onclick = () => {
        itemInfoPopup.classList.add("item-hidden");
        dimmer.classList.remove("dimmer-block");
        itemInfoPopup.innerHTML="";
    };
    // append elements to popup
    itemInfoPopup.appendChild(itemInfoType);
    itemInfoPopup.appendChild(itemInfoTypeVal);
    itemInfoPopup.appendChild(itemInfoName);
    itemInfoPopup.appendChild(itemInfoNameVal);
    itemInfoPopup.appendChild(itemInfoValue);
    itemInfoPopup.appendChild(itemInfoValueVal);
    itemInfoPopup.appendChild(itemInfoRemoveBtn);
    itemInfoPopup.appendChild(itemInfoContinueBtn);

    itemInfoPopup.classList.remove("item-hidden");
    dimmer.classList.add("dimmer-block");
}

// remove items
function RemoveItem(item) {
    list.map(listitem => {
        if (listitem.id == item.id) {
            list.splice(listitem, 1);
        }
    })
    itemInfoPopup.classList.add("item-hidden");
    dimmer.classList.remove("dimmer-block");
    RefreshList();
    itemInfoPopup.innerHTML="";
}   