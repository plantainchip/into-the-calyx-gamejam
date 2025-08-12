import "kaplay/global";

export default function(){
    // you can start making your scene in this function.
    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("backyard", "sprites/assets/sections/section1_backyard.png");
    loadSprite("player", "sprites/assets/characters/player.png");

    let SPEED = 75;
    setGravity(1850);
    add([
        sprite("background"), 
        pos(0,0),
        body({isStatic:true})
    ]);

    // adding backyard img
    add([
        sprite("backyard"), 
        pos(0,0),
        body({isStatic:true}),
    ])
    //adding backyard platform
    add([
        rect(250, 32),
        pos(-50,112),
        color(99,155,255),
        opacity(0.5),
        area(),
        body({isStatic:true}),
    ])

    // adding player
    const player = add([
        sprite("player"),
        pos(32, 96),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);

        // go to next section
        if (player.pos.x > 160) {
            go("main");
        }
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < -12) {
            go("main");
        }
    });
    onKeyPress("w", () => {
        // if( player.isGrounded()) {
        //     player.jump(330);
        // }
        player.doubleJump(330)
    });




    
}