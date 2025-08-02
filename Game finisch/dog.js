class Dog {
  constructor() {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.playerImage = new Image();
    this.playerImage.src = "dog_left_right_white.png";

    this.heartFull = new Image();
    this.heartFull.src = "https://th.bing.com/th/id/R.b0d46b463e0dd55c02097d048437f77c?rik=8mIjm1V%2biph2kQ&pid=ImgRaw&r=0";

    this.frameWidth = 1800 / 9;
    this.frameHeight = 2182 / 12;

    this.spielerzeichnenx = 0;
    this.spielerzeichneny = 470;
    this.spielerzeichnenw = this.frameWidth;
    this.spielerzeichnenh = this.frameHeight + 100;

    this.status = "sprinten rechts";
    this.speed = 0;
    this.acc = 0;

    this.aktuellesFeldX = 0;
    this.aktuellesFeldY = 0;
    this.anzahlFelder = 9;

    this.attackEndurance = 100;
    this.maxEndurance = 100;

    this.frameCounter = 0;
    this.regenRate = 0.3;
    this.drainRate = 1.2;
    this.health = 5;
    this.maxHealth = 5;

    // Position & Größe der Attackbar im Canvas
    this.attackbarX = 200;
    this.attackbarY = 20;
    this.attackbarWidth = 250;
    this.attackbarHeight = 31;
    this.invincibility = 0
  }

  draw() {
    this.updateAnimationFrame();
    this.ctx.drawImage(
      this.playerImage,
      this.frameWidth * this.aktuellesFeldX,
      this.frameHeight * this.aktuellesFeldY,
      this.frameWidth,
      this.frameHeight,
      this.spielerzeichnenx,
      this.spielerzeichneny,
      this.spielerzeichnenw,
      this.spielerzeichnenh
    );

    this.drawHealth();
    this.drawAttackBar();
  }

  updateAnimationFrame() {
    const statusYMap = {
      "springen rechts": 2,
      "springen links": 3,
      "landen rechts": 4,
      "landen links": 5,
      "sprinten rechts": 6,
      "sprinten links": 7,
      "ducken rechts": 8,
      "ducken links": 9,
      "rollen rechts": 10,
      "rollen links": 11
    };
    this.aktuellesFeldY = statusYMap[this.status] ?? 6;

    this.frameCounter++;
    if (this.frameCounter % 5 === 0) {
      this.aktuellesFeldX = (this.aktuellesFeldX + 1) % this.anzahlFelder;
    }
  }

  drawHealth() {
    for (let i = 0; i < this.health; i++) {
      this.ctx.drawImage(this.heartFull, 20 + i * 35, 20, 30, 30);
    }
  }
  drawAttackBar() {
    // Hintergrund
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(this.attackbarX, this.attackbarY, this.attackbarWidth, this.attackbarHeight);

    // Füllung
    const filledWidth = (this.attackEndurance / this.maxEndurance) * this.attackbarWidth;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.attackbarX, this.attackbarY, filledWidth, this.attackbarHeight);

    // Rahmen
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(this.attackbarX, this.attackbarY, this.attackbarWidth, this.attackbarHeight);
  }
   damage(){
   // Bug beheben Enemys sterben nur wenn sie auf dem Boden sind oder so und Hittbox verfeinern und führ später feinheiten sounds Bugs usw...
    if(this.invincibility == 0){
      this.health -= 1;
     this.invincibility = 90
   }
   }
  setLayerSpeed(min, max) {
    layer1Hilfe.speed = min;
    layer2Hilfe.speed = min + 0.5;
    layer3Hilfe.speed = min + 1;
    layer4Hilfe.speed = min + 1.5;
    layer5Hilfe.speed = max;
  }

  move() {
    if(this.invincibility > 0){
      this.invincibility -= 1
    }
    if (this.status === "sprinten rechts") {
      this.spielerzeichnenx += 5;
      this.setLayerSpeed(9, 11);
    } else if (this.status === "sprinten links") {
      this.spielerzeichnenx -= 5;
      this.setLayerSpeed(6, 8);
    } else if (this.status.startsWith("ducken")) {
      this.setLayerSpeed(0, 0);
    } else if (this.status == "rollen rechts") {
      this.setLayerSpeed(9, 11);
      this.spielerzeichnenx += 2;
    } else if (this.status == "rollen links") {
      this.setLayerSpeed(6, 8);
      this.spielerzeichnenx -= 2;
    } else if (this.status == "springen rechts") {
      this.setLayerSpeed(9, 11);
      this.spielerzeichnenx += 2;
    } else if (this.status == "springen links") {
      this.setLayerSpeed(6, 8);
      this.spielerzeichnenx -= 2;
    } else if (this.status == "landen rechts") {
      this.setLayerSpeed(9, 11);
      this.spielerzeichnenx += 2;
    } else if (this.status == "landen links") {
      this.setLayerSpeed(6, 8);
      this.spielerzeichnenx -= 2;
    }

    this.speed += this.acc;
    this.spielerzeichneny += this.speed;

    if (this.speed <= 2 && this.spielerzeichneny <= 152) {
      if (this.status === "springen rechts") {
        this.status = "landen rechts";
      } else if (this.status === "springen links") {
        this.status = "landen links";
      }
    }

    if (this.spielerzeichneny >= 470) {
      this.spielerzeichneny = 470;
      this.speed = 0;
      this.acc = 0;

      if (this.status === "landen rechts") {
        this.status = "sprinten rechts";
      } else if (this.status === "landen links") {
        this.status = "sprinten links";
      }
    }

    if (this.spielerzeichnenx >= this.canvas.width - this.spielerzeichnenw) {
      this.spielerzeichnenx = this.canvas.width - this.spielerzeichnenw;
      if (this.status.includes("rechts")) this.status = "sprinten links";
    } else if (this.spielerzeichnenx <= 0) {
      this.spielerzeichnenx = 0;
      if (this.status.includes("links")) this.status = "sprinten rechts";
    }

    this.handleAttackBar();
  }

  handleAttackBar() {
    if (this.status.startsWith("rollen")) {
      this.attackEndurance = Math.max(0, this.attackEndurance - this.drainRate);
    } else {
      this.attackEndurance = Math.min(this.maxEndurance, this.attackEndurance + this.regenRate);
    }


    if (this.attackEndurance <= 0 && this.status.startsWith("rollen")) {
      this.status = this.status.includes("rechts") ? "sprinten rechts" : "sprinten links";
    }
  }

  heroAufBoden() {
    return this.spielerzeichneny >= 470;
  }

  takeAction(key) {
    switch (key) {
      case "ArrowRight":
        this.status = "sprinten rechts";
        this.anzahlFelder = 9;
        break;
      case "ArrowLeft":
        this.status = "sprinten links";
        this.anzahlFelder = 9;
        break;
      case "ArrowUp":
        if (this.heroAufBoden()) {
          this.status = this.status.includes("links") ? "springen links" : "springen rechts";
          this.speed = -14;
          this.acc = 0.3;
          this.anzahlFelder = 7;
        }
        break;
      case "ArrowDown":
        if (!this.heroAufBoden()) return;
        this.status = this.status.includes("links") ? "ducken links" : "ducken rechts";
        this.anzahlFelder = 5;
        break;
      case " ":
        if (this.attackEndurance > 0) {
          this.status = this.status.includes("links") ? "rollen links" : "rollen rechts";
          this.anzahlFelder = 7;
        }
        break;
    }
  }
}