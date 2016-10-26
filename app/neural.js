"use strict";
function sigmoid(t) {
    return 1 / (1 + Math.exp(-t));
}
var Node = (function () {
    function Node(weights) {
        this.value = 0;
        this.weights = [];
        for (var i = 0; i < weights; i++) {
            this.weights.push((Math.random() - .5) * 50);
        }
    }
    return Node;
}());
exports.Node = Node;
var Layer = (function () {
    function Layer(nodes, weights) {
        this.nodes = [];
        for (var i = 0; i < nodes; i++) {
            this.nodes.push(new Node(weights));
        }
    }
    Layer.prototype.setInput = function (inputs) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].value = inputs[i];
        }
    };
    Layer.prototype.apply = function (prevLayer) {
        this.clearValues();
        for (var _i = 0, _a = prevLayer.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            for (var i = 0; i < node.weights.length; i++) {
                this.nodes[i].value += node.value * node.weights[i];
            }
        }
        this.applySigmoid();
    };
    Layer.prototype.getOutput = function () {
        var output = [];
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            output.push(node.value > .5 ? 1 : 0);
        }
        return output;
    };
    Layer.prototype.clearValues = function () {
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            node.value = 0;
        }
    };
    Layer.prototype.applySigmoid = function () {
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            node.value = sigmoid(node.value);
        }
    };
    return Layer;
}());
exports.Layer = Layer;
var Network = (function () {
    function Network(layerSizes) {
        this.layers = [];
        for (var i = 0; i < layerSizes.length; i++) {
            var nextLayerSize = i < layerSizes.length - 1 ? layerSizes[i + 1] : 0;
            this.layers.push(new Layer(layerSizes[i], nextLayerSize));
        }
    }
    Network.prototype.apply = function (input) {
        this.layers[0].setInput(input);
        for (var i = 1; i < this.layers.length; i++) {
            this.layers[i].apply(this.layers[i - 1]);
        }
        return this.layers[this.layers.length - 1].getOutput();
    };
    Network.prototype.getDna = function () {
        var dna = [];
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = layer.nodes; _b < _c.length; _b++) {
                var node = _c[_b];
                dna = dna.concat(node.weights);
            }
        }
        return dna;
    };
    Network.prototype.setDna = function (dna) {
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = layer.nodes; _b < _c.length; _b++) {
                var node = _c[_b];
                node.weights = dna.splice(0, node.weights.length);
            }
        }
    };
    return Network;
}());
exports.Network = Network;
//# sourceMappingURL=neural.js.map