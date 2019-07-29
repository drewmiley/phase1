import assets from '../assets';

function preload() {
    this.load.image('sky', assets.Sky);
    this.load.image('ground', assets.Platform);
    this.load.image('star', assets.Star);
    this.load.image('bomb', assets.Bomb);
    this.load.spritesheet('dude', assets.Dude, { frameWidth: 32, frameHeight: 48 });
}

export default preload
