var scoring = {
  appendNewElement: function(parent, elementType, text) {
    var ele = document.createElement(elementType);
    ele.textContent = text;
    parent.appendChild(ele);
  },

  appendScoreData: function() {
    var section = document.getElementById('scoreSection');
    var scores = JSON.parse(localStorage.scores);
    for (i in scores) {
      this.appendNewElement(section, 'p', 'You scored a ' + scores[i].score + ' in the ' + scores[i].name + ' category!');
    }
  },

  create: function() {
    if (localStorage.scores) {
      this.appendScoreData();
    } else {
      this.appendNewElement(document.getElementById('mainBody'), 'h3', 'No scores found. Go earn some scores!');
    }
  },
};

scoring.create();
