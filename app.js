function BasicCard(question, answer) {
  this.question = question;
  this.answer = answer;
  this.answeredCorrect = 0;
  this.lastAnswer = '';
}

BasicCard.prototype.checkAnswer = function(answer) {
  if (this.answer === answer)
    return true;
  return false;
};

BasicCard.prototype.handleKeyClick = function(keyCode) {
  var answer = String.fromCharCode(keyCode);
  if (answer == this.answer) {
    this.answeredCorrect = Date.now();
  } else {
    this.lastAnswer = answer;
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
  kinderKards.ctx.fillStyle = 'green';
  kinderKards.ctx.fillRect(10, 10, kinderKards.canvas.width - 20, kinderKards.canvas.height - 20);
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

function CardCategory(name, cards) {
  this.name = name;
  this.cards = cards;
  this.currentIdx = 0;
  this.currentCard = this.cards[0];
}

CardCategory.prototype.nextCard = function() {
  if (this.currentIdx == (this.cards.length - 1)) {
    return;
  }
  this.currentIdx++;
  this.currentCard = this.cards[this.currentIdx];
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

  cardCategory: new CardCategory('Numbers', [
    new CountCard('How many apples are there? #1', 'img/apple.png', 4, 25),
    new CountCard('How many apples are there? #2', 'img/apple.png', 1, 3),
    new CountCard('How many apples are there? #3', 'img/apple.png', 3, 5),
    new CountCard('How many apples are there? #4', 'img/apple.png', 2, 4),
    new CountCard('How many apples are there? #5', 'img/apple.png', 5, 7),
    new CountCard('How many apples are there? #6', 'img/apple.png', 8, 10),
    new CountCard('How many apples are there? #7', 'img/apple.png', 0, 2),
    new CountCard('How many apples are there? #8', 'img/apple.png', 7, 9),
    new CountCard('How many apples are there? #9', 'img/apple.png', 6, 8),
    new CountCard('How many apples are there? #10', 'img/apple.png', 9, 11),
  ]),

  drawText: function(text, x, y, color, size, font, align) {
    this.ctx.fillStyle = color;
    this.ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
    this.ctx.textAlign = align || 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  },

  update: function(delta) {
    this.cardCategory.currentCard.update(delta);
  },

  render: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cardCategory.currentCard.render_();
    this.cardCategory.currentCard.render();
  },

  then: Date.now(),

  main: function() {
    var now = Date.now();
    var delta = now - this.then;

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
