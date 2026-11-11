const knowledgeLabel = document.getElementById('knowledgeLabel');
const wordsLabel = document.getElementById('wordsLabel');

const bukeImg = document.getElementById('bukeImg');

let knowledge = 0, words = 0, maxWords = 0;

function reading() 
{
    words -= 1;
    wordsLabel.textContent = `There are ${words} words left in this Buke.`;
    if (words < 1) {knowledge++; knowledgeLabel.textContent = `You have ${knowledge} knowledge!`; bukeImg.removeEventListener('click', reading); newBuke()}
}

function newBuke()
{
    maxWords = (Math.random() * 100);
    words = Math.floor(Math.random() * maxWords) + 1;

    knowledgeLabel.textContent = `You have ${knowledge} knowledge!`;
    wordsLabel.textContent = `There are ${words} words left in this Buke.`;

    bukeImg.addEventListener('click', reading);
}

newBuke();