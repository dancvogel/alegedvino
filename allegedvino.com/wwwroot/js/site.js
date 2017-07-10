// Write your Javascript code.
var site = {
    isInputDown: false,
    shapes: [],
    circleCount: 20,
    context: undefined
};

function onInputUp(e) {
    site.isInputDown = false;
    e.preventDefault();
}

function onInputStart(e) {
    site.isInputDown = true;

    site.shapes.push(new Blob(e.clientX - this.offsetLeft, e.clientY - this.offsetTop));
    e.preventDefault();
}

function onInputMove(e) {
    if (!site.isInputDown) {
        return;
    }

    site.shapes[site.shapes.length - 1].addPoint(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);
    e.preventDefault();
}

$(document).ready(function () {
    for (var i = 0; i < site.circleCount; i++) {
        site.shapes.push(new Circle(400, 300));
    }

    canvas.addEventListener('mouseup', onInputUp, false);
    canvas.addEventListener('touchend', onInputUp, false);
    canvas.addEventListener('mousemove', onInputMove, false);
    canvas.addEventListener('mousedown', onInputStart, false);
    canvas.addEventListener('touchstart', function (e) {
        onInputStart(e.changedTouches[0]); // reference first touch point for this event
    }, false);
    canvas.addEventListener('touchmove', function (e) {
        onInputMove(e.changedTouches[0]); // reference first touch point for this event
    }, false);

    setInterval(function () {
        var context = document.getElementById("canvas").getContext("2d");
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight - 60;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < site.shapes.length; i++) {
            site.shapes[i].draw(context);
            site.shapes[i].update();
        }
    }, 50);
});