// pendulum.js
// (c) Gernot Lenkner 2021

class Pendulum {
    constructor() {
        this.pegPositions = {
            "0.23" : {"BLen": 83, "BPM": 60, "Tempo": "Largo"},
            "0.44" : {"BLen": 62, "BPM": 80, "Tempo": "Larghetto"},
            "0.57" : {"BLen": 51, "BPM": 100, "Tempo": "Adagio"},
            "0.71" : {"BLen": 36, "BPM": 140, "Tempo": "Andante"},
            "0.75" : {"BLen": 31, "BPM": 160, "Tempo": "Allegro"},
            "0.82" : {"BLen": 25, "BPM": 200, "Tempo": "Presto"},
        };

        this.gravity = 9.81;

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
        pendulum.pendel.style.height = pendulum.pegPositions[slot].BLen + "%";
        pendulum.pendelSide.style.height = pendulum.pegPositions[slot].BLen + "%";
        //var period = 2 * Math.PI * Math.sqrt((pendulum.pegPositions[slot].BLen * pendulum.lengthfactor) / pendulum.gravity);
        var period = 60 / pendulum.pegPositions[slot].BPM;
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