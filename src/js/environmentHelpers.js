import { AssetNames, Dimensions } from './constants';

export const addSky = add => add.image(400, 250, AssetNames.Sky);

const platformDimensions = [
    { x: 400, y: 568, ground: true },
    { x: 600, y: 400 },
    { x: 50, y: 250 },
    { x: 750, y: 220 }
]

export const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platformDimensions.map(d => {
        d.ground ?
        platforms.create(d.x, d.y, AssetNames.Ground).setScale(2).refreshBody() :
        platforms.create(d.x, d.y, AssetNames.Ground);
    });
    return platforms;
}

export const addStars = addPhysics => {
    const numberOfStars = 12;
    let stars = addPhysics.group({
        key: AssetNames.Star,
        repeat: numberOfStars - 1,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
    return stars;
}

export const createBomb = (bombs, playerX) => {
    const x = (playerX < 0.5 * Dimensions.width) ?
        Phaser.Math.Between(0.5 * Dimensions.width, Dimensions.width) :
        Phaser.Math.Between(0, 0.5 * Dimensions.width);
    const bomb = bombs.create(x, 16, AssetNames.Bomb);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}
