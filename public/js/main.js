import Compositor from './Compositor.js';
import { createBackgroundLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgoundSprites } from './sprites.js';
import createMario from './mario.js';
import Timer from './Timer.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


function createSpritesLayer(entity) {
    return function drawBackgroundLayer(context) {
        entity.draw(context);
    }
}

Promise.all([
    createMario(),
    loadBackgoundSprites(),
    loadLevel('1-1')
]).then(([mario, sprites, level]) => {
    const comp = new Compositor();
    comp.add(createBackgroundLayer(level.backgrounds, sprites))
    const graviy = 30;

    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    comp.add(createSpritesLayer(mario));

    const timer = new Timer();

    timer.update = function update(deltaTime) {
            comp.draw(context);
            mario.update(deltaTime);
            mario.vel.y += graviy;
    }

    timer.start()
})