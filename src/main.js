import kaplay from "kaplay";
import "kaplay/global"; 
import backyardscene from "./backyard";
import opening from "./opening";


kaplay({
    width: 160,
    height: 144,
    background: [27,27,27],
    scale:3
})

const STATE = {
  flowers: [],
  cave_flower: false,

  shovel_item: {
    collected: false
  },
  scissor_item: {
    collected: false
  },
  // shovel scene
  dirt_1: false,
  dirt_2: false,
  dirt_3: false,

  // holes scenes
  dirt_4: false,
  dirt_5: false,

  // underground, hiding flower
  vine_1: false,
  vine_2: false,
  vine_3: false,
  vine_4: false,
  vine_5: false,

  // underground, before ladder
  vine_6: false,
  vine_7: false,
  vine_8: false,
  vine_9: false,
  vine_10: false,

  //bosscave
  boss_1: {
    health: 2,
    dead: false,
  }

}

loadSprite("title", "./sprites/assets/backgrounds/ingame_titlescreen1.png")
scene("opening", opening);

scene("start", (STATE) => {
  add([
    sprite("title"),
    pos(0,0)
  ]);

  // onClick(() => go("opening",STATE));
  onKeyPress((key) => {
    go("opening",STATE);
  })

})

go("start",STATE);


// go("opening", STATE);

// scene("backyard", backyardscene);
// go("backyard", STATE);

// import sectionshovel from "./sectionshovel";
// scene("sectionshovel", sectionshovel);
// go("sectionshovel", STATE);

// import sectionholes from "./sectionholes";
// scene("sectionholes", sectionholes);
// go("sectionholes", STATE);

// import sectionunderground from "./sectionunderground";
// scene("sectionunderground", sectionunderground);
// go("sectionunderground", STATE);

// import sectionflowercave from "./sectionflowercave";
// scene("sectionflowercave", sectionflowercave);
// go("sectionflowercave", STATE);

// import sectionbosscave from "./sectionbosscave";
// scene("sectionbosscave", sectionbosscave);
// go("sectionbosscave", STATE);