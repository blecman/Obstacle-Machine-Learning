"use strict";
function compareFitness(a, b) {
    if (a['fitness'] > b['fitness']) {
        return 1;
    }
    else if (a['fitness'] < b['fitness']) {
        return -1;
    }
    return 0;
}
function normalizeFitness(dnas) {
    var fitnessSum = 0;
    for (var _i = 0, dnas_1 = dnas; _i < dnas_1.length; _i++) {
        var dna = dnas_1[_i];
        fitnessSum += dna.fitness;
    }
    for (var _a = 0, dnas_2 = dnas; _a < dnas_2.length; _a++) {
        var dna = dnas_2[_a];
        dna.firtness = dna.fitness / fitnessSum;
    }
    return dnas;
}
function prepDnas(dnas) {
    dnas.sort(compareFitness);
    dnas = dnas.splice(Math.floor(2 * dnas.length / 3), dnas.length);
    dnas = normalizeFitness(dnas);
    return dnas;
}
function reproduce(dnas) {
    var originalLength = dnas.length;
    dnas = prepDnas(dnas);
    var newDnas = [dnas[dnas.length - 1]['dna'], dnas[dnas.length - 2]['dna']]; //elitism
    while (newDnas.length < originalLength) {
        var dna1 = select(dnas)['dna'];
        var dna2 = select(dnas)['dna'];
        var newDna = crossover(dna1, dna2);
        newDna = mutate(newDna);
        newDnas.push(newDna);
    }
    return newDnas;
}
exports.reproduce = reproduce;
function select(dnas) {
    var r = Math.random();
    for (var _i = 0, dnas_3 = dnas; _i < dnas_3.length; _i++) {
        var dna = dnas_3[_i];
        r -= dna.fitness;
        if (r <= 0) {
            return dna;
        }
    }
    return dnas[dnas.length - 1];
}
function crossover(dna1, dna2) {
    var newDna = [];
    var crossoverRate = .8;
    for (var i = 0; i < dna1.length; i++) {
        if (Math.random() > crossoverRate) {
            newDna.push(dna2[i]);
        }
        else {
            newDna.push(dna1[i]);
        }
    }
    return newDna;
}
function mutate(dna) {
    var mutationRate = .1;
    for (var i = 0; i < dna.length; i++) {
        if (Math.random() <= mutationRate) {
            dna[i] = (Math.random() - .5) * 50;
        }
    }
    return dna;
}
//# sourceMappingURL=genetic.js.map