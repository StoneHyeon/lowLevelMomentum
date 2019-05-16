const form = document.querySelector(".js-form-todo"),
    input = form.querySelector("input"),
    list = document.querySelector(".js-list-todo");

    //LS는 로컬 스트리지임.
const TODOS_LS = "toDos";
let toDos=[];



function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText="✖️";
    deleteBtn.addEventListener('click',removeDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id=newId;
    list.appendChild(li);
    const toDoObj ={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function removeDo(event){
    const btn = event.target;
    const paNode = btn.parentNode;
    list.removeChild(paNode);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(paNode.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function handleSubmite(event){
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value="";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parseToDos = JSON.parse(loadedToDos);
        parseToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    form.addEventListener('submit',handleSubmite);
}
init();
