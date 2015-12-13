var game = function() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.originalWidth = this.width;
    this.score = 0;
    this.player = new player(this);

    this.enemies = [];
    
    this.banner = new scoreboard(this.width, this.height,
            this.score,
            this.player.lives);

    this.won = false;
    this.lost = false;
    this.playerdead = false;
    this.frame = 0;

    this.levelnumber = 1;
    this.onresize = function() {
        var ratio = this.width / this.height;

        // find which is smaller
        if (window.innerWidth < window.innerHeight * ratio)
        {
            console.log("Width smaller than height");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerWidth / ratio;
        }
        else
        {
            console.log("Height smaller than width");
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerHeight * ratio;
        }

        var scale = this.canvas.width / this.originalWidth;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.scale(scale, scale);

        console.log("Resized window:" 
                    + window.innerWidth + "*" + window.innerHeight 
                    + " canvas:" 
                    + this.canvas.width + "*" + this.canvas.height
                    + " game:"
                    + this.width + "*" + this.height
                    + " ratio:" + ratio
                    + " scale:" + scale);
    }.bind(this);

    this.render = function() {
        this.context.clearRect(0, 0, this.width, this.height);
        
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.width, this.height);
        this.banner.render(this.context);

        for (var key in this.enemies)
        {
            this.enemies[key].render(this.context);
        }
        
        this.player.render(this.context);

        if (this.playerdead)
        {
            this.context.fillStyle = 'red';
            this.context.textAlign = 'center';
            this.context.fillText("You lose, Earthling!", this.width / 2, (this.height / 2) - 200);
            this.context.fillStyle = 'white';
            this.context.fillText("The End!!", this.width / 2, (this.height / 2) - 170);
            return;
        }

        if (this.won)
        {
            this.context.fillStyle = 'red';
            this.context.textAlign = 'center';
            this.context.fillText("Congratulations Earthling!", this.width / 2, (this.height / 2) - 100);
            this.context.fillStyle = 'white';
            this.context.fillText("You Win This Time!", this.width / 2, (this.height / 2) - 70);
            return;
        }
        
        if (this.lost)
        {
            this.context.fillStyle = 'red';
            this.context.textAlign = 'center';
            this.context.fillText("Never mind, Earthling!", this.width / 2, (this.height / 2) - 100);
            this.context.fillStyle = 'white';
            this.context.fillText("Just socks for you!!", this.width / 2, (this.height / 2) - 70);
            return;
        }

    }.bind(this);

    var delay = 60;
    this.logic = function() {
        if (this.playerdead) return;

        if (this.lost)
        {
            this.frame++;

            if (this.frame == delay)
            {
                this.player.lives--;
                if (this.player.lives == 0)
                {
                    this.playerdead = true;
                }
                this.banner.update(this.score, this.player.lives);
                this.frame = 0;
                this.lost = false;
                this.level();
            }
            return;
        }

        if (this.won)
        {
            this.frame++;
            
            if (this.frame == delay)
            {
                this.frame = 0;
                this.won = false;
                this.levelnumber+=0.25;
                this.level();
            }
            return;
        }

        this.player.logic();
        var enemies_alive = 0;
        for (var key in this.enemies)
        {
            var enemy = this.enemies[key];
            enemy.logic();

            if (this.player.shooting)
            {
                var enemyright = enemy.x + enemy.sprite.width;
                var enemybottom = enemy.y + enemy.sprite.height;
                if (    !enemy.dead 
                        && enemybottom >= this.player.bullety
                        && enemyright > this.player.bulletx
                        && enemy.x < this.player.bulletx)
                {
                    enemy.kill();
                    this.player.shooting = false;
                    this.score += 10;
                    this.banner.update(this.score, this.player.lives);
                }
            }

            if (!enemy.dead)
            {
                enemies_alive++;
                if (enemy.y > 350)
                {
                    console.log("died");
                    if (this.player.lives == 1)
                    {
                        this.player.lives = 0;
                        this.playerdead = true;
                        this.banner.update(this.score, this.player.lives);
                    }
                    else
                    {
                        this.lost = true;
                    }
                    this.frame = 0;
                }
            }
        }

        if (enemies_alive == 0)
        {
            console.log("won!");
            this.won = true;
            this.frame = 0;
        }

    }.bind(this);

    this.level = function() {
        var enemySprite = document.getElementById("enemy");
        this.enemies = [];
        for (i = 0; i < 12; i++) {
            for (j = 0; j < 4; j++) {
                var x = i * (enemySprite.width + 20);
                var y = j * (enemySprite.height + 10);
                x = x + 75;
                y = y + 100;
                this.enemies.push(new enemy(this, x, y, this.levelnumber / 10));
            }
        }
    };

    var fps = 30;
    this.start = function() {
        var self = this;
        setTimeout(function() { requestAnimationFrame(self.start); }, 1000 / fps);
        this.render();
        this.logic();

    }.bind(this);
    
    // Init
    window.addEventListener("resize", this.onresize);
    this.onresize();
    this.context.font = "12px 'Press Start 2P' ";
    this.context.textAlign = 'left';
    this.context.textBaseline = 'top';
    this.level();
};
