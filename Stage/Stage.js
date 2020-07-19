import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.myVariable = 0;
    this.vars.realNum1 = -0.11800000000000033;
    this.vars.imagNum1 = -10.3462;
    this.vars.fit = 0;
    this.vars.imagNum2 = -10.3462;
    this.vars.realNum2 = -0.11800000000000033;
    this.vars.res = 1;
    this.vars.range = 0.01;
    this.vars.x = 0;
    this.vars.y = 0;
    this.vars.clone = 5;
    this.vars.resVal = 1;
  }
}
