// pendulum.js
// (c) Gernot Lenkner 2021

class Pendulum {
    constructor() {
        this.pegPositions = {
            "0.1" : 90,
            "0.3" : 70,
            "0.5" : 50,
            "0.8" : 20,
            "0.95" : 5,
        }

        this.gravity = 9.81;
        this.lengthfactor = 0.01;

        this.info = document.querySelector('#info');
        this.board = document.querySelector('#board-side');
        this.pegSide = document.querySelector('#peg-side');
        this.pegFront = document.querySelector('#peg-front');
        this.pegStringSide = document.querySelector('#peg-string-side');
        this.pegStringFront = document.querySelector('#peg-string-front');
        this.pendel = document.querySelector('#pendulum');
        this.pendelSide = document.querySelector('#pendulum-side');
    }

    init() {
        pendulum.board.addEventListener('mousemove',pendulum.onBoardMouseMove)
        pendulum.board.addEventListener('click',pendulum.onBoardMouseClick)
        pendulum.log("ready");
    }

    log(message) {
        pendulum.info.innerText=message;
    }

    findNearestSlot(posY)
    {
        var slot = -1;
        var lastDist = 1;
        const keys = Object.keys(pendulum.pegPositions);
        keys.forEach((key) => {
            var dist = Math.abs(key - posY);
            if (dist < lastDist)
            {
                slot = key;
                lastDist = dist;
            }
        });
        return slot;
    }

    setPeg(slot) {
        pendulum.pegSide.style.top = slot * 100 + "%";
        pendulum.pegFront.style.top = slot * 100 + "%";
        pendulum.pegStringSide.style.height = ((slot * 100)-3) + "%";
        pendulum.pegStringFront.style.height = ((slot * 100)-4) + "%";
        pendulum.pendel.style.height = pendulum.pegPositions[slot] + "%";
        pendulum.pendelSide.style.height = pendulum.pegPositions[slot] + "%";
        var period = 2 * Math.PI * Math.sqrt((pendulum.pegPositions[slot] * pendulum.lengthfactor) / pendulum.gravity);
        pendulum.log("Period: " + period);
        pendulum.pendel.style.animationDuration = period + "s";
    }

    onBoardMouseMove(e) {
//        var posY = e.offsetY / pendulum.board.clientHeight
//        pendulum.log(posY);
//        pendulum.peg.style.top = posY * 100 + "%";
    }

    onBoardMouseClick(e) {
        var posY = e.offsetY / pendulum.board.clientHeight
        pendulum.setPeg(pendulum.findNearestSlot(posY));
    }

}

const pendulum = new Pendulum();
pendulum.init();