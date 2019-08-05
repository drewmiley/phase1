import { AssetNames, Dimensions } from './constants';

export const addSky = add => add.image(0.5 * Dimensions.width, Dimensions.height - 350, AssetNames.Sky);

const generatePlatformDimensions = ({width, height}) => {
    return [
        { x: 0.75 * width, y: height - 200 },
        { x: 0.0625 * width, y: height - 350 },
        { x: 0.9375 * width, y: height - 380 }
    ]
}

export const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platforms.create(0.5 * Dimensions.width, Dimensions.height - 32, AssetNames.Ground).setScale(2).refreshBody()
    generatePlatformDimensions(Dimensions).map(d => platforms.create(d.x, d.y, AssetNames.Ground));
    return platforms;
}

export const addStars = (addPhysics, playerY) => {
    const numberOfStars = 12;
    let stars = addPhysics.group({
        key: AssetNames.Star,
        repeat: numberOfStars - 1,
        setXY: { x: 12, y: playerY - 660, stepX: 70 }
    });
    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
    return stars;
}

export const createBomb = (bombs, playerX, playerY) => {
    const x = (playerX < 0.5 * Dimensions.width) ?
        Phaser.Math.Between(0.5 * Dimensions.width, Dimensions.width) :
        Phaser.Math.Between(0, 0.5 * Dimensions.width);
    const bomb = bombs.create(x, playerY - 660, AssetNames.Bomb);
    bomb.setBounce(1);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}
