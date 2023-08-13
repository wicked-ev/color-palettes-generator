let CardsIDlist = [];
let Reloadbuttonlist = [];
let lockButtonlist = [];
let HEXCODESlist = [];
let favoriteColorslist = [];
console.log("hello world")
window.addEventListener("DOMContentLoaded", () =>{
    console.log("DOMContentLoaded")
    const Cards = document.querySelectorAll('.cards');
    Cards.forEach((Cards) =>
    {
        console.log('are we here ? ')
        CardsIDlist.push(Cards.id);
        tmpchildlist = document.getElementById(Cards.id).children
        for (child of tmpchildlist){
            if(child.id[0] == 'R'){
                Reloadbuttonlist.push(child.id);
            }   
            else if (child.id[0] == 'L' ){
                lockButtonlist.push(child.id);
            }
            else if(child.id[0] == 'H'){
                HEXCODESlist.push(child.id);
            }
        }
    })
    console.log(Reloadbuttonlist);
    reloadEventsHandler(Reloadbuttonlist);
    favoriteEventsHandler();

});

function favoriteEventsHandler() {
    let likebuttonlist = document.getElementById("heart")
    likebuttonlist.addEventListener("click", () => {
        favoriteColorslist.push(GetinhtmlHexCode());
        console.log(favoriteColorslist);
        
    })
}

function CreateNewFav(){
    let newFav = document.createElement("div");
    newFav.id = ''
}

function GetinhtmlHexCode(){
    list = [];
    for(Code of HEXCODESlist){
        list.push(document.getElementById(Code).innerHTML)
    }
    return list
}

function reloadEventsHandler(buttonlist){ 
    for(button of buttonlist){
        let reloadB = document.getElementById(button).parentElement;
        let buttonState = true;
        reloadB.children[1].addEventListener('click',() => {
            console.log('chilcked');
            buttonState = !buttonState;
            if(buttonState){
                reloadB.children[1].src="asset\\img\\padlock-unlock.png";
            }
            else{
                reloadB.children[1].src="asset\\img\\padlock.png";
            }
        })  
        reloadB.children[0].addEventListener('click', () => {
            if(buttonState){
                reloadB.style.background = RandomHexColor();
                reloadB.children[2].innerHTML = RandomHexColor();
            }
        })
    }
}
// document.getElementById(button).addEventListener('click',() =>{
//     console.log('C'+ button[1]);
//     document.getElementById('C'+button[1]).style.background = RandomHexColor();
// })

function RandomHexColor(){
    Rcolor = Math.floor(Math.random() * 16777215 +1);
    RHcolor = Rcolor.toString(16); 
    return "#"+RHcolor
}