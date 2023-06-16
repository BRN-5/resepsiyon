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