var clampToPlayAreaBehaviour = function(player, width, height) {
    this.player = player;
    this.width = width;
    this.height = height;

    this.onPositionChanged = function() {
        if (this.player.position.x > this.width-this.player.WIDTH) this.player.position.x = this.width - this.player.WIDTH;
        if (this.player.position.x < 0) this.player.position.x = 0;
        if (this.player.position.y > this.height-this.player.HEIGHT) this.player.position.y = this.height-this.player.HEIGHT;
        if (this.player.position.y < 0) this.player.position.y = 0;
    };
};
