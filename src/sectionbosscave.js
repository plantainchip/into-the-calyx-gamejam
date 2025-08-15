import "kaplay/global";
import sectionholes from "./sectionholes";
import ending from "./ending";

export default function(STATE){
    scene("sectionholes", sectionholes);
    scene ("ending", ending)
    
    // you can start making your scene in this function.
    loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("bosscave", "sprites/assets/sections/section_boss.png");
    loadSprite("player", "sprites/assets/characters/player.png");
    loadSprite("hand", "sprites/assets/characters/hand.png");
    loadSprite("flower", "sprites/assets/items/flower.png");
    loadSprite("cave_bg", "sprites/assets/backgrounds/cave_bg.png");

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
        sprite("player"),
        pos(112, 64),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
    });
    onKeyPress("w", () => {
        if(player.pos.x > 128 && player.pos.x < 144){
            go("sectionholes", STATE);
        }
        player.doubleJump(330)
    });

    // adding enemy
    


    if (!STATE.boss_1.dead) {
        const bosshand = add([
            sprite("hand"),
            pos(32, 96),
            body(),
            area(),
            "boss_1"
        ]);
    }

    player.onCollide("boss_1", (boss1) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(boss1)) {
                if (STATE.scissor_item.collected  && !STATE.boss_1.dead) {
                    // boss1.destroy();
                    // STATE.boss_1.health = STATE.boss_1.health - 1;
                    // console.log("hit");
                    // console.log(STATE.boss_1.health);
                    // return
                    console.log("hit")
                } 
                // else {
                //     console.log("missed");
                //     console.log(STATE.boss_1.health);
                //     return;
                // }
            }
        })
    })

    //checks if you get flowers to get to final cutscene
    onUpdate(() => {
        console.log("final cutscene")
        if (STATE.flowers.length > 1) {

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