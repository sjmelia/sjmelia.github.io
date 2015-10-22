var sprite = function(player, animations) {
    this.animations = animations;
    this.player = player;
    this.currentAnimation = this.animations[this.player.direction].walk;

    this.init = function() {
        this.animations[directions.NORTH].attack.ended = this.onAttackAnimationEnded;
        this.animations[directions.SOUTH].attack.ended = this.onAttackAnimationEnded;
        this.animations[directions.EAST].attack.ended = this.onAttackAnimationEnded;
        this.animations[directions.WEST].attack.ended = this.onAttackAnimationEnded;
    };

    this.render = function(context) {
        this.currentAnimation.render(context, this.player.position.x, this.player.position.y);
    };

    this.logic = function() {
        this.currentAnimation.logic();
    };

    this.onAttackAnimationEnded = function() {
        this.player.setAttacking(false);
        this.currentAnimation = this.animations[this.player.direction].walk;
        this.onVelocityChanged();
    }.bind(this);

    this.onDirectionChanged = function() {
        var animation = this.animations[this.player.direction];
        if (this.player.attacking)
            this.currentAnimation = animation.attack;
        else
            this.currentAnimation = animation.walk;
        this.onVelocityChanged();
    }.bind(this);

    this.onVelocityChanged = function() {
        if (this.player.velocity.x != 0 ||
                this.player.velocity.y != 0 ||
                this.player.attackVelocity.x != 0 ||
                this.player.attackVelocity.y != 0)
        {
            //console.log("sprite:onVelocityChanged start");
            this.currentAnimation.start();
        }
        else
        {
            //console.log("sprite:onVelocityChanged stop");
            this.currentAnimation.stop();
        }
    }.bind(this);

    this.onAttackChanged = function() {
        //console.log("sprite:onAttackChanged enter " + this.player.attacking);
        var animation = this.animations[this.player.direction];

        if (!this.player.attacking) {
            this.currentAnimation = animation.walk;
            this.currentAnimation.stop();
        }
        else
        {
            this.currentAnimation = animation.attack;
            this.currentAnimation.start();
        }
    }.bind(this);

    this.init();
};
