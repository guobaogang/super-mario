import Entity from "./Entity.js";
import { loadMarioSprites } from './sprites.js';

export default function createMario() {
    return loadMarioSprites()
        .then(sprite => {
            const mario = new Entity();
            mario.update = function (deltaTime) {
                this.pos.x += this.vel.x * deltaTime;
                this.pos.y += this.vel.y * deltaTime;
            }

            mario.draw = function (context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            }

            return mario;
        })

}