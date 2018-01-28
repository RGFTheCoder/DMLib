var DMLib = function() {}; //Make DMLIB an object

//Setup Var
DMLib.libraries = {
    terra: "https://cdn.jsdelivr.net/terra/latest/mainfile",
    processing: "https://raw.githubusercontent.com/processing-js/processing-js/v1.4.8/processing.min.js",
    three: "https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js",
    pixi: "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js",
    angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js",
    angularbeta: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js",
    create: "https://code.createjs.com/createjs-2015.11.26.min.js",
    easel: "https://code.createjs.com/easeljs-0.8.2.min.js",
    tween: "https://code.createjs.com/tweenjs-0.6.2.min.js",
    sound: "https://code.createjs.com/soundjs-0.6.2.min.js",
    preload: "https://code.createjs.com/preloadjs-0.6.2.min.js",
    d3: "https://d3js.org/d3.v4.min.js",
    paper: "https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.11.5/paper-full.min.js",
    p5: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.min.js",
    matter: "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js",
    math: "https://cdnjs.cloudflare.com/ajax/libs/mathjs/3.20.1/math.min.js",
    deeplearn: "https://cdn.jsdelivr.net/npm/deeplearn",
    p5dom: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.dom.min.js",
    p5sound: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/addons/p5.sound.min.js"


};

//Setup Modules
DMLib.base = DMLib;
DMLib.temp = {};
DMLib.util = {};
DMLib.dom = {};
DMLib.canvas = {};

//MODULE TEMP
DMLib.temp = {
    ping: (function() {
        return "pong";
    }),
    classes: {}
};

//MODULE UTIL
DMLib.util = {
    file: {
        require: (function(url, callback = (function() {})) {

            var script = document.createElement("script")
            script.type = "text/javascript";

            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { //Others
                script.onload = function() {
                    callback();
                };
            }

            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }),
        loadFile: (function(filepath) {
            var json;
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', filepath, false); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function() {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    json = xobj.responseText;
                }
            };
            xobj.send(null);

            return json;
        }),
        loadJSON: (function(filepath) {
            return JSON.parse(DMLib.util.file.loadFile(filepath));
        }),
        requireMany: (function(url, callback = (function() {})) {
            for (i = 0; i < url.length; i++) {
                var script = document.createElement("script")
                script.type = "text/javascript";
                script.src = url[i];
                setTimeout(document.getElementsByTagName("head")[0].appendChild(script), 100);
            }

            setTimeout(callback, 1000);
        })
    },
    loadLib: (function(name, callback) {
        DMLib.util.file.require(DMLib.libraries[name], callback);
        console.log("Loaded " + (name.charAt(0).toUpperCase() + name.slice(1)) + " Library");
    })
};

//MODULE DOM
DMLib.dom = {
    get: (function(selector) {
        return new DMLib.dom.classes.element(document.querySelectorAll(selector)[0]);
    }),
    getAll: (function(selector) {
        var elArr = [];
        document.querySelectorAll(selector).forEach(element => {
            elArr.push(new DMLib.dom.classes.element(element));
        });
        return new DMLib.dom.classes.elementGroup(elArr);
    }),
    classes: {
        element: (function(element) {
            this.element = element;
        }),
        elementGroup: (function(elements) {
            this.elements = elements;
        })
    }

};

DMLib.dom.classes.element.prototype = {
    html: (function(html) {
        if (html) {
            return this.element.innerHTML = html;
        } else {
            return this.element.innerHTML;
        }
    }),
    css: (function(style, value) {
        if (value) {
            this.element.style[style] = value;
        } else {
            return this.element.style[style];
        }
    }),
    set: (function(property, value) {
        return this.element[property] = value;
    }),
    get: (function(property) {
        return this.element[property];
    }),
    event: (function(event, func) {
        if (document.addEventListener) {
            this.element.addEventListener(event, func, true);
        }
    })
};

DMLib.dom.classes.elementGroup.prototype = {
    html: (function(html) {
        if (html) {
            this.elements.forEach(element => {
                element.element.innerHTML = html;
            });
            return true;
        } else {
            var allHtml = [];
            this.elements.forEach(element => {
                allHtml.push(element.element.innerHTML);
            });
            return allHtml;
        }
    }),
    css: (function(style, value) {
        if (value) {
            this.elements.forEach(element => {
                element.element.style[style] = value;
            });
            return true;
        } else {
            var allCSS = [];
            this.elements.forEach(element => {
                allCSS.push(element.element.style[style]);
            });
            return allCSS;
        }
    }),
    set: (function(property, value) {
        this.elements.forEach(element => {
            element.element[property] = value;
        });
        return true;
    }),
    get: (function(property) {
        var allProp = [];
        this.elements.forEach(element => {
            allProp.push(element.element[property]);
        });
        return alallProplCSS;
    })
};

//MODULE CANVAS
DMLib.canvas = {
    new: (function(id, width, height) {
        var canvas = document.createElement("canvas");
        canvas.id = id || "dmlibcanvas";
        canvas.width = width || "640";
        canvas.height = height || "360";

        document.body.appendChild(canvas);
        return new DMLib.dom.classes.element(document.getElementById(canvas.id));
    }),
    export: (function(canvas, img) {
        img.set("src", canvas.element.toDataURL("image/png;base64;"));
    })
};