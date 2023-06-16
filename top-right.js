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
