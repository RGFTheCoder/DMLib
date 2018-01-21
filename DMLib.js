var DMLib = function() {}; //Make DMLIB an object

//Setup Var
DMLib.libraries = {
    terra: "https://cdn.jsdelivr.net/terra/latest/mainfile",
    processing: "https://raw.githubusercontent.com/processing-js/processing-js/v1.4.8/processing.min.js",
    three: "https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js",
    pixi: "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js",
    angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js",
    angularbeta: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js",
    matter: "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js"
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
        return new DMLib.dom.classes.elementGroup(document.querySelectorAll(selector));
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
    })
};

DMLib.dom.classes.elementGroup.prototype = {
    html: (function(html) {
        if (html) {
            this.elements.forEach(element => {
                element.innerHTML = html;
            });
            return true;
        } else {
            var allHtml = "";
            this.elements.forEach(element => {
                allHtml += element.innerHTML;
            });
            return allHtml;
        }
    }),
    css: (function(style, value) {
        if (value) {
            this.elements.forEach(element => {
                element.style[style] = value;
            });
        } else {
            var allCSS = "";
            this.elements.forEach(element => {
                allCSS += element.style[style];
            });
            return allCSS;
        }
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
    })
};