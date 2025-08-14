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
  cave_flower: {
    collected: false
  },
  shovel_item: {
    collected: false
  },
  scissor_item: {
    collected: false
  },
  dirt_1: false,
  dirt_2: false,
  dirt_3: false,

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

}


// scene("opening", opening);
// go("opening", STATE);

// scene("backyard", backyardscene);
// go("backyard", STATE);

// import sectionshovel from "./sectionshovel";
// scene("sectionshovel", sectionshovel);
// go("sectionshovel", STATE);

// import sectionholes from "./sectionholes";
// scene("sectionholes", sectionholes);
// go("sectionholes", STATE);

import sectionunderground from "./sectionunderground";
scene("sectionunderground", sectionunderground);
go("sectionunderground", STATE);

// import sectionflowercave from "./sectionflowercave";
// scene("sectionflowercave", sectionflowercave);
// go("sectionflowercave", STATE);