var scoring = {
  appendNewElement: function(parent, elementType, text) {
    var ele = document.createElement(elementType);
    ele.textContent = text;
    parent.appendChild(ele);
  },

  createTable: function() {
    var table = document.getElementById('scoresTable');
    var header = document.createElement('tr');
    this.appendNewElement(header, 'th', 'Category');
    this.appendNewElement(header, 'th', 'Score');
    table.appendChild(header);
  },

  appendScoreData: function() {
    var table = document.getElementById('scoresTable');
    var row = document.createElement('tr');
    var scores = JSON.parse(localStorage.scores);
    for (i in scores) {
      this.appendNewElement(row, 'td', scores[i].name + ':');
      this.appendNewElement(row, 'td', scores[i].score);
    }
    table.appendChild(row);
  },

  create: function() {
    if (localStorage.scores) {
      this.createTable();
      this.appendScoreData();
    } else {
      this.appendNewElement(document.getElementById('mainBody'), 'h3', 'No scores found. Go earn some scores!');
    }
  },
};

scoring.create();
