document.querySelector('#menu-icon').addEventListener("click", function () {
    document.querySelector('.apps').style.visibility = "visible";
    document.querySelector('.apps').style.height = "100%";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "true");
}); 

document.addEventListener("mouseup", function(e) {
    let box = document.querySelector('.apps');
    if (e.target != box && e.target.parentNode != box) {
    document.querySelector('.apps').style.visibility = "hidden";
    document.querySelector('.apps').style.height = "0px";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "false");
}});

