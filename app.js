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

  currentCard: new BasicCard('Hit the letter A!', 'A'),

  drawText: function(text, x, y, color, size, font, align) {
    this.ctx.fillStyle = color;
    this.ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
    this.ctx.textAlign = align || 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  },

  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  update: function(delta) {
    this.currentCard.update(delta);
  },

  render: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentCard.render();
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

function BasicCard(question, answer) {
  this.question = question;
  this.answer = answer;
}

BasicCard.prototype.checkAnswer = function(answer) {
  if (this.answer === answer)
    return true;
  return false;
};

BasicCard.prototype.handleKeyClick = function(keyCode) {
  var answer = String.fromCharCode(keyCode);
  if (answer === this.answer) {
    this.question = 'You did it!';
  }
};

BasicCard.prototype.handleClick = function() {

};

BasicCard.prototype.update = function(delta) {

};

BasicCard.prototype.render = function() {
  kinderKards.ctx.fillStyle = 'green';
  kinderKards.ctx.fillRect(10, 10, kinderKards.canvas.width - 10, kinderKards.canvas.height - 10);
  kinderKards.drawText(this.question, kinderKards.canvas.width / 2, 30, '#000', '20px', 'Schoolbell', 'center');
};

CountCard.prototype = Object.create(BasicCard.prototype);

function CountCard(question, image, min, max) {
  BasicCard.call(this, question);
  this.image = new Image();
  this.image.src = image;
  this.answer = kinderKards.getRandom(min, max);
}

function CardCategory(name, cards) {
  this.name = name;
  this.cards = cards;
}

kinderKards.canvas.addEventListener('mousedown', function(e) {
  inputHandler.mousePos = inputHandler.getMousePos(kinderKards.canvas, e);
  inputHandler.mouseDown = Date.now();
}, false);

kinderKards.canvas.addEventListener('mouseup', function(e) {
  if ((Date.now() - inputHandler.mouseDown) < 1000) {
    kinderKards.currentCard.handleClick();
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
    kinderKards.currentCard.handleKeyClick(e.keyCode);
  }
}, false);

setInterval(kinderKards.main, (1000 / 60));
