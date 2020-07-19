import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class JuliaSet extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./JuliaSet/costumes/costume1.svg", {
        x: 0.31250000000017053,
        y: 0.3958333333333428
      })
    ];

    this.sounds = [new Sound("pop", "./JuliaSet/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "render" },
        this.whenIReceiveRender
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.res = 7;
    this.stage.vars.resVal = 1;
    this.stage.vars.x = 0;
    this.stage.vars.y = 0;
    this.stage.vars.range = 0.01;
    this.visible = false;
  }

  *makeIteration() {
    for (let i = 0; i < this.stage.vars.clone / 2; i++) {
      this.stage.vars.realNum1 =
        this.x * this.stage.vars.range + this.stage.vars.x;
      this.stage.vars.imagNum1 =
        this.y * this.stage.vars.range + this.stage.vars.y;
      yield* this.test(this.stage.vars.realNum1, this.stage.vars.imagNum1);
      yield* this.makeMagicalColor();
      this.penDown = true;
      this.penDown = false;
      this.x += this.stage.vars.res;
    }
  }

  *makeMagicalColor() {
    if (this.stage.vars.fit > 100) {
      this.penColor = Color.rgb(255, 255, 255);
    } else {
      this.penColor = Color.num(-1 * this.stage.vars.fit * 22333432);
    }
  }

  *test(realNum, imagNum) {
    this.stage.vars.fit = -1;
    while (
      !(
        this.stage.vars.fit > 200 ||
        Math.sqrt(
          this.stage.vars.realNum1 * this.stage.vars.realNum1 +
            this.stage.vars.imagNum1 * this.stage.vars.imagNum1
        ) > 4
      )
    ) {
      this.stage.vars.fit += 1;
      this.stage.vars.imagNum2 =
        2 * (this.stage.vars.realNum1 * this.stage.vars.imagNum1) + imagNum;
      this.stage.vars.realNum2 =
        this.stage.vars.imagNum1 * this.stage.vars.imagNum1 -
        this.stage.vars.realNum1 * this.stage.vars.realNum1 +
        realNum;
      this.stage.vars.imagNum1 = this.stage.vars.imagNum2;
      this.stage.vars.realNum1 = this.stage.vars.realNum2;
    }
  }

  *render(res2) {
    this.stage.vars.res = res2;
    this.stage.vars.clone = 5;
    this.goto(-240, 180);
    if (res2 == 1) {
      this.penSize = res2;
      for (let i = 0; i < 180 * 2; i++) {
        this.x = -240;
        for (let i = 0; i < 80 * 2; i++) {
          yield* this.makeIteration();
        }
        this.y += -1;
        if (this.x == 240 && this.y == -180) {
          this.deleteThisClone();
        }
      }
      return;
    } else {
      this.penSize = res2 + 2;
      for (let i = 0; i < (180 * 3) / this.stage.vars.res; i++) {
        this.x = -240;
        for (let i = 0; i < (80 / this.stage.vars.res) * 2; i++) {
          yield* this.makeIteration();
        }
        this.y += -1 * this.stage.vars.clone;
        if (this.x == 240 && this.y == -180) {
          this.deleteThisClone();
        }
      }
      return;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.broadcast("render");
      while (!!this.mouse.down) {
        yield;
      }
      while (!this.mouse.down) {
        yield;
      }
      this.stage.vars.x += this.mouse.x * this.stage.vars.range;
      this.stage.vars.y += this.mouse.y * this.stage.vars.range;
      this.stage.vars.range = this.stage.vars.range / 4;
      yield;
    }
  }

  *whenIReceiveRender() {
    this.clearPen();
    yield* this.render(7);
  }

  *whenKeySpacePressed() {
    yield* this.render(1);
  }
}
