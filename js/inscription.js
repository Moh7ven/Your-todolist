let btnIns = document.querySelector("#btnIns");

//Fonction pour verifier les données une fois soumis.
function validateForm() {
  let nom = document.querySelector("#nom").value;
  let prenom = document.querySelector("#prenom").value;
  let email = document.querySelector("#email").value;
  let mdp = document.querySelector("#password").value;
  let mdpConfir = document.querySelector("#password2").value;
  if (nom === "") {
    alert("Veuillez entrer votre Nom s'il vous plait");
    return false;
  }

  if (prenom === "") {
    alert("Veuillez entrer votre Prenom s'il vous plait");
    return false;
  }

  if (email === "") {
    alert("Veuillez entrer votre Email s'il vous plait");
    return false;
  } else if (!email.includes("@")) {
    alert("Veuillez entrer une adresse Email valide !");
    return false;
  }

  if (mdp === "") {
    alert("Veuillez entrer un MOT DE PASSE s'il vous plait");
    return false;
  }

  if (mdpConfir == "") {
    alert("Veuillez Confirmer votre MOT DE PASSE s'il vous plait");
    return false;
  }

  if (mdpConfir !== mdp) {
    alert("Vos mot de passe ne correspondent pas");
    return false;
  }

  return true;
}

//Function pour Ajouter les données
function addData() {
  //Si le formulaire est valide
  if (validateForm() == true) {
    let nom = document.querySelector("#nom").value;
    let prenom = document.querySelector("#prenom").value;
    let email = document.querySelector("#email").value;
    let mdp = document.querySelector("#password").value;
    let mdpConfir = document.querySelector("#password2").value;

    let data = {
      nom: nom,
      prenom: prenom,
      email: email,
      motDePasse: mdp,
      confirMdp: mdpConfir,
    };

    console.log(data);

    let userToDoList = localStorage.getItem("userToDoList");

    if (userToDoList === null) {
      userToDoList = [];

      userToDoList.push(data);

      localStorage.setItem("userToDoList", JSON.stringify(userToDoList));

      window.location.href = "../index.html";
    } else {
      userToDoList = JSON.parse(userToDoList);
      userToDoList.find((element) => {
        if (data.email !== element.email) {
          userToDoList.push(data);
          localStorage.setItem("userToDoList", JSON.stringify(userToDoList));
          window.location.href = "../index.html";
        } else {
          alert("Ce utilisateur existe déjà !");
          window.location.reload(); 
        }
      });
    }
  }
}

btnIns.addEventListener("click", (e) => {
  e.preventDefault();
  /* validateForm(); */
  addData();
});
