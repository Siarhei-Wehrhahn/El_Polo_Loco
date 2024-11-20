let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  world.level.createMoreChicken();
  

  document.getElementById('square').addEventListener('click', () => {
    world.checkThrowObjects();
    console.log("D");
  });
}

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38:
      keyboard.UP = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 39:
      keyboard.RIGHT = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 32:
      keyboard.SPACE = true;
      break;
    case 68:
      keyboard.D = true;
      break;
    default:
      keyboard.DOWN = false;
      keyboard.LEFT = false;
      keyboard.UP = false;
      keyboard.RIGHT = false;
      keyboard.SPACE = false;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 38:
      keyboard.UP = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 39:
      keyboard.RIGHT = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 68:
      keyboard.D = false;
      break;
    default:
      keyboard.DOWN = false;
      keyboard.LEFT = false;
      keyboard.UP = false;
      keyboard.RIGHT = false;
      keyboard.SPACE = false;
  }
});
;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rotateLeft').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
  });

  document.getElementById('rotateRight').addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
  });

  document.getElementById('cross').addEventListener('touchstart', () => {
    keyboard.UP = true;
  });

  document.getElementById('rotateLeft').addEventListener('touchend', () => {
    keyboard.LEFT = false;
  });

  document.getElementById('rotateRight').addEventListener('touchend', () => {
    keyboard.RIGHT = false;
  });

  document.getElementById('cross').addEventListener('touchend', () => {
    keyboard.UP = false;
  });

  document.getElementById('square').addEventListener('touchstart', () => {
    keyboard.D = true;
  });

  document.getElementById('square').addEventListener('touchend', () => {
    keyboard.D = false;
  });
});