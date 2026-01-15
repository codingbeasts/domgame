//function to change dice image and set property
export function changeDice(diceVal: number) { 
  //created a function to autoload dice image using diceval parameter and also update the style.
  var imgDice = document.querySelector(".dice") as HTMLImageElement;
  imgDice.style.display = "block";
  imgDice.src = require("../images/dice-" + diceVal + ".png");
}
