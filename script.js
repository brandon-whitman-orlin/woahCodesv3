// Handle Navigation Toggle when using Keyboard Navigation
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
    const tabList = document.querySelector("div.tabList");
    const tabLinks = document.querySelectorAll("a.tabLink");

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
    });

    document.addEventListener("click", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    function handleEvent(event) {
        const tabLinks = document.querySelectorAll("a.tabLink");
        const tabList = document.querySelector("div.tabList");
        const navToggle = document.getElementById("navToggle");
        const curOpen = window.getComputedStyle(tabList).height;
        let targetElement = event.target;

        tabLinks.forEach(element => {
            element.addEventListener("click", function() {
                moveNavMenu("Up");
                navToggle.checked = false;
            });
        });

        if (!tabList.contains(targetElement) && parseFloat(curOpen.substring(0, curOpen.length - 2)) >= 1) {
            moveNavMenu("Up");
            navToggle.checked = false;
        }
    }

    function moveNavMenu(direction) {
        if (direction === "Down") {
            tabList.style.maxHeight = "6.6rem";
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
    const introducing = document.getElementById("introducing");
    let h2Height, h2FontSize, diff;
    const snapCount = vScrollContainer.childElementCount;
    let snapList = [];
    const spheres = document.querySelectorAll(".imageSphere");

    function updateValues() {
        const computedStyle = window.getComputedStyle(introducing);
        h2Height = parseFloat(computedStyle.height);
        h2FontSize = parseFloat(computedStyle.fontSize) / 16;
        diff = 1.5 + (1.5 * h2FontSize) - 2;
        snapList = [];
        for (let i = 0; i < snapCount; i++) {
            snapList.push(-i * h2Height - i * 8 - diff);
        }
        vScrollContainer.style.top = snapList[0] + 'px';
    }

    updateValues();
    window.addEventListener("resize", updateValues);

    let isDragging = false;
    let initialY = 0;
    let yOffset = 0;
    const minTop = snapList[0];
    const maxTop = snapList[snapList.length - 1];

    // Drag cooldown variables
    let cooldown = false;
    let lastDragTime = 0;
    const dragCooldownTime = 1500; // 1 second cooldown

    elements.forEach(function(element) {
        element.addEventListener('mousedown', handleDragStart);
        element.addEventListener('mouseup', handleDragEnd);
        element.addEventListener('touchstart', handleTouchStart);
        element.addEventListener('touchmove', handleTouchMove);
        element.addEventListener('touchend', handleTouchEnd);
    });

    let initialDataState;

    function handleDragStart(e) {
        if (cooldown) return; // Skip if in cooldown
        isDragging = true;
        initialY = e.clientY || e.touches[0].clientY;
        yOffset = vScrollContainer.offsetTop;
        vScrollContainer.classList.add('dragging');
        initialDataState = introducing.getAttribute("data-state");
    }

    function handleDragMove(e) {
        if (isDragging) {
            const clientY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY);
            const deltaY = clientY - initialY;
            let newTop = Math.max(Math.min(yOffset + deltaY, minTop), maxTop);
            introducing.setAttribute("data-state", snapList.indexOf(findClosestNumber(newTop, snapList)))
            vScrollContainer.style.top = `${findClosestNumber(newTop, snapList)}px`;
        }
    }

    function handleDragEnd() {
        if (isDragging) {
            isDragging = false;
            vScrollContainer.classList.remove('dragging');
            const currentTop = vScrollContainer.offsetTop;
            const nextState = snapList.indexOf(findClosestNumber(currentTop, snapList));
            if (nextState != initialDataState) {
                const centerImage = spheres[initialDataState].querySelector('.centerImage');
                const nextCenterImage = spheres[nextState].querySelector('.centerImage');

                spheres[initialDataState].classList.add("slideOut");
                centerImage.classList.add("rollIn");

                setTimeout(function() {
                    spheres[initialDataState].style.transform = "translateY(-70rem)";
                    spheres[initialDataState].classList.remove("slideOut");
                    centerImage.classList.remove("rollIn");

                    spheres[nextState].classList.add("slideIn");
                    nextCenterImage.classList.add("rollIn");

                    setTimeout(function() {
                        spheres[nextState].style.transform = "translateY(0)";
                        spheres[nextState].style.transform = "rotate(0)";
                        spheres[nextState].classList.remove("slideIn");
                        nextCenterImage.classList.remove("rollIn");
                    }, 800);
                }, 800);
            }

            introducing.setAttribute("data-state", nextState);

            // Set cooldown and update last drag time
            cooldown = true;
            lastDragTime = Date.now();
            setTimeout(function() {
                cooldown = false;
            }, dragCooldownTime);
        }
    }

    function handleTouchStart(e) {
        e.preventDefault();
        handleDragStart(e.touches[0]);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        handleDragMove(e.touches[0]);
    }

    function handleTouchEnd() {
        handleDragEnd();
    }

    function findClosestNumber(inputNumber, numbers) {
        return numbers.reduce((closest, current) => {
            return Math.abs(inputNumber - current) < Math.abs(inputNumber - closest) ? current : closest;
        });
    }

    vScrollContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('selectstart', handleSelectStart);

    function handleSelectStart(e) {
        if (isDragging) {
            e.preventDefault();
        }
    }
});

// Match Intro Image and Description to Intro Text
document.addEventListener("DOMContentLoaded", (event) => {
    const state = parseInt(document.getElementById("introducing").getAttribute("data-state"));
    const spheres = document.querySelectorAll(".imageSphere");

    if (spheres) {

    }
});