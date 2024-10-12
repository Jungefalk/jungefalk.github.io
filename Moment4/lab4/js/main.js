"use strict";

//Variabler
let newToDoEl = document.getElementById("newtodo");
let newToDoButtonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message")
let toDoListEl = document.getElementById("todolist");
let clearButtonEl = document.getElementById("clearbutton");

//Händelsehanterare
window.addEventListener("load", init, false);
newToDoEl.addEventListener("keyup", checkItemText, false);
newToDoButtonEl.addEventListener("click", addItem, false);
toDoListEl.addEventListener("click", deleteItem, false);
clearButtonEl.addEventListener("click", clearStorage, false);

//Funktion för inladdning av sida
function init(){
    //  inaktivera "Lägg till"-knappen
newToDoButtonEl.disabled = true;
    //anropar funktion som laddar in lista
    loadStorage();
}

//Funktion som kontrollerar längd på inmatad text
function checkItemText(){

let newToDo = newToDoEl.value;

if(newToDo.length <= 4){
    messageEl.innerHTML = "Ange minst fem tecken.";
    newToDoButtonEl.disabled = true;   
}else{
    newToDoButtonEl.disabled = false;
    messageEl.innerHTML = "";
}
}

//Funtion som lägger till i listan
function addItem(){

    let newToDo = newToDoEl.value;

    //skapa nytt element till todolist med DOM-manipulering
    let newEl = document.createElement("article");
    let newToDoText = document.createTextNode(newToDo);
    newEl.appendChild(newToDoText);

    //Lägger till nytt element i <section>
    toDoListEl.appendChild(newEl);

    //tömmer inputfält
    newToDoEl.value = "";
    //inaktiverar lägg till-knappen
    newToDoButtonEl.disabled = true;

    //anropar funktion som lagrar inmatad text
    storeItem();  
}

//Funktion som lagrar inmatad text
function storeItem(){

    //Läs in todo-lista
let todos = document.getElementsByTagName("article");

//skapa temporär array
let tempArr = [];

//Loopa listan och lagra till temprär array
for(let i = 0; i < todos.length; i++){
    tempArr.push(todos[i].innerHTML);
}
// Konvertera array till JSON-sträng
let jsonStr = JSON.stringify(tempArr);
localStorage.setItem("todos", jsonStr);

console.log(tempArr);

}

//Funktion som läser in listan
function loadStorage(){

//konvertera JSON till array
let todos = JSON.parse(localStorage.getItem("todos"));

//loopa igenom arrayen
for( let i=0; i<todos.length; i++){

    //skapa nytt element med DOM-manipulering
    let newEl = document.createElement("article");
    let newToDoText = document.createTextNode(todos[i]);
    newEl.appendChild(newToDoText);

    //Lägger till i listan
    toDoListEl.appendChild(newEl);
}
}

//Funktion som raderar från listan
function deleteItem(){

//klickhanterare
toDoListEl.addEventListener("click", function(e){
    e.target.remove();

    //Lagra listan på nytt
    storeItem();
} );
}

//Funktion som rensar lagrad data
function clearStorage(){

    //Tömmer listan
    toDoListEl.innerHTML="";

    //Lagrar listan på nytt
storeItem();
}