
/* Serviços */
const addFormName = document.querySelector(".add-form-name")
const addFormValue = document.querySelector(".add-form-value")
const addFormBtn = document.querySelector(".add-form-button")
const servicesList = document.querySelector(".services-container-2")
const mainValue = document.querySelector(".main-value")
const addBtn = document.querySelector(".add-button")
const addBtnCancel = document.querySelector(".cancel-form-button")
const addFormPopup = document.querySelector(".add-popup")
const dimmer = document.querySelector(".dimmer")

let services = [];

document.addEventListener("DOMContentLoaded", () => {
    addFormBtn.addEventListener("click", function(e) {
        e.preventDefault();
        // populate array of objects
        let service = {
            id: Date.now(),
            name: addFormName.value,
            value: addFormValue.value
        }
        services.push(service);
        
        /*// create li
        const newLi = document.createElement('li');
        newLi.innerHTML = "";
        const newSpan = document.createElement('span');
        newSpan.innerHTML = addFormName.value;
        const newSpan2 = document.createElement('span');
        newSpan2.innerHTML = addFormValue.value;
        newLi.appendChild(newSpan);
        newLi.appendChild(newSpan2);
        servicesList.appendChild(newLi);
        */
        RefreshServices();
    })
})

// map through array creating li items
function RefreshServices() {
    servicesList.innerHTML = "";
    services.map(serv => {
        console.log(serv.name)
        const newLi = document.createElement('li');
        newLi.innerHTML = "";
        newLi.classList.add("services-list-item");
        const newA = document.createElement('a');
        newA.innerHTML = serv.name;
        newA.classList.add("services-list-item-name");
        const newSpan = document.createElement('span');
        newSpan.innerHTML = serv.value;
        newSpan.classList.add("services-list-item-value");
        newLi.appendChild(newA);
        newLi.appendChild(newSpan);
        servicesList.appendChild(newLi);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    addBtn.addEventListener("click", function(e) {
        e.preventDefault();
        addFormPopup.classList.remove("add-form-hidden");
        dimmer.classList.add("dimmer-block");
    })})

document.addEventListener("DOMContentLoaded", () => {
    addBtnCancel.addEventListener("click", function(e) {
        e.preventDefault();
        addFormPopup.classList.add("add-form-hidden");
        dimmer.classList.remove("dimmer-block");
    })})