export let SamTilt = ({
    elem = ".card",
    elemItem = ".cardItem",
    reset = false,
    sensitive = 200,
    enableShadow = true,
    shadowSensitive = 50,
    shadowSize = 100,
    glare = true,
    glareSize = 1,
    scale = 1,
    justX = false,
    justY = false,
    zoom = true
}) => {
    const cards = document.querySelectorAll(elem);
    const samCardItem = document.querySelector(elemItem);
    let glareElem = document.createElement('div')
    glareElem.style.width = "100%"
    glareElem.style.height = "100%";
    glareElem.style.position = "absolute";
    glareElem.style.top = 0
    glareElem.style.left = 0;
    function rotate(e) {
        const samCardItem = this.querySelector(elemItem);
        samCardItem.style.transition = ".1s"
        setTimeout(() => {
            samCardItem.style.transition = "0s" 
        }, 100);
        let bdst = samCardItem.scrollTop
        let bdsl = samCardItem.scrollLeft
        let offsets = samCardItem.getBoundingClientRect()
        let w = samCardItem.clientWidth || e.offsetWidth || e.scrollWidth
        let h = samCardItem.clientHeight || e.offsetHeight || e.scrollHeight

        let wMultiple = sensitive / w
        let offsetX = 0.50 - (e.pageX - offsets.left - bdsl) / w
        let offsetY = 0.50 - (e.pageY - offsets.top - bdst) / h

        let dy = justX == true ? '' : (e.pageY - offsets.top - bdst) - h / 2
        let dx = justY == true ? '' : (e.pageX - offsets.left - bdsl) - w / 2
        let yRotate, xRotate

        if (zoom) {
            yRotate = (offsetX - dx) * (0.2 * wMultiple)
            xRotate = (dy - offsetY) * (0.2 * wMultiple)
        } else {
            yRotate = (dx - offsetX) * (0.2 * wMultiple)
            xRotate = (offsetY - dy) * (0.2 * wMultiple)
        }
        let zoomColor
        let imgCSS
        imgCSS = `rotateX( ${xRotate}deg) rotateY(${yRotate}deg) scale(${scale <= 3 ? scale : 3})`
        if (!zoom) {
            zoomColor = "0,0,0 "
        } else {
            zoomColor = "255,255,255 "
        }
        let arad = Math.atan2(dy, dx)
        let angle = arad * 180 / Math.PI - 90;

        const halfHeight = (samCardItem.offsetHeight - samCardItem.scrollTop) / 2;


        glareElem.style.background = glare == true
            ?
            `linear-gradient( 
            ${angle}deg, 
            rgba(${zoomColor},
             ${(e.pageY - offsets.left - bdsl) / h * glareSize}) 0%
             ,rgb(255, 255, 255)
             ,rgb(255, 255, 255) )`
            : null;

        samCardItem.style.transform = imgCSS;
        if (enableShadow) {
            samCardItem.style.boxShadow = zoom == false ? ` ${(dx - xRotate) / w * - shadowSensitive}px ${(dy - yRotate) / h * - shadowSensitive}px ${shadowSize}px ${shadowSize / 10}px  rgba(0,0,0,.3)` : ` ${(dx - offsetX) / w * shadowSensitive}px ${(dy - offsetY) / h * shadowSensitive}px ${shadowSize}px ${shadowSize / 10}px rgba(0,0,0,.3)`
        }
        else {
            samCardItem.style.boxShadow = "none"
        }
    }
    samCardItem.appendChild(glareElem)
    function stopRotate() {
        const samCardItem = this.querySelector(elemItem);
        samCardItem.style.transition = ".1s"
        samCardItem.style.transform = 'rotate(0) scale(1)';
        samCardItem.style.boxShadow = `0px 0px 30px 5px rgba(0,0,0,.3)`

    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.addEventListener('mousemove', rotate);
        card.addEventListener('mouseout', (reset == true ? stopRotate : null))
    }
}



