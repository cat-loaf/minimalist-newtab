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
var modalContent = document.querySelector(".modal-content");

// Get the button that opens the modal
var btn = document.getElementById("config");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    modalContent.animate([
        { transform:"scale(0.25)"},
        { transform:"scale(1)" },
    ],{
        duration:600,
        easing:"cubic-bezier(0.83, 0, 0.17, 1)"
    });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modalContent.animate([
        { transform:"scale(1)" },
        { transform:"scale(0.25)"},
    ],{
        duration:600,
        easing:"cubic-bezier(0.83, 0, 0.17, 1)"
    });
    setTimeout(()=>{
        modal.style.display = "none";
    }, 590);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modalContent.animate([
            { transform:"scale(1)" },
            { transform:"scale(0.25)"},
        ],{
            duration:600,
            easing:"cubic-bezier(0.83, 0, 0.17, 1)"
        });
        setTimeout(()=>{
            modal.style.display = "none";
        }, 590);
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
    document.querySelector('h2#config-header').innerHTML = "Config - Colors have been reset!";
    setTimeout(()=>{
        document.querySelector('h2#config-header').innerHTML = "Config";
    }, 2000);
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
if (localStorage.getItem('links') == "null" || localStorage.getItem('links') == null) {
    const links = [['N',"netflix.com"],['Y', "youtube.com"],['S', "open.spotify.com"]];
    localStorage.setItem('links',JSON.stringify(links));
}

function putLinks() {
    let i = 0;
    const linksNew = JSON.parse(localStorage.getItem('links'));
    const linksDiv = document.querySelector('div.options');
    const linksEditor = document.querySelector("ul#links");
    linksDiv.innerText = "";
    linksEditor.innerText = "";
    linksNew.forEach((item)=>{
        rep = item[0];
        link = item[1];
        
        let a = document.createElement("a");
        a.target = "_blank";
        a.href = "https://"+link;
        a.innerText = rep;
    
        
        linksDiv.appendChild(a);
        
        let li = document.createElement("li");
        li.id = `d${i}`
        li.innerHTML = `
        <label for="name-${i}">Character</label> <input type="text" id="name-${i}" value="${rep}" class="editorRep" maxlength="2" minlength="1"> 
        <label for="link-${i}">Link</label> <input type="text" id="link-${i}" value="${link}" class="editorLink">
        <a id="delete-link-${i}" data="${i}" style="display:inline-block;">X</a>`;
        linksEditor.appendChild(li);
        i += 1;
    })
    for (let i = 0; i<linksEditor.childElementCount; i++) {
        document.querySelector(`a[data="${i}"]`).onclick = function() {
            document.querySelector(`li#d${i}`).remove();
        }
    }
}
putLinks();


document.querySelector('a#more-links').onclick = function() {
    const linksEditor = document.querySelector("ul#links");
    let li = document.createElement("li");
    let i = linksEditor.childElementCount;
    li.id = `d${i}`
    li.innerHTML = `
    <label for="name-${i}">Character</label> <input type="text" id="name-${i}" value="" class="editorRep" maxlength="2" minlength="1">
    <label for="link-${i}">Link</label> <input type="text" id="link-${i}" value="" class="editorLink"> `;
    
    let a = document.createElement('a');
    a.id = `delete-link${i}`;
    a.attributes.data = i;
    a.style = "display:inline-block;";
    a.innerText = "X";
    a.onclick = function() {
        document.querySelector(`li#d${i}`).remove();
    }

    li.appendChild(a);

    linksEditor.appendChild(li);
};

document.querySelector('a#save-links').onclick = function() {
    const linksEditor = document.querySelector("ul#links");
    let linksToSave = [];
    let children = linksEditor.children;
    let foundErrors = false;
    for (let i = 0; i < linksEditor.childElementCount; i++) {
        let o = linksEditor.children[i];
        if (o.children[1].value.length <= 2 && o.children[1].value.length > 0) {
            let o = children.item(i);
            linksToSave.push([o.children[1].value, o.children[3].value]);
        } else {
            foundErrors = true;
        }
    }
    if (foundErrors == false) {
        localStorage.setItem('links',JSON.stringify(linksToSave));
        putLinks();

        document.querySelector('h2#link-header').innerHTML = "Links - Saved!";
        setTimeout(()=>{
        document.querySelector('h2#link-header').innerHTML = "Links";
        }, 2000);
    } else {
        document.querySelector('h2#link-header').innerHTML = "Links - Character must be 1 or 2 characters long";
        setTimeout(()=>{
        document.querySelector('h2#link-header').innerHTML = "Links";
        }, 2000);
    }
}