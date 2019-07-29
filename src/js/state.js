import { Animations, AssetNames, Velocity } from './constants';

let cursors;
let bombs;
let platforms;
let player;
let stars;

let score = 0;
let scoreText;

export function create() {
    this.add.image(400, 300, AssetNames.Sky);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, AssetNames.Ground).setScale(2).refreshBody();

    platforms.create(600, 400, AssetNames.Ground);
    platforms.create(50, 250, AssetNames.Ground);
    platforms.create(750, 220, AssetNames.Ground);

    player = this.physics.add.sprite(100, 450, AssetNames.Dude);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: Animations.Left,
        frames: this.anims.generateFrameNumbers(AssetNames.Dude, { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: Animations.Turn,
        frames: [ { key: AssetNames.Dude, frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: Animations.Right,
        frames: this.anims.generateFrameNumbers(AssetNames.Dude, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: AssetNames.Star,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function(child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    function collectStar(player, star){
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate(function(child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = bombs.create(x, 16, AssetNames.Bomb);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    this.physics.add.overlap(player, stars, collectStar, null, this);
    function hitBomb(player, bomb){
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play(Animations.Turn);
    }
    this.physics.add.collider(player, bombs, hitBomb, null, this);
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
