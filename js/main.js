(() => {
  const itemsContainer = document.querySelectorAll("#itemsContainer"),
        resetButton = document.querySelectorAll("#resetButton p"),
        drinksBox = document.querySelector(".drinks"),
        cakesBox = document.querySelector(".cakes"),
        cdsBox = document.querySelector(".cds"),
        drinks = document.querySelectorAll(".drinks img"),
        cakes = document.querySelectorAll(".cakes img"),
        cds = document.querySelectorAll(".cds img"),
        dropPlate = document.querySelectorAll(".drop-zone-plate"),
        dropWooden = document.querySelectorAll(".drop-zone-wooden"),
        dropIpod = document.querySelectorAll(".drop-zone-ipod");

    function allowDrag(event) {
    	event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.setData("track", this.dataset.audio);
      let currentImage = event.dataTransfer.getData("text/plain");
      let item = document.querySelector(`#${currentImage}`);
      if (item.id == "cream" || item.id == "matcha" || item.id == "coffee") {
        plateChosen();
      }
      if (item.id == "oreo" || item.id == "roll" || item.id == "berry") {
        woodenChosen();
      }
      if (item.id == "rain" || item.id == "fire" || item.id == "bird") {
        ipodChosen();
      }
      //console.log("start");
    }

    function plateChosen() {
      dropPlate.forEach(plate => {
      			plate.classList.add("plateChosen");
      		});
    }
    function plateUnchosen() {
      dropPlate.forEach(plate => {
            plate.classList.remove("plateChosen");
          });
    }

    function woodenChosen() {
      dropWooden.forEach(wooden => {
            wooden.classList.add("woodenChosen");
          });
    }
    function woodenUnchosen() {
      dropWooden.forEach(wooden => {
            wooden.classList.remove("woodenChosen");
          });
    }

    function ipodChosen() {
      dropIpod.forEach(ipod => {
            ipod.classList.add("ipodChosen");
          });
    }
    function ipodUnchosen() {
      dropIpod.forEach(ipod => {
            ipod.classList.remove("ipodChosen");
          });
    }

    function allowDragEnd(event) {
      event.preventDefault();
      plateUnchosen();
      woodenUnchosen();
      ipodUnchosen();
      //console.log("dragend");
    }

    function allowDragOver(event) {
  		event.preventDefault();
      //console.log("dragover");
  	}


    function allowDrop(event) {
      let currentImage = event.dataTransfer.getData("text/plain");
      let item = document.querySelector(`#${currentImage}`);
      let trackName = `audio/${event.dataTransfer.getData("track")}.mp3`;
      let audio = document.createElement("audio");
      audio.src = trackName;
      audio.addEventListener("ended", function () {
          audio.currentTime = 0;
          audio.play();
        })
      if (this.dataset.drop === item.dataset.drop) {
          if(this.childNodes.length === 0) {
          this.appendChild(item);
          this.appendChild(audio);
          audio.play();
          item.classList.add("dropped");
        }
        else {
          let firstChild = this.firstChild;
          let secondChild = this.childNodes[1];
          item.parentElement.append(this.firstChild);
          this.removeChild(secondChild);
			    this.appendChild(item);
          this.appendChild(audio);
          audio.play();
          firstChild.classList.remove("dropped");
          item.classList.add("dropped");
        }
      }
    }

    function resetDrinks() {
        drinks.forEach(drinks => {
          let plate = document.querySelector(".drop-zone-plate");
          let audioDrinksRemove = plate.childNodes[1];
          let currentDrinks = plate.childNodes[0];
          plate.removeChild(audioDrinksRemove);
          drinksBox.appendChild(currentDrinks);
          currentDrinks.classList.remove("dropped");
      });
    }

    function resetCakes() {
      cakes.forEach(cakes => {
        let wooden = document.querySelector(".drop-zone-wooden");
        let audioCakesRemove = wooden.childNodes[1];
        let currentCakes = wooden.childNodes[0];
        wooden.removeChild(audioCakesRemove);
        cakesBox.appendChild(currentCakes);
        currentCakes.classList.remove("dropped");
      });
    }

    function resetCds() {
      cds.forEach(cds => {
        let iPod = document.querySelector(".drop-zone-ipod");
        let audioCdsRemove = iPod.childNodes[1];
        let currentCds = iPod.childNodes[0];
        iPod.removeChild(audioCdsRemove);
        cdsBox.appendChild(currentCds);
        currentCds.classList.remove("dropped");
      });
    }

    resetButton.forEach(button => {
      button.addEventListener('click', resetDrinks),
      button.addEventListener('click', resetCakes),
      button.addEventListener('click', resetCds)

    });


  drinks.forEach(drinks => {
    drinks.addEventListener('dragstart', allowDrag),
    drinks.addEventListener('dragend', allowDragEnd)
  });

  cakes.forEach(cakes => {
    cakes.addEventListener('dragstart', allowDrag),
    cakes.addEventListener('dragend', allowDragEnd)
  });

  cds.forEach(cds => {
    cds.addEventListener('dragstart', allowDrag),
    cds.addEventListener('dragend', allowDragEnd)
  });

  dropPlate.forEach(zone =>  {
  	zone.addEventListener('dragover', allowDragOver),
  	zone.addEventListener('drop', allowDrop)
  });

  dropWooden.forEach(zone =>  {
    zone.addEventListener('dragover', allowDragOver),
    zone.addEventListener('drop', allowDrop)
  });

  dropIpod.forEach(zone =>  {
  	zone.addEventListener('dragover', allowDragOver),
  	zone.addEventListener('drop', allowDrop)
  });


})();
