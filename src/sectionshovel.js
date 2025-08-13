import "kaplay/global";
import sectionholes from "./sectionholes";
import backyard from "./backyard";

export default function(STATE){
    scene("sectionholes", sectionholes);
    scene("backyard", backyard);

    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_shovel", "sprites/assets/sections/section_shovel.png");
    loadSprite("player", "sprites/assets/characters/player.png");
    loadSprite("middle", "sprites/assets/backgrounds/bg_mid.png");

    loadSprite("shovel", "sprites/assets/items/shovel.png");
    loadSprite("dirt", "sprites/assets/items/dirt.png");

    let SPEED = 75;
    setGravity(1850);

    const moon_bg = add([
        sprite("background"), 
        pos(0,0),
        // body({isStatic:true})
    ]);

    // const middle = add([
    //     sprite("middle"), 
    //     pos(0,0),
    // ]);


    add([
        sprite("area_shovel"), 
        pos(0,0),
        body({isStatic:true})
    ]);

    // adding platform ====================================
    add([
        rect(750, 32),
        pos(-50,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 16),
        pos(96, 96),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ]);

    add([
        rect(32, 32),
        pos(144, 80),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ]);

    add([
        rect(32, 16),
        pos(224, 96),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ]);

    add([
        rect(16, 16),
        pos(400, 96),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ]);

    add([
        rect(128, 48),
        pos(416, 64),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ]);





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
        if (player.pos.x > 639) {
            go("sectionholes", STATE);
        }
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < -12) {
            go("backyard", STATE);
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

    // parallax effect - middle layer
    // player.onUpdate(() => {
    //     if(player.pos.x < 544){
    //         if(player.pos.x >= original_cam_posx + 48){
    //             middle.pos.x = middle.pos.x - 0.1
    //         }
    //     }
    // })

    // items =======================================

    if (!STATE.shovel_item.collected) {
        const shovelitem = add([
            sprite("shovel"),
            pos(128,96),
            body(),
            area(),
            z(2),
            "shovel_item"
        ])
    }

    player.onCollide("shovel_item", (shovel) => {
        shovel.destroy();
        STATE.shovel_item.collected = true;
        console.log("Collected shovel");
    })

    if (!STATE.dirt_1.collected) {
        const dirtitem = add([
            sprite("dirt"),
            pos(276,96),
            // body(),
            area(),
            z(2),
            "dirt_1"
        ])
    }

    player.onCollide("dirt_1", (dirt) => {
        if( !STATE.shovel_item.collected) {
            console.log("You need a shovel to dig this dirt!");
            return;
        }
        dirt.destroy();
        STATE.dirt_1 = true;
        console.log("dug some dirt");
    })

    if (!STATE.dirt_2.collected) {
        const dirtitem = add([
            sprite("dirt"),
            pos(352,96),
            // body(),
            area(),
            z(2),
            "dirt_1"
        ])
    }

    player.onCollide("dirt_2", (dirt) => {
        if( !STATE.shovel_item.collected) {
            console.log("You need a shovel to dig this dirt!");
            return;
        }
        dirt.destroy();
        STATE.dirt_2 = true;
        console.log("dug some dirt");
    })


}