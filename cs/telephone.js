function telephone(titleElemId, titleLevels, titlePositions, addArticle = false) {
    const titleElem = document.getElementById(titleElemId);
    const standardTitle = titleElem.innerText;

    const cycleInterval = 3000;

    let cycleActive = false;
    let cycleIndex = 0;
    let timeoutID = null;
    function step() {
        const levelIndex = cycleIndex % titleLevels.length;
        const level = titleLevels[levelIndex];
        const positionIndex = cycleIndex % titlePositions.length;
        const position = titlePositions[positionIndex];
        const article = (
            addArticle ?
                ("aAeEiIoOuUyYhH".includes(level[0]) ? "an" : "a")
                : ""
        );
        const title = (
            (levelIndex == 0 ? `${article} ${level}` : `${article} <em>${level}</em>`)
                + " "
                + (positionIndex == 0 ? position : `<em>${position}</em>`)
        );
        titleElem.innerHTML = title;
        cycleIndex = (cycleIndex + 1) % ((titleLevels.length * titlePositions.length));
        timeoutID = setTimeout(step, cycleInterval);
    }
    function toggle() {
        if (cycleActive) {
            if (timeoutID) {
                clearTimeout(timeoutID);
                timeoutID = null;
            }
            cycleActive = false;
            titleElem.innerHTML = standardTitle;
            titleElem.style.removeProperty("font-weight");
        } else {
            cycleActive = true;
            titleElem.style.fontWeight = "bold";
            step();
        }
    }

    const telephoneElem = document.createElement("button");
    telephoneElem.append("🗣️📞👂");
    const wrapper = document.createElement("abbr");
    titleElem.replaceWith(wrapper);
    wrapper.append(telephoneElem, " ", titleElem);
    wrapper.classList.add("nowrap");
    wrapper.title = `Click to pause/resume a visual game of telephone on "${standardTitle}."`;
    telephoneElem.title = wrapper.title;
    telephoneElem.addEventListener("click", toggle, false);
    
    return false;
}

