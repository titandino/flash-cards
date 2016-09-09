var inputHandler = {
  keysDown = [],
  mousePos: {x: 0, y: 0},

  getMousePos: function(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
  },
}

var kinderKards = {
  canvas: document.getElementById('card-canvas'),
  ctx: canvas.getContext('2d');

  currentCard: new BasicCard('What is love?', 'baby don\'t hurt me');

  drawText: function(text, x, y, color, size, font, align) {
    this.ctx.fillStyle = color;
    this.ctx.font = (size || '12px') + ' ' + (font || 'Helvetica');
    this.ctx.textAlign = align || 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  },

  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
  },

  update: function(delta) {
    kinderKards.currentCard.update(delta);
  },

  render: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    kinderKards.currentCard.render();
  },

  then: Date.now(),

  main: function() {
    var now = Date.now();
    var delta = now - this.then;

    update(delta / 1000);
    render();

    this.then = now;
  }
}

function BasicCard(question, answer) {
  this.question = question;
  this.answer = answer;
}

BasicCard.prototype.checkAnswer = function(answer) {
  if (this.answer === answer)
    return true;
  return false;
};

BasicCard.prototype.update = function(delta) {

};

BasicCard.prototype.render = function() {

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
  mousePos = inputHandler.getMousePos(canvas, e);
  //TODO current card click callback
}, false);

kinderKards.canvas.addEventListener('mousemove', function(e) {
  mousePos = inputHandler.getMousePos(canvas, e);
}, false);

window.addEventListener('keydown', function(e) {
  inputHandler.keysDown[e.keyCode] = true;
  switch(e.keyCode){
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
}, false);

setInterval(kinderKards.main, 16.666667);
