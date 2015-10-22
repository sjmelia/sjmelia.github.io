var vector2 = function(x, y) {
    this.x = x;
    this.y = y;

    this.setXY = function(x, y) {
        this.x = x;
        this.y = y;
        this.changed();
    };

    this.setX = function(value) {
        this.x = value;
        this.changed();
    };

    this.setY = function(value) {
        this.y = value;
        this.changed();
    };
};
