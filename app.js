var kinderKards = {
  canvas: document.getElementById('card-canvas'),
  ctx: canvas.getContext('2d'),

  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
  },
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
