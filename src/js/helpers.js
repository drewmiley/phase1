import { Animations, AssetNames, Velocity } from './constants';

export const addSky = add => add.image(400, 300, AssetNames.Sky);

export const addScoreText = (add, score) => add.text(16, 16, `Score: ${ score }`, { fontSize: '32px', fill: '#000' });

export const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platforms.create(400, 568, AssetNames.Ground).setScale(2).refreshBody();
    platforms.create(600, 400, AssetNames.Ground)
    platforms.create(50, 250, AssetNames.Ground);
    platforms.create(750, 220, AssetNames.Ground);
    return platforms;
}

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

export const addStars = addPhysics => {
    let stars = addPhysics.group({
        key: AssetNames.Star,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
    return stars;
}

export const createBomb = (bombs, playerX) => {
    const x = (playerX < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = bombs.create(x, 16, AssetNames.Bomb);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
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
