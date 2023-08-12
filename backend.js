let CardsIDlist = []
let Reloadbuttonlist = []
let lockButtonlist = []
let HEXCODESlist = []
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
    reloadEventsHandler(Reloadbuttonlist);

});

function reloadEventsHandler(buttonlist){
    for(button of buttonlist){
        console.log("heloo")
        document.getElementById(button).addEventListener('click',() =>{
            Rcolor = Math.floor(Math.random() * 16777215 +1);
            console.log(Rcolor)
            RHcolor = Rcolor.toString(16) 
            console.log(RHcolor)
            document.getElementById('C'+button[1]).style.background = '#'+RHcolor;
        })
    }
}