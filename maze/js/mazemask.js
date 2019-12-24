var mazeMask = function(game, maskWidth, maskHeight, canvasWidth, canvasHeight) {
	this.game = game;
	this.width = maskWidth;
	this.height = maskHeight;
	this.size = this.game.size;
		this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.canvasWidthCells = this.canvasWidth / this.size;
	this.canvasHeightCells = this.canvasHeight / this.size;
	
	this.init = function(game) {
		this.m = [];
		for (var y = 0; y < this.height; y++)
		{
			this.m[y] = [];
			for (var x = 0; x < this.width; x++)
			{
				this.m[y][x] = 0;
			}
		}
	};
	
	this.render = function(context, player) {
		let cellx = Math.floor(player.x / this.size);
		let celly = Math.floor(player.y / this.size);
		
		let startx = cellx - (this.canvasWidthCells / 2);
		let endx = startx + this.canvasWidthCells;
		let starty = celly - (this.canvasHeightCells / 2);
		let endy = starty + this.canvasWidthCells;
		
		let rectX = ((cellx - startx) * this.size) - 0.5;
		let rectY = ((celly - starty) * this.size) - 0.5;
		
		context.save();
		context.globalCompositeOperation = 'destination-in';
		context.beginPath();
		//context.rect(rectX-(this.size/2) - (this.size* 2), rectY-(this.size/2) - (this.size * 2), this.size * 5, this.size * 5);	
		context.filter = "blur(25px)";
		context.arc(rectX, rectY, this.size*3, 0, 2 * Math.PI);
		context.fillStyle = 'rgba(200,0,0,0.75)';
		context.fill();
		context.closePath();
		context.restore();
		//context.globalCompositeOperation = 'source-over';
		/*
		
		let startx = cellx - (this.canvasWidthCells / 2);
		let endx = startx + this.canvasWidthCells;
		let starty = celly - (this.canvasHeightCells / 2);
		let endy = starty + this.canvasWidthCells;
		
		let maxWidth = this.width;
		let maxHeight = this.height;
		context.beginPath();
		//console.log("Drawing from " + startx + " to " + endx);
		for (var x = startx; x < endx; x++)
		{
			if (x < 0) continue;
			if (x > maxWidth) break;
			
			for (var y = starty; y < endy; y++)
			{
				if (y < 0) continue;
				if (y >= maxHeight) break;
				
				var isVisible = this.m[y][x] == 1;
				var haveSeen = this.m[y][x] == 2;
				
				let rectX = ((x - startx) * this.size) - 0.5;
				let rectY = ((y - starty) * this.size) - 0.5;
				
				if (haveSeen)
				{
					context.beginPath();
					context.rect(rectX-(this.size/2), rectY-(this.size/2), this.size+1, this.size + 1);	
					context.fillStyle = 'rgba(200,200,200,0.75)';
					context.fill();
				}
				else if (!isVisible)
				{
					context.beginPath();
					context.rect(rectX-(this.size/2), rectY-(this.size/2), this.size+1, this.size+1);
					context.fillStyle = 'rgba(200,200,200,1)';
					context.fill();
				}
			}
		}
		//context.endPath();*/
	}.bind(this);
	
	this.logic = function(player) {
		/*let cellx = Math.floor(player.x / this.game.size);
		let celly = Math.floor(player.y / this.game.size);
		
		for (var x = 0; x < this.width; x++)
		{
			for (var y = 0; y < this.height; y++)
			{
				if (this.m[y][x] == 1)
				{
					this.m[y][x] = 2;
				}
				
				if (x >= cellx - 1 
					&& x <= cellx + 1
					&& y >= celly - 1
					&& y <= celly + 1)
				{
					this.m[y][x] = 1;
				}	
			}
		}*/
		
		
	}.bind(this);
	
	this.init();
}