import { utcToZonedTime } from "date-fns-tz";
import $ from 'jquery'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

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