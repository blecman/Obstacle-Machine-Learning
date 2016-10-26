function sigmoid(t) {
    return 1/(1+Math.exp( -t));
}

export class Node{
    value: number = 0;
    weights: number[] = [];

    constructor(weights){
        for (let i = 0; i < weights; i++){
            this.weights.push((Math.random()-.5)*50);
        }
    }

}

export class Layer{
    nodes: Node[] = [];

    constructor(nodes: number, weights: number){
        for (let i = 0; i < nodes; i++){
            this.nodes.push(new Node(weights));
        }
    }

    setInput(inputs: number[]){
        for (let i = 0; i < this.nodes.length; i++){
            this.nodes[i].value = inputs[i];
        }
    }

    apply (prevLayer: Layer){
        this.clearValues();
        for (let node of prevLayer.nodes){
            for (let i = 0; i < node.weights.length; i++){
                this.nodes[i].value += node.value * node.weights[i];
            }
        }

        this.applySigmoid();
    }

    getOutput(): number[]{
        let output = [];
        for (let node of this.nodes){
            output.push(node.value > .5 ? 1 : 0);
        }
        return output;
    }

    private clearValues(){
        for (let node of this.nodes){
            node.value = 0;
        }
    }

    private applySigmoid(){
        for (let node of this.nodes){
            node.value = sigmoid(node.value);
        }
    }

}

export class Network{
    layers: Layer[] = [];

    constructor(layerSizes: number[]){
        for (let i = 0; i < layerSizes.length; i++){
            let nextLayerSize = i < layerSizes.length - 1 ? layerSizes[i+1] : 0;
            this.layers.push(new Layer(layerSizes[i], nextLayerSize));
        }
    }

    apply (input: number[]){
        this.layers[0].setInput(input);
        
        for (let i = 1; i < this.layers.length; i++){
            this.layers[i].apply(this.layers[i-1]);
        }

        return this.layers[this.layers.length -1].getOutput();
    }

    getDna (): number[]{
        let dna = [];
        for (let layer of this.layers){
            for (let node of layer.nodes){
                dna = dna.concat(node.weights);
            }
        }

        return dna;
    }

    setDna (dna: number[]){
        for (let layer of this.layers){
            for (let node of layer.nodes){
                node.weights = dna.splice(0,node.weights.length);
            }
        }
    }
}