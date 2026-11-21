const knowledgeLabel = document.getElementById('knowledgeLabel');
const wordsLabel = document.getElementById('wordsLabel');
const bukeWords = document.getElementById('wordText');

const bukeImg = document.getElementById('bukeImg');

const logerBuke = document.getElementById('longer');

let knowledge = 0, words = 0, maxWords = 0, startingWords = 0;
let maxWordIncreaser = 0, logerCost = 1;
let text = [];

logerBuke.addEventListener('click', () => {
    if (!(knowledge < logerCost))
    {
        knowledge -= logerCost;
        maxWordIncreaser += 50;
        logerCost = Math.round(logerCost * 1.5);
        logerBuke.innerHTML = `${logerCost} Knowledge!`;
        knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
    }
})

function reading() 
{
    text[startingWords-words] = `<span style = "color: #b9b285ff;">${text[startingWords-words]}</span>`;
    words -= 1;
    wordsLabel.innerHTML = `There are ${words} words left in this Buke.`;
    bukeWords.innerHTML = `${text.join(' ')}`
    if (words < 1) {knowledge++; knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`; bukeImg.removeEventListener('click', reading); newBuke()}
}

function newBuke()
{
    maxWords = 150 + maxWordIncreaser;
    words = Math.round(Math.random() * maxWords) + 1;
    startingWords = words;
    text = [];

    for (i = 0; i < words ; i++)
    {
        text.push('word');
    }

    knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
    wordsLabel.innerHTML = `There are ${words} words left in this Buke.`;
    bukeWords.innerHTML = `${text.join(' ')}`

    bukeImg.addEventListener('click', reading);
}

newBuke();