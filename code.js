let balidarBtnAdd = true;
let numTasks = 0;
let btnActive;

function crearItem(nameTarea){  // ELIMINAR el parametro contador si no esta en uso
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
    // divTarea.id=`${contador}`;
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
    if(check){
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
}

function activeBtn(e){
    btnActive = true;
    let completed = document.querySelectorAll( '.completed' );
        Array.prototype.forEach.call(completed, function (item) {
        item.className="div-check-tarea completed displayNone";
    });
    let active = document.querySelectorAll( '.active' );
        Array.prototype.forEach.call(active, function (item) {
        item.className="div-check-tarea active displayFlex";
    });
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
}

function limpiarFormulario() {
    document.getElementById("tarea").value = '';
}

function eliminar(botonEl) {
    botonEl.parentNode.parentNode.remove();
    let parrafoCounterTasks = document.getElementById("numTasks");
    numTasks -= 1;
    parrafoCounterTasks.textContent = `${numTasks} tasks remaining`;
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
    if(inpuEdit === ""){
        alert("Campos vacio, por favor ingresar un valor")
    }
    else{
        accesoNameTarea.textContent= `${inpuEdit}`;
        
    }
    let btnUpdate = document.querySelector("#btnAdd"); // llamado del boton Add y cambiar a Editar
    btnUpdate.value="Add";
    limpiarFormulario();
}

function envio(e){
    let tareaPendiente = document.getElementById("tarea").value;
    crearItem(tareaPendiente);
    limpiarFormulario()
    balidarBtnAdd = true;
}

let formulario = document.getElementById("formTarea");
formulario.addEventListener("submit", onFunctions);
function onFunctions(e){
    e.preventDefault();
    let parrafoCounterTasks = document.getElementById("numTasks");
    if(balidarBtnAdd===true){
        envio(e);
        numTasks += 1
        parrafoCounterTasks.textContent = `${numTasks} tasks remaining`;
    }
    else if(balidarBtnAdd===false){
        updateTarea(e);
    }
    else{
        envio(e);
        numTasks += 1
        parrafoCounterTasks.textContent = `${numTasks} tasks remaining`; 
        completedBtn(e);
    }
}
