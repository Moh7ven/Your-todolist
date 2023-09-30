let session = JSON.parse(sessionStorage.getItem("sessionuserToDoList"));
let nomAffiche = document.querySelector("#nomAffiche");
let userToDoList = JSON.parse(localStorage.getItem("userToDoList")) || [];
let envoie = document.querySelector("#envoie");
console.log(userToDoList);

// console.log(session);

if (!session) {
  nomAffiche.textContent = "<Vous n'êtes pas connecter>";
  alert("Veuillez vous connecter !");
  window.location.href = "../index.html";
} else {
  nomAffiche.textContent = `${session.nom.toLowerCase()} ${session.prenom.toLowerCase()}`;
  nomAffiche.style.color = "rgb(254,86,1)";
}

function validateForm() {
  let titre = document.querySelector("#titre").value;
  let tache = document.querySelector("#tache").value;

  if (titre === "") {
    alert("Veuillez remplir le champ nom");
    return false;
  }

  if (tache === "") {
    alert("Veuillez remplir le champ somme");
    return false;
  }

  return true;
}

function showData() {
  let toDoList;
  if (localStorage.getItem("toDoList") == null) {
    toDoList = [];
  } else {
    toDoList = JSON.parse(localStorage.getItem("toDoList"));
  }
  let html = "";

  toDoList.forEach((element, indice) => {
    html += `<tr id="">
          <td data-title="N°">${indice + 1}</td>
          <td data-title="nom">${element.titre}</td>
          <td data-title="tache">${element.tache}</td>
          <td data-title="option">
            <i class="edite" id="edite" onclick="updateData(${indice})">Editer</i>
            <i class="delete" id="delete" onclick="setDeleteIndex(${indice})">Supprimer</i>
          </td>
        </tr>`;
  });

  document.querySelector("#table tbody").innerHTML = html;
}

document.onload = showData();

function addTodo() {
  if (validateForm() === true) {
    let titre = document.querySelector("#titre").value;
    let tache = document.querySelector("#tache").value;
    let session = JSON.parse(sessionStorage.getItem("sessionuserToDoList"));

    let data = {
      titre: titre,
      tache: tache,
      userDonnee: session.email,
    };
    console.log(data);

    let toDoList = localStorage.getItem("toDoList");

    if (toDoList === null) {
      toDoList = [];
      toDoList.push(data);

      localStorage.setItem("toDoList", JSON.stringify(toDoList));
      window.location.reload();
    } else {
      toDoList = JSON.parse(toDoList);
      toDoList.push(data);

      localStorage.setItem("toDoList", JSON.stringify(toDoList));

      showData();

      document.querySelector("#titre").value = "";
      document.querySelector("#tache").value = "";

      window.location.reload();
    }
  }
}

envoie.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

let currentDeleteIndex;

function setDeleteIndex(index) {
  currentDeleteIndex = index;

  let toDoList = JSON.parse(localStorage.getItem("toDoList"));

  if (currentDeleteIndex !== undefined) {
    toDoList.splice(currentDeleteIndex, 1);
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    showData();
  } else {
    console.error("L'indice de suppression n'est pas défini.");
  }
  showData();

  window.location.href = "../pages/todopage.html";
}

function updateData(index) {
    document.querySelector("#envoie").style.display = "none";
    document.querySelector("#Editer").style.display = "block";
  
    let toDoList;
    if (localStorage.getItem("toDoList") == null) {
        toDoList = [];
    } else {
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
    }
  
    document.querySelector("#titre").value = toDoList[index].titre;
    document.querySelector("#tache").value = toDoList[index].tache;
  
    document.querySelector("#Editer").onclick = () => {
      if (validateForm() == true) {
        toDoList[index].titre = document.querySelector("#titre").value;
        toDoList[index].tache = document.querySelector("#tache").value;
  
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
  
        showData();
  
        document.querySelector("#titre").value = "";
        document.querySelector("#tache").value = "";
  
        document.querySelector("#envoie").style.display = "block";
        document.querySelector("#Editer").style.display = "none";
      }
    };
  }
