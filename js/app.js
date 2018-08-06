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

// Shuffle function
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let randomIndexes=[];
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//This function opens the card that user clicks
function displayCard(e) {
    const target = e.target;
    const targetClasses = target.classList;
    if(targetClasses.contains('card') && !targetClasses.contains('open')) {
        targetClasses.add('open','show');
        addToListOfCards(target);
    }
}

//This function maintains a list of open cards and checks whether correct guess or incorrect guess
function addToListOfCards(card) {
    openCards.push(card);
    let match = false;
    if(openCards.length%2===0) {
        let matchedCard = null;
        for(let i=0;i<openCards.length-1;i++) {
            if(openCards[i].isEqualNode(card)) {
                match = true;
                matchedCard = openCards[i];
                break;
            }
        }
        if(match===true) {
            correctGuess(card,matchedCard,openCards);
        }
        else {
            incorrectGuess(openCards);
        }
        incrementMoves();
    }
}

// correctGuess function takes 2 matched cards and keeps it open. Also, it checks whether the last pair of card matches
function correctGuess(card1,card2,openCards) {
    const card1ClassList = card1.classList;
    const card2ClassList = card2.classList;
    card1ClassList.add('match');
    card2ClassList.add('match');  
    //if the last card matches, then the games ends and modal box is popped to show the results  
    if(openCards.length == 16) {
        setTimeout(function() {
            stopTimer();
            const result = document.querySelector('.results');
            result.innerHTML = `You have completed the game in <strong>${minutes} mins ${seconds-1} secs</strong> with <strong>${moves.textContent} moves</strong>`;
            const rating = document.querySelector('.rating');
            let overallRating='';
            for(let i=0;i<starsCount;i++) {
                overallRating+='<i class="fa fa-star"></i>';
            }
            rating.innerHTML = 'Rating : '+overallRating;
            toggleModal();
        }, 1000);
    }
}

// This function removes the unmatched cards from the list of open cards
function incorrectGuess(openCards) {
    const card1 = openCards.pop();
    const card2 = openCards.pop();
    (card1.classList).remove('open');
    (card1.classList).add('mismatch');
    (card2.classList).add('mismatch');
    setTimeout(function() {
        (card1.classList).remove('show','mismatch');
        (card2.classList).remove('show','mismatch','open');
    }, 500);
}

//This function keeps track of the number of moves user has made. Also, it displays the star rating based on number of moves user has made
function incrementMoves() {
    moves.textContent = Number(moves.textContent)+1;
    if(Number(moves.textContent)===1) {
        startTimer();
    }
    const moveCount = Number(moves.textContent);
    const stars = document.querySelectorAll('.fa-star');
    //rates the game based on total number of moves
    if(moveCount>10 && moveCount<=20) {
        stars[2].style.display='none';
        starsCount = 2;
    }
    else if(moveCount>20) {
        stars[1].style.display='none';
        starsCount = 1;
    }
}

//This function resets the game board
function resetGameBoard() {
    for (const openCard of openCards) {
        (openCard.classList).remove('open','show','match');
    }
    openCards = [];
    moves.textContent=0;
    resetTimer();
}