// Handling Navigation Toggle when using Keyboard Navigation
document.addEventListener("DOMContentLoaded", (event) => {
    const navIcon = document.querySelector(".navIcon");
    const navToggle = document.querySelector("#navToggle");

    navIcon.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            event.preventDefault();
            navToggle.checked = !navToggle.checked;
            navIcon.setAttribute("aria-pressed", navToggle.checked.toString());
        }
    })
});

// Handle Raising/Lowering the Navigation Menu
document.addEventListener("DOMContentLoaded", (event) => {
    const navIcon = document.querySelector(".navIcon");
    const navToggle = document.querySelector("#navToggle");
    const tabList = document.querySelector(".tabList");
    const tabLinks = document.querySelectorAll(".tabLink");

    navIcon.addEventListener("click", function() {
        if (navToggle.checked) {
            moveNavMenu("Down");
        } else {
            moveNavMenu("Up");
        }
    })

    navIcon.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            if (navToggle.checked) {
                moveNavMenu("Down");
            } else {
                moveNavMenu("Up");
            }
        }
    })

    function moveNavMenu(direction) {
        if (direction === "Down") {
            tabList.style.maxHeight = "20rem";
            tabList.style.padding = "0.5rem";
            tabLinks.forEach(tabLink => {
                tabLink.setAttribute("tabindex", "0");
            });
        } else {
            tabList.style.maxHeight = "0";
            tabList.style.padding = "0";
            tabLinks.forEach(tabLink => {
                tabLink.setAttribute("tabindex", "-1");
            });
        }
    }
})