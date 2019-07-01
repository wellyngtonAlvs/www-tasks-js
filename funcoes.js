var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var listTarefas = JSON.parse(localStorage.getItem("list_tarefas")) || [];

function renderTarefas() {
  listElement.innerHTML = "";

  for (tarefas of listTarefas) {
    var tarefaElement = document.createElement("li");
    var tarefaText = document.createTextNode(tarefas);

    var linkElement = document.createElement("a");

    linkElement.setAttribute("href", "#");

    var pos = listTarefas.indexOf(tarefas);
    linkElement.setAttribute("onclick", "delTarefa(" + pos + ")");

    var linkText = document.createTextNode(" Excluir");

    linkElement.appendChild(linkText);

    tarefaElement.appendChild(tarefaText);
    tarefaElement.appendChild(linkElement);

    listElement.appendChild(tarefaElement);
  }
}

renderTarefas();

function addTarefa() {
  var tarefaText = inputElement.value;
  var time = new Date();

  if (!tarefaText) {
    window.alert("Por favor, preenchar o campo em branco !");
    return false;
  } else {
    listTarefas.push(
      tarefaText + " - " + time.getHours() + ":" + time.getMinutes() + " - "
    );
    inputElement.value = "";
    renderTarefas();
    saveToStorage();
  }
}

buttonElement.onclick = addTarefa;

function delTarefa(pos) {
  listTarefas.splice(pos, 1);
  const retorno = window.confirm('Deseja realmente excluír ?')

  if(!retorno){
    return false;
  }
  renderTarefas();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("list_tarefas", JSON.stringify(listTarefas));
}
