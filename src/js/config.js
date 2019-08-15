import { Gravity, WorldBounds } from './constants';
import preload from './preload';
import * as state from './state';

const config = {
    type: Phaser.AUTO,
    width: WorldBounds.width,
    height: WorldBounds.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: Gravity,
            debug: false
        }
    },
    scene: {
        preload,
        create: state.create,
        update: state.update
    }
};

export default config;
