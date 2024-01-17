let $container = document.getElementById("container");
let $startbutton = document.getElementById("start-button");
let $gameResult = document.getElementById("game-result");
let $gametitle = document.getElementById("game-title");

let $mo1 = document.getElementById("mo1");
let $mo2 = document.getElementById("mo2");
let $mo3 = document.getElementById("mo3");
let $mo4 = document.getElementById("mo4");
let $mo5 = document.getElementById("mo5");
let $mo6 = document.getElementById("mo6");
let $mo7 = document.getElementById("mo7");
let $mo8 = document.getElementById("mo8");
let $mo9 = document.getElementById("mo9");
let $mo10 = document.getElementById("mo10");
let $mo11 = document.getElementById("mo11");
let $mo12 = document.getElementById("mo12");
let $first = document.getElementById("first");
let $second = document.getElementById("second");
let $third = document.getElementById("third");
let $fourth = document.getElementById("fourth");

let $Ground = [$first, $second, $third, $fourth];

let misssound = new Audio("misssound.mp3");
let hitsound = new Audio("hitsound.mp3");

let $moguras = [
  $mo1,
  $mo2,
  $mo3,
  $mo4,
  $mo5,
  $mo6,
  $mo7,
  $mo8,
  $mo9,
  $mo10,
  $mo11,
  $mo12,
];

const maxmogura = 45;
let countmogura = 0;
let hitmogura = 0;
let missmogura = 0;
let passmogura = 0;

let finish = false;
let playing = false;

$container.addEventListener("click", function (e) {
  if (e.target === $container) {
    missmogura++;
    misssound.currentTime = 0;
    misssound.play();
    console.log(`Missed: ${missmogura}`);
  }
});

for (let r = 0; r < $moguras.length; r++) {
  $moguras[r].style.display = "none";

  $moguras[r].addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target);
    e.target.src = "mole2.png";
    setTimeout(() => {
      e.target.src = "mole.png";
      $moguras[r].style.display = "none";
    }, 1000);
    hitmogura++;
    console.log(`Hit: ${hitmogura}`);
    hitsound.currentTime = 0;
    hitsound.play();
  });
}

$startbutton.addEventListener("click", function () {
  if (!playing) {
    playing = true;
    finish = false;
    $container.style.display = "block";
    $startbutton.style.display = "none";
    $gameResult.style.display = "none";
    $gametitle.style.display = "none";
    countmogura = 0;
    hitmogura = 0;
    missmogura = 0;
    passmogura = 0;
    movemogura();
  }
});

function movemogura() {
  let timer1 = setInterval(() => {
    let i = Math.floor(Math.random() * $moguras.length);
    if ($moguras[i].style.display === "none") {
      $moguras[i].style.display = "block";
      countmogura++;

      setTimeout(() => {
        $moguras[i].style.display = "none";
      }, 3000);

      if (countmogura >= maxmogura) {
        finish = true;
        clearInterval(timer1);
        $startbutton.innerHTML = "continue";
        $startbutton.style.display = "block";
        $gameResult.innerHTML = `<span id="hit-mogura">ヒット数 ${hitmogura}/45</span><br>
                <span id="pass-mogura">スルー数 ${
                  maxmogura - hitmogura
                }/45</span><br>
                <span id="miss-mogura">誤タップ数 ${missmogura}</span>`;
        $gameResult.style.display = "block";
        $container.style.display = "none";
        $startbutton.addEventListener("click", function () {
          location.reload();
        });
      }
    }
  }, 500);
}
