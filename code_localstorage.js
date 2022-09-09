let balidarBtnAdd = true;
let accesoNameTarea;
let idEditar;
let arrayTareasLocal = [];
let estadoTarea = "active";

function addElemenArray(Nomtareas){
    let tareas ={
        nameTask: Nomtareas,
        iD: identificador(),
        estado: estadoTarea,
    }
    arrayTareasLocal.push(tareas);
}

function identificador(){
    let lastId = localStorage.getItem("lastId") || "-1";
    let newId = JSON.parse(lastId) + 1;
    localStorage.setItem("lastId", JSON.stringify(newId));
    return newId;
}

function crearElemnts(){
    // debugger
    arrayTareasLocal=JSON.parse(localStorage.getItem("Formulario Tarea")); // Trae los valores del local
    let section = document.querySelector("#sect-tareas");
    section.innerHTML="";
    if(arrayTareasLocal=== null){
        arrayTareasLocal=[];
    }
    else{
        arrayTareasLocal.forEach(element => {
// Elementos ya creados en el index.html
            let btnAll = document.querySelector("#all");
            btnAll.addEventListener("click",allBtn);
            let btnActive = document.querySelector("#active");
            btnActive.addEventListener("click", activeBtn);
            let btnCompleted = document.querySelector("#completed");
            // btnCompleted.addEventListener("click",completedBtn);
// Creacion del div que contiene el CHECKBOX y el texto de la TAREA
            let divTarea = document.createElement("div");
            divTarea.className="div-check-tarea active";
            let checkbox = document.createElement("input");
            checkbox.type="checkbox";
            checkbox.className="checkSeleccionar";
            checkbox.addEventListener("change",(e) => {
                validacionCheck(checkbox,element.iD)
            },false);
            let parrafoNameTarea = document.createElement("label");
            parrafoNameTarea.className="txtEdit";
            parrafoNameTarea.textContent=element.nameTask;
// Creacion del div que contiene los BOTONES: Editar y Eliminar
            let divButton = document.createElement("div");
            divButton.className="div-btn-edit-delete";
            let buttonEdit = document.createElement("button");
            buttonEdit.textContent = "Edit";
            buttonEdit.className="btnEdit";
            buttonEdit.addEventListener("click",(e) => {
                editarInput(e,element.iD)
            });
            let buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Delete";
            buttonDelete.className="btnDelete";
            buttonDelete.addEventListener("click",(e) => {
                eliminarLocal(buttonDelete, element.iD);
            });
// Creacion de las insercion de los div a la seccion
            section.insertAdjacentElement("beforeend",divTarea);
// Creacion de las inserciones de elementos a los Div
            divTarea.insertAdjacentElement("afterbegin",checkbox);
            divTarea.insertAdjacentElement("beforeend",parrafoNameTarea);
            divTarea.insertAdjacentElement("beforeend",divButton);
            divButton.insertAdjacentElement("beforeend",buttonEdit);
            divButton.insertAdjacentElement("beforeend",buttonDelete);
        });
    }
}


function validacionCheck(e,id){
    let check = e.checked;

    if(check){
        estadoTarea = "completed"
        arrayTareasLocal.forEach( element => {
            if(element.iD === id){
                element.estado = estadoTarea;
                localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
            }
        })
    }
    if(check === false){
        estadoTarea = "active"
        arrayTareasLocal.forEach( element => {
            if(element.iD === id){
                element.estado = estadoTarea;
                localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
            }
        })
    }
}

function limpiarFormulario() {
    document.getElementById("tarea").value = '';
}

function eliminarLocal(e,id){
    let ubiElim = e.parentNode.parentNode;
    ubiElim.remove(); // se elimina el HTML creado

    let datos = localStorage.getItem("Formulario Tarea"); // se llama la Data del local
    let datosjson = JSON.parse(datos) // lo convierte en array, porque en el local se guarda como (stringify)
    
    arrayTareasLocal = datosjson.filter((e) => e.iD !== id) //con filter creo un nuevo array

    localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal)); // el nuevo array creado se guarda en el local
}

function editarInput(e,id){ // Al hacer clip en editar, el valor del Span pasa al Input
    balidarBtnAdd = false;
    accesoNameTarea = e.target.parentNode.parentNode.childNodes[1]; // llamar al elemento P del nombre tarea
    let valorElem = accesoNameTarea.textContent;
    let inputEdi = document.getElementById("tarea");
    inputEdi.value=valorElem;
    let btnUpdate = document.querySelector("#btnAdd"); // llamado del boton Add y cambiar a Editar
    btnUpdate.value="Editar";

    idEditar = id; // globalizo el id del elemento cliqueado
}

function editarTareas(){
    balidarBtnAdd = true;
    let inpuEdit = document.getElementById("tarea").value;
    if(/^\S/.test(inpuEdit) && !/^[0-9]+$/.test(inpuEdit) && /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inpuEdit)){
        arrayTareasLocal.forEach( element => {
            if(element.iD === idEditar){
                element.nameTask = inpuEdit;
                localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
                crearElemnts();
            }
        })
    }
    else{
        alert("No se permiten numeros y caracteres especiales")
    }
    let btnUpdate = document.querySelector("#btnAdd"); 
    btnUpdate.value="Add";
    limpiarFormulario();
}

function envio(e){
    e.preventDefault();
    let tareas = document.getElementById("tarea").value;
    addElemenArray(tareas);
    localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal)); // Se esta guardando los elemtos del array en el local
    crearElemnts();
    limpiarFormulario();
}

let formulario = document.getElementById("formTarea");
formulario.addEventListener("submit", onFunctions);
function onFunctions(e){
    e.preventDefault();
    // tasksActive = document.getElementById("numTasksActive");
    // let parrafoCounterTasks = document.getElementById("numTasks");
    if(balidarBtnAdd===true){
        envio(e);
        // parrafoCounterTasks.textContent = `${numTasks} total tasks`;
        // tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
    }
    else if(balidarBtnAdd===false){
        editarTareas(e);
    }
    else{
        envio(e);
        // parrafoCounterTasks.textContent = `${numTasks} total tasks`; 
        // tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
        // completedBtn(e);
    }
}


document.addEventListener('DOMContentLoaded',crearElemnts); // (DOMContentLoaded) cuando recargue el contenido del DOM vuelva e imprima