const knowledgeLabel = document.getElementById('knowledgeLabel');
const mentalLabel = document.getElementById('mentalCounter');
const wordsLabel = document.getElementById('wordsLabel');
const bukeWords = document.getElementById('wordText');

const bukeImg = document.getElementById('bukeImg');
const skimmingButton = document.getElementById('skimming'); // the whole button + text

const logerBuke = document.getElementById('longer');
const skimming = document.getElementById('skimmer'); // just the button

let knowledge = 0, mental = 0, words = 0, maxWords = 0, startingWords = 0;
let maxWordIncreaser = 0, logerCost = 1;
let wordsRead = 1;
let text = [];

const brainTrainRaw = [
    'Once upon a time, there was a big tower.',
    'Everybody loved the big tower.',
    'They did happy dances and had fun parties around the tower.',
    'And then they went to bed and had nice cool dreams!',
    'There was once a big bad guy.',
    'He tried to hurt the king but he used his great strength to win.',
    'The king is super strong.',
    'The long train went around town.',
    'A guy with a lady can be a couple.',
    'My mommy and daddy pay for my lunch.',
    'Periods go anywhere I want them to.',
    'Little red riding hood is my favorite book.',
    'Dear diary, hello!',
    'I like to listen to the birds when they go chirp tweet.',
    'I peed my pants. It hurt.',
    'I can’t think?',
    'One who thinks all the time has nothing to think about but thoughts.',
    'The biggest number I know is five billion!',
    'I can count to four.',
    'I am but a leaf, captured in the ever-shifting crossroads of ambivalent wind, drifting across plains of gold and sullen, dry fields.',
    'The quick red fox was browned by the bear.',
    'I am seven years old.',
    'My mommy takes me into the women’s bathroom when I have to pee.',
    'Sonion.',
    'Once my poop was red and it scared me.',
    'The bear had lots of hair.',
    'Who do I pick? Man or bear?',
    'I think my name is thinker.',
    'My sandwich is stinky.',
    'The cat sat on a mat.',
    'There were too many people in my house.',
    'There can’t be three!',
    'The orange juice is yummy.',
    'Dear mommy and daddy, I love you.',
    'They asked if I was seven, but I said I am four! I am very smart.',
    'Their last hope is dead.',
];

const startingDict = ['Once', 'There', 'The', 'A', 'I','My', 'Everybody', 'They', 'And', 'He', 'Periods', 'Little', 'Dear', 'One', 'Sonion', 'Who', 'Man', 'It', 'Their'];

//let startingDict2 = []; this can come back at a later date

//for (let i = 0; i < brainTrainRaw.length; i++)
//{
   // startingDict2.push(brainTrainRaw[i].split(/\s+|([^\w\s'’-])/).filter(Boolean).slice(0, 2).join(' '));
   // console.log(startingDict2);
//}

class MarkovGenerator
{
    constructor(context){
        this.context = context;
        this.chain = {};
    }

    train(data)
    {
        const brainTrain = data.join(' ').trim().split(/\s+|([^\w\s'’-])/).filter(Boolean);
        console.log(brainTrain);
        for (let i = 0; i < (brainTrain.length - this.context); i++)
        {
            const section = brainTrain.slice(i, i + this.context).join(' ');
            const nextWord = brainTrain[i + this.context];
            if (!this.chain[section])
            {
                this.chain[section] = [];
            }
            this.chain[section].push(nextWord);
        }
    }

    writeText(root, length)
    {
        let words = root.trim().split(/\s+/);
        while (words.length < length)
        {
            const context = words.slice(-this.context).join(' ');
            const possibilities = this.chain[context];
            if (!possibilities || possibilities.length === 0)
            {
                words.push(startingDict[Math.floor(Math.random() * startingDict.length)]);
                console.log(possibilities);
                console.log(context);
                console.log(words);
                continue;
            }
            words.push(possibilities[Math.floor(Math.random() * possibilities.length)]);
            console.log(possibilities);
            console.log(context);
            console.log(words);
        }
    while (words[words.length-1] != '.' && words[words.length-1] != '!' && words[words.length-1] != '?')
        {
            const context = words.slice(-this.context).join(' ');
            const possibilities = this.chain[context];
            if (!possibilities || possibilities.length === 0)
            {
                words.push(startingDict[Math.floor(Math.random() * startingDict.length)]);
                console.log(possibilities);
                console.log(context);
                console.log(words);
                continue;
            }
            words.push(possibilities[Math.floor(Math.random() * possibilities.length)]);
            console.log(possibilities);
            console.log(context);
            console.log(words);
        }
        for (let i = 0; i < words.length; i++)
        {
            if (words[i] == '.' || words[i] == ',' || words[i] == '!' || words[i] == '?')
            {
                words[i-1] += words[i];
                words.splice(i, 1);
            }
        }
        return words;
    }
}

const thinker = new MarkovGenerator(1);
thinker.train(brainTrainRaw);

logerBuke.addEventListener('click', () => {
    if (!(knowledge < logerCost))
    {
        knowledge = parseFloat((knowledge - logerCost).toFixed(3));
        maxWordIncreaser += 50;
        logerCost = parseFloat((logerCost * 1.5).toFixed(3));
        logerBuke.innerHTML = `${logerCost} Knowledge!`;
        knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
    }
})

skimmingButton.addEventListener('10iq', () => {
    skimmingButton.style.visibility = 'visible';
    skimming.addEventListener('click', () => {
        if (!(knowledge < 15))
        {
            wordsRead++;
            knowledge = parseFloat((knowledge - 15).toFixed(3));
            knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
            skimmingButton.remove();
        }
    })
})

function reading() 
{
    for (i = 0; i < wordsRead; i++)
    {
        text[startingWords-words] = `<span style = "color: #b9b285ff;">${text[startingWords-words]}</span>`;
        words -= 1;
    }
    wordsLabel.innerHTML = `There are ${words} words left in this Buke.`;
    bukeWords.innerHTML = `${text.join(' ')}`;
    if (words < 1) {knowledge = parseFloat((knowledge + ((startingWords/100) * (1 + (mental/10)))).toFixed(3)); knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`; mental += 1; mentalLabel.innerHTML = `${mental} IQ`; mentalLabel.title = `Your knowledge gain is being multiplied by ${1+mental/10}`; bukeImg.removeEventListener('click', reading); newBuke();}
}

function newBuke()
{
    if (mental == 10) 
    {
        skimmingButton.dispatchEvent(new Event('10iq'));
    }
    maxWords = 100 + maxWordIncreaser;
    words = Math.round(Math.random() * maxWords) + 1;
    
    text = thinker.writeText(startingDict[Math.floor(Math.random() * startingDict.length)], words);
    words = text.length;
    startingWords = words;

    knowledgeLabel.innerHTML = `You have ${knowledge} knowledge!`;
    wordsLabel.innerHTML = `There are ${words} words left in this Buke.`;
    bukeWords.innerHTML = `${text.join(' ')}`;

    bukeImg.addEventListener('click', reading);
}

newBuke();