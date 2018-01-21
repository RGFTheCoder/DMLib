DMLib.util.loadLib("terra", start);

function start() {
    this[prompt("Which Sim?")]();
};

function AntFarm() {
    terra.registerCreature({
        type: 'Dirt',
        color: [38, 38, 38],
        size: 10,
        maxEnergy: 10,
        reproduceLv: 2,
        wait: function() { this.energy = 10 },
        move: false
    });

    terra.registerCreature({
        type: 'Food',
        color: [38, 217, 217],
        size: 10,
        maxEnergy: 100,
        reproduceLv: 2,
        wait: function() { this.energy = 100 },
        move: false
    });

    terra.registerCreature({
        type: 'Ant',
        color: [120, 0, 240],
        sustainability: 1,
        reproduceLv: 0.99999,
        actionRadius: 1
    });

    var ex1 = new terra.Terrarium(100, 100, { id: 'ex1' });
    ex1.grid = ex1.makeGridWithDistribution([
        ['Dirt', 98.99],
        ['Food', 1],
        ['Ant', 0.01]
    ]);

    ex1.animate();
};

function BrutesAndBullies() {
    // the demo running at the top of this page
    var bbTerrarium = new terra.Terrarium(25, 25);

    terra.registerCreature({
        type: 'plant',
        color: [0, 120, 0],
        size: 10,
        initialEnergy: 5,
        maxEnergy: 20,
        wait: function() {
            // photosynthesis :)
            this.energy += 1;
        },
        move: false,
        reproduceLv: 0.65
    });

    terra.registerCreature({
        type: 'brute',
        color: [0, 255, 255],
        maxEnergy: 50,
        initialEnergy: 10,
        size: 20
    });

    terra.registerCreature({
        type: 'bully',
        color: [241, 196, 15],
        initialEnergy: 20,
        reproduceLv: 0.6,
        sustainability: 3
    });

    bbTerrarium.grid = bbTerrarium.makeGridWithDistribution([
        ['plant', 50],
        ['brute', 5],
        ['bully', 5]
    ]);
    bbTerrarium.animate();
};

function AntFarm() {
    terra.registerCreature({
        type: 'Dirt',
        color: [38, 38, 38],
        size: 10,
        maxEnergy: 10,
        reproduceLv: 2,
        wait: function() { this.energy = 10 },
        move: false
    });

    terra.registerCreature({
        type: 'Food',
        color: [38, 217, 217],
        size: 10,
        maxEnergy: 100,
        reproduceLv: 2,
        wait: function() { this.energy = 100 },
        move: false
    });

    terra.registerCreature({
        type: 'Ant',
        color: [120, 0, 240],
        sustainability: 1,
        reproduceLv: 0.99999,
        actionRadius: 1
    });

    var ex1 = new terra.Terrarium(100, 100, { id: 'ex1' });
    ex1.grid = ex1.makeGridWithDistribution([
        ['Dirt', 98.99],
        ['Food', 1],
        ['Ant', 0.01]
    ]);

    ex1.animate();
};