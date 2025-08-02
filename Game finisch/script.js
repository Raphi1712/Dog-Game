let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.height = 900;
canvas.width = 1500;
let invincibility = 0
let hero2Breite = 100;
let hero1 = new Dog();
enemyChoose()
let enemy1 = neuerGegner
let enemys = [enemy1]
let jumpspeed = 0;
let speed = 15;
let heartFull = new Image();
let death = false
let wiederholung = false
let newEnemy = 180
heartFull.src = "https://th.bing.com/th/id/R.b0d46b463e0dd55c02097d048437f77c?rik=8mIjm1V%2biph2kQ&pid=ImgRaw&r=0";
heartEmpty = new Image();
heartEmpty.src = "https://th.bing.com/th/id/OIP.5kPakPj9zNBfbx81YzfYRAAAAA?w=90&h=90&c=7&r=0&o=5&dpr=1.1&pid=1.7";
let layer1 = new Image();
layer1.src = "layer-1.png";
let layer2 = new Image();
layer2.src = "layer-2.png";
let layer3 = new Image();
layer3.src = "layer-3.png";
let layer4 = new Image();
layer4.src = "layer-4.png";
let layer5 = new Image();
layer5.src = "layer-5.png";
let health = 5;
let maxHealth = 5;
let enenmyCounter = 0
let layer1Hilfe = new Layer(layer1, 0.3, canvas, ctx);
let layer2Hilfe = new Layer(layer2, 0.5, canvas, ctx);
let layer3Hilfe = new Layer(layer3, 0.7, canvas, ctx);
let layer4Hilfe = new Layer(layer4, 0.9, canvas, ctx);
let layer5Hilfe = new Layer(layer5, 1, canvas, ctx);
function drawHearts(ctx, x = 20, y = 20, size = 32) {
  for (let i = 0; i < maxHealth; i++) {
    const heartX = x + i * (size + 4); 

    if (i < hero1.health) {
      ctx.drawImage(heartFull, heartX, y, size, size);
    } else {
      ctx.drawImage(heartEmpty, heartX, y, size, size);
    }
  }
}
function detectCollitions() {
 
  let dogXcenter = hero1.spielerzeichnenx + hero1.spielerzeichnenw / 2
  let dogYcenter = hero1.spielerzeichneny + hero1.spielerzeichnenh / 2

  for (let i = 0; i < enemys.length; i++) {
  let enemyXcenter = enemys[i].enemyPositionX + enemys[i].enemyBreite / 2
  let enemyYcenter = enemys[i].feldHöhe + enemys[i].enemyHöhe / 2
  let enemyRadius = enemys[i].enemyHöhe / 3 // änderung
  let heroRadius = hero1.spielerzeichnenh / 3
  let dist = distance(dogXcenter, dogYcenter, enemyXcenter, enemyYcenter)
    console.log(dist)
  if (dist < enemyRadius + heroRadius) {

    if (hero1.status.startsWith("rollen")) {
      enemys[i].isEnemyAlive = false
    enenmyCounter += 1  

    } else {
    
      console.log("damage")
      hero1.damage()
    }
  }
}
}
function gameEnd() {


  death = true

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
 
  ctx.fillText("Game Over ! Try Again ", canvas.width / 2 - 221, canvas.height / 2 - 221 );
     
}
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
function enemyChoose() {
  GegnerTyp = Math.floor(Math.random() * 4) 
  if (GegnerTyp == 0) {
    neuerGegner = new Enemy(7,1)
}
else if (GegnerTyp == 1) {
    neuerGegner = new Berkel(7,1)
}
else if (GegnerTyp == 2) {
    neuerGegner = new Serber(7,1)
}
else {
    neuerGegner = new Jochenes(7,1)
}
}
requestAnimationFrame(animate);
function animate() {
  newEnemy -= 1
  
  if (death == true) {
    return
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  [layer1Hilfe, layer2Hilfe, layer3Hilfe, layer4Hilfe, layer5Hilfe].forEach(l => {
    l.draw();
    l.move();
  });

  if (hero1.health < 1) {

    gameEnd()

  }

  for (let i = 0; i < enemys.length; i++) {
    enemys[i].move()
    enemys[i].draw() 
    if (enemys[i].isEnemyAlive == false || enemys[i].enemyPositionX + enemys[i].enemyBreite <= 0 ) {
      console.log("EENEMY DEADDDDDDDDDDDDDDDDDD")
      enemys.splice(i, 1);
    }
  }

  if (newEnemy == 0) {

    newEnemy = 90
    enemyChoose()
    enemy2 = neuerGegner
   enemys.push(enemy2)

  }
  hero1.draw();
  hero1.move();
  detectCollitions()
  drawHearts(ctx, 20, 20);
  ctx.font = "42px sans-serif";
  ctx.fillText("Enemy Counter : " + enenmyCounter, canvas.width / 2 - 275 ,50);
  requestAnimationFrame(animate);
}

window.addEventListener("keydown", e => {
  hero1.takeAction(e.key);
});

window.addEventListener("keyup", e => {
  if (e.key === "ArrowDown") {
    if (hero1.status === "ducken links") hero1.status = "sprinten links";
    else if (hero1.status === "ducken rechts") hero1.status = "sprinten rechts";
  }

  if (e.key === " ") {
    if (!hero1.heroAufBoden()) {
      if (hero1.speed < 0) {
        if (hero1.status.endsWith("links")) {

          hero1.status = "springen links";
        } else if (hero1.status.endsWith("rechts")) {

          hero1.status = "springen rechts";
        }
      } else if (hero1.speed > 0) {
        if (hero1.status.endsWith("links")) {

          hero1.status = "landen links";
        } else if (hero1.status.endsWith("rechts")) {

          hero1.status = "landen rechts";
        }
      }
    } else if (hero1.heroAufBoden()) {
      if (hero1.status.endsWith("links")) {
        hero1.status = "sprinten links"
      } else if (hero1.status.endsWith("rechts")) {

        hero1.status = "sprinten rechts"
      }
    }
    // Nach Angriff: Status wieder korrekt setzen, falls in der Luft
    //if (hero1.status.includes("angriff") && !hero1.heroAufBoden()) {
    //  if (hero1.speed < 0) {
    //    hero1.status = hero1.status.endsWith("links") ? "springen links" : "springen rechts";
    //  } else {
    //    hero1.status = hero1.status.endsWith("rechts") ? "landen links" : "landen rechts";
    //  }
    //}
  }
});


