import Compositor from './Compositor.js';
import { createBackgroundLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgoundSprites } from './sprites.js';
import createMario from './mario.js';

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
    const graviy = 0.5;

    comp.add(createSpritesLayer(mario))

    function update() {
        comp.draw(context);
        mario.update();
        mario.vel.y += graviy;
        requestAnimationFrame(update)
    }

    update()
})