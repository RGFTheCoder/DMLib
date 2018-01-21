var canvas;
var ctx;

var setColor;

var colors = {};

colors.red = "#df4b26";
colors.purple = "#cb3594";
colors.green = "#659b41";
colors.yellow = "#ffcf33";
colors.brown = "#986928";

var curColor = colors.red;
var clickColor = new Array();

var sizes = {};

sizes.small = "small";
sizes.normal = "normal";
sizes.large = "large";
sizes.huge = "huge";

var clickSize = new Array();
var curSize = sizes.normal;

var clickTool = new Array();
var curTool = "marker";

window.onload = (function() {
    canvas = DMLib.canvas.new("drawing");
    ctx = canvas.element.getContext("2d");

    function onElementFocused(e) {
        if (e && e.target) {

            document.activeElement = e.target == document ? null : e.target;
        }
    }

    if (document.addEventListener) {
        canvas.element.addEventListener("focus", onElementFocused, true);
    }

    canvas.set("onmousedown", function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    canvas.set("onmousemove", function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    canvas.set("onmouseup", function(e) {
        paint = false;
    });

    canvas.set("onmouseleave", function(e) {
        paint = false;
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        if (curTool == "eraser") {
            clickColor.push("white");
        } else {
            clickColor.push(curColor);
        }
        clickSize.push(curSize);
    }

    function redraw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

        ctx.lineJoin = "round";

        var radius;


        for (var i = 0; i < clickX.length; i++) {

            if (clickSize[i] == "small") {
                radius = 2;
            } else if (clickSize[i] == "normal") {
                radius = 5;
            } else if (clickSize[i] == "large") {
                radius = 10;
            } else if (clickSize[i] == "huge") {
                radius = 20;
            }

            ctx.beginPath();
            if (clickDrag[i] && i) {
                ctx.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                ctx.moveTo(clickX[i] - 1, clickY[i]);
            }
            ctx.lineTo(clickX[i], clickY[i]);
            ctx.closePath();
            ctx.strokeStyle = clickColor[i];
            ctx.lineWidth = radius;
            ctx.stroke();
        }
        context.globalAlpha = 1;
    }


});