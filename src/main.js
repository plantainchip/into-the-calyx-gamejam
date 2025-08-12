import kaplay from "kaplay";
import "kaplay/global"; 
import backyardscene from "./backyard";

kaplay({
    width: 160,
    height: 144,
    background: [27,27,27],
    scale:3
})

// scene("backyard", backyardscene);
// go("backyard");

import sectionholes from "./sectionholes";
scene("sectionholes", sectionholes);
go("sectionholes");

// import sectionshovel from "./sectionshovel";
// scene("sectionshovel", sectionshovel);
// go("sectionshovel");