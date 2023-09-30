let btnConn = document.querySelector("#conn");
// let email = document.querySelector("#email").value;
// let mdp = document.querySelector("#password").value;

/* function validateForm() {
  if (email === "") {
    alert("Veuillez entrer votre Email");
    return false;
  }

  if (mdp === "") {
    alert("Veuillez entrer votre mot de passe");
    return false;
  }
  return true;
} */

function connect() {
  // if (validateForm() === true) {
  let email = document.querySelector("#email").value;
  let mdp = document.querySelector("#password").value;

  let userToDoList = JSON.parse(localStorage.getItem("userToDoList"));

  if (localStorage.getItem("userToDoList") == null) {
    userToDoList = [];
  } else {
    bdCouturier = JSON.parse(localStorage.getItem("userToDoList"));
  }

  console.log(userToDoList);
  let result;

  userToDoList.find((element) => {
    if (email === element.email && mdp === element.motDePasse) {
      result = element;
      console.log(result);
    }
    if (typeof result !== "undefined") {
      sessionStorage.setItem("sessionuserToDoList", JSON.stringify(result));
      window.location.href = "./pages/todopage.html";
    } else {
      alert("Utilisateur inexistant !");
      window.location.reload();
    }
  });
  // }
}

// connect();
btnConn.addEventListener("click", (e) => {
  e.preventDefault();
  connect();
});
