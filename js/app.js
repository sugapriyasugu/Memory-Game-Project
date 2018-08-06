/*
 * list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');
let deck = document.querySelector('.deck');
let openCards = [];
const moves = document.querySelector('.moves');
// Initial star count is 3
let starsCount = 3;
startGame();
deck.addEventListener('click',displayCard);
document.querySelector('.restart').addEventListener('click',restartGame);
