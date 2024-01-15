const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
let animationId;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const speed = 2;
const numLines = 100;
const centralX = canvas.width / 2;
const centralY = canvas.height / 2;

class HyperSpaceLine {
    constructor() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.angle = Math.atan2(centralY - this.y1, centralX - this.x1);
        this.length = Math.random() * 300 + 50;
    }

    update() {
        this.x1 += speed * Math.cos(this.angle);
        this.y1 += speed * Math.sin(this.angle);

        if (this.x1 < 0 || this.x1 > canvas.width || this.y1 < 0 || this.y1 > canvas.height) {
            this.x1 = Math.random() * canvas.width;
            this.y1 = Math.random() * canvas.height;
            this.angle = Math.atan2(centralY - this.y1, centralX - this.x1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        const x2 = this.x1 + this.length * Math.cos(this.angle);
        const y2 = this.y1 + this.length * Math.sin(this.angle);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'green'; 
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

const hyperSpaceLines = [];

function createHyperSpaceLines() {
    for (let i = 0; i < numLines; i++) {
        hyperSpaceLines.push(new HyperSpaceLine());
    }
}

function animateHyperSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < hyperSpaceLines.length; i++) {
        hyperSpaceLines[i].update();
        hyperSpaceLines[i].draw();
    }

    animationId = requestAnimationFrame(animateHyperSpace);
}

function startHyperSpaceAnimation() {
    createHyperSpaceLines();
    animateHyperSpace();
}

function stopHyperSpaceAnimation() {
    cancelAnimationFrame(animationId);
}

startHyperSpaceAnimation();
