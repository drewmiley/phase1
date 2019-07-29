import { Animations, AssetNames, Velocity } from './constants';

let cursors;
let bombs;
let platforms;
let player;
let stars;

let score = 0;
let scoreText;

const addSky = add => add.image(400, 300, AssetNames.Sky);

const addScoreText = (add, score) => add.text(16, 16, `score: ${ score }`, { fontSize: '32px', fill: '#000' });

const addPlatforms = addPhysics => {
    let platforms = addPhysics.staticGroup();
    platforms.create(400, 568, AssetNames.Ground).setScale(2).refreshBody();

    platforms.create(600, 400, AssetNames.Ground);
    platforms.create(50, 250, AssetNames.Ground);
    platforms.create(750, 220, AssetNames.Ground);
    return platforms;
}

const addPlayer = addPhysics => {
    player = addPhysics.sprite(100, 450, AssetNames.Dude);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    return player;
}

const createAnimations = animations => {
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

const addStars = addPhysics => {
    let stars = addPhysics.group({
        key: AssetNames.Star,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));
    return stars;
}

const createBomb = (bombs, playerX) => {
    const x = (playerX < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = bombs.create(x, 16, AssetNames.Bomb);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

export function create() {
    const add = this.add;
    const addPhysics = this.physics.add;
    const animations = this.anims;

    cursors = this.input.keyboard.createCursorKeys();

    addSky(add);
    scoreText = addScoreText(add, score);
    platforms = addPlatforms(addPhysics);
    player = addPlayer(addPhysics);
    createAnimations(animations);
    stars = addStars(addPhysics);
    bombs = addPhysics.group();

    addPhysics.collider(player, platforms);
    addPhysics.collider(stars, platforms);
    addPhysics.collider(bombs, platforms);

    function collectStar(player, star){
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate(child => child.enableBody(true, child.x, 0, true, true));
            createBomb(bombs, player.x);
        }
    }

    addPhysics.overlap(player, stars, collectStar, null, this);

    function hitBomb(player, bomb){
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play(Animations.Turn);
    }

    addPhysics.collider(player, bombs, hitBomb, null, this);
}

export function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-1 * Velocity.x);
        player.anims.play(Animations.Left, true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(Velocity.x);
        player.anims.play(Animations.Right, true);
    } else {
        player.setVelocityX(0);
        player.anims.play(Animations.Turn);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(Velocity.y);
    }
}
