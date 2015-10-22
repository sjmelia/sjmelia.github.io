var userInputBehaviour = function(player) {
    this.player = player;
    this.position = player.position;
    this.velocity = player.velocity;
    this.attackVelocity = player.attackVelocity;

    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;
    this.SPEED = 3;
    this.ATTACK_SPEED = 3;

    this.logic = function() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.x += this.attackVelocity.x;
        this.position.y += this.attackVelocity.y;
    };

    this.beginAttack = function() {
        if (!this.player.attacking) {
            this.player.setAttacking(true);

            if (this.player.direction == directions.NORTH)
                this.attackVelocity.setY(-this.ATTACK_SPEED);
            if (this.player.direction == directions.SOUTH)
                this.attackVelocity.setY(this.ATTACK_SPEED);
            if (this.player.direction == directions.EAST)
                this.attackVelocity.setX(this.ATTACK_SPEED);
            if (this.player.direction == directions.WEST)
                this.attackVelocity.setX(-this.ATTACK_SPEED);
        }
    };

    this.onAttackChanged = function() {
        //console.log("userInputBehaviour:onAttackChanged " + this.player.attacking);
        if (!this.player.attacking)
            this.attackVelocity.setXY(0,0);
    }.bind(this);

    this.beginLeft = function() {
        if (!this.left) {
            this.left = true;
            this.velocity.setX(-this.SPEED);
            this.player.setDirection(directions.WEST);
        }
    };

    this.endLeft = function() {
        this.left = false;
        this.velocity.setX(0);
    };

    this.beginUp = function() {
        if (!this.up) {
            this.up = true;
            this.velocity.setY(-this.SPEED);
            this.player.setDirection(directions.NORTH);
        }
    };

    this.endUp = function() {
        this.up = false;
        this.velocity.setY(0);
    };

    this.beginRight = function() {
        if (!this.right) {
            this.right = true;
            this.velocity.setX(this.SPEED);
            this.player.setDirection(directions.EAST);
        }
    };

    this.endRight = function() {
        this.right = false;
        this.velocity.setX(0);
    };

    this.beginDown = function() {
        if (!this.down) {
            this.down = true;
            this.velocity.setY(this.SPEED);
            this.player.setDirection(directions.SOUTH);
        }
    };

    this.endDown = function() {
        this.down = false;
        this.velocity.setY(0);
    };

    this.keydown = (function(e) {
        switch(e.keyCode) {
            case 17: this.beginAttack(); break;
            case 37: this.beginLeft(); break;
            case 38: this.beginUp(); break;
            case 39: this.beginRight(); break;
            case 40: this.beginDown(); break;
        }
    }).bind(this);

    this.keyup = (function(e) {
        switch(e.keyCode) {
            //case 17: this.endAttack(); break;
            case 37: this.endLeft(); break;
            case 38: this.endUp(); break;
            case 39: this.endRight(); break;
            case 40: this.endDown(); break;
        }
    }).bind(this);
    
    document.addEventListener('keydown', this.keydown);
    document.addEventListener('keyup', this.keyup);
}
