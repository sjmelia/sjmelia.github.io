var player = function(game, canvasWidth, canvasHeight, x, y) {
			this.game = game;
			this.x = x;
			this.y = y;
			this.xvel = 0;
			this.yvel = 0;
			this.HEIGHT = this.game.size;
			this.WIDTH = this.game.size;
			this.fillStyle = 'blue';
			this.canvasHeight = canvasHeight;
			this.canvasWidth = canvasWidth;
			this.render = function(context) {
				//let cellx = Math.floor(this.x / this.WIDTH);
				//let celly = Math.floor(this.y / this.HEIGHT);
				
				
				context.beginPath();
				context.rect((this.canvasWidth/2) - this.WIDTH/2, (this.canvasHeight/2) - this.HEIGHT/2, this.WIDTH, this.HEIGHT);
				context.fillStyle = this.fillStyle;
				context.fill();
				
				context.fillStyle = 'red';
				context.fillText("X:" + this.x + ", Y:" + this.y, 10, 10);
			};
			this.reset = function() {
				this.y = this.game.size - (this.game.size / 2);
				this.x = this.game.size + (this.game.size / 2);
			};
			
			this.left = function() {
				this.xvel = -this.WIDTH;	
			}.bind(this);
			
			this.right = function() {
				this.xvel = this.WIDTH;
			}.bind(this);
			
			this.up = function() {
				this.yvel = -this.HEIGHT;
			}.bind(this);
			
			this.down = function() {
				this.yvel = this.HEIGHT;
			}.bind(this);
			
			this.logic = function() {
				/*if (intersectRect(this.x, this.y, this.WIDTH, this.HEIGHT,
							this.game.exit.x, this.game.exit.y,
							this.game.exit.image.width(),
							this.game.exit.image.height()))
				{
					this.game.win();
				}

				this.game.bosses.forEach((function(boss) {
					if (intersectRect(this.x, this.y, this.WIDTH, this.HEIGHT,
								boss.x, boss.y,
								boss.image.width(),
								boss.image.height()))
					{
						this.game.lose();
					}
				}).bind(this));*/
				//this.moveTo(this.x + this.xvel, this.y + this.yvel);
				let newX = this.x + this.xvel;
				let newY = this.y + this.yvel;
				
				let cellx = Math.floor(newX / this.game.size);
				let celly = Math.floor(newY / this.game.size);
				//console.log("newX: " + newX + " newY:" + newY + " CellX: " + cellx + " CellY: " + celly);
				if (cellx < 0 || celly < 0 || cellx >= this.game.mazeWidth || celly >= this.game.mazeHeight)
				{
					return;
				}
				
				let isWall = this.game.maze.cells[celly][cellx];
				if (!isWall)
				{
					this.x = newX;
					this.y = newY;
				}				
				
				
				this.xvel = 0;
				this.yvel = 0;
			}.bind(this);
			
			//this.reset();
		}; 