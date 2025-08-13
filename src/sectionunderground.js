import "kaplay/global";
import sectionholes from "./sectionholes";
import sectionunderground from "./sectionunderground";
import sectionflowercave from "./sectionflowercave";

export default function(STATE){
    scene("sectionholes", sectionholes);
    scene("sectionunderground", sectionunderground);
    scene("sectionflowercave", sectionflowercave);

    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_underground", "sprites/assets/sections/section_underground.png");
    loadSprite("player", "sprites/assets/characters/player.png");

    let SPEED = 75;
    setGravity(1850);

    const moon_bg = add([
        sprite("background"), 
        pos(0,0),
    ]);

    add([
        sprite("area_underground"), 
        pos(0,0),
        body({isStatic:true}),
    ]);

    // adding platform ====================================
    add([
        rect(750, 32),
        pos(-50,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])
    add([
        rect(450, 32),
        pos(-50,0),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(64, 16),
        pos(0,96),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(48, 32),
        pos(0,32),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(64, 16),
        pos(176,64),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 32),
        pos(160,80),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 16),
        pos(336,96),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 32),
        pos(368,80),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 48),
        pos(400,64),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 112),
        pos(432,0),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])



    // adding player ======================================
    const player = add([
        sprite("player"),
        pos(112, 96),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < 16) {
            go("sectionflowercave", STATE);
        }
    });
    onKeyPress("w", () => {
        if(player.pos.x > 416 && player.pos.x < 432){
            go("sectionholes", STATE);
        }
        player.doubleJump(330)
    });


    // camera =====================================
    const original_cam_posx = player.pos.x;
    // debug.log("original cam pos x: " + original_cam_posx);
    player.onUpdate(() => {
        
        // first if statement to stop cam at end of section
        if ( player.pos.x < 384 && player.pos.x > 80){
            // 2nd if statement to move cam with player
            // if (player.pos.x >= original_cam_posx + 16) {
            //     setCamPos(player.pos.x + 96, height() / 2);
            //     // moon_bg.pos.x = player.pos.x - 64;
            // }
            setCamPos(player.pos.x, height() / 2);
            moon_bg.pos.x = player.pos.x - 80;
        }
        
    })



}