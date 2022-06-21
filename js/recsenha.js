/* Recuperar Senha */
const recSenhaSubmit = document.querySelector(".senha-submit")
const recSenhaForm2 = document.querySelector(".senha-container-2")
const recSenhaForm1 = document.querySelector(".senha-container-1")

recSenhaSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    recSenhaForm2.classList.remove("form-hidden");
    recSenhaForm1.classList.add("form-hidden");
    recSenhaSubmit.innerHTML = "Reenviar"
})


