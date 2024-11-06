let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
  switch(e.keyCode){
    case 38:
      keyboard.UP = true;
      console.log(e);
      break;
    case 40:
      keyboard.DOWN = true;
      console.log(e);
      break;
    case 39:
      keyboard.RIGHT = true;
      console.log(e);
      break;
    case 37:
      keyboard.LEFT = true;
      console.log(e);
      break;
    case 32:
      keyboard.SPACE = true;
      console.log(e);
      break;
    default:
      keyboard.DOWN = false;
      keyboard.LEFT = false;
      keyboard.UP = false;
      keyboard.RIGHT = false;
      keyboard.SPACE = false;
  }
});

window.addEventListener('keyup', (e) => {
  switch(e.keyCode){
    case 38:
      keyboard.UP = false;
      console.log(e);
      break;
    case 40:
      keyboard.DOWN = false;
      console.log(e);
      break;
    case 39:
      keyboard.RIGHT = false;
      console.log(e);
      break;
    case 37:
      keyboard.LEFT = false;
      console.log(e);
      break;
    case 32:
      keyboard.SPACE = false;
      console.log(e);
      break;
    default:
      keyboard.DOWN = false;
      keyboard.LEFT = false;
      keyboard.UP = false;
      keyboard.RIGHT = false;
      keyboard.SPACE = false;
  }
});