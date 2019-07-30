import { Animations, AssetNames, Velocity } from './constants';

export const addPlayer = addPhysics => addPhysics
    .sprite(100, 450, AssetNames.Dude)
    .setBounce(0.2)
    .setCollideWorldBounds(true);

export const createAnimations = animations => {
    animations.create({
        key: Animations.Left,
        frames: animations.generateFrameNumbers(AssetNames.Dude, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    animations.create({
        key: Animations.Turn,
        frames: [ { key: AssetNames.Dude, frame: 4 } ],
        frameRate: 20
    });

    animations.create({
        key: Animations.Right,
        frames: animations.generateFrameNumbers(AssetNames.Dude, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

export const turnLeft = player => player
    .setVelocityX(-1 * Velocity.x)
    .anims.play(Animations.Left, true);
export const turnRight = player => player
    .setVelocityX(Velocity.x)
    .anims.play(Animations.Right, true);
export const stop = player => player
    .setVelocityX(0)
    .anims.play(Animations.Turn);
export const jump = player => player.setVelocityY(Velocity.y);
