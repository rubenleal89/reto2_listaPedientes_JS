let balidarBtnAdd = true;
let validarTareasCheck = null; // ejecuta la function crearElemnts()
let idEditar;
let arrayTareasLocal = [];
let numTareas;

function addElemenArray(Nomtareas){
    let tareas ={
        nameTask: Nomtareas,
        iD: identificador(),
        estado: "active",
        invalidarBtnEdit: "funcional",
        placeholder: "",
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
    let arrayTasks;
    let numTasks = document.querySelector("#numTasks");
    if(validarTareasCheck === null){ // Validar que boton se oprimio e imprimir su array
        arrayTasks = JSON.parse(localStorage.getItem("Formulario Tarea"));
    }
    else if(validarTareasCheck === false){
        arrayTasks = JSON.parse(localStorage.getItem("Active Task")); // Trae los valores del local
    }
    else if (validarTareasCheck === true){
        arrayTasks = JSON.parse(localStorage.getItem("Completed Task")); 
    }
    let section = document.querySelector("#sect-tareas");
    section.innerHTML="";
    if(arrayTasks=== null){
        arrayTasks=[];
        arrayTareasLocal=[];
    }
    else{
        numTareas = arrayTasks.length;
        numTasks.textContent=`Number of tasks: ${numTareas}`;
        arrayTareasLocal = JSON.parse(localStorage.getItem("Formulario Tarea"));
        arrayTasks.forEach(element => {
// Elementos ya creados en el index.html
            let btnAll = document.querySelector("#all");
            btnAll.addEventListener("click",allBtn);
            let btnActive = document.querySelector("#active");
            btnActive.addEventListener("click", activeBtn);
            let btnCompleted = document.querySelector("#completed");
            btnCompleted.addEventListener("click",completedBtn);
// Creacion del div que contiene el CHECKBOX y el texto de la TAREA
            let divTarea = document.createElement("div");
            divTarea.className="div-check-tarea active";
            divTarea.id="div-check-tarea";
            let checkbox = document.createElement("input");
            checkbox.type="checkbox";
            checkbox.className="checkSeleccionar";
            checkbox.setAttribute(element.estado,element.estado); // Atributo para que el check quede activo
            checkbox.addEventListener("change",(e) => {
                validacionCheck(checkbox,element.iD)},false);
            let parrafoNameTarea = document.createElement("label");
            parrafoNameTarea.className="txtEdit";
            parrafoNameTarea.textContent=element.nameTask;
// Creacion del div que contiene los BOTONES: Editar y Eliminar
            let divButton = document.createElement("div");
            divButton.className="div-btn-edit-delete";
            let buttonEdit = document.createElement("button");
            buttonEdit.textContent = "Edit";
            buttonEdit.className="btnEdit";
            buttonEdit.id="btnEdit"
            buttonEdit.addEventListener("click",(e) => {
                editarInput(e,element.iD)
            });
            let buttonDelete = document.createElement("button");
            buttonDelete.textContent = "Delete";
            buttonDelete.className="btnDelete";
            buttonDelete.addEventListener("click",(e) => {
                eliminarLocal(buttonDelete, element.iD);
            });
// Creacion del Inpus cuando esta checkeado y bloqueo del boton editar
            if(element.estado==="checked"){
                let textArea = document.createElement("textarea");
                textArea.className="textArea";
                let buttonText = document.createElement("button");
                buttonText.className="buttonText";
                buttonText.textContent="???";
                buttonText.addEventListener("click",(e)=>{
                    btnTextArea(e,element.iD);
            })
                divTarea.insertAdjacentElement("afterbegin",buttonText);
                divTarea.insertAdjacentElement("afterbegin",textArea);

                if(element.invalidarBtnEdit === "bloqueado"){
                    buttonEdit.setAttribute("disabled","");
                    textArea.setAttribute("disabled","");
                    textArea.setAttribute("placeholder",element.placeholder)
                }
            }
// Creacion de las insercion de los div a la seccion
            section.insertAdjacentElement("beforeend",divTarea);
// Creacion de las inserciones de elementos a los Div
            divTarea.insertAdjacentElement("afterbegin",parrafoNameTarea);
            divTarea.insertAdjacentElement("afterbegin",checkbox);
            divTarea.insertAdjacentElement("beforeend",divButton);
            divButton.insertAdjacentElement("beforeend",buttonEdit);
            divButton.insertAdjacentElement("beforeend",buttonDelete);
        });
    }
}

function allBtn(){
    validarTareasCheck = null;
    crearElemnts();
}

function activeBtn(){
    let arrayActive = arrayTareasLocal.filter(element => element.estado === "active");
    localStorage.setItem("Active Task",JSON.stringify(arrayActive));
    validarTareasCheck = false;
    crearElemnts();
}

function completedBtn(){
    let arrayCompleted = arrayTareasLocal.filter(element => element.estado === "checked");
    localStorage.setItem("Completed Task",JSON.stringify(arrayCompleted));
    validarTareasCheck = true;
    crearElemnts();
}

function validacionCheck(e,id){
    let check = e.checked;
    if(check){
        arrayTareasLocal.forEach( element => {
            if(element.iD === id){
                element.estado = "checked";
                localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
                if(validarTareasCheck === false){
                    window.onload = activeBtn(); // Vuelve y ejecuta la funcion indicada
                }
            }
        })
    }
    if(check === false){
        arrayTareasLocal.forEach( element => {
            if(element.iD === id){
                element.estado = "active";
                element.invalidarBtnEdit="funcional";
                localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
                if(validarTareasCheck === true){
                    window.onload = completedBtn(); // Vuelve y ejecuta la funcion indicada
                }
            }
        })
    }
    window.onload = crearElemnts();
}

function btnTextArea(e,id){
    let textArea = e.target.parentNode.childNodes[2];
    console.log(textArea.value);
    arrayTareasLocal.forEach(element => {
        if(element.iD === id){
            element.invalidarBtnEdit="bloqueado";
            element.placeholder=textArea.value;
            localStorage.setItem("Formulario Tarea",JSON.stringify(arrayTareasLocal));
        }
    })
    window.onload = crearElemnts();
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

    if(validarTareasCheck === false){
        window.onload = activeBtn(); // Vuelve y ejecuta la funcion indicada
    }
    else if(validarTareasCheck === true){
        window.onload = completedBtn(); // Vuelve y ejecuta la funcion indicada
    }
    else{
        window.onload = allBtn();
    }
}

function editarInput(e,id){ // Al hacer clip en editar, el valor del Span pasa al Input
    balidarBtnAdd = false;
    let accesoNameTarea = e.target.parentNode.parentNode.childNodes[1]; // llamar al elemento P del nombre tarea
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
    if(/^\S/.test(inpuEdit) && !/^[0-9]+$/.test(inpuEdit) && /^[ a-zA-Z????????????????????????]+$/.test(inpuEdit)){
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
    validarTareasCheck = null;
}

let formulario = document.getElementById("formTarea");
formulario.addEventListener("submit", onFunctions);
function onFunctions(e){
    e.preventDefault();
    if(balidarBtnAdd===true){
        envio(e);
    }
    else if(balidarBtnAdd===false){
        editarTareas(e);
    }
    else{
        envio(e);
    }
}

document.addEventListener('DOMContentLoaded',crearElemnts); // (DOMContentLoaded) cuando recargue el contenido del DOM vuelva e imprima