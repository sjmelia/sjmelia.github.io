var animation = function(image, width, height, frames, sheetY) {
            this.image = image;
            this.width = width;
            this.height = height;
            this.frameY = this.height * sheetY;
            this.frames = frames;
            this.frame = 0;
            this.speed = 0;
            this.ended = false;

            this.render = function(context, x, y) {
                var frameX = this.frame * this.width;
                context.drawImage(this.image, frameX, this.frameY, this.width, this.height, x, y, this.width, this.height); 
            };

            this.logic = function() {
                this.frame += this.speed;

                if (this.frame > this.frames)
                {
                    this.frame = 0;
                    if (this.ended)
                        this.ended();
                }
            };

            this.reset = function() {
                this.frame = 0;
            };

            this.start = function() {
                this.speed = 1;
            };

            this.stop = function() {
                this.speed = 0;
                if (this.ended)
                    this.ended();
            };
        }

