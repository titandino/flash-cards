function BasicCard(question, answer) {
  this.question = question;
  this.answer = answer;
  this.answeredCorrect = 0;
  this.lastAnswer = '';
  this.attempts = 0;
}

BasicCard.prototype.checkAnswer = function(answer) {
  if (this.answer === answer)
    return true;
  return false;
};

BasicCard.prototype.handleKeyClick = function(keyCode) {
  var answer = String.fromCharCode(keyCode);
  if (this.answeredCorrect === 0) {
    if (answer == this.answer) {
      this.answeredCorrect = Date.now();
    } else {
      this.lastAnswer = answer;
    }
    this.attempts++;
  }
};

BasicCard.prototype.handleClick = function() {

};

BasicCard.prototype.update = function() {
  if (this.answeredCorrect && ((Date.now() - this.answeredCorrect) > 5000)) {
    kinderKards.cardCategory.nextCard();
  }
};

BasicCard.prototype.render_ = function() {
  kinderKards.renderBackground();
  kinderKards.drawText(this.question, kinderKards.canvas.width / 2, 50, '#000', '20px', 'Schoolbell', 'center');
  if (!this.answeredCorrect && this.lastAnswer) {
    kinderKards.drawText(this.lastAnswer + ' was not correct. Try again!', kinderKards.canvas.width / 2, 320, '#000', '20px', 'Schoolbell', 'center');
  } else if (this.answeredCorrect) {
    kinderKards.drawText('That is correct. Good job!', kinderKards.canvas.width / 2, 320, '#000', '20px', 'Schoolbell', 'center');
    kinderKards.drawText('Moving on to next card.', kinderKards.canvas.width / 2, 350, '#000', '20px', 'Schoolbell', 'center');
  }
};

BasicCard.prototype.render = function() {

};

CountCard.prototype = Object.create(BasicCard.prototype);

function CountCard(question, image, min, max) {
  BasicCard.call(this, question, getRandom(min, max));
  this.image = new Image();
  this.image.src = image;
}

CountCard.prototype.render = function() {
  var height = 100;
  var x = 0;
  for (var i = 0;i < this.answer;i++) {
    var xOffset = (45 * x++) + 40;
    kinderKards.ctx.drawImage(this.image, xOffset, height, 40, 40);
    if (x >= 5) {
      x = 0;
      height += 50;
    }
  }
};

LetterCard.prototype = Object.create(BasicCard.prototype);

function LetterCard(image, answer) {
  BasicCard.call(this, 'What letter does this start with?', answer);
  this.image = new Image();
  this.image.src = image;
}

LetterCard.prototype.render = function() {
  kinderKards.ctx.drawImage(this.image, kinderKards.canvas.width / 2 - 75, kinderKards.canvas.height / 2 - 75, 150, 150);
};

function CardCategory(name, cards) {
  this.name = name;
  this.cards = cards;
  this.currentIdx = 0;
  this.currentCard = this.cards[0];
  this.total = this.cards.length;
  this.score = 0;
  this.categoryFinished = false;
}

CardCategory.prototype.nextCard = function() {
  if (this.currentIdx == (this.cards.length - 1)) {
    this.categoryFinished = true;
    this.currentCard = null;
    kinderKards.scores.push(new CategoryScore(this.name, this.score));
    localStorage.scores = JSON.stringify(kinderKards.scores);
    return;
  }
  this.score += this.cards[this.currentIdx].attempts;
  this.currentIdx++;
  this.currentCard = this.cards[this.currentIdx];
};

CardCategory.prototype.render = function() {
  if (this.categoryFinished) {
    kinderKards.renderBackground();
    kinderKards.drawText('Very good! You finished.', kinderKards.canvas.width / 2, kinderKards.canvas.height / 2 - 20, '#000', '20px', 'Schoolbell', 'center');
    kinderKards.drawText('Final score: ' + this.score, kinderKards.canvas.width / 2, kinderKards.canvas.height / 2 + 20, '#000', '20px', 'Schoolbell', 'center');
  }
};

function CategoryScore(name, score) {
  this.name = name;
  this.score = score;
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var inputHandler = {
  keysDown: [],
  keyTimes: [],
  mousePos: {x: 0, y: 0},
  mouseDown: -1,

  getMousePos: function(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  },
};

var kinderKards = {
  canvas: document.getElementById('card-canvas'),
  ctx: document.getElementById('card-canvas').getContext('2d'),

  cardCategory: new CardCategory('Numbers and Letters', [
    new LetterCard('img/apple.png', 'A'),
    new CountCard('How many apples are there?', 'img/apple.png', 4, 9),
<<<<<<< HEAD
    new LetterCard('img/grapes-02.jpg', 'G'),
    new CountCard('How many grapes are there?', 'img/grapes-2.jpg', 3, 5),
    new LetterCard('img/orange.jpeg', 'O'),
    new CountCard('How many oranges are there?', 'img/orange.jpeg', 5, 9),
    new LetterCard('img/car.jpeg', 'C'),
    new CountCard('How many cars are there?', 'img/car.jpeg', 5, 9),
    new LetterCard('img/truck.png', 'T'),
    new CountCard('How many trucks are there?', 'img/truck.png', 2, 6),
    new LetterCard('img/ball.jpeg', 'F'),
    new CountCard('How many footballs are there?', 'img/ball.jpeg', 3, 9),
    new LetterCard('img/flag.png', 'F'),
    new CountCard('How many flags are there?', 'img/flag.png', 3, 9),
    new LetterCard('img/sun.jpeg', 'S'),
    new CountCard('How many suns are there?', 'img/sun.jpeg', 1, 4),
=======
    new LetterCard('img/grapes.png', 'G'),
    new CountCard('How many grapes are there?', 'img/grapes.png', 3, 5),
    new LetterCard('img/orange.png', 'O'),
    new CountCard('How many oranges are there?', 'img/orange.png', 5, 9),
    new LetterCard('img/car.png', 'C'),
    new CountCard('How many cars are there?', 'img/car.png', 5, 9),
    new LetterCard('img/truck.png', 'T'),
    new CountCard('How many trucks are there?', 'img/truck.png', 2, 6),
    new LetterCard('img/football.png', 'F'),
    new CountCard('How many footballs are there?', 'img/football.png', 3, 9),
    new LetterCard('img/flag.png', 'F'),
    new CountCard('How many flags are there?', 'img/flag.png', 3, 9),
    new LetterCard('img/sun.png', 'S'),
    new CountCard('How many suns are there?', 'img/sun.png', 1, 4),
>>>>>>> a141d596190b5e4ca2395ee44d08c4d1cb4842a5
    new LetterCard('img/moon.png', 'M'),
    new CountCard('How many moons are there?', 'img/moon.png', 1, 4),
    new LetterCard('img/bike.png', 'B'),
    new CountCard('How many bikes are there?', 'img/bike.png', 3, 9),
    new LetterCard('img/mario.png', 'M'),
    new CountCard('How many Marios are there?', 'img/mario.png', 3, 9),
  ]),

  renderBackground: function() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawText: function(text, x, y, color, size, font, align) {
    this.ctx.fillStyle = color;
    this.ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
    this.ctx.textAlign = align || 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  },

  update: function(delta) {
    if (this.cardCategory.currentCard) {
      this.cardCategory.currentCard.update(delta);
    }
  },

  render: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.cardCategory.currentCard) {
      this.cardCategory.currentCard.render_();
      this.cardCategory.currentCard.render();
    }
    this.cardCategory.render();
  },

  then: Date.now(),

  main: function() {
    var now = Date.now();
    var delta = now - this.then;

    if (!kinderKards.scores) {
      if (localStorage.scores) {
        kinderKards.scores = JSON.parse(localStorage.scores);
      } else {
        kinderKards.scores = [];
      }
    }

    kinderKards.update(delta / 1000);
    kinderKards.render();

    this.then = now;
  }
};

kinderKards.canvas.addEventListener('mousedown', function(e) {
  inputHandler.mousePos = inputHandler.getMousePos(kinderKards.canvas, e);
  inputHandler.mouseDown = Date.now();
}, false);

kinderKards.canvas.addEventListener('mouseup', function(e) {
  if ((Date.now() - inputHandler.mouseDown) < 1000) {
    kinderKards.cardCategory.currentCard.handleClick(e);
  }
}, false);

kinderKards.canvas.addEventListener('mousemove', function(e) {
  inputHandler.mousePos = inputHandler.getMousePos(kinderKards.canvas, e);
}, false);

window.addEventListener('keydown', function(e) {
  inputHandler.keysDown[e.keyCode] = true;
  inputHandler.keyTimes[e.keyCode] = Date.now();
  switch(e.keyCode) {
  case 37:
  case 39:
  case 38:
  case 40:
  case 32:
    e.preventDefault();
    break;
  default:
    break;
  }
}, false);

window.addEventListener('keyup', function(e) {
  inputHandler.keysDown[e.keyCode] = false;
  if ((Date.now() - inputHandler.keyTimes[e.keyCode]) < 1000) {
    kinderKards.cardCategory.currentCard.handleKeyClick(e.keyCode);
  }
}, false);

setInterval(kinderKards.main, (1000 / 60));
