import "kaplay/global";

export default function (STATE) {
    loadAseprite("ending_cutscene", "./sprites/assets/animations/ending_cutscene.png", "./sprites/assets/animations/ending_cutscene.json");

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


}

