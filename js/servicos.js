
/* Variáveis */
const addFormName = document.querySelector(".add-form-name")
const addFormValue = document.querySelector(".add-form-value")
const addFormType = document.querySelector(".add-form-type")
const addFormBtn = document.querySelector(".add-form-button")
const addFormCancel = document.querySelector(".cancel-form-button")
const servicesList = document.querySelector(".services-container-2")
const mainValue = document.querySelector(".main-value")
const addBtn = document.querySelector(".add-button")
const addFormPopup = document.querySelector(".add-popup")
const dimmer = document.querySelector(".dimmer")
const editService = document.querySelector(".edit-service-popup")


let services = [];

document.addEventListener("DOMContentLoaded", () => {
    addFormBtn.addEventListener("click", function(e) {
        e.preventDefault();
        // populate array of objects
        if (addFormType.value != "empty" && addFormName.value != "" && addFormValue.value > 0) {
            let service = {
                id: Date.now(),
                name: addFormName.value,
                value: addFormValue.value,
                type: addFormType.value
            }
            services.push(service);
        }
        RefreshServices();
    })
})

// map through array creating li items
function RefreshServices() {
    servicesList.innerHTML = "";
    var totalValue = 0;
    services.map(serv => {
        // create list
        const newLi = document.createElement('li');
        newLi.innerHTML = "";
        newLi.classList.add("services-list-item");
        // create name item
        const newA = document.createElement('a');
        newA.innerHTML = serv.name;
        newA.classList.add("services-list-item-name");
        // create value item
        const newSpan = document.createElement('span');
        newSpan.innerHTML = "R$ " + (Math.round(serv.value * 100) / 100).toFixed(2);
        newSpan.classList.add("services-list-item-value");
        // append items to list item
        newLi.appendChild(newA);
        newLi.appendChild(newSpan);
        newLi.onclick = () => editServicePopup(serv);
        // append list item to services list
        servicesList.appendChild(newLi);

        // sum the values
        totalValue = totalValue + parseFloat(serv.value);
    })
    mainValue.innerHTML = "R$ " + (Math.round(totalValue * 100) / 100).toFixed(2);
}

// Popup buttons:
document.addEventListener("DOMContentLoaded", () => {
    addBtn.addEventListener("click", function(e) {
        e.preventDefault();
        addFormPopup.classList.remove("add-form-hidden");
        dimmer.classList.add("dimmer-block");
    })})

document.addEventListener("DOMContentLoaded", () => {
    addFormCancel.addEventListener("click", function(e) {
        e.preventDefault();
        addFormPopup.classList.add("add-form-hidden");
        dimmer.classList.remove("dimmer-block");
    })})
document.addEventListener("DOMContentLoaded", () => {
    addFormBtn.addEventListener("click", function(e) {
        e.preventDefault();
        if (addFormType.value != "empty" && addFormName.value != "" && addFormValue.value > 0) {
            addFormPopup.classList.add("add-form-hidden");
            dimmer.classList.remove("dimmer-block");
            addFormType.value = "empty";
            addFormName.value = "";
            addFormValue.value = "";
        
        // erros
        } else if (addFormType.value == "empty" && addFormName.value == "" && addFormValue.value <= 0) {
            alert("Por favor preencha todos os campos.")
        } else if (addFormType.value == "empty") {
            alert("Por favor selecione o tipo.")
            addFormType.focus()
        } else if (addFormName.value == "") {
            alert("Por favor insira um nome.")
            addFormName.focus()
        } else if (addFormValue.value <= 0) {
            alert("O campo valor não pode ser nulo.");
            addFormValue.focus()
        }
    })})


    // edit services
    function editServicePopup(serv) {
        console.log(serv);
        // service type
        const editServiceType = document.createElement('span');
        editServiceType.innerHTML = "Tipo: "
        editServiceType.classList.add("edit-service-type");

        const editServiceTypeVal = document.createElement('span');
        editServiceTypeVal.innerHTML = serv.type;
        editServiceTypeVal.classList.add("edit-service-type");

        // service name
        const editServiceName = document.createElement('span');
        editServiceName.innerHTML = "Nome: "
        editServiceName.classList.add("edit-service-type");

        const editServiceNameVal = document.createElement('span');
        editServiceNameVal.innerHTML = serv.name;
        editServiceNameVal.classList.add("edit-service-name");
        // service value
        const editServiceValue = document.createElement('span');
        editServiceValue.innerHTML = "Valor: "
        editServiceValue.classList.add("edit-service-type");

        const editServiceValueVal = document.createElement('span');
        editServiceValueVal.innerHTML = "R$ " + (Math.round(serv.value * 100) / 100).toFixed(2);
        editServiceValueVal.classList.add("edit-service-name");

        // buttons
        const editServiceRemoveBtn = document.createElement('button');
        editServiceRemoveBtn.innerHTML = "Remover";
        editServiceRemoveBtn.classList.add("edit-service-remove-btn", "edit-service-form-buttons");
        editServiceRemoveBtn.onclick = () => RemoveService(serv);
        const editServiceContinueBtn = document.createElement('button');
        editServiceContinueBtn.innerHTML = "Continuar";
        editServiceContinueBtn.classList.add("edit-service-continue-btn", "edit-service-form-buttons");
        editServiceContinueBtn.onclick = () => {
            editService.classList.add("add-form-hidden");
            dimmer.classList.remove("dimmer-block");
            editService.innerHTML="";
        };


        // append elements to popup
        editService.appendChild(editServiceType);
        editService.appendChild(editServiceTypeVal);
        editService.appendChild(editServiceName);
        editService.appendChild(editServiceNameVal);
        editService.appendChild(editServiceValue);
        editService.appendChild(editServiceValueVal);
        editService.appendChild(editServiceRemoveBtn);
        editService.appendChild(editServiceContinueBtn);

        editService.classList.remove("add-form-hidden");
        dimmer.classList.add("dimmer-block");

    }

    function RemoveService(serv) {
        services.map(service => {
            if (service.id == serv.id) {
                services.splice(service, 1);
            }
        })
        editService.classList.add("add-form-hidden");
        dimmer.classList.remove("dimmer-block");
        RefreshServices();
        editService.innerHTML="";
    }
    