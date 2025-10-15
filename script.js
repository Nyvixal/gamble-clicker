// Variables
const clicker = document.getElementById("clicker");
const punkteLabel = document.getElementById("number");

const multiPurchase = document.getElementById("multiPurchase");
const multiLabel = document.getElementById("multi");

const gambleShow = document.getElementById("gambleShow");
const gambleDiv = document.getElementById("gambleDiv");
const gambleInput = document.getElementById("gambleInput");
const gambleButton = document.getElementById("gambleButton");
const gambleLabel = document.getElementById("gambleResult");
const gambleMax = document.getElementById("gambleMax");

let punkte = 0;
let multi = 1;
let multiCost = 50;
let gamblingUnlocked = false;
let gambleResult;

// Event listeners
clicker.addEventListener("click", onClickerPress);
multiPurchase.addEventListener("click", onMultiPress);
gambleShow.addEventListener("click", onGambleShowPress);
gambleButton.addEventListener("click", onGamblePress);
gambleInput.addEventListener("input", onGambleInput);
gambleMax.addEventListener("click", onGambleMaxPress);

// Interaction functions
function onClickerPress() {
   punkte += 1 * multi;
   updatePunkteLabel();
   if (!gamblingUnlocked && punkte >= 100) {
      gambleShow.style.display = "block";
   }
}

function onMultiPress() {
   if (punkte >= multiCost) {
      punkte -= multiCost;
      multi++;
      multiCost = Math.round((multiCost * 1.05) + (10 * multi / 3));
      updatePunkteLabel();
      updateMultiLabel();
      updateMultiButton();
   }
}

function onGambleShowPress() {
   if (punkte >= 500) {
      punkte -= 500;
      gambleShow.style.display = "none";
      gambleDiv.style.display = "block";
      gamblingUnlocked = true;
      updatePunkteLabel();
   }
}

function onGamblePress() {
   if (gambleInput.value >= 50 && punkte > 50) {
      let gambleValue = gambleInput.value;
      punkte -= gambleValue;
      let luck = Math.floor(Math.random() * 1000);
      if (luck < 11) {
         punkte += gambleValue * 15;
         gambleResult = "With a 1% chance, you got the 15x jackpot!";
      }
      else if (luck < 1) {
         punkte += gambleValue * 250;
         gambleResult = "With a 0.1% chance, you got the 250x super jackpot!";
      }
      else {
         let gambleMulti = (Math.floor(Math.random() * 15) + 5) / 10;
         punkte += Math.round(gambleValue * gambleMulti);
         gambleResult = "Your gamble was multiplied by " + gambleMulti.toFixed(1) + " and returned " + Math.round(gambleValue * gambleMulti) + " Punkte. ";
         gambleResult += (gambleMulti <= 1) ? " Bummer! Maybe try again?" : " Nice!";
      }
      if (gambleInput.value > punkte) {
         gambleInput.value = punkte;
      }
   }
   else {
      gambleResult = "You need at least 50 punkte to play!";
   }
   updateGambleLabel();
   updatePunkteLabel();
}

function onGambleInput() {
   gambleInput.value = gambleInput.value.replace(/[^0-9]/g, "");
   if (gambleInput.value > punkte) {
      gambleInput.value = punkte;
   }
}

function onGambleMaxPress() {
   gambleInput.value = punkte;
}

// Functions for updating crap
function updatePunkteLabel() {
   punkteLabel.textContent = punkte;
}

function updateMultiLabel() {
   multiLabel.textContent = "Multi: " + (multi - 1);
}

function updateMultiButton() {
   multiPurchase.textContent = "Buy Multiplier: " + multiCost + " Punkte";
}

function updateGambleLabel() {
   gambleLabel.textContent = gambleResult;
}
