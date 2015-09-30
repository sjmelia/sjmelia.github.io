var InputComponent = function(eventSource, player) {
    this.player = player;
    this.attack = false;
    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;

    this.keydown = (function(e) {
        switch(e.keyCode) {
            case 17: 
                if (!this.attack) {
                    this.attack = true;
                    console.log("keydown:beginAttack");
                    this.player.beginAttack(); 
                }
                break;
            case 37: 
                if (!this.left) {
                    this.left = true;
                    this.player.beginLeft();
                }
                break;
            case 38: 
                if (!this.up) {
                    this.up = true;
                    this.player.beginUp();
                }
                break;
            case 39: 
                if (!this.right) {
                    this.right = true;
                    this.player.beginRight();
                }
                break;
            case 40: 
                if (!this.down) {
                    this.down = true;
                    this.player.beginDown();
                }
                break;
        }
    }).bind(this);

    this.keyup = (function(e) {
        switch(e.keyCode) {
            case 17: this.attack = false; this.player.endAttack(); break;
            case 37: this.left = false; this.player.endLeft(); break;
            case 38: this.up = false; this.player.endUp(); break;
            case 39: this.right = false; this.player.endRight(); break;
            case 40: this.down = false; this.player.endDown(); break;
        }
    }).bind(this);
    
    eventSource.addEventListener('keydown', this.keydown);
    eventSource.addEventListener('keyup', this.keyup);
    //eventSource.keydown(this.keydown);
    //eventSource.keyup(this.keyup);
}
