import "kaplay/global";
import sectionholes from "./sectionholes";
import sectionunderground from "./sectionunderground";
import sectionflowercave from "./sectionflowercave";

export default function (STATE) {
    scene("sectionholes", sectionholes);
    scene("sectionunderground", sectionunderground);
    scene("sectionflowercave", sectionflowercave);

    loadSprite("background", "sprites/assets/backgrounds/background1_moonlight.png");
    loadSprite("area_underground", "sprites/assets/sections/section_underground.png");
    loadSprite("player", "sprites/assets/characters/player.png");
    loadSprite("scissors", "sprites/assets/items/scissors.png");
    loadSprite("vine", "sprites/assets/items/vines.png");


    let SPEED = 75;
    setGravity(1850);

    const moon_bg = add([
        sprite("background"),
        pos(0, 0),
    ]);

    add([
        sprite("area_underground"),
        pos(0, 0),
        body({ isStatic: true }),
    ]);

    // adding platform ====================================
    add([
        rect(750, 32),
        pos(-50, 112),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])
    add([
        rect(450, 32),
        pos(-50, 0),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(64, 16),
        pos(0, 96),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(48, 32),
        pos(0, 32),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(64, 16),
        pos(176, 64),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 32),
        pos(160, 80),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 16),
        pos(336, 96),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 32),
        pos(368, 80),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 48),
        pos(400, 64),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])

    add([
        rect(32, 112),
        pos(432, 0),
        color(99, 155, 255),
        opacity(0.5),
        area(),
        body({ isStatic: true }),
    ])



    // adding player ======================================
    const player = add([
        sprite("player"),
        pos(112, 96),
        body(),
        area(),
        doubleJump(2),
    ]);

    onKeyDown("d", () => {
        player.move(SPEED, 0);
    });
    onKeyDown("a", () => {
        player.move(-SPEED, 0);
        if (player.pos.x < 16) {
            go("sectionflowercave", STATE);
        }
    });
    onKeyPress("w", () => {
        if (player.pos.x > 416 && player.pos.x < 432) {
            go("sectionholes", STATE);
        }
        player.doubleJump(330)
    });


    // camera =====================================
    const original_cam_posx = player.pos.x;
    // debug.log("original cam pos x: " + original_cam_posx);
    player.onUpdate(() => {

        // first if statement to stop cam at end of section
        if (player.pos.x < 384 && player.pos.x > 80) {
            // 2nd if statement to move cam with player
            // if (player.pos.x >= original_cam_posx + 16) {
            //     setCamPos(player.pos.x + 96, height() / 2);
            //     // moon_bg.pos.x = player.pos.x - 64;
            // }
            setCamPos(player.pos.x, height() / 2);
            moon_bg.pos.x = player.pos.x - 80;
        }

    })

    // items =======================================

    if (!STATE.scissor_item.collected) {
        const scissoritem = add([
            sprite("scissors"),
            pos(208, 96),
            body(),
            area(),
            z(2),
            "scissor_item"
        ])
    }

    player.onCollide("scissor_item", (scissor) => {
        // text
        const textbg = add([
            rect(160, 5),
            pos(192, 80),
            color(255, 255, 255)
        ])
        const found = add([
            text("found shears. press f to cut vines or enemies!", {
                size: 5,
            }),
            pos(192, 80),
            color(0, 0, 0)
        ])
        wait(10, () => {
            found.destroy()
            textbg.destroy()
        })
        scissor.destroy();
        STATE.scissor_item.collected = true;
        console.log("Collected scissor");
    })


    // A LOT OF VINES
    if (!STATE.vine_1) {
        const vineitem = add([
            sprite("vine"),
            pos(80, 32),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_1"
        ])
    }

    player.onCollide("vine_1", (vine1) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine1)) {
                if (STATE.scissor_item.collected && !STATE.vine_1) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(80, 32),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(80, 32),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine1.destroy();
                    STATE.vine_1 = true;
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

    if (!STATE.vine_2) {
        const vineitem = add([
            sprite("vine"),
            pos(80, 48),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_2"
        ])
    }

    player.onCollide("vine_2", (vine2) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine2)) {
                if (STATE.scissor_item.collected && !STATE.vine_2) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(80, 48),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(80, 48),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine2.destroy();
                    STATE.vine_2 = true;
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

    if (!STATE.vine_3) {
        const vineitem = add([
            sprite("vine"),
            pos(80, 64),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_3"
        ])
    }

    player.onCollide("vine_3", (vine3) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine3)) {
                if (STATE.scissor_item.collected && !STATE.vine_3) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(80, 64),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(80, 64),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine3.destroy();
                    STATE.vine_3 = true;
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

    if (!STATE.vine_4) {
        const vineitem = add([
            sprite("vine"),
            pos(80, 80),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_4"
        ])
    }

    player.onCollide("vine_4", (vine4) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine4)) {
                if (STATE.scissor_item.collected && !STATE.vine_4) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(80, 80),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(80, 80),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine4.destroy();
                    STATE.vine_4 = true;
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

    if (!STATE.vine_5) {
        const vineitem = add([
            sprite("vine"),
            pos(80, 96),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_5"
        ])
    }

    player.onCollide("vine_5", (vine5) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine5)) {
                if (STATE.scissor_item.collected && !STATE.vine_5) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(80, 96),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(80, 96),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine5.destroy();
                    STATE.vine_5 = true;
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


    // vines before ladder

    if (!STATE.vine_6) {
        const vineitem = add([
            sprite("vine"),
            pos(320, 32),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_6"
        ])
    }

    player.onCollide("vine_6", (vine6) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine6)) {
                if (STATE.scissor_item.collected && !STATE.vine_6) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(320, 32),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(320, 32),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine6.destroy();
                    STATE.vine_6 = true;
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

    if (!STATE.vine_7) {
        const vineitem = add([
            sprite("vine"),
            pos(320, 48),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_7"
        ])
    }

    player.onCollide("vine_7", (vine7) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine7)) {
                if (STATE.scissor_item.collected && !STATE.vine_7) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(320, 48),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(320, 48),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine7.destroy();
                    STATE.vine_7 = true;
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

    if (!STATE.vine_8) {
        const vineitem = add([
            sprite("vine"),
            pos(320, 64),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_8"
        ])
    }

    player.onCollide("vine_8", (vine8) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine8)) {
                if (STATE.scissor_item.collected && !STATE.vine_8) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(320, 64),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(320, 64),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine8.destroy();
                    STATE.vine_8 = true;
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

    if (!STATE.vine_9) {
        const vineitem = add([
            sprite("vine"),
            pos(320, 80),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_9"
        ])
    }

    player.onCollide("vine_9", (vine9) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine9)) {
                if (STATE.scissor_item.collected && !STATE.vine_9) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(320, 80),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(320, 80),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine9.destroy();
                    STATE.vine_9 = true;
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

    if (!STATE.vine_10) {
        const vineitem = add([
            sprite("vine"),
            pos(320, 96),
            body({ isStatic: true }),
            area(),
            z(2),
            "vine_10"
        ])
    }

    player.onCollide("vine_10", (vine10) => {
        onUpdate(() => {
            if (isKeyPressed("f") && player.isColliding(vine10)) {
                if (STATE.scissor_item.collected && !STATE.vine_10) {
                    // text
                    const textbg = add([
                        rect(16, 5),
                        pos(320, 96),
                        color(255, 255, 255)
                    ])
                    const found = add([
                        text("snip", {
                            size: 5,
                        }),
                        pos(320, 96),
                        color(0, 0, 0)
                    ])
                    wait(3, () => {
                        found.destroy()
                        textbg.destroy()
                    })
                    vine10.destroy();
                    STATE.vine_10 = true;
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



}