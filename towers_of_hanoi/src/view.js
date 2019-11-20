class View {
  constructor(game, $el) {
    this.game = game;
    this.$container = $el;
    this.setupTowers();
    this.render();
    this.$container.on("click", "ul", this.clickMethod.bind(this));
  }

  setupTowers() {
    for(let i = 0; i < 3; i++) {
      const $tower = $("<ul>");
      for(let j = 0; j < 3; j++) {
        const $disk = $("<li>");
        $tower.append($disk);
      }
      this.$container.append($tower);
    }
  }

  render() {
    const towers = this.game.towers;
    $("li").removeClass("disk-1 disk-2 disk-3");
    towers.forEach((tower, towerIdx) => {
      const $tower = $($("ul")[towerIdx]);
      tower.forEach((disk, diskIdx) => {
        const $disk = $($tower.find("li")[2 - diskIdx]);
        $disk.addClass(`disk-${disk}`);
      });
    });
  }

  clickMethod(e) {
    const $tower = $(e.currentTarget);
    if ($("ul.selected").length === 0) { // first click
      $tower.addClass("selected");
    } else { // second click
      const $selectedTower = $("ul.selected");
      const startIdx = $selectedTower.index();
      const endIdx = $tower.index();
      if( !this.game.move(startIdx, endIdx) ) {
        alert("Invalid move!");
      }
      this.render();
      $selectedTower.removeClass("selected");

      if (this.game.isWon()) {
        $("title").text("Towers of Doo-doo");
        $("h1").text("Towers of Doo-doo");
        $("ul").addClass("game-over");
        setTimeout(function() {
          alert("You won!");
        }, 0);
        this.$container.off("click");
      }
    }
  }
}

module.exports = View;