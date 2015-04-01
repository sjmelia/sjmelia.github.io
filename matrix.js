function vector3(a1, b1, c1)
{
    this.a1 = a1;
    this.b1 = b1;
    this.c1 = c1;
}

function matrix3(a1, a2, a3, b1, b2, b3, c1, c2, c3)
{
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;

    this.multiplyVector3 = function(other) {
        var a1 = (this.a1 * other.a1) + (this.a2 * other.b1) + (this.a3 * other.c1);
        var b1 = (this.b1 * other.a1) + (this.b2 * other.b1) + (this.b3 * other.c1);
        var c1 = (this.c1 * other.a1) + (this.c2 * other.b1) + (this.c3 * other.c1);
        return new vector3(a1, b1, c1);
    };

    this.multiplyMatrix3 = function(other) {
        var a1 = (this.a1 * other.a1) + (this.a2 * other.b1) + (this.a3 * other.c1);
        var a2 = (this.a1 * other.a2) + (this.a2 * other.b2) + (this.a3 * other.c2);
        var a3 = (this.a1 * other.a3) + (this.a2 * other.b3) + (this.a3 * other.c3);

        var b1 = (this.b1 * other.a1) + (this.b2 * other.b1) + (this.b3 * other.c1);
        var b2 = (this.b1 * other.a2) + (this.b2 * other.b2) + (this.b3 * other.c2);
        var b3 = (this.b1 * other.a3) + (this.b2 * other.b3) + (this.b3 * other.c3);

        var c1 = (this.c1 * other.a1) + (this.c2 * other.b1) + (this.c3 * other.c1);
        var c2 = (this.c1 * other.a2) + (this.c2 * other.b2) + (this.c3 * other.c2);
        var c3 = (this.c1 * other.a3) + (this.c2 * other.b3) + (this.c3 * other.c3);

        return new matrix3(a1, a2, a3, b1, b2, b3, c1, c2, c3);
    };

    this.multiply = function(other) {
        if (other instanceof matrix3)
        {
            return this.multiplyMatrix3(other);
        }

        if (other instanceof vector3)
        {
            return this.multiplyVector3(other);
        }

        throw "Can only multiply matrix3 by a matrix3 or vector3";
    };

    this.scale = function(x, y) {
        var scale = new matrix3(x,0,0,0,y,0,0,0,1);
        return this.multiply(scale);
    };

    this.rotate = function(angle) {
        var rotation = new matrix3(Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle), 0, 0, 0, 1);
        return this.multiply(rotation);
    };

    this.shear = function(x, y) {
        var shearMatrix = new matrix3(1,x,0,y,1,0,0,0,1);
        return this.multiply(shearMatrix);
    };

    this.translate = function(x, y) {
        var translation = new matrix3(1,0,x,0,1,y,0,0,1);
        return this.multiply(translation);
    };

}
