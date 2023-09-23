import BaseLevel from './baseLevel';
import { setText } from '../textManager';
import { wait } from '../utils';
import Mouse from '../utils/mouse';
import { throttle } from "lodash";

class Level extends BaseLevel {
  constructor(options) {
    super(options);
    this.lastOscillator = null;
    this.playSoundDebounced = throttle(this.playSound.bind(this), 100);
  }

  playSound(frequency, duration = 10000000) {
    this.audioCtx = this.audioCtx ||  new(window.AudioContext || window.webkitAudioContext)();
    if(this.lastOscillator) {
      // this.lastOscillator.stop();
      this.lastOscillator.frequency.value = frequency;
      return
    }
    // create web audio api context
    let notes;// create Oscillator node
    const oscillator = this.audioCtx.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(this.audioCtx.destination);
    oscillator.start();
    this.lastOscillator = oscillator;

    setTimeout(
      function() {
        oscillator.stop();
      }, duration);
  }

  onLevelReady() {
    let isBulbOn = false;
    let isBubbleMoved = false;
    const initialBulbY = this.level.bulb.y;
    this.level.textField.text = '';
    this.level.textField2.text = '';
    this.level.head.alpha = 0;
    setText(this.level.textField, 'You are nothing').then(() => wait(1000)).then(() => {
      setText(this.level.textField, 'Get the light').then();
    });


    // this.level.hitArea0.alpha = 0.1;
    this.level.hitArea0.addEventListener('pressmove', () => {
      // const scale = window.innerHeight / 1280;
      // console.log('pressmove', stage.scaleY, stage.scaleX, scale, stage.mouseY);
      isBubbleMoved = true;
      // this.level.bulb.y = stage.mouseY;
      this.level.hitArea0.y = Mouse.y;
      this.level.bulb.y = Mouse.y;
      this.playSound(Mouse.y/3);
      const distance = this.level.head.y - this.level.bulb.y;
      // this.level.head.alpha = 0.2 + this.level.bulb.y / this.level.head.y
      this.level.head2.alpha = -0.4 +  this.level.bulb.y / this.level.head.y
    });

    this.level.hitArea0.addEventListener('click', () => {
      this.audioCtx = this.audioCtx ||  new(window.AudioContext || window.webkitAudioContext)();
      if(isBubbleMoved) {
        isBubbleMoved = false;
        return;
      }
      if(isBulbOn) {
        this.level.textField2.text = '';
        console.log('createjs', createjs);
        this.level.bulb.gotoAndStop(0);
        this.level.head.alpha = 0;
        // setText(this.level.textField, 'You are something');
        // this.level.textField.alpha = 1;
        isBulbOn = false;
        this.level.darkness.gotoAndStop(0);
      } else {
        createjs.Tween.get(this.level.bulb).to({y: initialBulbY}, 200).call(() => {});
        createjs.Tween.get(this.level.hitArea0).to({y: initialBulbY}, 200).call(() => {});
        setText(this.level.textField2, 'You are idea');
        this.level.darkness.play();
        this.level.bulb.gotoAndStop(1);
        this.level.bulb.light.gotoAndPlay(1);
        this.level.bulb.light2.gotoAndPlay(1);
        // this.level.head.alpha = 0.2 + this.level.bulb.y / this.level.head.y;
        this.level.head.alpha = 1;
        // setText(this.level.textField, 'You are something');
        this.level.textField.alpha = 0;
        isBulbOn = true;
      }
    });
  }
}

export default Level;