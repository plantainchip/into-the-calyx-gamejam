import "kaplay/global";
import sectionunderground from "./sectionunderground";
import backyard from "./backyard";
import ending from "./ending";

export default function (STATE) {
    scene("sectionunderground", sectionunderground);
    scene("backyard", backyard);
    scene("ending", ending);

    // you can start making your scene in this function.
    loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    loadSprite("background", "./sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("flowercave", "./sprites/assets/sections/section_flowercave.png");
    loadSprite("player", "./sprites/assets/characters/player.png");
    loadSprite("flower", "./sprites/assets/items/flower.png");
    loadSprite("cave_bg", "./sprites/assets/backgrounds/cave_bg.png");
    loadFont("font", "./sprites/assets/font/Tiny5-Regular.ttf");
    loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
    loadSound("snip_sound", "./sprites/assets/items/snip_sound_trimmed.mp3");
    loadSound("jump_sound", "./sprites/assets/items/run_sound_trimmed.mp3");


    let SPEED = 75;
    setGravity(1850);
    add([
        sprite("cave_bg"),
        pos(0, 0),
        body({ isStatic: true })
    ]);

    // adding backyard img
    add([
        sprite("flowercave"),
        pos(0, 0),
        body({ isStatic: true }),
    ])
    //adding backyard platform
    add([
        rect(250, 16),
        pos(-50, 128),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    // adding platforms ====================================
    add([
        rect(16, 128),
        pos(0, 0),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(48, 32),
        pos(112, 96),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(16, 16),
        pos(96, 112),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(160, 16),
        pos(16, 0),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 48),
        pos(128, 16),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    // adding player ======================================
    const player = add([
        sprite("player_animation",{
            anim:"l_idle"
        }),
        pos(112, 64),
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

        // go to next section
        if (player.pos.x > 160) {
            go("sectionunderground", STATE);
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
        player.play("l_idle")
    })

    // adding items =======================================
    if (!STATE.cave_flower) {
        const floweritem = add([
            sprite("flower"),
            pos(32, 112),
            body({isStatic:true}),
            area(),
            z(2),
            "cave_flower"
        ])
    }
        player.onCollide("cave_flower", (caveflower) => {
        onUpdate(() => {
            if (isKeyPressed("space") && player.isColliding(caveflower)) {
                if (STATE.scissor_item.collected && !STATE.cave_flower) {
                    play("snip_sound", {volume: 5})
                    // text
                    const textbg = add([
                        rect(85, 8),
                        pos(32, 80),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip. you found a flower", {
                            size: 8,
                            font:"font"
                        }),
                        pos(32, 80),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    caveflower.destroy();
                    STATE.cave_flower = true;
                    STATE.flowers.push("cave_flower");
                    console.log("cut some vine");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return
                } else {
                    console.log("you need a scissors to cut this");
                    console.log("STATE.flowers.length: " + STATE.flowers.length);
                    return;
                }
            }
        })
    })

    // player.onCollide("cave_flower", (flower) => {
    //     console.log("we collided")
    //     // text
    //     const textbg = add([
    //         rect(100, 5),
    //         pos(32, 80),
    //         color(255, 255, 255)
    //     ])
    //     const textbg2 = add([
    //         rect(80, 5),
    //         pos(24, 87),
    //         color(255, 255, 255)
    //     ])
    //     const found = add([
    //         text("plucked a flower from the cave", {
    //             size: 5,
    //         }),
    //         pos(32, 80),
    //         color(0, 0, 0)
    //     ])
    //     const found2 = add([
    //         text("what secrets is it hiding?", {
    //             size: 5,
    //         }),
    //         pos(24, 87),
    //         color(0, 0, 0)
    //     ])
    //     wait(6, () => {
    //         found.destroy()
    //         textbg.destroy()
    //         found2.destroy()
    //         textbg2.destroy()
    //     })
    //     flower.destroy();
    //     STATE.cave_flower.collected = true;
    //     STATE.flowers.push("cave_flower");
    //     console.log("Collected cave flower!");
    //     console.log(STATE.flowers.length)
    // })

    // checks if you get flowers to get to final cutscene
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
                pos(0, 0),
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