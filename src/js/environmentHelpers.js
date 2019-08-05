import { AssetNames, Dimensions } from './constants';

export const addSky = add => add.image(0.5 * Dimensions.width, Dimensions.height - 350, AssetNames.Sky);

const platformDimensions = [
    { x: 0.75 * Dimensions.width, y: Dimensions.height - 200 },
    { x: 0.0625 * Dimensions.width, y: Dimensions.height - 350 },
    { x: 0.9375 * Dimensions.width, y: Dimensions.height - 380 }
]

export const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platforms.create(0.5 * Dimensions.width, Dimensions.height - 32, AssetNames.Ground).setScale(2).refreshBody()
    platformDimensions.map(d => platforms.create(d.x, d.y, AssetNames.Ground));
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
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}
