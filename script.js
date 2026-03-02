const heroImages = [
{ webp: "images/topimg1.webp", png: "images/topimg1.png" },
{ webp: "images/topimg2.webp", png: "images/topimg2.png" },
{ webp: "images/topimg3.webp", png: "images/topimg3.png" },
{ webp: "images/topimg4.webp", png: "images/topimg4.png" },
];

let heroIndex = 0;
const webpSource = document.getElementById("slideshow-webp");
const imgTag = document.getElementById("slideshow-img");
const dotsContainer = document.getElementById("slideshow-dots");

// ドット生成
heroImages.forEach((_, index) => {
const dot = document.createElement("button");
dot.setAttribute("aria-label", `スライド${index + 1}`);
dot.addEventListener("click", () => showHeroSlide(index));
dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function showHeroSlide(index) {
imgTag.classList.add("fade-out");
setTimeout(() => {
heroIndex = index;
webpSource.srcset = heroImages[heroIndex].webp;
imgTag.src = heroImages[heroIndex].png;
imgTag.classList.remove("fade-out");
updateHeroDots();
}, 500);
}

function updateHeroDots() {
dots.forEach((dot, i) => {
dot.classList.toggle("active", i === heroIndex);
});
}

function nextHeroSlide() {
let nextIndex = (heroIndex + 1) % heroImages.length;
showHeroSlide(nextIndex);
}

// 最初に表示
showHeroSlide(heroIndex);
let heroTimer = setInterval(nextHeroSlide, 7000);


// ▼==============================
// ② 商品スライダー（カルーセル）
// ▼==============================

const track = document.getElementById("product-track");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const items = track.querySelectorAll("li");
const itemWidth = items[0].offsetWidth + 16; // 画像 + margin-right
let productIndex = 0;

function updateProductSlide() {
track.style.transform = `translateX(-${productIndex * itemWidth}px)`;
}

function nextProductSlide() {
productIndex = (productIndex + 1) % items.length;
updateProductSlide();
}

function prevProductSlide() {
productIndex = (productIndex - 1 + items.length) % items.length;
updateProductSlide();
}

// ボタン操作
leftArrow.addEventListener("click", () => {
clearInterval(productTimer);
prevProductSlide();
});

rightArrow.addEventListener("click", () => {
clearInterval(productTimer);
nextProductSlide();
});

// 自動スライド（5秒ごと）
let productTimer = setInterval(nextProductSlide, 5000);

// マウスホバーで停止・復帰
document.querySelector(".product-slider").addEventListener("mouseenter", () => {
clearInterval(productTimer);
});
document.querySelector(".product-slider").addEventListener("mouseleave", () => {
productTimer = setInterval(nextProductSlide, 5000);
});

// 初期セット
updateProductSlide();