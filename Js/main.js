

let coins = 0;
let clickValue = 1;

document.getElementById("money-tree").addEventListener("click", function(event) {
    coins += clickValue;
    updateCounter();
    animateTree();
    spawnCoin(event.clientX, event.clientY);
});

function updateCounter() {
    document.getElementById("counter").textContent = "Kolikot: " + coins;
}

function buyUpgrade() {
    if (coins >= 10) {
        coins -= 10;
        clickValue += 2;
        updateCounter();
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
}

function animateTree() {
    let tree = document.getElementById("money-tree");
    tree.classList.add("shake");
    setTimeout(() => tree.classList.remove("shake"), 200);
}

function spawnCoin(x, y) {
    let coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = x + "px";
    coin.style.top = y + "px";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
}