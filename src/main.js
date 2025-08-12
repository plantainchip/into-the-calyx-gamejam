// import kaplay from "kaplay";
// // import "kaplay/global"; // uncomment if you want to use without the k. prefix

// const k = kaplay();

// k.loadRoot("./"); // A good idea for Itch.io publishing later
// k.loadSprite("bean", "sprites/bean.png");

// k.add([k.pos(120, 80), k.sprite("bean")]);

// k.onClick(() => k.addKaboom(k.mousePos()));



import kaplay from "kaplay";
import "kaplay/global"; 
import backyardscene from "./backyard";

kaplay({
    width: 160,
    height: 144,
    background: [27,27,27],
    scale:3
})

scene("main", backyardscene);
go("main");