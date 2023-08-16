let CardsIDlist = [];
let Reloadbuttonlist = [];
let lockButtonlist = [];
let HEXCODESlist = [];
let favoriteColorslist = [];
window.addEventListener("DOMContentLoaded", () => {
  const Cards = document.querySelectorAll(".cards");
  Cards.forEach((Cards) => {
    CardsIDlist.push(Cards.id);
    let tmpchildlist = document.getElementById(Cards.id).children;
    for (child of tmpchildlist) {
      if (child.id[0] == "R") {
        Reloadbuttonlist.push(child.id);
      } else if (child.id[0] == "L") {
        lockButtonlist.push(child.id);
      } else if (child.id[0] == "H") {
        HEXCODESlist.push(child.id);
      }
    }
  });

  RandomColors();
  RandomEventButton();
  ExportPngEvent();
  reloadEventsHandler(Reloadbuttonlist);
  favoriteEventsHandler();
});


function favoriteEventsHandler() {
  let likebuttonlist = document.getElementById("heart");
  likebuttonlist.addEventListener("click", () => {
    favoriteColorslist.push(GetinhtmlHexCode());
    console.log(favoriteColorslist);
    CreateNewFav(favoriteColorslist.length - 1);
    likebuttonlist.src = "./asset/img/liked.png";
  });
}


function CreateNewFav(id) {
  let Favlist = document.getElementById("favlist");
  let newFav = document.createElement("div");
  newFav.id = "fav" + id.toString();
  newFav.classList.add("favpalette");
  let cards = document.querySelectorAll(".cards");
  let listofcolors = getallcolorHexCode(cards);
  for (let i = 0; i < listofcolors.length; i++) {
    let color = document.createElement("div");
    color.id = "color" + i.toString();
    color.classList.add("color");
    color.style.background = listofcolors[i];
    newFav.appendChild(color);
  }
  let deletbutton = document.createElement("button");
  deletbutton.id = "bdelete" + id.toString();
  deletbutton.classList.add("delete");
  deletbutton.addEventListener("click", () => {
    Favlist.removeChild(newFav);
  });
  let deleteIcon = document.createElement("img");
  deleteIcon.classList.add("dicon");
  deleteIcon.src = "/asset/img/delete.png";
  deletbutton.appendChild(deleteIcon);
  newFav.appendChild(deletbutton);
  Favlist.appendChild(newFav);
  newFav.addEventListener("click", () => {
    let list = getallcolorHexCode(newFav.childNodes);
    console.log(list);
    setallcolors(list);
  });
}


function setallcolors(list) {
  let cards = document.querySelectorAll(".cards");
  for (let i = 0; i < list.length; i++) {
    cards[i].style.backgroundColor = list[i];
  }
}


function GetinhtmlHexCode() {
  list = [];
  for (Code of HEXCODESlist) {
    list.push(document.getElementById(Code).innerHTML);
  }
  return list;
}


function rgbToHex(rgb) {
  const components = rgb.match(/\d+/g); // Extract RGB components
  const hex = components.map((component) => {
    const hexValue = parseInt(component).toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });
  return "#" + hex.join("");
}


function getallcolorHexCode(query) {
  let list = [];
  // let cards = document.querySelectorAll('.cards');
  query.forEach((query) => {
    let style = window.getComputedStyle(query);
    let bgcolor = style.backgroundColor;
    if (bgcolor.includes("rgba")) {
      list.push(rgbTohex(bgcolor));
    } else {
      list.push(bgcolor);
    }
  });
  return list;
}


function RandomColors() {
  let cards = document.querySelectorAll(".cards");
  cards.forEach((cards) => {
    let color = RandomHexColor();
    cards.style.backgroundColor = color;
    cards.children[2].innerHTML = color;
  });
}


function reloadEventsHandler(buttonlist) {
  for (button of buttonlist) {
    let reloadB = document.getElementById(button).parentElement;
    let buttonState = true;
    reloadB.children[1].addEventListener("click", () => {
      console.log("chilcked");
      buttonState = !buttonState;
      if (buttonState) {
        reloadB.children[1].src = "asset\\img\\padlock-unlock.png";
      } else {
        reloadB.children[1].src = "asset\\img\\padlock.png";
      }
    });
    reloadB.children[0].addEventListener("click", () => {
      if (buttonState) {
        let color = RandomHexColor();
        reloadB.style.background = color;
        reloadB.children[2].innerHTML = color;
      }
    });
  }
}


function RandomHexColor() {
  Rcolor = Math.floor(Math.random() * 16777215 + 1);
  RHcolor = Rcolor.toString(16);
  return "#" + RHcolor;
}


function ExportPngEvent() {
  let button = document.getElementById("Ebutton");
  button.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    let list = getallcolorHexCode(document.querySelectorAll(".cards"));
    let postion = 0;
    for (let i = 0; i < list.length; i++) {
      let tmpc = canvas.getContext("2d");
      tmpc.fillStyle = list[i];
      tmpc.fillRect(postion, 50, 50, 50);
      postion += 50;
    }
    let img = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = img;
    link.download = "color palette";
    link.click();
  });
}


function RandomEventButton() {
  document.getElementById("Rbutton").addEventListener("click", () => {
    RandomColors();
  });
}
