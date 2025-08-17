import "kaplay/global";
import game_ending_png from "/sprites/assets/animations/ending_cutscene.png";
import game_ending_json from "/sprites/assets/animations/ending_cutscene.json?url";

export default function (STATE) {
    loadAseprite("ending_cutscene", game_ending_png, game_ending_json);

    loadAseprite("ending_cutscene_part1", "./sprites/assets/animations/ending_cutscene_part1.png", "./sprites/assets/animations/ending_cutscene_part1.json");
    loadAseprite("ending_cutscene_part2", "./sprites/assets/animations/ending_cutscene_part2.png", "./sprites/assets/animations/ending_cutscene_part2.json");
    loadAseprite("ending_cutscene_part3", "./sprites/assets/animations/ending_cutscene_part3.png", "./sprites/assets/animations/ending_cutscene_part3.json");

    const cutscene = add([
        sprite("ending_cutscene", {
            // anim: "op",
        }),
        pos(0, 0),
        // animate(),
    ])

    cutscene.play("ed", {
        loop: false,
        // onEnd: () => {
        //     // go to backyard scene after cutscene ends
        //     go("backyard", STATE);
        // }
    });

    // const cutscene1 = add([
    //     sprite("ending_cutscene_part1"),
    //     pos(0, 0),
    // ])
    // const cutscene2 = add([
    //     sprite("ending_cutscene_part2"),
    //     pos(0, 0),
    // ])
    // const cutscene3 = add([
    //     sprite("ending_cutscene_part3"),
    //     pos(0, 0),
    // ])
    // cutscene1.play("ed1", {
    //     loop: false,
    //     onEnd: () => {
    //         // go to backyard scene after cutscene ends
    //         cutscene2.play("ed2", {
    //             loop: false,
    //             onEnd: () => {
    //                 cutscene3.play("ed3", {
    //                     loop: false
    //                 })
    //             }
    //         })
    //     }
    // });



}

