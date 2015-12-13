// global for horizontal movement of all enemies.
var enemy_velocityx = 3;
var enemy_speed = 3;

var enemy = function(game, x, y, speed) {
    enemy_speed = speed * 4;
    enemy_velocityx = enemy_speed;
    this.game = game;
    this.lives = 3;
    this.sprite = document.getElementById("enemy");
    this.halfWidth = this.sprite.width / 2;
    this.x = x;
    this.y = y;
    this.velocityy = speed;
    this.shooting = false;
    this.dead = false;

    this.render = function(context) {
        if (this.dead) return;
        context.drawImage(this.sprite, 0, 0,
                this.sprite.width, this.sprite.height,
                this.x, this.y, this.sprite.width, this.sprite.height);
    };

    this.kill = function() {
        this.dead = true;
    };

    this.logic = function() {
        if (this.x <= 0)
        {
            enemy_velocityx = +enemy_speed;
        }
        if (this.x + this.sprite.width >= 640)
        {
            enemy_velocityx = -enemy_speed;
        }
        this.y += this.velocityy;
        this.x += enemy_velocityx;
    };
};
