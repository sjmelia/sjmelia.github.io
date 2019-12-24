var maze = function(cellSize, mazeWidth, mazeHeight, canvasWidth, canvasHeight) {
	this.width = mazeWidth;
	this.height = mazeHeight;
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.cellSize = cellSize;
	this.canvasWidthCells = this.canvasWidth / this.cellSize;
	this.canvasHeightCells = this.canvasHeight / this.cellSize;
	
	this.init = function() {
		console.log("Canvas Width (px/cells): " + this.canvasWidth + "/" + this.canvasWidthCells + " Canvas Height (cells): " + this.canvasHeightCells);
		this.cells = this.generate2(this.width, this.height);
		
	};
	
	// Find a random empty cell (not a wall)	
	this.findRandom = function() {
		let realWidth = mazeWidth * 2 + 1;
		let realHeight = mazeHeight * 2 + 1;
		while (true)
		{
			let x = Math.floor(Math.random()*realWidth);
			let y = Math.floor(Math.random()*realHeight);
			
			if (!this.cells[y][x])
			{
				return { "x": x, "y": y };
			}
		}
	}
	
	this.render = function(context, player) {
		let cellx = Math.floor(player.x / this.cellSize);
		let celly = Math.floor(player.y / this.cellSize);
		
		let startx = cellx - (this.canvasWidthCells / 2);
		let endx = startx + this.canvasWidthCells;
		let starty = celly - (this.canvasHeightCells / 2);
		let endy = starty + this.canvasWidthCells;
		
		let maxWidth = this.width*2+1;
		let maxHeight = this.height*2+1;
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
				
				var isWall = this.cells[y][x];
				if (isWall) 
				{
					let rectX = (x - startx) * this.cellSize;
					let rectY = (y - starty) * this.cellSize;
					context.rect(rectX - (this.cellSize/2), rectY-(this.cellSize/2), this.cellSize, this.cellSize);
					context.fillStyle = 'black';
					context.fill();
				}
			}
		}
		//context.endPath();
	}.bind(this);

	this.toString = function(m) {
		var text= [];
		for (var j= 0; j<m.x*2+1; j++) {
			var line= [];
			if (0 == j%2)
				for (var k=0; k<m.y*4+1; k++)
					if (0 == k%4) 
						line[k]= '+';
					else
						if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
							line[k]= ' ';
						else
							line[k]= '-';
			else
				for (var k=0; k<m.y*4+1; k++)
					if (0 == k%4)
						if (k>0 && m.horiz[(j-1)/2][k/4-1])
							line[k]= ' ';
						else
							line[k]= '|';
					else
						line[k]= ' ';
			if (0 == j) line[1]= line[2]= line[3]= ' ';
			if (m.x*2-1 == j) line[4*m.y]= ' ';
			text.push(line.join('')+'\r\n');
		}
		return text.join('');
	}

	this.generate2 = function(x, y) {
		var m = this.generate(x, y);
		console.log(this.toString(m));
		var text= [];
		for (var j= 0; j<m.x*2+1; j++) {
			var line= [];
			if (0 == j%2)
				for (var k=0; k<m.y*2+1; k++)
					if (0 == k%2) 
						line[k]= true;
					else
						if (j>0 && m.verti[j/2-1][Math.floor(k/2)])
							line[k]= false;
						else
							line[k]= true;
			else
				for (var k=0; k<m.y*2+1; k++)
					if (0 == k%2)
						if (k>0 && m.horiz[(j-1)/2][k/2-1])
							line[k]= false;
						else
							line[k]= true;
					else
						line[k]= false;
			if (0 == j) line[1] = false;
			if (m.x*2-1 == j) line[2*m.y]= false;
			text.push(line);
		}
		
		
		for (var i = 0; i < (x*2); i++)
		{
			var line= [];
			for (var j = 0; j < (y*2); j++)	
			{
				if (text[i][j]) {
					line.push("X");
				}
				else
				{
					line.push("O");
				}
			}
			console.log(line.join(''));
		}
		return text;
	}

	// https://rosettacode.org/wiki/Maze_generation#JavaScript
	this.generate = function(x,y) {
		var n=x*y-1;
		if (n<0) {alert("illegal maze dimensions");return;}
		var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
			verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
			here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
			path = [here],
			unvisited = [];
		for (var j = 0; j<x+2; j++) {
			unvisited[j] = [];
			for (var k= 0; k<y+1; k++)
				unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
		}
		while (0<n) {
			var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
				[here[0]-1, here[1]], [here[0],here[1]-1]];
			var neighbors = [];
			for (var j = 0; j < 4; j++)
				if (unvisited[potential[j][0]+1][potential[j][1]+1])
					neighbors.push(potential[j]);
			if (neighbors.length) {
				n = n-1;
				next= neighbors[Math.floor(Math.random()*neighbors.length)];
				unvisited[next[0]+1][next[1]+1]= false;
				if (next[0] == here[0])
					horiz[next[0]][(next[1]+here[1]-1)/2]= true;
				else 
					verti[(next[0]+here[0]-1)/2][next[1]]= true;
				path.push(here = next);
			} else 
				here = path.pop();
		}
		return {x: x, y: y, horiz: horiz, verti: verti};
	}
	
	this.init();
}