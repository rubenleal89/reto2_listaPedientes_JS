let balidarBtnAdd = true;
let numTasks = 0;
let numCompleted=0;
let btnActive;
let tasksCompleted;
let tasksActive;

function crearItem(nameTarea){
// Elementos ya creados en el index.html
    const section = document.querySelector("#sect-lista");
    const btnAll = document.querySelector("#all");
    btnAll.addEventListener("click",allBtn);
    const btnActive = document.querySelector("#active");
    btnActive.addEventListener("click", activeBtn);
    const btnCompleted = document.querySelector("#completed");
    btnCompleted.addEventListener("click",completedBtn);

// Creacion del div que contiene el CHECKBOX y el texto de la TAREA
    let divTarea = document.createElement("div");
    divTarea.className="div-check-tarea active";
    let checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="checkSeleccionar";
    checkbox.addEventListener("change",valiCheck,false);
    let parrafoNameTarea = document.createElement("label");
    parrafoNameTarea.className="txtEdit";
    parrafoNameTarea.textContent=`${nameTarea}`;
// creacion del div que contiene los BOTONES: Editar y Eliminar
    let divButton = document.createElement("div");
    divButton.className="div-btn-edit-delete";
    let buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    buttonEdit.className="btnEdit";
    buttonEdit.addEventListener("click",(editInput));
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.className="btnDelete";
    buttonDelete.addEventListener("click",(e) => {
        eliminar(buttonDelete);
    });
// Creacion de las insercion de los div a la seccion
    section.insertAdjacentElement("beforeend",divTarea)
// Creacion de las inserciones de elementos a los Div
    divTarea.insertAdjacentElement("afterbegin",checkbox);
    divTarea.insertAdjacentElement("beforeend",parrafoNameTarea);
    divTarea.insertAdjacentElement("beforeend",divButton);
    divButton.insertAdjacentElement("beforeend",buttonEdit);
    divButton.insertAdjacentElement("beforeend",buttonDelete);
}

function valiCheck(e){
    let ubicaionDivCheck = e.target.parentNode;
    let ubicaCheck = e.target;
    let check = ubicaCheck.checked;
    tasksActive = document.getElementById("numTasksActive");
    tasksCompleted = document.getElementById("numTasksCompleted");
    if(check){
        numCompleted += 1;
        tasksCompleted.textContent = `${numCompleted} completed tasks`;
        tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
        if(btnActive === true){
            ubicaionDivCheck.className="div-check-tarea completed displayNone";
        }
        else{
            ubicaionDivCheck.className="div-check-tarea completed";
        }
        // if(btnActive === false){
        //     ubicaionDivCheck.className="div-check-tarea btnCompleted";
        // }
        // else{
        //     ubicaionDivCheck.className="div-check-tarea completed";
        // }
    }
    if(check == false){
        numCompleted -= 1;
        tasksCompleted.textContent = `${numCompleted} completed tasks`;
        tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
        if(btnActive === false){
            ubicaionDivCheck.className="div-check-tarea active displayNone";
        }
        else{
            ubicaionDivCheck.className="div-check-tarea active";
        }
        // if(btnActive === true){
        //     ubicaionDivCheck.className="div-check-tarea btnActive";
        // }
        // else{
        //     ubicaionDivCheck.className="div-check-tarea completed";
        // }
    }
}

function completedBtn(e){
    btnActive = false;
    balidarBtnAdd = null;
    let active = document.querySelectorAll( '.active' );
        Array.prototype.forEach.call(active, function (item) {
        item.className="div-check-tarea active displayNone"
    });
    let completed = document.querySelectorAll( '.completed' );
        Array.prototype.forEach.call(completed, function (item) {
        item.className="div-check-tarea completed displayFlex";
    });
    let tasksTotal = document.getElementById("numTasks");
    tasksTotal.className="displayNone"
    let tasksActive = document.getElementById("numTasksActive");
    tasksActive.className="displayNone"
    let tasksCompleted = document.getElementById("numTasksCompleted");
    tasksCompleted.className="displayFlex"
}

function activeBtn(e){
    btnActive = true;
    balidarBtnAdd = true;
    let completed = document.querySelectorAll( '.completed' );
        Array.prototype.forEach.call(completed, function (item) {
        item.className="div-check-tarea completed displayNone";
    });
    let active = document.querySelectorAll( '.active' );
        Array.prototype.forEach.call(active, function (item) {
        item.className="div-check-tarea active displayFlex";
    });
    let tasksTotal = document.getElementById("numTasks");
    tasksTotal.className="displayNone"
    let tasksActive = document.getElementById("numTasksActive");
    tasksActive.className="displayFlex"
    let tasksCompleted = document.getElementById("numTasksCompleted");
    tasksCompleted.className="displayNone"
    {
    // let ubicaionDivCheck = document.getElementsByClassName("completed");
    // ubicaionDivCheck.className="div-check-tarea btnActive";
    
    // let divTareaNoCheck1 = document.querySelector(".completed");
    // divTareaNoCheck1.style="background-color: rgb(236, 68, 68);";

    // let divTareaNoCheck2 = document.getElementsByClassName("active");
    // divTareaNoCheck2.style="background-color: blue;";
    }
}

function allBtn(){
    btnActive = null;
    balidarBtnAdd=true;
    let completed = document.querySelectorAll( '.completed' );
        Array.prototype.forEach.call(completed, function (item) {
        item.className="div-check-tarea completed displayFlex";
    });
    let active = document.querySelectorAll( '.active' );
        Array.prototype.forEach.call(active, function (item) {
        item.className="div-check-tarea active displayFlex";
    });
    let tasksTotal = document.getElementById("numTasks");
    tasksTotal.className="displayFlex"
    let tasksActive = document.getElementById("numTasksActive");
    tasksActive.className="displayNone"
    let tasksCompleted = document.getElementById("numTasksCompleted");
    tasksCompleted.className="displayNone"
}

function limpiarFormulario() {
    document.getElementById("tarea").value = '';
}

function eliminar(botonEl) {
    
    let divElimi = botonEl.parentNode.parentNode;
    divElimi.remove()
    let parrafoCounterTasks = document.getElementById("numTasks");
    let contadorVali = divElimi.className
    
    numTasks -= 1;
    parrafoCounterTasks.textContent = `${numTasks} total tasks`;

    if(contadorVali.includes("active")){
        tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
        console.log("siiii")
    }
    if(contadorVali.includes("completed")){
        tasksCompleted.textContent = `${numCompleted-=1} completed tasks`;
        console.log("nooo")
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

let accesoNameTarea;
function editInput(botonEd){ // Al hacer clip en editar, el valor de P pasa al Input
    balidarBtnAdd = false;
    accesoNameTarea = botonEd.target.parentNode.parentNode.childNodes[1]; // llamar al elemento P del nombre tarea
    let valorElem = accesoNameTarea.textContent;
    let inputEdi = document.getElementById("tarea");
    inputEdi.value=valorElem;
    let btnUpdate = document.querySelector("#btnAdd"); // llamado del boton Add y cambiar a Editar
    btnUpdate.value="Editar";
}

function updateTarea(){
    balidarBtnAdd = true;
    let inpuEdit = document.getElementById("tarea").value;
    if(/^\S/.test(inpuEdit) && !/^[0-9]+$/.test(inpuEdit) && /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(inpuEdit)){
        accesoNameTarea.textContent= `${inpuEdit}`;
    }
    else{
        alert("No se permiten numeros y caracteres especiales")
    }
    let btnUpdate = document.querySelector("#btnAdd"); // llamado del boton Add y cambiar a Editar
    btnUpdate.value="Add";
    limpiarFormulario();
}

function envio(e){
    let tareaPendiente = document.getElementById("tarea").value;
    validarInpunt(tareaPendiente);
}

function validarInpunt(tareaPendiente){
    let placeholderInput = document.getElementById("tarea");
    if(/^\S/.test(tareaPendiente) && !/^[0-9]+$/.test(tareaPendiente) && /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(tareaPendiente)){
        placeholderInput.placeholder="Ingrese una nueva tarea"
        crearItem(tareaPendiente);
        limpiarFormulario()
        balidarBtnAdd = true;
        numTasks += 1
    }
    else{
        placeholderInput.placeholder="No se permiten numeros y caracteres especiales"
        limpiarFormulario();
    }
}

let formulario = document.getElementById("formTarea");
formulario.addEventListener("submit", onFunctions);
function onFunctions(e){
    e.preventDefault();
    tasksActive = document.getElementById("numTasksActive");
    let parrafoCounterTasks = document.getElementById("numTasks");
    if(balidarBtnAdd===true){
        envio(e);
        parrafoCounterTasks.textContent = `${numTasks} total tasks`;
        tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
    }
    else if(balidarBtnAdd===false){
        updateTarea(e);
    }
    else{
        envio(e);
        // numTasks += 1
        parrafoCounterTasks.textContent = `${numTasks} total tasks`; 
        tasksActive.textContent = `${numTasks-numCompleted} active tasks`;
        completedBtn(e);
    }
}
