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

/*
 * Displays the cards on the page
 *   - shuffle the list of cards using the "shuffle" method 
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame() {
    cards=shuffle(Array.from(cards));
    deck.innerHTML= "";
    for (let i=0;i<cards.length;i++) {
    deck.appendChild(cards[i]);
    }
}