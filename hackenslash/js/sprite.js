var sprite = function(animations, position, velocity) {
    this.animations = animations;
    this.direction = directions.SOUTH;
    this.position = position;
    this.velocity = velocity;
    this.currentAnimation = this.animations[this.direction].walk;

    this.render = function(context) {
        this.currentAnimation.render(context, 
                this.position.x, 
                this.position.y);
    };

    this.logic = function() {
        this.currentAnimation.logic();
    };

    /*this.velocityChanged = function() {
        if (this.velocity.x < 0)
            this.direction = directions.WEST;
        if (this.velocity.x > 0)
            this.direction = directions.EAST;
        if (this.velocity.y < 0)
    };*/

    this.beginLeft = function() {
        this.direction = directions.WEST;
        this.currentAnimation = this.animations[this.direction].walk;
        this.currentAnimation.start();
    };

    this.endLeft = function() {
        this.stopIfNotMoving();
    };

    this.beginUp = function() {
        this.direction = directions.NORTH;
        this.currentAnimation = this.animations[this.direction].walk;
        this.currentAnimation.start();
    };

    this.endUp = function() {
        this.stopIfNotMoving();
    };

    this.beginRight = function() {
        this.direction = directions.EAST;
        this.currentAnimation = this.animations[this.direction].walk;
        this.currentAnimation.start();
    };

    this.endRight = function() {
        this.stopIfNotMoving();
    };

    this.beginDown = function() {
        this.direction = directions.SOUTH;
        this.currentAnimation = this.animations[this.direction].walk;
        this.currentAnimation.start();
    };

    this.endDown = function() {
        this.stopIfNotMoving();
    };

    this.stopIfNotMoving = function() {
        if (this.velocity.x == 0 && this.velocity.y == 0)
            this.currentAnimation.stop();
    };

    this.beginAttack = function() {
        this.currentAnimation = animations[this.direction].attack;
        this.currentAnimation.reset();
        this.currentAnimation.start();
    };
};
