import "kaplay/global";
// import game_ending_png from "/sprites/assets/animations/ending_cutscene.png";
// import game_ending_json from "/sprites/assets/animations/ending_cutscene.json?url";

export default function (STATE) {
    // loadAseprite("ending_cutscene", game_ending_png, game_ending_json);

    // loadAseprite("ending_cutscene_part1", "./sprites/assets/animations/ending_cutscene_part1.png", "./sprites/assets/animations/ending_cutscene_part1.json");
    // loadAseprite("ending_cutscene_part2", "./sprites/assets/animations/ending_cutscene_part2.png", "./sprites/assets/animations/ending_cutscene_part2.json");
    // loadAseprite("ending_cutscene_part3", "./sprites/assets/animations/ending_cutscene_part3.png", "./sprites/assets/animations/ending_cutscene_part3.json");

    const cutscene = add([
        sprite("ending_cutscene_part3", {
            // anim: "op",
        }),
        pos(0, 0),
        // animate(),
    ])

    cutscene.play("ed3", {
        loop: false,
        // onEnd: () => {
        //     // go to backyard scene after cutscene ends
        //     go("ending3", STATE);
        // }
    });




}

