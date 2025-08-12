import "kaplay/global";
import sectionshovel from "./sectionshovel";

export default function(){
    scene("sectionshovel", sectionshovel);

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
        rect(700, 32),
        pos(-50,112),
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
            go("sectionshovel");
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


}