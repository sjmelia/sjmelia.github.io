var InputComponent = function(eventSource, player, velocity) {
    this.player = player;
    this.attack = false;
    this.velocity = velocity;
    this.direction = directions.SOUTH;

    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;

    this.beginAttack = function() {
        if (!this.attack) {
            this.attack = true;
            console.log("keydown:beginAttack");
            this.player.beginAttack(); 
        }
    };

    this.endAttack = function() {
        this.attack = false;
        this.player.endAttack();
    };

    this.beginLeft = function() {
        if (!this.left) {
            this.left = true;
            this.player.beginLeft();
        }
    };

    this.endLeft = function() {
        this.left = false;
        this.player.endLeft();
    };

    this.beginUp = function() {
        if (!this.up) {
            this.up = true;
            this.player.beginUp();
        }
    };

    this.endUp = function() {
        this.up = false;
        this.player.endUp();
    };

    this.beginRight = function() {
        if (!this.right) {
            this.right = true;
            this.player.beginRight();
        }
    };

    this.endRight = function() {
        this.right = false;
        this.player.endRight();
    };

    this.beginDown = function() {
        if (!this.down) {
            this.down = true;
            this.player.beginDown();
        }
    };

    this.endDown = function() {
        this.down = false;
        this.player.endDown();
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
            case 17: this.endAttack(); break;
            case 37: this.endLeft(); break;
            case 38: this.endUp(); break;
            case 39: this.endRight(); break;
            case 40: this.endDown(); break;
        }
    }).bind(this);
    
    eventSource.addEventListener('keydown', this.keydown);
    eventSource.addEventListener('keyup', this.keyup);
}
