const buttons = document.querySelector(".buttons");
const dayInput = document.querySelector("#setDays");
const hourInput = document.querySelector("#setHours");
const minuteInput = document.querySelector("#setMinutes");
const secondInput = document.querySelector("#setSeconds");
const inputs = document.querySelector(".inputs");
const allInputs = document.querySelectorAll(".input");
const inputElement = document.querySelector(".inputEl");
const counter = document.querySelector(".counter");
const startButton = document.querySelector("#start");
const nullButton = document.querySelector("#null");

const spanDay = document.getElementById("days");
const spanHour = document.getElementById("hrs");
const spanMinute = document.getElementById("mins");
const spanSecond = document.getElementById("secs");
const entities = document.querySelectorAll(".entity")
const allEnityEls = document.querySelector(".enitiyEl");

function origo() {
  spanDay.innerHTML = dayInput.placeholder;
  spanHour.innerHTML = hourInput.placeholder;
  spanMinute.innerHTML = minuteInput.placeholder;
  spanSecond.innerHTML = secondInput.placeholder;
}
origo()

// ************** INPUT EVENT START ******************

inputs.addEventListener("input", function(e) {
  let t = e.target;
  if (t.classList.contains("input")) {
    if (Number(t.value) > Number(t.max) && Number(t.value.length) > Number(t.getAttribute("maxlength")) || Number(t.value.length) > Number(t.getAttribute("maxlength"))) {
      t.value = t.value.slice(0, t.value.length - 1)
    }
    if (t.value.length > Number(t.getAttribute("maxlength")) || Number(t.value) > Number(e.target.max)) {
      t.style.backgroundColor = "#FF4136"
    } else {
      t.style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    }
    for (var i = 0; i < entities.length; i++) {
      if (e.target.parentElement.parentElement.children[i].children[0].value <= Number(e.target.parentElement.parentElement.children[i].children[0].max) && $("#start").hasClass("pauseInterval")) {
        entities[i].innerHTML = zeroPad(e.target.parentElement.parentElement.children[i].children[0].value)
      }
    }
  }
})

// ***************** INPUT EVENT END ******************

// **************** BUTTON EVENTS *******************

buttons.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn")) {
    if (inputsContainSomething()) {
      for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].value = null
      }
    }
  }
});

buttons.addEventListener("mousedown", function(e) {
  let cl = e.target.classList
  if (!cl.contains("nullBtn_inactive") && cl.contains("btn")) {
    e.target.style.filter = "brightness(80%)"
  }
})

buttons.addEventListener("mouseup", function(e) {
  let cl = e.target.classList
  if (!cl.contains("nullBtn_inactive") && cl.contains("btn")) {
    e.target.style.filter = "brightness(100%)"
  }
})

$('#start').click(function(e) {
  if (inputsContainSomething() && entitiesContainSomething() && !$(this).hasClass('startBtn_active')) {
    $('#null').removeClass('nullBtn_inactive')
    $('#null').addClass('nullBtn_active')
    $(this).addClass('startBtn_active')
    if ($(this).hasClass('pauseInterval')) {
      e.target.innerText = "pause"
    } else {
      e.target.innerText = "continue"
    }
    $(this).toggleClass('pauseInterval');
  } else if (!inputsContainSomething() && entitiesContainSomething() && $(this).hasClass('startBtn_active')) {
    if ($(this).hasClass('pauseInterval')) {
      e.target.innerText = "pause"
    } else {
      e.target.innerText = "continue"
    }
    $(this).toggleClass('pauseInterval');
  }
});

$('#null').click(function(e) {
  if ($('#start').hasClass('startBtn_active')) {
    $('#start').removeClass('startBtn_active');
    origo()
    startButton.innerText = "start";
    $('#null').removeClass('nullBtn_active')
    $("#null").addClass('nullBtn_inactive');
    if (!$('#start').hasClass('pauseInterval')) {
      $('#start').addClass('pauseInterval')
    }
  }
});

// **************** BUTTON EVENTS END *******************

// ******************** FUNCTIONS ***********************

function zeroPad(num) {
  let padded = String(num);
  for (var i = padded.length; i < 2; i++) {
    padded = "0" + padded
  }
  return padded
}

function inputsContainSomething() {
  for (var i = 0; i < allInputs.length; i++) {
    if (Number(allInputs[i].value) > 0) {
      return true /*valamelyik mezőben van valami*/
    }
  }
  return false /*mindegyik mező üres*/
}

function entitiesContainSomething() {
  for (var i = 0; i < entities.length; i++) {
    if (Number(entities[i].innerText) > 0) {
      return true /*valamelyik mezőben van valami*/
    }
  }
  return false /*mindegyik mező üres*/
}

function countDown() {
  let s = spanDay.innerText * 86400 + spanHour.innerText * 3600 + spanMinute.innerText * 60 + spanSecond.innerText * 1
  sec = s
  spanDay.innerText = zeroPad(Math.floor((sec - 1) / 86400));
  sec = sec - spanDay.innerText * 86400;
  spanHour.innerText = zeroPad(Math.floor((sec - 1) / 3600));
  sec = sec - spanHour.innerText * 3600;
  spanMinute.innerText = zeroPad(Math.floor((sec - 1) / 60));
  sec = sec - spanMinute.innerText * 60;
  spanSecond.innerText = zeroPad(Math.floor((sec - 1) / 1));
  sec = sec - spanSecond.innerText * 1;
  if (s === 1) {
    $('#start').addClass('pauseInterval');
    $('#start').removeClass('startBtn_active');
    $('#start').addClass('startBtn_inactive');
    $('#null').removeClass('nullBtn_active');
    $('#null').addClass('nullBtn_inactive');
    startButton.innerHTML = "start"
  }
}

// ************** FUNCTIONS END ******************

//****************** SETINTERVAL ************************

var queryCountDown = setInterval(function() {
  if (!$('#start').hasClass('pauseInterval')) {
    countDown()
  }
}, 1000);

// function secondsConverter(sec) {
//   let s = sec
//   let days;
//   let hours;
//   let minutes;
//   let seconds;
//   days = Math.floor(s / 86400);
//   s = s - days * 86400;
//   hours = Math.floor(s / 3600);
//   s = s - hours * 3600;
//   minutes = Math.floor(s / 60);
//   s = s - minutes * 60;
//   seconds = s;
//   console.log(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
// }