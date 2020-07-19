import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import JuliaSet from "./JuliaSet/JuliaSet.js";
import Sprite2 from "./Sprite2/Sprite2.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  JuliaSet: new JuliaSet({
    x: 240,
    y: -180,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Sprite2: new Sprite2({
    x: -240,
    y: 180,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
