class Dog {
   constructor() {
      this.canvas = canvas
      this.playerImage = new Image();
      this.playerImage.src = 'dog_left_right_white.png'
      this.spielerAusschneidenx = 1800 / 9
      this.spielerAusschneideny = 2182 / 12
      this.spielerAusschneidenw = 1800 / 9
      this.spielerAusschneidenh = 2182 / 12
      this.spielerzeichnenx = 0
      this.spielerzeichneny = 470
      this.spielerzeichnenw = 1800 / 9
      this.spielerzeichnenh = 2182 / 12 + 100
      this.status = "sprinten rechts"
      this.speed = 0
      this.acc = 0
      this.aktuellesFeldX = 0
      this.aktuellesFeldY = 0
      this.anzahlFelder = 9
      this.maxEndurance = 300
      this.attackEndurance = this.maxEndurance
      this.frameCounter = 0
      this.bar = document.getElementById('bar');
      this.width = 100; // Start bei 100%
      this.drainInterval;
   }


   draw() {
     
      if (this.status == "springen rechts") {
         this.aktuellesFeldY = 2
      } else if (this.status == "springen links") {
         this.aktuellesFeldY = 3
      } else if (this.status == "landen rechts") {
         this.aktuellesFeldY = 4
      } else if (this.status == "landen links") {
         this.aktuellesFeldY = 5
      } else if (this.status == "sprinten rechts") {
         this.aktuellesFeldY = 6
         this.spielerzeichnenx += 2
         layer1Hilfe.speed = 9
         layer2Hilfe.speed = 9.5
         layer3Hilfe.speed = 10
         layer4Hilfe.speed = 10.5
         layer5Hilfe.speed = 11
      } else if (this.status == "sprinten links") {
         this.spielerzeichnenx -= 2
         layer1Hilfe.speed = 5
         layer2Hilfe.speed = 5.5
         layer3Hilfe.speed = 6
         layer4Hilfe.speed = 6.5
         layer5Hilfe.speed = 7
         this.aktuellesFeldY = 7
      } else if (this.status == "ducken rechts") {
         this.aktuellesFeldY = 8
         layer1Hilfe.speed = 0
         layer2Hilfe.speed = 0
         layer3Hilfe.speed = 3
         layer4Hilfe.speed = 0
         layer5Hilfe.speed = 0
      } else if (this.status == "ducken links") {
         this.aktuellesFeldY = 9
         layer1Hilfe.speed = 0
         layer2Hilfe.speed = 0
         layer3Hilfe.speed = 3
         layer4Hilfe.speed = 0
         layer5Hilfe.speed = 0
      } else if (this.status == "rollen rechts") {
         this.aktuellesFeldY = 10
      } else if (this.status == "rollen links") {
         this.aktuellesFeldY = 11
      }
      this.frameCounter += 1
      // console.log(this.speed)
      // hund 2 kleiner mk
      // stati definieren und logic
      ctx.drawImage(
         this.playerImage,
         this.spielerAusschneidenx * this.aktuellesFeldX,
         this.spielerAusschneideny * this.aktuellesFeldY,
         this.spielerAusschneidenw,
         this.spielerAusschneidenh,
         this.spielerzeichnenx,
         this.spielerzeichneny,
         this.spielerzeichnenw,
         this.spielerzeichnenh,
      )
      if (this.frameCounter % 2 == 0) {
         this.aktuellesFeldX += 1
      }
      if (this.aktuellesFeldX >= this.anzahlFelder) {
         this.aktuellesFeldX = 0
      }

      // Bewgung! unten
      //      if (this.frameCounter % 2 == 0) {
      //          this.aktuellesFeldX += 1
      //      }

      //      if (this.aktuellesFeldX == this.anzahlFelder) {
      //           
      //      }

      //      this.spielerPositionX += this.speed

   }
   move() {
      function decreaseBar() {
         if (this.status == "rollen links"  || this.status == "rollen rechts" && this.width > 0) {
           this.width = Math.max(0, width - 0.5); // Leiste verringern
           this.bar.style.width = this.width + "%";
         }
       }
       setInterval(() => {
         if (this.status !== "rollen links"  || this.status !== "rollen rechts" && this.width < 100) {
           this.width = Math.min(100, width + 0.2); // Leiste auffüllen
           this.bar.style.width = this.width + "%";
         }
       }, 25)
      if (this.spielerzeichnenx >= this.canvas.width - this.spielerzeichnenw) {
         this.status = "sprinten links"
         this.spielerzeichnenx -= 2
      }
      if (this.spielerzeichnenx <= 0) {
         this.status = "sprinten rechts"
         this.spielerzeichnenx += 2
      }
      this.spielerzeichneny += this.speed
      this.speed += this.acc
      this.heroAufBoden()
      if (this.spielerzeichneny > this.standardHöhe) {
         this.heroAufBoden()
      }
      if (this.status == "landen rechts") {
         if (this.heroAufBoden() == true) {
            this.status = "sprinten rechts"
         }
      } else if (this.status == "landen links") {
         if (this.heroAufBoden() == true) {
            this.status = "sprinten links"
         }
      } else if (this.status == "rollen rechts") {
         if (this.attackEndurance == 0) {
            console.log("234567890ß")
            this.status = "sprinten rechts"
            return
         }
         
      } else if (this.status == "rollen links") {
         if (this.attackEndurance == 0) {
            console.log("234567890ß")
            this.status = "sprinten links"
            return
         }
        
      }

      // else if (this.status == "rollen rechts") {
      //  if (this.heroAufBoden() == true) {
      //     this.status = "rollen rechts"
      //  }
      //  } else if (this.status == "rollen links") {
      //     if (this.heroAufBoden() == true) {
      //        this.status = "rollen links"
      //     }
      //  }
      if (this.speed >= 0 && this.status == "springen links") {
         this.status = "landen links"
      } else if (this.speed >= 0 && this.status == "springen rechts") {
         this.status = "landen rechts"
      }

      // if (this.spielerPositionX > this.canvas.width + this.spielerbreite) {
      //     this.speed = -this.distance
      // }
      //
      // if (this.spielerPositionX < -this.spielerbreite) {
      //     this.speed = +this.distance
      // }
      //   energie Bar also nicht unendlich Angreifen
   }
   heroAufBoden() {

      if (this.spielerzeichneny >= 470) {
         this.spielerzeichneny = 470
         this.speed = 0
         this.acc = 0
         return true
      }
      return false
   }
   takeAction(buttonValue) {
      console.log(buttonValue)
      if (buttonValue == 'ArrowRight') { // sprint right
         if (this.status == "springen links"
            || this.status == "springen rechts"
            || this.status == "landen links"
            || this.status == "landen rechts") {
            return
         }
         this.anzahlFelder = 9
         this.status = "sprinten rechts"
      }

      else if (buttonValue == 'ArrowLeft') { //sprint left
         if (this.status == "springen links"
            || this.status == "springen rechts"
            || this.status == "landen links"
            || this.status == "landen rechts") {
            return
         }
         this.anzahlFelder = 9
         this.status = "sprinten links"
      }
      else if (buttonValue == 'ArrowUp') { //springen
         if (!this.heroAufBoden() || this.status == "ducken links" || this.status == "ducken rechts") {
            return
         }
         if (this.status == "sprinten links") {
            this.status = "springen links"
         } else if (this.status == "sprinten rechts") {
            this.status = "springen rechts"
         }
         this.speed = -7
         this.acc = 0.1

         this.aktuellesFeldY = 2
         this.anzahlFelder = 7
      }
      else if (buttonValue == 'ArrowDown') { // ducken 
         if (this.status == "sprinten links") {
            this.status = "ducken links"
         } else if (this.status == "sprinten rechts") {
            this.status = "ducken rechts"
         }
         this.anzahlFelder = 5
      }
      else if (buttonValue == ' ') { // angriffsKugel 
         if (this.attackEndurance == 0) {
            return
         }
         if (this.status == "sprinten links" || this.status == "springen links" || this.status == "landen links") {
            this.status = "rollen links"
         } else if (this.status == "sprinten rechts" || this.status == "springen rechts" || this.status == "landen rechts") {
            this.status = "rollen rechts"
         }
         this.anzahlFelder = 7
      }


   }
}

//os vel acc
//all 1
//hero auf boden vel 0, acc 0
//vel -20, acc 0
