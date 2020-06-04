const cards = document.querySelector('.cards');
const result = document.querySelector('#result');

const CARDS_COUNT = 12;

const items = [
  {
    src: 'images/alcohol.png',
    id: 'alcohol'
  },
  {
    src: 'images/apple.png',
    id: 'apple'
  },
  {
    src: 'images/fast-food.png',
    id: 'fast-food'
  },
  {
    src: 'images/kitchen.png',
    id: 'kitchen'
  },
  {
    src: 'images/sandwich.png',
    id: 'sandwich'
  },
  {
    src: 'images/vegetable.png',
    id: 'vegetable'
  },
  {
    src: 'images/alcohol.png',
    id: 'alcohol'
  },
  {
    src: 'images/apple.png',
    id: 'apple'
  },
  {
    src: 'images/fast-food.png',
    id: 'fast-food'
  },
  {
    src: 'images/kitchen.png',
    id: 'kitchen'
  },
  {
    src: 'images/sandwich.png',
    id: 'sandwich'
  },
  {
    src: 'images/vegetable.png',
    id: 'vegetable'
  }
];

items.sort(() => 0.5 - Math.random());

let currentCards = [];
let currentCardsID = [];
let openedCount = 0;

createCanvas();

function createCanvas() {
  for (let i = 0; i < CARDS_COUNT; i++) {
    const imgEle = document.createElement('img');

    imgEle.setAttribute('class', 'card unsolved');
    imgEle.setAttribute('data-src', items[i].src);
    imgEle.setAttribute('data-id', items[i].id);

    const image = new Image();
    image.src = items[i].src;

    // imgEle.image = image;

    imgEle.addEventListener('click', revealCard);
    cards.appendChild(imgEle);
  }
}

function revealCard() {
  if (!this.classList.contains('unsolved')) {
    return;
  }

  console.log(this.image);
  openedCount++;
  result.textContent = openedCount;

  this.classList.add('open');
  const imagePath = this.getAttribute('data-src');
  const dataID = this.getAttribute('data-id');

  currentCardsID.push(dataID);
  currentCards.push(this);

  this.setAttribute('src', imagePath);

  setTimeout(() => {
    checkCard.call(this);
  }, 500);
}

function checkCard() {
  if (currentCards.length === 2) {
    const cardOneID = currentCardsID[0];
    const cardOne = currentCards[0];
    const cardTwoID = currentCardsID[1];
    const cardTwo = currentCards[1];
    if (cardOneID === cardTwoID) {
      cardOne.classList.remove('unsolved');
      cardTwo.classList.remove('unsolved');
      cardOne.classList.add('solved');
      cardTwo.classList.add('solved');
      cardOne.setAttribute('src', 'images/tick.png');
      cardOne.classList.remove('open');
      cardTwo.setAttribute('src', 'images/tick.png');
      cardTwo.classList.remove('open');

      const solvedCount = document.querySelectorAll('.solved').length;

      console.log(`solvedCount: ${solvedCount}`);

      if (solvedCount === CARDS_COUNT) {
        alert(
          `You have completed the memory game in ${openedCount}. It's always lower the better.`
        );
        reset();
      }
    } else {
      cardOne.setAttribute('src', '');
      cardOne.classList.remove('open');
      cardTwo.setAttribute('src', '');
      cardTwo.classList.remove('open');
    }
    currentCards = [];
    currentCardsID = [];
  }
}

function reset() {
  cards.innerHTML = '';
  openedCount = 0;
  result.textContent = openedCount;
  currentCards = [];
  currentCardsID = [];
  items.sort(() => 0.5 - Math.random());
  createCanvas();
}
