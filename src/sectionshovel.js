import "kaplay/global";
import sectionholes from "./sectionholes";
import backyard from "./backyard";
import ending from "./ending";

export default function (STATE) {
    scene("sectionholes", sectionholes);
    scene("backyard", backyard);
    scene("ending", ending)

    loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    loadSprite("background", "./sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_shovel", "./sprites/assets/sections/section_shovel.png");
    loadSprite("player", "./sprites/assets/characters/player.png");
    loadSprite("middle", "./sprites/assets/backgrounds/bg_mid.png");
    loadFont("font", "./sprites/assets/font/Tiny5-Regular.ttf");
    loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
    loadAseprite("wind", "./sprites/assets/animations/wind.png", "./sprites/assets/animations/wind.json");

    loadSound("dig_sound", "./sprites/assets/items/dig_sound_trimmed.mp3");
    loadSound("collect_sound", "./sprites/assets/items/item_collect_trimmed.mp3");
    loadSound("jump_sound", "./sprites/assets/items/run_sound_trimmed.mp3");



    loadSprite("shovel", "sprites/assets/items/shovel.png");
    loadSprite("dirt", "sprites/assets/items/dirt.png");

    loadSound("bg_music", "./sprites/assets/items/caves-of-dawn-10376.mp3");
    // const music = play("bg_music",{
    //     volume:0.3,
    //     loop:true
    // })

    let SPEED = 75;
    setGravity(1850);

    const moon_bg = add([
        sprite("background"),
        pos(0, 0),
        // body({isStatic:true})
    ]);

    // const middle = add([
    //     sprite("middle"), 
    //     pos(0,0),
    // ]);


    add([
        sprite("area_shovel"),
        pos(0, 0),
        body({ isStatic: true })
    ]);

    // adding platform ====================================
    add([
        rect(750, 32),
        pos(-50, 112),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 16),
        pos(96, 96),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ]);

    add([
        rect(32, 32),
        pos(144, 80),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ]);

    add([
        rect(32, 16),
        pos(224, 96),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ]);

    add([
        rect(16, 16),
        pos(400, 96),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ]);

    add([
        rect(128, 48),
        pos(416, 64),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ]);


    add([
        sprite("wind", {
            anim:"wind"
        }),
        pos(288,0),
        animate()
    ])

    add([
        sprite("wind", {
            anim:"wind"
        }),
        pos(480,0),
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
        if (player.pos.x > 639) {
            go("sectionholes", STATE);
        }
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
            go("backyard", STATE);
        }
    });
    onKeyRelease("a", () => {
        player.play("l_idle")
    })

    onKeyPress("w", () => {
        // if( player.isGrounded()) {
        //     player.jump(330);
        // }
        play("jump_sound", {volume: 2})
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
        if (player.pos.x < 544) {
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
            pos(160, 64),
            body(),
            area(),
            z(2),
            "shovel_item"
        ])
    }

    player.onCollide("shovel_item", (shovel) => {
        play("collect_sound", {volume: 5})
        // text
        const flowertextbg = add([
            rect(144, 8),
            pos(160, 46),
            color(255, 255, 255)
        ])
        const foundflower = add([
            text("found a shovel. press s when you find dirt", {
                size: 8,
                font: "font"
            }),
            pos(162, 46),
            color(0, 0, 0)
        ])
        wait(10, () => {
            foundflower.destroy()
            flowertextbg.destroy()
        })
        shovel.destroy();
        STATE.shovel_item.collected = true;
        console.log("Collected shovel");
    })

    if (!STATE.dirt_1) {
        const dirtitem = add([
            sprite("dirt"),
            pos(276, 96),
            // body(),
            area(),
            z(15),
            "dirt_1"
        ])
    }

    player.onCollide("dirt_1", (dirt1) => {
        onUpdate(() => {
            if (isKeyPressed("s") && player.isOverlapping(dirt1)) {
                if (STATE.shovel_item.collected && !STATE.dirt_1) {
                    play("dig_sound", {volume: 5})
                    // text
                    const flowertextbg = add([
                        rect(114, 8),
                        pos(276, 80),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("dug some dirt. found a flower", {
                            size: 8,
                            font: "font"
                        }),
                        pos(276, 80),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    dirt1.destroy();
                    STATE.dirt_1 = true;
                    STATE.flowers.push("dirt_flower");
                    console.log("dug some dirt. found a flower");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return
                } else {
                    console.log("you need a shovel to dig");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return
                }
            }
        })

    })




    if (!STATE.dirt_2) {
        const dirtitem = add([
            sprite("dirt"),
            pos(352, 96),
            // body(),
            area(),
            z(15),
            "dirt_2"
        ])
    }

    player.onCollide("dirt_2", (dirt2) => {
        onUpdate(() => {
            if (isKeyPressed("s") && player.isOverlapping(dirt2)) {
                if (STATE.shovel_item.collected && !STATE.dirt_2) {
                    play("dig_sound", {volume: 5})
                    // text
                    const flowertextbg = add([
                        rect(48, 8),
                        pos(352, 90),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("dug some dirt", {
                            size: 8,
                            font: "font"
                        }),
                        pos(352, 90),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    dirt2.destroy();
                    STATE.dirt_2 = true;
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


    if (!STATE.dirt_3) {
        const dirtitem = add([
            sprite("dirt"),
            pos(464, 48),
            // body(),
            area(),
            z(15),
            "dirt_3"
        ])
    }

    player.onCollide("dirt_3", (dirt3) => {
        onUpdate(() => {
            if (isKeyPressed("s") && player.isOverlapping(dirt3)) {
                if (STATE.shovel_item.collected && !STATE.dirt_3) {
                    play("dig_sound", {volume: 5})
                    // text
                    const flowertextbg = add([
                        rect(48, 8),
                        pos(464, 32),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("dug some dirt", {
                            size: 8,
                            font: "font"
                        }),
                        pos(464, 32),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    dirt3.destroy();
                    STATE.dirt_3 = true;
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


    //checks if you get flowers to get to final cutscene
    onUpdate(() => {
        console.log("final cutscene")
        if (STATE.flowers.length > 2) {

            // wait(3, () => {
            //     go("ending", STATE)
            // })

            const cutscene = add([
                sprite("warp_cutscene", {
                    // anim: "op",
                }),
                pos(player.pos.x - 64, 0),
                z(20)
                // animate(),
            ])

            cutscene.play("waaarp", {
                loop: false,
                onEnd: () => {
                    // go to backyard scene after cutscene ends
                    go("ending", STATE);
                }
            });

        }
    })




}