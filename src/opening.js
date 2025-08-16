import "kaplay/global";
import backyard from "./backyard";

export default function(STATE){
    loadAseprite("opening_cutscene", "./sprites/assets/animations/opening_cutscene.png", "./sprites/assets/animations/opening_cutscene.json");
    scene("backyard", backyard);

    loadSound("bg_music", "./sprites/assets/items/caves-of-dawn-10376.mp3");
    const music = play("bg_music",{
        volume:0.2,
        loop:true
    })

    const cutscene = add([
        sprite("opening_cutscene",{
            // anim: "op",
        }),
        pos(0,0),
        // animate(),
    ])

    cutscene.play("op", {
        loop: false,
        onEnd: () => {
            // go to backyard scene after cutscene ends
            go("backyard", STATE);
        }
    });
    

}

