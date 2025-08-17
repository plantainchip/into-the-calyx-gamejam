import "kaplay/global";
// import sectionholes from "./sectionholes";
// import ending from "./ending";

export default function(STATE){
    // scene("sectionholes", sectionholes);
    // scene ("ending", ending)
    
    // you can start making your scene in this function.
    // loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    // loadSprite("background", "./sprites/assets/backgrounds/background1_moonlight.png");
    // loadSprite("bosscave", "./sprites/assets/sections/section_boss.png");
    // loadSprite("player", "./sprites/assets/characters/player.png");
    // loadSprite("hand", "./sprites/assets/characters/hand.png");
    // loadSprite("chest", "./sprites/assets/items/chest.png");
    // loadSprite("cave_bg", "./sprites/assets/backgrounds/cave_bg.png");
    // loadAseprite("player_animation", "./sprites/assets/animations/player_animation.png", "./sprites/assets/animations/player_animation.json");
    // loadSound("jump_sound", "./sprites/assets/items/run_sound_trimmed.mp3");


    let SPEED = 75;
    setGravity(1850);
    add([
        sprite("cave_bg"), 
        pos(0,0),
        body({isStatic:true})
    ]);

    // adding backyard img
    add([
        sprite("bosscave"), 
        pos(0,0),
        body({isStatic:true}),
    ])
    //adding backyard platform
    add([
        rect(250, 32),
        pos(-50,112),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    // adding platforms ====================================
    add([
        rect(16, 112),
        pos(0,0),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(160, 16),
        pos(16,0),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(16, 96),
        pos(144,16),
        color(99,155,255),
        opacity(0),
        area(),
        body({isStatic:true}),
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
        play("jump_sound", {volume: 2})

        if(player.pos.x > 128 && player.pos.x < 144){
            go("sectionholes", STATE);
        }
        player.doubleJump(330)
        player.play("jump")
    });
    onKeyRelease("w", () => {
        player.play("l_idle")
    })

    // adding enemy
    


    if (!STATE.chest_1) {
        const chestitem = add([
            sprite("chest"),
            pos(32, 96),
            body({isStatic:true}),
            area(),
            z(15),
            "chest_1"
        ])
    }

    player.onCollide("chest_1", (chest1) => {
        onUpdate(() => {
            if ((isKeyPressed("s") && player.isColliding(chest1)) || (isKeyPressed("space") && player.isColliding(chest1)) ) {
                if (STATE.shovel_item.collected && STATE.scissor_item.collected && !STATE.chest_1) {
                    play("dig_sound", {volume: 5})
                    // text
                    const flowertextbg = add([
                        rect(110, 8),
                        pos(18, 64),
                        color(255, 255, 255)
                    ])
                    const foundflower = add([
                        text("opened a chest. found a flower", {
                            size: 8,
                            font: "font"
                        }),
                        pos(20, 64),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        foundflower.destroy()
                        flowertextbg.destroy()
                    })
                    chest1.destroy();
                    STATE.chest_1 = true;
                    STATE.flowers.push("chest_flower");
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