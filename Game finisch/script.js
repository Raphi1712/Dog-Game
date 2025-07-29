const canvas = canvas1;

const ctx = canvas.getContext("2d");
canvas.height = 900;
canvas.width = 1500;
let hero2Breite = 100
let hero1 = new Dog()
let jumpspeed = 0
let speed = 15
let layer1 = new Image();
layer1.src = "layer-1.png"
let layer2 = new Image();
layer2.src = "layer-2.png"
let layer3 = new Image();
layer3.src = "layer-3.png"
let layer4 = new Image();
layer4.src = "layer-4.png"
let layer5 = new Image();
layer5.src = "layer-5.png"
let layer1Hilfe = new Layer(layer1, 0.3)
let layer2Hilfe = new Layer(layer2, 0.5)
let layer3Hilfe = new Layer(layer3, 0.7)
let layer4Hilfe = new Layer(layer4, 0.9)
let layer5Hilfe = new Layer(layer5, 1)
requestAnimationFrame(animate)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    jumpspeed += 1
    layer1Hilfe.draw()
    layer1Hilfe.move()
    layer2Hilfe.draw()
    layer2Hilfe.move()
    layer3Hilfe.draw()
    layer3Hilfe.move()
    layer4Hilfe.draw()
    layer4Hilfe.move()
    layer5Hilfe.draw()
    layer5Hilfe.move()
    hero1.draw()
    hero1.move()
    requestAnimationFrame(animate)
}


window.addEventListener('keydown', function (actionValue) {
    hero1.takeAction(actionValue.key)
});

window.addEventListener('keyup', function (actionValue) {
    hero1.aktuellesFeldX = 0
    if (actionValue.key == "ArrowDown"
    ) {
        if (hero1.status == "ducken links") {
            hero1.status = "sprinten links"
        } else if (hero1.status == "ducken rechts") {
            hero1.status = "sprinten rechts"
        }
    } else if (actionValue.key == " ") {
        if (hero1.status == "rollen links") {
            if (hero1.speed <= 0 && hero1.heroAufBoden() == false) {
                hero1.status = "springen links"
            } else if (hero1.speed > 0 && hero1.heroAufBoden() == false) {

                hero1.status = "landen links"

            } else {
                hero1.status = "sprinten links"
            }
            hero1.clearInterval(drainInterval);
        }
        else if (hero1.status == "rollen rechts") {
            if (hero1.speed <= 0 && hero1.heroAufBoden() == false) {
                hero1.status = "springen rechts"
            } else if (hero1.speed > 0 && hero1.heroAufBoden() == false) {
                hero1.status = "landen rechts"
            } else {
                hero1.status = "sprinten rechts"
            }
        }

    }



})

