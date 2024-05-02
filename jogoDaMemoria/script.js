$(function () {
  const imgs = [
    "az",
    "bz",
    "cz",
    "dz",
    "ez",
    "fz",
    "gz",
    "hz",
    "az",
    "bz",
    "cz",
    "dz",
    "ez",
    "fz",
    "gz",
    "hz",
  ];

  setCards(imgs);
  setClicks();

  const restart = document.getElementById("restart");
  restart.addEventListener("click", function () {
    this.setAttribute("disabled", true)
    const card = document.querySelectorAll(".card");
    card.forEach((el) => {
      el.classList.remove("equals");
    });

    setTimeout(() => {
      const table = document.querySelector(".table");
      table.innerHTML = "";

      setCards(imgs);
      setClicks();

      this.removeAttribute("disabled");
      this.style.opacity = 0;
    }, 500);
  });

  function testFinish() {
    const card = document.querySelectorAll(".card");
    let finish = true;
    card.forEach((el) => {
      const equals = el.classList.value.indexOf("equals");

      if (equals == -1) {
        finish = false;
      }
    });
    return finish;
  }

  function flipCard(elem) {
    const equals = elem.classList.value.indexOf("equals");
    if (equals == -1) {
      elem.classList.add("active");
    }
  }

  function shuffle(array) {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function disabledCards(cards) {
    cards.forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("disabled");
    });
  }

  function setCards(imgs) {
    const imgsShuffle = shuffle(imgs);
    corte = 4;
    const lines = new Array();
    for (var i = 0; i < imgsShuffle.length; i = i + corte) {
      lines.push(imgsShuffle.slice(i, i + corte));
    }

    lines.forEach(function (line) {
      const lineGame = document.createElement("div");
      lineGame.classList.add("line");

      line.forEach(function (img) {
        const hover = document.createElement("div");
        hover.classList.add("cardHover");
        const imgView = document.createElement("div");
        imgView.classList.add("cardImage");
        imgView.classList.add("show");
        const imgHidden = document.createElement("div");
        imgHidden.classList.add("cardImage");
        imgHidden.classList.add("hidden");
        imgHidden.classList.add(img);
        imgHidden.type = img;
        const button = document.createElement("button");
        button.classList.add("card");

        button.append(hover);
        button.append(imgView);
        button.append(imgHidden);
        lineGame.append(button);
      });
      document.querySelector(".table").append(lineGame);
    });
  }

  function setClicks() {
    const card = document.querySelectorAll(".card");
    card.forEach((el) => {
      el.addEventListener("click", () => {
        flipCard(el);

        const allCards = document.querySelectorAll(".card.active").length;

        if (allCards == 2) {
          card.forEach((el) => {
            el.setAttribute("disabled", true);
          });
          setTimeout(() => {
            const card1 = document.querySelectorAll(
              ".card.active .cardImage.hidden",
            )[0].type;
            const card2 = document.querySelectorAll(
              ".card.active .cardImage.hidden",
            )[1].type;
            if (card1 == card2) {
              const cardsActive = document.querySelectorAll(".card.active");
              cardsActive.forEach((el) => {
                el.classList.add("equals");
              });
            }
            if (testFinish()) {
              const restart = document.getElementById("restart");
              restart.style.opacity = 1;
            }
            disabledCards(card);
          }, 500);
        }
      });
    });
  }
});
