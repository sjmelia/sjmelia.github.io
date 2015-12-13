var scoreboard = function(width, height, score, lives) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.life = document.getElementById("life");
    this.context = this.canvas.getContext('2d');

    this.context.font = "12px 'Press Start 2P' ";
    
    this.render = function(context){
        context.drawImage(this.canvas, 0, 0);
    };

    this.update = function(score, lives)
    {
        var y = 30;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'red';
        this.context.fillText("CHRISTMAS INVADERS!", 40, y);

        this.context.fillStyle = 'white';
        this.context.fillText("SCORE", 300, y);
        this.context.fillText("LIVES", 460, y);

        this.context.fillStyle = '#00FF00';
        this.context.fillText(score, 380, y);

        for(i = 0; i < lives; i++)
        {
            var x = 520 + (i * this.life.width + 10);
            this.context.drawImage(this.life, 
                    0, 0, this.life.width, this.life.height, 
                    x, y-15, this.life.width, this.life.height);  
        }

        this.context.fillStyle = 'grey';
        this.context.fillRect(0, 400, 640, 480);
    };

    this.update(score, lives);
};
