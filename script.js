const RANDOM_QUOTE_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if (char === null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            correct = false;
        }
    })
    if(correct) getRandomQuote();
});

async function getRandomQuote(){
    try{
        const response = await fetch(RANDOM_QUOTE_URL);
        const data = await response.json();
        console.log(data.content);
        return data.content;
    }
    catch(error){
        console.error(error);
        throw error; 
    }
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';

    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan);
    });
    // Ensure that there is at least one non-space character to prevent issues with spaces
    const nonSpaceChar = quote.replace(/\s/g, '');
    // If there is a non-space character, set the input value to an empty string
    // Otherwise, set it to a space
    quoteInputElement.value = nonSpaceChar ? '' : ' ';
    startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
// Initial quote rendering
renderNewQuote();