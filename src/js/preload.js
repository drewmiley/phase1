import assets from '../assets';
import { AssetNames } from './constants';

export default function() {
    this.load.image(AssetNames.Sky, assets.Sky);
    this.load.image(AssetNames.Ground, assets.Platform);
    this.load.image(AssetNames.Star, assets.Star);
    this.load.image(AssetNames.Bomb, assets.Bomb);
    this.load.spritesheet(AssetNames.Dude, assets.Dude, { frameWidth: 32, frameHeight: 48 });
}
