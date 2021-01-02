// pendulum.js
// (c) Gernot Lenkner 2021

class Pendulum {
    constructor() {
        this.pegPositions = {
            "0.1" : 10,
            "0.3" : 33,
            "0.5" : 50,
            "0.8" : 80,
        }

        this.info = document.querySelector('#info');
        this.board = document.querySelector('#board');
        this.peg = document.querySelector('#peg');
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
        pendulum.peg.style.top = slot * 100 + "%";
    }

    onBoardMouseMove(e) {
//        var posY = e.offsetY / pendulum.board.clientHeight
//        pendulum.log(posY);
//        pendulum.peg.style.top = posY * 100 + "%";
    }

    onBoardMouseClick(e) {
        var posY = e.offsetY / pendulum.board.clientHeight
        pendulum.log(posY);
        pendulum.setPeg(pendulum.findNearestSlot(posY));
    }

}

const pendulum = new Pendulum();
pendulum.init();