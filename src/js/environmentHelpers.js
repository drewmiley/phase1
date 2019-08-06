import { AssetNames, Dimensions } from './constants';

export const addSky = add => add.image(0.5 * Dimensions.width, Dimensions.height - 350, AssetNames.Sky);

const generatePlatformDimensions = ({width, height}) => {
    let heightReached = 0;
    let platformDimensions = [];
    let previousWidthProp = null;
    while (heightReached < height - 50) {
        const heightDifference = Phaser.Math.Between(130, 180);
        let widthProp = Phaser.Math.FloatBetween( previousWidthProp < 0.25 ? 0.25: 0.0625, previousWidthProp > 0.75 ? 0.75 : 0.9375);
        while (Math.abs(widthProp - previousWidthProp) < 0.025) {
            widthProp = Phaser.Math.FloatBetween( previousWidthProp < 0.25 ? 0.25: 0.0625, previousWidthProp > 0.75 ? 0.75 : 0.9375);
        }
        platformDimensions.push({ x: widthProp * width, y: height - (heightReached + heightDifference) });
        heightReached += heightDifference;
        previousWidthProp = widthProp;
    }
    return platformDimensions;
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
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}
