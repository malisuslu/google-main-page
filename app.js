// App menu click reveal event
document.querySelector('#menu-icon').addEventListener("click", function () {
    document.querySelector('.apps').style.visibility = "visible";
    document.querySelector('.apps').style.height = "100%";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "true");
}); 


// App menu click hide event
document.addEventListener("mouseup", function(e) {
    let box = document.querySelector('.apps');
    if (e.target != box && e.target.parentNode != box) {
    document.querySelector('.apps').style.visibility = "hidden";
    document.querySelector('.apps').style.height = "0px";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "false");
}});


// Google Search suggestions fetch function
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


let user_input = ""; // will be used on suggestion section
// Fetching the search suggestions and displaying them in the search bar
addEventListener("keyup", function(e) {
    if (e.key != "ArrowDown" && e.key != "ArrowUp" && e.key != "ArrowLeft" && e.key != "ArrowRight") {
    let input = document.querySelector('#search-input').value;
    user_input = input;
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
}
});




// Revealing and hiding the search suggestions when the user type something
let search_box = document.querySelector('.search-box');
let suggestions = document.querySelector('.suggestions');
let text_area = document.querySelector('#search-input');
let search_bar = document.querySelector('.search-bar');


text_area.addEventListener("keyup", function() {
    if (text_area.value != 0) {
        suggestions.style.display = "flex";
        change_search_bar();
    } else {
        suggestions.style.display = "none";
        revert_search_bar();
    }
});

addEventListener("click", function(e) {
    if(!suggestions.contains(e.target) && !search_bar.contains(e.target)) {
    suggestions.style.display = "none";
    revert_search_bar();
    } else if(text_area.value != 0) {
    suggestions.style.display = "flex";
    change_search_bar();
    }
});

addEventListener("click", function(e) {
    if(e.target.classList.contains("result-text")) {
        text_area.value = e.target.textContent;
        suggestions.style.display = "none";
        revert_search_bar();
        document.querySelector("button:nth-child(1)").click();
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



// Mic icon hover effect
document.addEventListener("mouseover", function(e) {
    let box = document.querySelector('.tooltip');
    if (e.target == box || e.target.parentNode == box) {
    document.querySelector('.tooltiptext').style.visibility = "visible";
    } else {
    document.querySelector('.tooltiptext').style.visibility = "hidden";
    }
});


// Search by voice
function speecRecognition() {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    document.querySelector('.header img').src = "./images/listening.gif";
    recognition.onresult = function(event) {
        let text = event.results[0][0].transcript;
        document.querySelector('#search-input').value = text;
        document.querySelector('button').click();
        document.querySelector('.header img').src = "./images/googlelogo.png";
    };
    recognition.onend = function() {
    document.querySelector('.header img').src = "./images/googlelogo.png";
    }
}
document.querySelector('#mic-icon').addEventListener("click", speecRecognition);





// Travel over the search suggestions and highlight the text by arrow keys
addEventListener("keydown", function (e) {

    let search_results = Array.from(document.querySelectorAll('.search-result'));
    let input = document.querySelector('#search-input');
    let res_length = search_results.length;
    let current_index = search_results.indexOf(document.querySelector('.selected'));
    let next_index = current_index + 1;
    let prev_index = current_index - 1;

    if (suggestions.style.display = "flex" && text_area.value != 0 && e.key == "ArrowDown") {
        console.log(user_input);

        if (current_index == -1) {
            search_results[0].classList.add("selected");
            input.value = search_results[0].textContent;
        }

        if (current_index == res_length - 1) {
            search_results[current_index].classList.remove("selected");
            next_index = -1;
            input.value = user_input;
        }

        search_results[next_index].classList.add('selected');
        search_results[current_index].classList.remove('selected');
        input.value = search_results[next_index].textContent;

    } else if (suggestions.style.display = "flex" && text_area.value != 0 && e.key == "ArrowUp") {

        if (current_index == 0) {
            search_results[current_index].classList.remove("selected");
            prev_index = -1;
            input.value = user_input;
        }

        if (current_index == - 1) {
            prev_index = res_length - 1;
            search_results[prev_index].classList.add("selected");
            input.value = search_results[prev_index].textContent;
        }

        search_results[prev_index].classList.add('selected');
        search_results[current_index].classList.remove('selected');
        input.value = search_results[prev_index].textContent;
    } 


    for (let i = 0; i < res_length; i++) {
        search_results[i].addEventListener("mouseover", function() {
            for (let j = 0; j < res_length; j++) {
                search_results[j].classList.remove('selected');
            }
            this.classList.add('selected');
        });
    }

});



// Feeling lucky button click event
document.querySelectorAll('.luck-button').forEach(button => {
    button.addEventListener("click", function() {
        let url = 'https://calm-lake-02631.herokuapp.com/https://www.google.com/search?q=' + user_input;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let html = xhr.responseText;
                let results = html.match(/<a href="https(.*?)"/g);
                let result = results[2];
                let link = result.slice(9, -1);
                window.location.href = link;
            }
        }
    }
)});

