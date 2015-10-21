var vector2 = function(x, y) {
    this.x = x;
    this.y = y;
    this.xChanged = [];
    this.yChanged = [];

    this.addXChangedListener = function(listener) {
        this.xChanged.push(listener);
    };

    this.addYChangedListener = function(listener) {
        this.yChanged.push(listener);
    };

    this.notify = function(listeners) {
        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i]();
            };
        }
    };

    this.setX = function(value) {
        this.x = value;
        this.notify(this.xChanged);
    };

    this.setY = function(value) {
        this.y = value;
        this.notify(this.yChanged);
    };
};
