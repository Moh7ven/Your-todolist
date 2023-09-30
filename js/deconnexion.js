let deconnexion = document.querySelector("#deconnexion");

deconnexion.addEventListener("click", (e)=> {
    sessionStorage.clear();
    window.location.href = "../index.html";
});