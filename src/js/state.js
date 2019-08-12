import * as environmentHelpers from './environmentHelpers';
import * as playerHelpers from './playerHelpers';

let cursors;
let bombs;
let platforms;
let player;
let stars;

let score = 0;
let scoreText;

const collectStar = stars => (player, star) => {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${ score }`);

    if (stars.countActive(true) === 0) {
        stars.children.iterate(child => child.enableBody(true, child.x, 0, true, true));
    }
}

const gameOver = physics => (player, bomb) => {
    physics.pause();
    scoreText.setText(`Game Over - Score: ${ score }`);
    playerHelpers.stop(player);
}

export function create() {
    this.cameras.main.setBounds(0, 3000, 800, 3600);
    this.physics.world.setBounds(0, 0, 800, 3600);
    const add = this.add;
    const addPhysics = this.physics.add;
    const animations = this.anims;

    cursors = this.input.keyboard.createCursorKeys();

    environmentHelpers.addSky(add);
    scoreText = add.text(16, 16, `Score: ${ score }`, { fontSize: '32px', fill: '#000' });
    platforms = environmentHelpers.addPlatforms(addPhysics);
    player = playerHelpers.addPlayer(addPhysics);
    playerHelpers.createAnimations(animations);
    bombs = addPhysics.group();

    setInterval(() => {
        stars = environmentHelpers.addStars(addPhysics, player.y);
        addPhysics.collider(stars, platforms);
        addPhysics.overlap(player, stars, collectStar(stars), null, this);
    }, 5000);

    setInterval(() => {
        environmentHelpers.createBomb(bombs, player.x, player.y);
        addPhysics.collider(bombs, platforms);
        addPhysics.collider(player, bombs, gameOver(this.physics), null, this);
    }, 5000);

    addPhysics.collider(player, platforms);
}

export function update() {
    if (player.y < 50) {
        this.physics.pause();
        scoreText.setText(`Game Complete - Score: ${ score }`);
        playerHelpers.stop(player);
    }
    if (cursors.left.isDown == cursors.right.isDown) {
        playerHelpers.stop(player);
    } else if (cursors.left.isDown) {
        playerHelpers.turnLeft(player);
    } else if (cursors.right.isDown) {
        playerHelpers.turnRight(player);
    }
    if (player.y < 3300) {
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0, player.y - 600, 800, player.y);
    } else {
        this.cameras.main.stopFollow(player);
        this.cameras.main.setBounds(0, 3000, 800, 3600);
    }

    if (cursors.up.isDown && player.body.touching.down) { playerHelpers.jump(player) }
    if (cursors.down.isDown && !player.body.touching.down) { playerHelpers.stomp(player) }
}
