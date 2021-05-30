export let SamTilt = (data) => {
    const cards = document.querySelectorAll(data.elem);
    const samCardItem = document.querySelector(data.elemItem);
    samCardItem.style.transition = ".1s"
    let glare = document.createElement('div')
    glare.style.width = "100%"
    glare.style.height = "100%";
    glare.style.position = "absolute";
    glare.style.top = 0
    glare.style.left = 0;
    samCardItem.style.position = "relative"

    function rotate(e) {
        const samCardItem = this.querySelector(data.elemItem);
        let bdst = samCardItem.scrollTop
        let bdsl = samCardItem.scrollLeft
        let offsets = samCardItem.getBoundingClientRect()
        let w = samCardItem.clientWidth || e.offsetWidth || e.scrollWidth
        let h = samCardItem.clientHeight || e.offsetHeight || e.scrollHeight

        let wMultiple = data.sensitive / w
        let offsetX = 0.50 - (e.pageX - offsets.left - bdsl) / w
        let offsetY = 0.50 - (e.pageY - offsets.top - bdst) / h

        let dy = data.justX == true ? '' : (e.pageY - offsets.top - bdst) - h / 2
        let dx = data.justY == true ? '' : (e.pageX - offsets.left - bdsl) - w / 2
        let yRotate, xRotate

        if (data.zoom) {
            yRotate = (offsetX - dx) * (0.2 * wMultiple)
            xRotate = (dy - offsetY) * (0.2 * wMultiple)
        } else {
            yRotate = (dx - offsetX) * (0.2 * wMultiple)
            xRotate = (offsetY - dy) * (0.2 * wMultiple)
        }
        let zoomColor
        let imgCSS
        imgCSS = `rotateX( ${xRotate}deg) rotateY(${yRotate}deg) scale(${data.scale <= 3 ? data.scale : 3})`
        if (!data.zoom) {
            zoomColor = "0,0,0 "
        } else {
            zoomColor = "255,255,255 "
        }
        let arad = Math.atan2(dy, dx)
        let angle = arad * 180 / Math.PI - 90;

        const halfHeight = (samCardItem.offsetHeight - samCardItem.scrollTop) / 2;


        glare.style.background = data.glare == true
            ?
            `linear-gradient( 
            ${angle}deg, 
            rgba(${zoomColor},
             ${(e.pageY - offsets.left - bdsl) / h * data.glareSize}) 0%
             ,rgb(255, 255, 255)
             ,rgb(255, 255, 255) )`
            : null;

        samCardItem.style.transition = '0 !important'
        samCardItem.style.transform = imgCSS;
        if (data.enableShadow) {
            samCardItem.style.boxShadow = data.zoom == false ? ` ${(dx - xRotate) / w * - data.shadowSensitive}px ${(dy - yRotate) / h * -data.shadowSensitive}px ${data.shadowSize}px ${data.shadowSize / 10}px  rgba(0,0,0,.3)` : ` ${(dx - offsetX) / w * data.shadowSensitive}px ${(dy - offsetY) / h * data.shadowSensitive}px ${data.shadowSize}px ${data.shadowSize / 10}px rgba(0,0,0,.3)`
        }
        else {
            samCardItem.style.boxShadow = "none"
        }
    }
    samCardItem.appendChild(glare)
    function stopRotate() {
        const samCardItem = this.querySelector(data.elemItem);
        samCardItem.style.transform = 'rotate(0) scale(1)';
        samCardItem.style.boxShadow = `0px 0px 30px 5px rgba(0,0,0,.3)`

        samCardItem.style.transition = '0'
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        setInterval(() => {
            card.addEventListener('mousemove', rotate);

        }, 1);
        card.addEventListener('mouseout', (data.reset == true ? stopRotate : null))
    }
}



