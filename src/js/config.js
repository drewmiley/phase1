import { Dimensions, Gravity } from './constants';
import preload from './preload';
import * as state from './state';

const config = {
    type: Phaser.AUTO,
    width: Dimensions.width,
    height: Dimensions.height,
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
