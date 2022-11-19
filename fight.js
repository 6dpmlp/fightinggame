'use strict';

//Getting the necessary HTML elements

const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const simulateBtn = document.getElementById('simulateBtn');
const player1Health = document.getElementById('player1-hp');
const player2Health = document.getElementById('player2-hp');
const result = document.getElementById('result');
const reset = document.getElementById('resetBtn');

//Creating the necessary classes

class Player{
  constructor(name, health, damageCaused){
    this.name = name;
    this.health = health;
    this.damage = damageCaused;
  }
  heal(){
    let healOneTime = Math.ceil(Math.random()*5);
    if (100 <= (this.health + healOneTime)){
      return this.health = 100;
    }
    if(100 > (this.health + healOneTime) && 0!== this.health){
     this.health += healOneTime;
     return this.health;
    }
    if(0 === this.health){
      return this.health;
    }
  }
  strike(){
    let force = Math.ceil(Math.random() * this.damage);
    return force;
  }
};

class Game {
  isOver = false;
  reset(p1, p2){
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    player1Health.innerText = p1.health;
    player2Health.innerText = p2.health;
  }
};

//Setting up the players

const fighter1Name = prompt('Enter the name of Player1');
const fighter2Name = prompt('Enter the name of Player2');
const randDamage = Math.ceil(Math.random() * 10);
let player1 = new Player(fighter1Name, 100, randDamage);
let player2 = new Player(fighter2Name, 100, randDamage);
let fight = new Game();

// Starting the game

function setUpGame(){
  player1Name.innerText = player1.name;
  player2Name.innerText = player2.name;

}

setUpGame();

addEventListener('keydown', (event) => {
  if (event.key == 'q'){
    player1Strike();
  }
  if (event.key == 'a'){
    player1Heal();
  }
  if (event.key == 'p'){
    player2Strike();
  }
  if (event.key == 'l'){
    player2Heal();
  }
})

reset.onclick = function() {
  fight.reset(player1, player2);
}

simulateBtn.onclick = function(){
  const array = ['a', 'q', 'p', 'l'];
  while(!fight.isOver){
    let randLetter = array[Math.floor(Math.random() * array.length)];
    if ('a' === randLetter){
      player1Heal();
    }
    if ('q' === randLetter){
    player1Strike();
    }   
    if ('p' === randLetter){
      player2Strike();
    }  
    if ('l' === randLetter){
      player2Heal();
    }
  } 
}

function player1Heal(){
  player1.heal();
  player1Health.innerText = player1.health;
  document.getElementById('p1heal').play();
}

function player1Strike(){
  const strike = player1.strike();
  console.log(strike);
  player2.health -= strike;
  document.getElementById('p1attack').play();
  if (0 >= player2.health - strike){
    fight.isOver = true;
    player2.health = 0;
    player2Health.innerText = player2.health;
    result.innerText = `${player1.name} has won the duel!`;
    document.getElementById('victoire').play();
  }
  player2Health.innerText = player2.health;
}

function player2Strike(){
  const strike = player2.strike();
  player1.health -= strike;
  document.getElementById('p2attack').play();
  if (0 >= player1.health - strike){
    fight.isOver = true;
    player1.health = 0;
    player1Health.innerText = player1.health;
    result.innerText = `${player2.name} has won the duel!`;
    document.getElementById('victoire').play();
  }
  player1Health.innerText = player1.health;
}

function player2Heal(){
  player2.heal();
  player2Health.innerText = player2.health;
  document.getElementById('p2heal').play();
}