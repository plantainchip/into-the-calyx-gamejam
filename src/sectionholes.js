import "kaplay/global";
import sectionshovel from "./sectionshovel";
import sectionunderground from "./sectionunderground";
import sectionbosscave from "./sectionbosscave";
import ending from "./ending";

export default function(STATE){
    scene("sectionshovel", sectionshovel);
    scene("sectionunderground", sectionunderground);
    scene("sectionbosscave", sectionbosscave);
    scene("ending", ending)

    loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_holes", "sprites/assets/sections/section_holes.png");
    loadSprite("player", "sprites/assets/characters/player.png");
    loadSprite("dirt", "sprites/assets/items/dirt.png");
    loadFont("font", "./sprites/assets/font/Tiny5-Regular.ttf");
    loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
    loadAseprite("wind", "./sprites/assets/animations/wind.png", "./sprites/assets/animations/wind.json");
    
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
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(256, 32),
        pos(144,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(48, 16),
        pos(192,96),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(16,16),
        pos(288,96),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])
    add([
        rect(32,32),
        pos(304,80),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])
    add([
        rect(48,32),
        pos(432,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(80,32),
        pos(512,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,32),
        pos(544,80),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,32),
        pos(608,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32,112),
        pos(624,0),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        sprite("wind", {
            anim:"wind"
        }),
        pos(0,0),
        animate()
    ])

    add([
        sprite("wind", {
            anim:"wind"
        }),
        pos(352,0),
        animate()
    ])

    // adding player ======================================
    const player = add([
        sprite("player_animation",{
            anim:"r_idle"
        }),
        pos(16, 96),
        body(),
        area(),
        doubleJump(2),
        animate()
    ]);

    onKeyPress("d", () => {
        player.play("r_run")
    })
    onKeyDown("d", () => {
        player.move(SPEED, 0);
    });
    onKeyRelease("d", () => {
        player.play("r_idle")
    })

    onKeyPress("a", () => {
        player.play("l_run")
    })
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < -12) {
            go("sectionshovel",STATE);
        }
    });
    onKeyRelease("a", () => {
        player.play("l_idle")
    })

    onKeyPress("w", () => {
        // if( player.isGrounded()) {
        //     player.jump(330);
        // }
        player.doubleJump(330)
        player.play("jump")
    });
    onKeyRelease("w", () => {
        player.play("r_idle")
    })


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
        if (player.pos.x > 95 && player.pos.x < 114){
            if (player.pos.y > 130) {
                go("sectionunderground",STATE);
            }
        } else if (player.pos.x > 399 && player.pos.x < 432){
            if (player.pos.y > 130) {
                go("sectionunderground",STATE);
            }
        } else if (player.pos.x > 591 && player.pos.x < 608){
            if (player.pos.y > 130){
                go("sectionbosscave", STATE)
            }
        } else if (player.pos.x > 480 && player.pos.x < 511){
            if (player.pos.y > 130) {

                go("sectionholes",STATE);
            }
        }
    });


    // adding items ===========================
    if (!STATE.dirt_4) {
        const dirtitem = add([
            sprite("dirt"),
            pos(48, 96),
            // body(),
            area(),
            z(15),
            "dirt_4"
        ])
    }

    player.onCollide("dirt_4", (dirt4) => {
        onUpdate(() => {
            if (isKeyPressed("s") && player.isOverlapping(dirt4)) {
                if (STATE.shovel_item.collected && !STATE.dirt_4) {
                    // text
                    const flowertextbg = add([
                        rect(160, 8),
                        pos(48, 80),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("dug some dirt. some holes might be paths...", {
                            size: 8,
                            font:"font"
                        }),
                        pos(48, 80),
                        color(0, 0, 0)
                    ])
                    wait(4, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    dirt4.destroy();
                    STATE.dirt_4 = true;
                    console.log("dug some dirt");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return
                } else {
                    console.log("you need a shovel to dig");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return;
                }
            }
        })
    })

    if (!STATE.dirt_5) {
        const dirtitem = add([
            sprite("dirt"),
            pos(560,64),
            // body(),
            area(),
            z(15),
            "dirt_5"
        ])
    }

    player.onCollide("dirt_5", (dirt5) => {
        onUpdate(() => {
            if (isKeyPressed("s") && player.isOverlapping(dirt5)) {
                if (STATE.shovel_item.collected && !STATE.dirt_5) {
                    // text
                    const flowertextbg = add([
                        rect(160, 8),
                        pos(480,48),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("dug some dirt. do you have all your tools?", {
                            size: 8,
                            font:"font"
                        }),
                        pos(480,48),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    dirt5.destroy();
                    STATE.dirt_5 = true;
                    console.log("dug some dirt");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return
                } else {
                    console.log("you need a shovel to dig");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return;
                }
            }
        })
    })




    
}