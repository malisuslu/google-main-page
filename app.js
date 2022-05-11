document.querySelector('#menu-icon').addEventListener("click", function () {
    document.querySelector('.apps').style.visibility = "visible";
    document.querySelector('.apps').style.height = "100%";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "true");
}); 

document.addEventListener("mousedown", function(e) {
    let box = document.querySelector('.apps');
    if (e.target != box && e.target.parentNode != box) {
    document.querySelector('.apps').style.visibility = "hidden";
    document.querySelector('.apps').style.height = "0px";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "false");
}});


document.addEventListener("mouseover", function(e) {
    let box = document.querySelector('.tooltip');
    if (e.target == box || e.target.parentNode == box) {
    document.querySelector('.tooltiptext').style.visibility = "visible";
    } else {
    document.querySelector('.tooltiptext').style.visibility = "hidden";
    }
});

addEventListener("keyup", function() {
    let input = document.querySelector('#search-input').value;
    let q_string = "https://calm-lake-02631.herokuapp.com/http://suggestqueries.google.com/complete/search?client=chrome&q=" + input + "&hl=en-US&json=true";
    getJSON(q_string, function(err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            let results = data[0,1];
            console.log(results);
            let ul = document.querySelector('#search-results');
            ul.innerHTML = "";
            for (let i = 0; i < results.length; i++) {
                let div = document.createElement('div');
                div.classList.add(`search-result`);
                let img = document.createElement('div');
                img.classList.add(`glass-icon`);
                div.appendChild(img);
                let li = document.createElement('li');
                li.classList.add(`result-text`);
                li.innerHTML = results[i];
                div.appendChild(li);
                ul.appendChild(div);
            }
        }
    }
    );
});

let search_box = document.querySelector('.search-box');
let suggestions = document.querySelector('.suggestions');
let text_area = document.querySelector('#search-input');
let search_bar = document.querySelector('.search-bar');


addEventListener("keyup", function() {
    let input = text_area.value;
    if (input != 0) {
        suggestions.style.display = "flex";
        change_search_bar();
    } else {
        suggestions.style.display = "none";
        revert_search_bar();
    }
});

addEventListener("mousedown", function(e) {
    if(!search_box.contains(e.target)) {
    suggestions.style.display = "none";
    revert_search_bar();
    } else if(text_area.value != 0) {
    suggestions.style.display = "flex";
    change_search_bar();
    }
});

addEventListener("mouseup", function(e) {
    if(e.target.classList.contains("result-text")) {
        text_area.value = e.target.innerHTML;
        suggestions.style.display = "none";
        revert_search_bar();
        document.querySelector("button").click();
    }
});

function change_search_bar() {
    search_bar.style.borderBottomLeftRadius = "0px";
    search_bar.style.borderBottomRightRadius = "0px";
}

function revert_search_bar() {
    search_bar.style.borderBottomLeftRadius = "24px";
    search_bar.style.borderBottomRightRadius = "24px";
};


let getJSON = function(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};


/*
addEventListener("focus", function() {
    let q_string = "https://calm-lake-02631.herokuapp.com/https://trends.google.com/trends/explore?q=haberler&geo=TR";
    getJSON(q_string, function(err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            let results = data[0,1];
            console.log(results);
            let ul = document.querySelector('#search-results');
            ul.innerHTML = "";
            for (let i = 0; i < results.length; i++) {
                let div = document.createElement('div');
                div.classList.add(`search-result`);
                let img = document.createElement('div');
                img.classList.add(`glass-icon`);
                div.appendChild(img);
                let li = document.createElement('li');
                li.classList.add(`result-text`);
                li.innerHTML = results[i];
                div.appendChild(li);
                ul.appendChild(div);
            }
        }
    }
    );
});
*/

