class Enemy {
    constructor(speed, höhe) {
        this.höhe = höhe
        this.canvas = canvas
        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy1.png'
        this.anzahlFelder = 6
        this.feldBreite = 1758 / this.anzahlFelder
        this.feldHöhe = Math.floor(Math.random() * 745 + 155)
        this.aktuellesFeldX = 0
        this.enemyGroesse = 1
        this.enemyBreite = this.feldBreite * this.enemyGroesse - 50
        this.enemyHöhe = this.feldHöhe * this.enemyGroesse - 50
        this.enemyPositionX = this.canvas.width
        this.frameCounter = 0;
        this.speed = Math.floor(Math.random() * 20)
        this.readyForDeletion = false
        this.höhenSpeed = Math.floor(Math.random() * 20)
        this.enemyGrößeReal = 105
        this.isEnemyAlive = true
        this.extraDamage = false
    }
    draw() {
        this.frameCounter += 1;
        ctx.drawImage(
            this.enemyImage,
            this.feldBreite * this.aktuellesFeldX,
            0,
            this.feldBreite,
            this.feldHöhe,
            this.enemyPositionX,
            this.canvas.height - this.enemyHöhe,
            this.enemyBreite,
            this.enemyHöhe)
        if (this.frameCounter % 2 == 0) {
            this.aktuellesFeldX += 1
        }

        if (this.aktuellesFeldX == this.anzahlFelder) {
            this.aktuellesFeldX = 0
        }

    }
    move() {
this.enemyPositionX -= this.speed
this.feldHöhe += this.höhenSpeed
this.enemyHöhe += this.höhenSpeed
if (this.feldHöhe > this.canvas.height) {
    this.höhenSpeed = -Math.floor(Math.random() * 20)
} 
if (this.feldHöhe < 0 + this.enemyGrößeReal) {
    this.höhenSpeed = Math.floor(Math.random() * 20)
}
if (this.enemyPositionX < 0 - this.enemyBreite) {

}
    }
}

class Berkel extends Enemy {
    constructor(speed, höhe) {
        super(speed, höhe)
        this.enemyImage.src = 'enemy2.png'
        this.feldBreite = 1596 / this.anzahlFelder
        this.enemyGrößeReal = 188
    }
}
class Serber extends Enemy {
    constructor(speed, höhe) {
        super(speed, höhe)
        this.enemyImage.src = 'enemy3.png'
        this.feldBreite = 1308 / this.anzahlFelder
        this.enemyGrößeReal = 177
    }
}
class Jochenes extends Enemy {
    constructor(speed, höhe) {
        super(speed, höhe)
        this.enemyImage.src = 'enemy4.png'
        this.anzahlFelder = 9
        this.feldBreite = 1917 / this.anzahlFelder
        this.enemyGrößeReal = 212
        this.extraDamage = true
    }
}