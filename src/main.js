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
  dirt_1: false,
  dirt_2: false,
}


scene("opening", opening);
go("opening", STATE);

// scene("backyard", backyardscene);
// go("backyard", STATE);

// import sectionshovel from "./sectionshovel";
// scene("sectionshovel", sectionshovel);
// go("sectionshovel", STATE);

// import sectionholes from "./sectionholes";
// scene("sectionholes", sectionholes);
// go("sectionholes");

// import sectionunderground from "./sectionunderground";
// scene("sectionunderground", sectionunderground);
// go("sectionunderground");

// import sectionflowercave from "./sectionflowercave";
// scene("sectionflowercave", sectionflowercave);
// go("sectionflowercave", STATE);