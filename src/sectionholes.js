import "kaplay/global";
import sectionshovel from "./sectionshovel";
import sectionunderground from "./sectionunderground";

export default function(STATE){
    scene("sectionshovel", sectionshovel);
    scene("sectionunderground", sectionunderground);

    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_holes", "sprites/assets/sections/section_holes.png");
    loadSprite("player", "sprites/assets/characters/player.png");

    let SPEED = 75;
    setGravity(1850);

    const moon_bg = add([
        sprite("background"), 
        pos(0,0),
    ]);

    add([
        sprite("area_holes"), 
        pos(0,0),
        body({isStatic:true})
    ]);

    // adding platform ====================================
    add([
        rect(146, 32),
        pos(-50,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(256, 32),
        pos(144,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(48, 16),
        pos(192,96),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(16,16),
        pos(288,96),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])
    add([
        rect(32,32),
        pos(304,80),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])
    add([
        rect(48,32),
        pos(432,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(80,32),
        pos(512,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,32),
        pos(544,80),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,32),
        pos(608,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,112),
        pos(624,0),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])


    // adding player ======================================
    const player = add([
        sprite("player"),
        pos(16, 96),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < -12) {
            go("sectionshovel",STATE);
        }
    });
    onKeyPress("w", () => {
        // if( player.isGrounded()) {
        //     player.jump(330);
        // }
        player.doubleJump(330)
    });


    // camera =====================================
    const original_cam_posx = player.pos.x;
    // debug.log("original cam pos x: " + original_cam_posx);
    player.onUpdate(() => {
        
        // first if statement to stop cam at end of section
        if ( player.pos.x < 544){
            // 2nd if statement to move cam with player
            if (player.pos.x >= original_cam_posx + 48) {
                setCamPos(player.pos.x + 16, height() / 2);
                moon_bg.pos.x = player.pos.x - 64;
            }
        }
        
    })

    // transition to underground section
    player.onUpdate(() => {
        if (player.pos.x < 480 || player.pos.x > 511){
            if (player.pos.y > height()) {
                go("sectionunderground",STATE);
            }
        } else if (player.pos.x > 480 && player.pos.x < 511){
            if (player.pos.y > height() ) {
                go("sectionholes",STATE);
            }
        }
    });

}