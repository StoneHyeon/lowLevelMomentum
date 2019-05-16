const formContainer = document.querySelector(".js-form"),
    formInput = formContainer.querySelector("input"),
    gretting = document.querySelector(".js-gretting");
const USER="currentUser",
    SHOWING="showing";

function saveName(text){
    localStorage.setItem(USER,text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=formInput.value;
    paintGretting(currentValue);
    saveName(currentValue);
}

function askForName(){
    formContainer.classList.add(SHOWING);
    formContainer.addEventListener('submit',handleSubmit);
}

function paintGretting(text){
    formContainer.classList.remove(SHOWING);
    gretting.classList.add(SHOWING);
    gretting.innerText=`Hello ${text}`;
}


function loadName(){
    const currentUser = localStorage.getItem(USER);
    if(currentUser === null){
        askForName();
    }else{
        paintGretting(currentUser);
    }
}


function init(){
    loadName();
}
init();
