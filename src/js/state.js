import * as environmentHelpers from './environmentHelpers';
import * as playerHelpers from './playerHelpers';

let cursors;
let bombs;
let platforms;
let player;
let stars;

let score = 0;
let scoreText;

const collectStar = (stars, score, scoreText) => (player, star) => {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${ score }`);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(child => child.enableBody(true, child.x, 0, true, true));
        environmentHelpers.createBomb(bombs, player.x);
    }
}

const gameOver = (physics, scoreText) => (player, bomb) => {
    physics.pause();
    scoreText.setText('Game Over');
    playerHelpers.stop(player);
}

export function create() {
    const add = this.add;
    const addPhysics = this.physics.add;
    const animations = this.anims;

    cursors = this.input.keyboard.createCursorKeys();

    environmentHelpers.addSky(add);
    scoreText = add.text(16, 16, `Score: ${ score }`, { fontSize: '32px', fill: '#000' });
    platforms = environmentHelpers.addPlatforms(addPhysics);
    player = playerHelpers.addPlayer(addPhysics);
    playerHelpers.createAnimations(animations);
    stars = environmentHelpers.addStars(addPhysics);
    bombs = addPhysics.group();

    addPhysics.collider(player, platforms);
    addPhysics.collider(stars, platforms);
    addPhysics.collider(bombs, platforms);
    addPhysics.overlap(player, stars, collectStar(stars, score, scoreText), null, this);
    addPhysics.collider(player, bombs, gameOver(this.physics, scoreText), null, this);
}

export function update() {
    if (cursors.left.isDown == cursors.right.isDown) {
        playerHelpers.stop(player);
    } else if (cursors.left.isDown) {
        playerHelpers.turnLeft(player);
    } else if (cursors.right.isDown) {
        playerHelpers.turnRight(player);
    }

    if (cursors.up.isDown && player.body.touching.down) { playerHelpers.jump(player) }
}
