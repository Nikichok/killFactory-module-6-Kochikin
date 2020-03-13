const numDivs = 36;
const maxHits = 10;

let hits = 0;
let lostHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
 // $(div.target).removeClass("target"); - не работает :(

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1);
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 0) {
    firstHitTime = getTimestamp();
    $("#button-reload").text("Играть заново");

  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $("div.playfield").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#lost-hits").text(lostHits);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(".miss").removeClass("miss");
    hits = hits + 1;
    $(event.target).removeClass("target");
    $(event.target).text("");
    round();
  }
  else {
    $(event.target).addClass("miss");
    lostHits = lostHits + 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  //round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
   if (hits === 0) {
      round();
   }
   else {
      location.reload();
   }
  
  });
}

$(document).ready(init);
