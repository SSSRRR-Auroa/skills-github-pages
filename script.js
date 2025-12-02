// ---------- 动态问候 ----------
document.getElementById("greetBtn").addEventListener("click", function() {
const messages = [
"欢迎来到我的赛博空间！",
"代码与霓虹同在！",
"程序猿的世界，欢迎探索！",
"保持好奇，探索未知！"
];
const msg = messages[Math.floor(Math.random() * messages.length)];
const greetMsg = document.getElementById("greetMsg");
greetMsg.textContent = msg;

// 闪烁文字效果
greetMsg.style.textShadow = "0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #0ff, 0 0 40px #0ff";
setTimeout(() => {
    greetMsg.style.textShadow = "";
}, 2000);

});

// ---------- 赛博朋克炫酷背景 ----------
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
});

// 鼠标坐标
let mouse = { x: null, y: null };
window.addEventListener("mousemove", e => {
mouse.x = e.x;
mouse.y = e.y;
});

// 生成霓虹点
const POINT_COUNT = 80;
const points = [];

function randomColor() {
const colors = ["#0ff", "#f0f", "#ff0", "#0f0", "#f00"];
return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < POINT_COUNT; i++) {
points.push({
x: Math.random() * w,
y: Math.random() * h,
vx: (Math.random() - 0.5) * 1.5,
vy: (Math.random() - 0.5) * 1.5,
radius: Math.random() * 2 + 1,
color: randomColor()
});
}

// 绘制函数
function draw() {
ctx.fillStyle = "#0a0a0a";
ctx.fillRect(0, 0, w, h);

for (let i = 0; i < points.length; i++) {
    const p = points[i];

    // 移动点
    p.x += p.vx;
    p.y += p.vy;

    // 边界反弹
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    // 鼠标吸引效果
    if (mouse.x && mouse.y) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
        }
    }

    // 绘制点
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fill();
}

// 绘制连线
for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            // 渐变颜色
            const grad = ctx.createLinearGradient(points[i].x, points[i].y, points[j].x, points[j].y);
            grad.addColorStop(0, points[i].color);
            grad.addColorStop(1, points[j].color);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.shadowColor = points[i].color;
            ctx.shadowBlur = 5;
            ctx.stroke();
        }
    }
}

requestAnimationFrame(draw);

}

draw();
