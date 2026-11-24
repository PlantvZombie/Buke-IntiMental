const knowledgeLabel = document.getElementById('knowledgeLabel');
const wordsLabel = document.getElementById('wordsLabel');
const bukeWords = document.getElementById('wordText');

const bukeImg = document.getElementById('bukeImg');

const logerBuke = document.getElementById('longer');

const thinker = new brain.recurrent.LSTM({hiddenLayers: [20]});

let knowledge = 0, words = 0, maxWords = 0, startingWords = 0;
let maxWordIncreaser = 0, logerCost = 1;
let text = [];

let startingDict = ['Once', 'There', 'The', 'A'];

const brainTrainRaw = [
    'Once upon a time there was a big tower.',
    'Everybody loved the big tower.',
    'They did happy dances and fun parties around the tower.',
    'And then they went to bed and had nice cool dreams!',
    'There was once a big bad guy.',
    'He tried to hurt the king but he used his daddy strength to win.',
    'The king is super strong.',
    'The long train went around town.',
    'A guy with a lady makes a couple.',
];

const brainTrain = brainTrainRaw.map(sentence => sentence.split(/(\W)/).filter(Boolean));

thinker.train(brainTrain, {
    iterations: 1000,
    errorThresh: 0.001
});

function writeText(brain, root, length)
{
    let words = root.split(" ");
    while (words.length < length)
    {
        const context = words.slice(-15);
        const nextChunk = brain.run(context);
        words.push(...(nextChunk.split(' ')));
        console.log(nextChunk);
        console.log(context);
        console.log(words);
    }
    return words;
}


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
    bukeWords.innerHTML = `${text.join(' ')}`;
    if (words < 1) {knowledge++; knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`; bukeImg.removeEventListener('click', reading); newBuke()}
}

function newBuke()
{
    maxWords = 100 + maxWordIncreaser;
    words = Math.round(Math.random() * maxWords) + 1;
    
    text = writeText(thinker, startingDict[Math.floor(Math.random() * startingDict.length)], words);
    words = text.length;
    startingWords = words;

    knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
    wordsLabel.innerHTML = `There are ${words} words left in this Buke.`;
    bukeWords.innerHTML = `${text.join(' ')}`;

    bukeImg.addEventListener('click', reading);
}

newBuke();