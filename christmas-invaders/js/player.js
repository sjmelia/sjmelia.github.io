var player = function(game) {
    this.game = game;
    this.lives = 3;
    this.sprite = document.getElementById("player");
    this.halfWidth = this.sprite.width / 2;
    this.x = (game.width / 2) - this.halfWidth;
    this.velocityx = 0;
    this.shooting = false;
    this.bullety = 0;
    this.bulletx = 0;

    this.render = function(context) {
        context.drawImage(this.sprite, 0, 0,
                this.sprite.width, this.sprite.height,
                this.x, 370, this.sprite.width, this.sprite.height);

        if (this.shooting) {
            context.strokeStyle = 'white';
            context.beginPath();
            context.lineWidth = 3;
            context.moveTo(this.bulletx, this.bullety);
            context.lineTo(this.bulletx, this.bullety + 20);
            context.stroke();
        }
    };

    this.logic = function() {
        this.x = this.x + this.velocityx;
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > this.game.width - this.sprite.width) {
            this.x = this.game.width - this.sprite.width;
        }

        if (this.shooting)
        {
            this.bullety -= 8;
            if (this.bullety < 50)
            {
                this.shooting = false;
            }
        }
    };

    this.shoot = function() {
        console.log("shooting");
        if (this.shooting) return;
        this.shooting = true;
        this.bulletx = this.x + this.halfWidth;
        this.bullety = 350;
    };

    this.SPEED = 5;
    this.keydown = function(e) {
        switch (e.keyCode) {
            case 17: this.shoot(); break;
            case 37: this.velocityx = -this.SPEED; break;
            case 39: this.velocityx = this.SPEED; break;
        };
    }.bind(this);

    this.keyup = function(e) {
        switch (e.keyCode) {
            //case 17: this.shooting = false; break;
            case 37: this.velocityx = 0; break;
            case 39: this.velocityx = 0; break;
        };
    }.bind(this);

    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
};
