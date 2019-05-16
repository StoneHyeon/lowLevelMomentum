const clockContainer = document.querySelector(".js-clock"),
    clockTitle = document.querySelector(".js-title");

function smallTen(time){
    if(time>9){
        return `${time}`;
    }
    else{
        return `0${time}`;
    }
}

function getTime(){
    const date = new Date();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const second = date.getSeconds();

    clockTitle.innerText=`${smallTen(hour)}:${smallTen(minute)}:`
    +`${smallTen(second)}`;
}

function init() {
    getTime();
    setInterval(getTime,1000);
}

init();