import kaplay from "kaplay";
import "kaplay/global";

import backyard from "./backyard";
import opening from "./opening";
import sectionholes from "./sectionholes";
// import ending from "./ending";
import sectionunderground from "./sectionunderground";
import sectionshovel from "./sectionshovel";
import sectionbosscave from "./sectionbosscave";
import sectionflowercave from "./sectionflowercave";


import player_animation_png from "/sprites/assets/animations/player_animation.png";
import player_animation_json from "/sprites/assets/animations/player_animation.json?url";

import shearsprite from "/sprites/assets/items/scissors.png";
import shovelsprite from "/sprites/assets/sections/section_shovel.png";
import game_ending_png from "/sprites/assets/animations/ending_cutscene.png";
import game_ending_json from "/sprites/assets/animations/ending_cutscene.json?url";

import ending from "./ending";
import ending2 from "./ending2";
import ending3 from "./ending3";


kaplay({
  width: 160,
  height: 144,
  background: [27, 27, 27],
  scale: 4
})
    loadAseprite("ending_cutscene_part1", "./sprites/assets/animations/ending_cutscene_part1.png", "./sprites/assets/animations/ending_cutscene_part1.json");
    loadAseprite("ending_cutscene_part2", "./sprites/assets/animations/ending_cutscene_part2.png", "./sprites/assets/animations/ending_cutscene_part2.json");
    loadAseprite("ending_cutscene_part3", "./sprites/assets/animations/ending_cutscene_part3.png", "./sprites/assets/animations/ending_cutscene_part3.json");

loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
loadSprite("background", "./sprites/assets/backgrounds/background1_moonlight.png");
loadSprite("backyard", "./sprites/assets/sections/section1_backyard.png");
loadSprite("player", "./sprites/assets/characters/player.png");
loadFont("font", "./sprites/assets/font/Tiny5-Regular.ttf");
loadAseprite("player_animation", player_animation_png, player_animation_json);
loadSound("jump_sound", "./sprites/assets/items/run_sound_trimmed.mp3");

loadAseprite("opening_cutscene", "./sprites/assets/animations/opening_cutscene.png", "./sprites/assets/animations/opening_cutscene.json");
// scene("backyard", backyard);

loadSound("bg_music", "./sprites/assets/items/caves-of-dawn-10376.mp3");



loadSprite("bosscave", "./sprites/assets/sections/section_boss.png");

loadSprite("hand", "./sprites/assets/characters/hand.png");
loadSprite("chest", "./sprites/assets/items/chest.png");
loadSprite("cave_bg", "./sprites/assets/backgrounds/cave_bg.png");
loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");




loadSprite("flowercave", "./sprites/assets/sections/section_flowercave.png");

loadSprite("flower", "./sprites/assets/items/flower.png");
loadSprite("cave_bg", "./sprites/assets/backgrounds/cave_bg.png");

loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
loadSound("snip_sound", "./sprites/assets/items/snip_sound_trimmed.mp3");




loadSprite("area_holes", "./sprites/assets/sections/section_holes.png");

loadSprite("dirt", "./sprites/assets/items/dirt.png");

loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
loadAseprite("wind", "./sprites/assets/animations/wind.png", "./sprites/assets/animations/wind.json");
loadSound("dig_sound", "./sprites/assets/items/dig_sound_trimmed.mp3");





loadSprite("area_shovel", shovelsprite);

loadSprite("middle", "./sprites/assets/backgrounds/bg_mid.png");

loadAseprite("player_animation", player_animation_png, player_animation_json);
loadAseprite("wind", "./sprites/assets/animations/wind.png", "./sprites/assets/animations/wind.json");

loadSound("dig_sound", "./sprites/assets/items/dig_sound_trimmed.mp3");
loadSound("collect_sound", "./sprites/assets/items/item_collect_trimmed.mp3");




loadSprite("shovel", "sprites/assets/items/shovel.png");
loadSprite("dirt", "sprites/assets/items/dirt.png");




loadSprite("background2", "./sprites/assets/backgrounds/background2_moonlight.png");
loadSprite("area_underground", "./sprites/assets/sections/section_underground.png");

loadSprite("scissors", shearsprite);
loadSprite("vine", "./sprites/assets/items/vines.png");

loadAseprite("player_animation", player_animation_png, player_animation_json);
loadAseprite("wind", "./sprites/assets/animations/wind.png", "./sprites/assets/animations/wind.json");
loadSound("snip_sound", "./sprites/assets/items/snip_sound_trimmed.mp3");
loadSound("collect_sound", "./sprites/assets/items/item_collect_trimmed.mp3");
loadAseprite("ending_cutscene", game_ending_png, game_ending_json);




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

  // chest
  chest_1: false,

  //bosscave
  boss_1: {
    health: 2,
    dead: false,
  }

}



// loadSprite("title", "./sprites/assets/backgrounds/ingame_titlescreen1.png")
loadAseprite("titlegif", "./sprites/assets/animations/titlepageanimation.png", "./sprites/assets/animations/titlepageanimation.json")

// scene("opening", opening);
scene("sectionholes", sectionholes);
scene("ending", ending)
scene("backyard", backyard);
scene("sectionunderground", sectionunderground);
scene("sectionshovel", sectionshovel);
scene("sectionbosscave", sectionbosscave);
scene("opening", opening);
scene("sectionflowercave", sectionflowercave);
scene("ending2", ending2)
scene("ending3", ending3)


scene("start", (STATE) => {
  add([
    sprite("titlegif", {
      anim: "titlescreen"
    }),
    pos(0, 0),
    animate()
  ]);

  // onClick(() => go("opening",STATE));
  onKeyPress((key) => {
    go("opening", STATE);
  })

})

// go("start",STATE);
onLoad(() => go("start", STATE))


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