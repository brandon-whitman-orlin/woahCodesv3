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

// Handle Clicking and Dragging for the Intro Text
document.addEventListener("DOMContentLoaded", (event) => {
    const elements = document.querySelectorAll('.clickDrag');
    const vScrollContainer = document.querySelector('.vScroll');
    let introducing = document.getElementById("introducing");
    // const defaultSnapList = [0, -36, -72.32, -108.48, -144.8];
    const smallSnapList = [5.1, -21.5, -48.1, -74.7, -101.3];
    const safariSnapList = [4.8, -23.5, -51.5, -80.2, -107.4];
    let snapList = smallSnapList;

    let safari = false;

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        safari = false;
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        safari = false;
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        safari = true;
    }

    if (safari) {
        snapList = safariSnapList;
    }

    vScrollContainer.style.top = snapList[0] + 'px';

    let isDragging = false;
    let initialY = 0;
    let yOffset = 0;
    const minTop = 0;
    const maxTop = -9.05 * parseFloat(getComputedStyle(vScrollContainer).fontSize);

    elements.forEach(function(element) {
        element.addEventListener('mousedown', function() {
            element.classList.add('dragging');
        });

        element.addEventListener('mouseup', function() {
            element.classList.remove('dragging');
        });

        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            element.classList.add('dragging');
            dragStart(e.touches[0]);
        });

        element.addEventListener('touchmove', function(e) {
            e.preventDefault();
            drag(e.touches[0]);
        });

        element.addEventListener('touchend', function() {
            element.classList.remove('dragging');
            dragEnd();
        });
    });

    function dragStart(e) {
        isDragging = true;
        initialY = e.clientY || e.touches[0].clientY;
        yOffset = vScrollContainer.offsetTop;
        vScrollContainer.classList.add('dragging');
    }

    function drag(e) {
        if (isDragging) {
            const clientY = e.clientY || e.touches[0].clientY;
            const deltaY = clientY - initialY;
            let newTop = Math.max(Math.min(yOffset + deltaY, minTop), maxTop);
            introducing.setAttribute("data-state", snapList.indexOf(findClosestNumber(newTop, snapList)))
            vScrollContainer.style.top = `${findClosestNumber(newTop, snapList)}px`;
        }
    }

    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            vScrollContainer.classList.remove('dragging');
        }
    }

    vScrollContainer.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    document.addEventListener('selectstart', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });

    function findClosestNumber(inputNumber, numbers) {
        return numbers.reduce((closest, current) => {
            return Math.abs(inputNumber - current) < Math.abs(inputNumber - closest) ? current : closest;
        });
    }
});


// Match Intro Description to Intro Text
document.addEventListener("DOMContentLoaded", (event) => {

});