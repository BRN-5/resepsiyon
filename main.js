import { utcToZonedTime } from "date-fns-tz";

class Clock {
  constructor(el) {
    this.clockEl = el;
    this.UI = {};
    this.initializeClock();
  }

  updateClock = () => {
    // GETTING TIME
    const date = new Date();
    const now = utcToZonedTime(date, this.clockEl.dataset.locale);
    const seconds =
      ((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * 360;
    const minutes = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360;
    const hours = ((now.getHours() + now.getMinutes() / 60) / 12) * 360;
    // UI Update
    this.UI.second.style.transform = `rotate(${seconds}deg)`;
    this.UI.minute.style.transform = `rotate(${minutes}deg)`;
    this.UI.hour.style.transform = `rotate(${hours}deg)`;
    requestAnimationFrame(this.updateClock);
  };

  initializeClock() {
    this.clockEl.innerHTML = `<svg class="clockface" width="200" height="200" viewBox="-150 -150 300 300">
                <circle class="ring ring--seconds" r="145" pathlength="60" />
                <circle class="ring ring--hours" r="145" pathlength="12" />
                <line class="hand hand--minute" x1="0" y1="2" x2="0" y2="-110" />
                <line class="hand hand--hour" x1="0" y1="2" x2="0" y2="-60" />
                <circle class="ring ring--center" r="3" />
                <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-130" />
                <g transform="rotate(30)">
                  <text class="sayi" x="-0.5em" y="-100">1</text>
                </g>
                <g transform="rotate(60)">
                  <text class="sayi" x="-0.5em" y="-100">2</text>
                </g>
                <g transform="rotate(90)">
                  <text class="sayi" x="-0.5em" y="-100">3</text>
                </g>
                <g transform="rotate(120)">
                  <text class="sayi" x="-0.5em" y="-100">4</text>
                </g>
                <g transform="rotate(150)">
                  <text class="sayi" x="-0.5em" y="-100">5</text>
                </g>
                <g transform="rotate(180)">
                  <text class="sayi" x="-0.5em" y="-100">6</text>
                </g>
                <g transform="rotate(210)">
                  <text class="sayi" x="-0.5em" y="-100">7</text>
                </g>
                <g transform="rotate(240)">
                  <text class="sayi" x="-0.5em" y="-100">8</text>
                </g>
                <g transform="rotate(270)">
                  <text class="sayi" x="-0.5em" y="-100">9</text>
                </g>
                <g transform="rotate(300)">
                  <text class="sayi" x="-0.5em" y="-100">10</text>
                </g>
                <g transform="rotate(330)">
                  <text class="sayi" x="-0.5em" y="-100">11</text>
                </g>
                <g transform="rotate(360)">
                  <text class="sayi" x="-0.5em" y="-100">12</text>
                </g>
              </svg>`;
    this.UI.second = this.clockEl.querySelector(".hand--second");
    this.UI.minute = this.clockEl.querySelector(".hand--minute");
    this.UI.hour = this.clockEl.querySelector(".hand--hour");
    requestAnimationFrame(this.updateClock);
  }
}

const clocks = document.querySelectorAll(".clock");
clocks.forEach((el) => new Clock(el));

const currencyApi = "http://hasanadiguzel.com.tr/api/kurgetir";
const doviz =  ["usd", "eur", "yen", "pound"];

doviz.forEach((doviz) => {
  checkCurrency(doviz);
});

async function checkCurrency(kur) {
  const response = await fetch(currencyApi);
  var data = await response.json();

  if(kur == 'usd') { 
    document.querySelector(`.${kur}-name`).innerHTML = data.TCMB_AnlikKurBilgileri[0].Isim;
    document.querySelector(`.${kur}-buy`).innerHTML = "Alış ₺ " + data.TCMB_AnlikKurBilgileri[0].ForexBuying.toFixed(2);
    document.querySelector(`.${kur}-sell`).innerHTML = "Satış ₺ " + data.TCMB_AnlikKurBilgileri[0].ForexSelling.toFixed(2);
  }
  else if(kur == 'eur') {
    document.querySelector(`.${kur}-name`).innerHTML = data.TCMB_AnlikKurBilgileri[3].Isim;
    document.querySelector(`.${kur}-buy`).innerHTML = "Alış ₺ " + data.TCMB_AnlikKurBilgileri[3].ForexBuying.toFixed(2);
    document.querySelector(`.${kur}-sell`).innerHTML = "Satış ₺ " + data.TCMB_AnlikKurBilgileri[3].ForexSelling.toFixed(2);
  }
  else if(kur == 'yen') {
    document.querySelector(`.${kur}-name`).innerHTML = "100 " + data.TCMB_AnlikKurBilgileri[11].Isim;
    document.querySelector(`.${kur}-buy`).innerHTML = "Alış ₺ " + data.TCMB_AnlikKurBilgileri[11].ForexBuying.toFixed(2);
    document.querySelector(`.${kur}-sell`).innerHTML = "Satış ₺ " + data.TCMB_AnlikKurBilgileri[11].ForexSelling.toFixed(2);
  }
  else if(kur == 'pound') {
    document.querySelector(`.${kur}-name`).innerHTML = data.TCMB_AnlikKurBilgileri[4].Isim;
    document.querySelector(`.${kur}-buy`).innerHTML = "Alış ₺ " + data.TCMB_AnlikKurBilgileri[4].ForexBuying.toFixed(2);
    document.querySelector(`.${kur}-sell`).innerHTML = "Satış ₺ " + data.TCMB_AnlikKurBilgileri[4].ForexSelling.toFixed(2);
  }
}

setInterval(function () {
    doviz.forEach((doviz) => {
      checkCurrency(doviz);
    });
  }, 5000);

  const carousel = document.querySelector(".carousel");

let isDragStart = false, prevPageX, prevScrollLeft;

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
}

function getTime() {
    var date = new Date();
    var hr = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    hr = hr < 10 ? "0"+hr : hr;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;

    document.getElementById("hour").innerHTML = hr + ":" + m + ":" + s;
    setTimeout("getTime()", 100);
}

function getday() {
    var date = new Date();
    var gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    document.getElementById("day").innerHTML = gunler[date.getDay()];
    setTimeout("getday()", 600000);
}

Date.prototype.toShortFormat = function() {
    const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const day = this.getDate();
    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];
    const year = this.getFullYear();

    return `${day} ${monthName} ${year}`;
}

function getdate() {
    let today = new Date();
    document.getElementById("date").innerHTML = today.toShortFormat();

    setTimeout("getdate()", 600000);
}
