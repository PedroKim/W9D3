class View {
  constructor(game, $el) {
    this.game = game;
    this.$container = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$container.on('click', 'li', e => {
      const $cell = $(e.target);
      this.makeMove($cell);
    });

  }

  makeMove($cell) {
    if ($cell.hasClass('clicked')) {
      alert('Already taken');
    }
    else {
      const mark = this.game.currentPlayer;
      const row = parseInt($cell.index() / 3);
      const col = $cell.index() % 3;
      
      this.game.playMove([row, col]);
      $cell.addClass(`${mark} clicked`).text(mark);

      if (this.game.isOver()) {
        const winner = this.game.winner();
        const $caption = $('<figcaption>');
        if (winner) {
          $caption.text(`${winner} wins!`);
          $(`li.${winner}`).addClass('winner');
          $(`li:not(.${winner})`).addClass('game-over');
        } 
        else {
          $caption.text("It's a draw!");
          $('li').addClass('game-over');
        }
        this.$container.append($caption);
        this.$container.off('click');
      } 
    }
  }

  setupBoard() {
    const $grid = $('<ul>');
    for (let i = 0; i < 9; i++) {
      $grid.append('<li></li>');
    }
    this.$container.append($grid);
  }
}

module.exports = View;
