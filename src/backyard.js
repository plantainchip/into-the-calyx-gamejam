import "kaplay/global";
import sectionshovel from "./sectionshovel";
import ending from "./ending";



export default function (STATE) {
    scene("sectionshovel", sectionshovel);
    scene("ending", ending);

    // you can start making your scene in this function.
    loadAseprite("warp_cutscene", "./sprites/assets/animations/warp_cutscene.png", "./sprites/assets/animations/warp_cutscene.json");
    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("backyard", "sprites/assets/sections/section1_backyard.png");
    loadSprite("player", "sprites/assets/characters/player.png");



    let SPEED = 75;
    setGravity(1850);
    add([
        sprite("background"),
        pos(0, 0),
        body({ isStatic: true })
    ]);

    // adding backyard img
    add([
        sprite("backyard"),
        pos(0, 0),
        body({ isStatic: true }),
    ])

    add([
        rect(100, 5),
        pos(48, 128),
        color(255, 255, 255)
    ])
    add([
        text("w a d to move. w to climb ladder", {
            size: 5,
        }),
        pos(48, 128),
        color(0, 0, 0)
    ])
    //adding backyard platform
    add([
        rect(250, 32),
        pos(-50, 112),
        color(99, 155, 255),
        opacity(0),
        area(),
        body({ isStatic: true }),
    ])

    // adding player
    const player = add([
        sprite("player"),
        pos(35, 96),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);

        // go to next section
        if (player.pos.x > 160) {
            go("sectionshovel", STATE);
        }
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < -12) {
            go("backyard", STATE);
        }
    });
    onKeyPress("w", () => {
        player.doubleJump(330)
    });


    //checks if you get flowers to get to final cutscene


}