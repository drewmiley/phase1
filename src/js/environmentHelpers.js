import { AssetNames } from './constants';

export const addSky = add => add.image(400, 300, AssetNames.Sky);

export const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platforms.create(400, 568, AssetNames.Ground).setScale(2).refreshBody();
    platforms.create(600, 400, AssetNames.Ground)
    platforms.create(50, 250, AssetNames.Ground);
    platforms.create(750, 220, AssetNames.Ground);
    return platforms;
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
