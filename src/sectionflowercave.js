import "kaplay/global";
import sectionunderground from "./sectionunderground";

export default function(STATE){
    scene("sectionunderground", sectionunderground);
    
    // you can start making your scene in this function.
    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("flowercave", "sprites/assets/sections/section_flowercave.png");
    loadSprite("player", "sprites/assets/characters/player.png");
    loadSprite("flower", "sprites/assets/items/flower.png");

    let SPEED = 75;
    setGravity(1850);
    add([
        sprite("background"), 
        pos(0,0),
        body({isStatic:true})
    ]);

    // adding backyard img
    add([
        sprite("flowercave"), 
        pos(0,0),
        body({isStatic:true}),
    ])
    //adding backyard platform
    add([
        rect(250, 16),
        pos(-50,128),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    // adding platforms ====================================
    add([
        rect(16, 128),
        pos(0,0),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(48, 32),
        pos(112,96),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(16, 16),
        pos(96,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(160, 16),
        pos(16,0),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    add([
        rect(32, 48),
        pos(128,16),
        color(99,155,255),
        opacity(0.5),
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

        // go to next section
        if (player.pos.x > 160) {
            go("sectionunderground", STATE);
        }
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
    });
    onKeyPress("w", () => {
        // if( player.isGrounded()) {
        //     player.jump(330);
        // }
        player.doubleJump(330)
    });

    // adding items =======================================
    if (!STATE.cave_flower.collected) {
        const floweritem = add([
            sprite("flower"),
            pos(32, 112),
            body(),
            area(),
            z(2),
            "cave_flower"
        ])
    }

    player.onCollide("cave_flower", (flower) => {
        flower.destroy();
        STATE.cave_flower.collected = true;
        STATE.flowers.push("cave_flower");
        console.log("Collected cave flower!");
    })








    
}