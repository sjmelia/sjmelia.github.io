  
	function FpsCalculator()
	{
		this.fps = 30;
		this.now = 0;
		this.then = Date.now();
		this.first = this.then;
		this.interval = 1000/this.fps;
		this.delta = 0;
		this.counter = 0;
		this.time_el = 0;

		this.frame = function() {
			this.now = Date.now();
			this.delta = this.now - this.then;
			if (this.delta > this.interval) {
				this.then = this.now - (this.delta % this.interval);
				this.time_el = (this.then - this.first)/1000;
				this.counter++;
				var fps = Math.floor(this.counter/this.time_el);
				if (this.counter > 300) { this.counter = 0; this.first = this.then; }
				return true;
			}
			return false;
		}
		
		this.fpsString = function() {
			return this.counter 
					+ "/" 
					+ Math.floor(this.time_el) 
					+ " = " 
					+ this.fps 
					+ "fps"
		}
	}

	function Scanvas(id)
	{
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext("2d");
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.getCursorPosition = function(e) {			
			var x;
    			var y;
    			if (e.pageX != undefined && e.pageY != undefined) {
				x = e.pageX;
				y = e.pageY;
    			}
    			else {
				x = e.clientX + document.body.scrollLeft +
            			document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
            			document.documentElement.scrollTop;
    			}

			x -= this.canvas.offsetLeft;
			y -= this.canvas.offsetTop;
			return [x,y];
		}
	}

