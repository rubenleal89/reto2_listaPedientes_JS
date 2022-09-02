let balidarBtn = true;

function crearItem(contador,nameTarea){
// Elementos ya creados en el index.html
    const section = document.querySelector("#sect-lista");
// Creacion del div que contiene divTarea y divButton
    let divGlobalE = document.createElement("div");
// Creacion del div que contiene el CHECKBOX y el texto de la TAREA
    let divTarea = document.createElement("div");
    divTarea.className="div-check-tarea";
    let checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="checkSeleccionar";
    let parrafoNameTarea = document.createElement("p");
    parrafoNameTarea.className="txtEdit";
    parrafoNameTarea.textContent=`${nameTarea}`;
// creacion del div que contiene los BOTONES: Editar y Eliminar
    let divButton = document.createElement("div");
    divButton.className="div-btn-edit-delete";
    let buttonEdit = document.createElement("button");
    buttonEdit.textContent = "Edit";
    buttonEdit.className="btnEdit";
    buttonEdit.addEventListener("click",(editInput) 
        // console.log(e);
        // console.log(e.target.parentNode.parentNode.childNodes[1]);
    );
    let buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.className="btnDelete";
    buttonDelete.addEventListener("click",(e) => {
        eliminar(buttonDelete);
    }
    );
// Creacion de las insercion de los div a la seccion
    section.insertAdjacentElement("beforeend",divGlobalE)
    divGlobalE.insertAdjacentElement("beforeend",divTarea);
// Creacion de las inserciones de elementos a los Div
    divTarea.insertAdjacentElement("afterbegin",checkbox);
    divTarea.insertAdjacentElement("beforeend",parrafoNameTarea);
    divTarea.insertAdjacentElement("beforeend",divButton);
    divButton.insertAdjacentElement("beforeend",buttonEdit);
    divButton.insertAdjacentElement("beforeend",buttonDelete);
}

let numTasks = 0;
function contador(e,botonEl){
    let parrafoCounterTasks = document.getElementById("numTasks");
    if(e.type){ // (e.type) me hace saber si la funcion se ejecuto
        numTasks += 1
        parrafoCounterTasks.textContent = `${numTasks} tasks remaining`; // si es necesario
    }
    if(botonEl.type){
        numTasks -= 1
        parrafoCounterTasks.textContent = `${numTasks} tasks remaining`; // si es necesario
    }
}

function limpiarFormulario() {
    document.getElementById("tarea").value = '';
}

function eliminar(botonEl) {
    botonEl.parentNode.parentNode.remove();
    contador("",botonEl)
}

let accesoNameTarea;
function editInput(botonEd){ // Al hacer clip en editar, el valor de P pasa al Input
    balidarBtn = false;
    accesoNameTarea = botonEd.target.parentNode.parentNode.childNodes[1]; // llamar al elemento P del nombre tarea
    let valorElem = accesoNameTarea.textContent;
    let inputEdi = document.getElementById("tarea");
    inputEdi.value=valorElem;
    let btnUpdate = document.querySelector("#btnAdd"); // llamado del boton Add y cambiar a Editar
    btnUpdate.value="Editar";
}

function updateTarea(){
    balidarBtn = true;
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
    contador(e,"")
    crearItem(numTasks,tareaPendiente);
    limpiarFormulario()
    balidarBtn = true;
}

let formulario = document.getElementById("formTarea");
formulario.addEventListener("submit", onFunctions);
function onFunctions(e){
    e.preventDefault();
    if(balidarBtn===true){
        envio(e);
    }
    else if(balidarBtn===false){
        updateTarea(e);
    }
}
