// pendulum.js
// (c) Gernot Lenkner 2021

class Pendulum {
    constructor() {
        this.pegPositions = {
            "0.08" : {"BLen": 92.9, "BPM": 48, "Tempo": "Largo"},
            "0.15" : {"BLen": 80.2, "BPM": 52, "Tempo": "Lento"},
            "0.34" : {"BLen": 61.9, "BPM": 60, "Tempo": "Larghetto"},
            "0.43" : {"BLen": 52.3, "BPM": 66, "Tempo": "Adagietto"},
            "0.54" : {"BLen": 41.1, "BPM": 76, "Tempo": "Andante"},
            "0.63" : {"BLen": 32.2, "BPM": 88, "Tempo": "Maestoso"},
            "0.69" : {"BLen": 26.5, "BPM": 100, "Tempo": "Allegretto"},
            "0.75" : {"BLen": 20.5, "BPM": 120, "Tempo": "Animato"},
            "0.83" : {"BLen": 12.8, "BPM": 180, "Tempo": "Presto"},
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
        pendulum.board.addEventListener('mousemove',pendulum.onBoardMouseMove);
        pendulum.board.addEventListener('click',pendulum.onBoardMouseClick);
        pendulum.setPeg("0.34");
        pendulum.log("ready");
    }

    log(message) {
       // pendulum.info.innerText=message;
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
        var freq = Math.round(10 / period) / 10;
        var flength = Math.round(1000 * pendulum.gravity *  Math.pow(period / (2 * Math.PI), 2)) / 10;
        pendulum.log("Period: " + period);
        pendulum.pendel.style.animationDuration = period + "s";

        document.querySelector("#info-tempo").innerText=pendulum.pegPositions[slot].Tempo;
        document.querySelector("#info-bpm").innerText=pendulum.pegPositions[slot].BPM;
        document.querySelector("#info-freq").innerText=freq + " Hz";
        document.querySelector("#info-period").innerText=Math.round(100 * period) / 100 + " s";
        document.querySelector("#info-flength").innerText=flength + " cm";
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