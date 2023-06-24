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
    });

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
    let cooldown = false;
    let clickCooldown = false;
    const spheres = document.querySelectorAll(".imageSphere");
    let abText = document.getElementById("aboutTextDescription");
    let abTextBG = document.getElementById("aboutTextDescription2");
    let mobileMode = false;

    let introMobileUp = document.getElementById("mobileUpArrow");
    let introMobileDown = document.getElementById("mobileDownArrow");

    const scroller = document.getElementById("mobileIntroScroll");
    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        if (check) {
            mobileMode = true;
        }
    };
    window.mobileAndTabletCheck();

    if (mobileMode) {
        cooldown = Infinity;
        scroller.style.display = "block";
        elements.forEach(function(element) {
            element.style.cursor = "auto";
        });

        introMobileUp.addEventListener("click", function() {
            if (clickCooldown) return;
    
            clickCooldown = true;
            setTimeout(function() {
                clickCooldown = false;
            }, 1800);
            let numStates = parseInt(vScrollContainer.childElementCount);
            let initialDataState = parseInt(introducing.getAttribute("data-state"));
            let nextState = (initialDataState - 1 + numStates) % numStates;

            vScrollContainer.style.top = snapList[nextState] + "px";
            console.log(snapList[nextState]);

            introducing.setAttribute("data-state", nextState);

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

                        introducing.setAttribute("data-state", nextState);
                        updateText();
                    }, 800);
                }, 800);
            }
        });

        introMobileDown.addEventListener("click", function() {
            if (clickCooldown) return;
    
            clickCooldown = true;
            setTimeout(function() {
                clickCooldown = false;
            }, 1800);
            let numStates = parseInt(vScrollContainer.childElementCount);
            let initialDataState = parseInt(introducing.getAttribute("data-state"));
            let nextState = (initialDataState + 1 + numStates) % numStates;

            vScrollContainer.style.top = snapList[nextState] + "px";
            console.log(snapList[nextState]);

            introducing.setAttribute("data-state", nextState);

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

                        introducing.setAttribute("data-state", nextState);
                        updateText();
                    }, 800);
                }, 800);
            }
        });
    }

    const descs = [
        "With a background in project management and consulting, I offer accelerated work without compromising quality. Experience efficiency and excellence.",
        "Passionate about software and web design, I take pride in delivering top-tier work. Expect nothing less than exceptional results from me.",
        "Computer Science represents the most dynamic problem-solving method to me. There's no challenge I won't tackle head-on, leveraging its limitless possibilities.",
        "Computer Science is more than a science—it's an art form that deserves recognition and celebration. Embracing creativity, I approach problem-solving with a unique perspective.",
        "If my values resonate with you, let's collaborate! Contact me below and let's create something remarkable together."
    ]

    updateText();

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
            introducing.setAttribute("data-state", snapList.indexOf(findClosestNumber(newTop, snapList)));
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

                        introducing.setAttribute("data-state", nextState);
                        updateText();
                    }, 800);
                }, 800);
            }

            // Set cooldown and update last drag time
            cooldown = true;
            lastDragTime = Date.now();
            setTimeout(function() {
                cooldown = false;
            }, dragCooldownTime);
        }
    }

    function updateText() {
        let state = parseInt(document.getElementById("introducing").getAttribute("data-state"));
        abText.innerHTML = descs[state];
        abTextBG.innerHTML = descs[state];
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