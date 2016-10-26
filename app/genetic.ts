function compareFitness(a,b){
    if (a['fitness'] > b['fitness']){
        return 1;
    } else if (a['fitness'] < b['fitness']){
        return -1;
    }
    return 0;
}

function normalizeFitness(dnas){
    let fitnessSum = 0;
    for (let dna of dnas){
        fitnessSum += dna.fitness;
    }
    for (let dna of dnas){
        dna.firtness = dna.fitness/fitnessSum;
    }
    return dnas;
}

function prepDnas(dnas){
    dnas.sort(compareFitness);
    dnas = dnas.splice(Math.floor(2*dnas.length/3), dnas.length);
    dnas = normalizeFitness(dnas);
    return dnas;
}

export function reproduce(dnas){
    let originalLength = dnas.length;
    dnas = prepDnas(dnas);
    let newDnas = [dnas[dnas.length-1]['dna'], dnas[dnas.length-2]['dna']] //elitism
    while (newDnas.length < originalLength){
        let dna1 = select(dnas)['dna'];
        let dna2 = select(dnas)['dna'];
        let newDna = crossover(dna1, dna2);
        newDna = mutate(newDna);
        newDnas.push(newDna);
    }
    return newDnas;
}

function select(dnas){
    let r = Math.random();
    for (let dna of dnas){
        r -= dna.fitness;
        if (r <= 0) { return dna; }
    }
    return dnas[dnas.length -1];
}

function crossover (dna1, dna2){
    let newDna = [];
    let crossoverRate = .8;
    for (let i = 0; i < dna1.length; i++){
        if (Math.random() > crossoverRate){
            newDna.push(dna2[i]);
        } else {
            newDna.push(dna1[i]);
        }
    }
    return newDna;
}

function mutate (dna){
    let mutationRate = .1;
    for (let i = 0; i < dna.length; i++){
        if (Math.random() <= mutationRate){
            dna[i] = (Math.random()-.5)*50;
        }
    }
    return dna;
}