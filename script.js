let td = document.getElementById('time-display');
let dd = document.getElementById('day-display');

setTimeContents();
setDateContents();

setInterval(() => {
    setTimeContents();
}, 1000);

setInterval(() => {
    setDateContents();
}, 600000);

function setTimeContents() {
    let cur_d = new Date();
    let hr = cur_d.getHours();
    let new_hr = hr <= 12 ? hr : hr - 12
    new_hr = new_hr < 10 ? `0${new_hr}` : new_hr;

    let min = cur_d.getMinutes();
    let new_min = min < 10 ? `0${min}` : min;

    let sec = cur_d.getSeconds();
    let new_sec = sec < 10 ? `0${sec}` : sec;

    td.innerHTML = `
    ${new_hr}:${new_min}:${new_sec}
    ${hr < 12 ? 'AM' : 'PM'}`;
    document.title = td.innerHTML;
}

function setDateContents() {
    let cur_d = new Date();
    let dow = cur_d.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    dd.innerHTML = dow;
}



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("config");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let textsel = document.getElementById('text-color');
let backsel = document.getElementById('back-color');
let r = document.querySelector(':root');
let rs = getComputedStyle(r);


let textcol = rs.getPropertyValue('--text-color');
let backcol = rs.getPropertyValue('--back-color');
textsel.value = textcol;
backsel.value = backcol;

let retrText = localStorage.getItem('text-color');
let retrBack = localStorage.getItem('back-color');

if (typeof(retrText) == null || typeof(retrBack)==null) {
    console.log("null");
    resetCSSValues();
    updateCSSValues();
} else {
    textsel.value = retrText;
    backsel.value = retrBack;
    updateCSSValues();
}

function updateCSSValues() {
    r.style.setProperty('--text-color', textsel.value);
    r.style.setProperty('--back-color', backsel.value);
    localStorage.setItem('text-color',textsel.value);
    localStorage.setItem('back-color',backsel.value);
}

function resetCSSValues() {
    r.style.setProperty('--text-color', '#becadf');
    r.style.setProperty('--back-color', '#21252b');
    textsel.value = '#becadf';
    backsel.value = '#21252b';
    updateCSSValues();
}
setInterval(()=>{if (textsel.value=='#000000') {resetCSSValues()}}, 200);

document.getElementById('text-color').onchange = () => {updateCSSValues()};
document.getElementById('back-color').onchange = () => {updateCSSValues()};
document.getElementById('reset-button').onclick = () => {resetCSSValues()};

// Create links
// localStorage.setItem('links','N:netflix.com;Y:youtube.com;S:open.spotify.com');
// function getLinks() {
//     const linksString = localStorage.getItem('links');
    
// }