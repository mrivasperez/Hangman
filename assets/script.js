// ---DOM ELEMENTS---
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// WORD ARRAY (FIND AN API THAT PRODUCES RANDOM WORDS?)
const words = ['javascript', 'application', 'hangman', 'practice', 'array', 'eloquent', 'programming', 'interface', 'lovelace'];
// GET RANDOM WORD
let randomWord = words[Math.floor(Math.random() * words.length)]

// ARRYS TO STORE CORRECT AND WRONG LETTERS
const correctLetters = [];
const wrongLetters = [];

// SHOW HIDDEN WORD
function displayWord(){
    wordEl.innerHTML = `
        ${randomWord
            .split('')
            //for each letter in array create span with class of letter
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')
        }
    `;
    // regex to remove new line characters with empty
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // check if inner word is equal to selected word
    if(innerWord === randomWord){
        finalMessage.innerText = 'Congratulations! You won.';
        popup.style.display = 'flex';
    }
}

// UPDATE WRONG LETTERS FUNCTION
function updateWrongLettersEL() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display='block';
        } else {
            part.style.display = 'none';
        }
    });  
    // Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You lost. Better luck next time!';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(randomWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEL();
            } else {
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', (e) => {
    /* THE LAZY WAY:
    * location.reload();
    * return false;
    * 
    * THE RIGHT WAY: */
    // empty arrays    
    correctLetters.splice(0);
    wrongLetters.splice(0);
    // get a new random word
    randomWord = words[Math.floor(Math.random() * words.length)];
    // update dom w/ new word
    displayWord();
    // update dom with wrong letters
    updateWrongLettersEL();
    //get rid of popup
    popup.style.display = 'none';
})

displayWord();