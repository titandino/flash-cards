function Card(question, answers) {
  this.question = question;
  this.answers = answers;
}

Card.prototype.checkAnswer = function(answer) {
  for (possible in this.answers) {
    if (answer.toLowerCase() === possible.toLowerCase())
      return true;
  }
  return false;
};
