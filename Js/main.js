// Alustetaan muuttujat
let coins = 0;

// Käden tiedot
let handLevel = 0;
let handRate = 0;
let handCost = 25;

// Automaattikerääjän tiedot
let autoCollectorLevel = 0;
let autoCollectorRate = 0;
let autoCollectorCost = 50;
let autoCollectorInterval = null;

// Tehtaan tiedot
let factoryLevel = 0;
let factoryRate = 0;
let factoryCost = 1000;



// CHEATMODE: Lisää 100 kolikkoa testikäyttöön
document.getElementById("cheatButton").addEventListener("click", function() {
    coins += 100;
    updateCounter();
});



// Funktiot äänten soittamiseen
function playCoinSound() {
    let sound = document.getElementById("coinSound");
    sound.currentTime = 0;
    sound.play();
}

function playCashSound() {
    let sound = document.getElementById("cashSound");
    sound.currentTime = 0;
    sound.play();
}

// Kolikon kerääminen puusta
document.getElementById("money-tree").addEventListener("click", function() {
    coins += 1;
    updateCounter();
    playCoinSound();
});






// Käden osto ja päivitys
document.getElementById("buyHandButton").addEventListener("click", function() {
    if (coins >= handCost) {
        coins -= handCost;
        handLevel++;
        handRate = handLevel;
        handCost += 50;
        updateCounter();
        updateButtons();
        playCashSound();

        if (handLevel === 1) {
            document.getElementById("hand-container").style.display = "block";
            startHandAnimation();
        }
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
});

// Automaattikerääjän osto ja päivitys
document.getElementById("buyAutoCollectorButton").addEventListener("click", function() {
    if (coins >= autoCollectorCost) {
        coins -= autoCollectorCost;
        autoCollectorLevel++;
        autoCollectorRate += 0.1;
        autoCollectorCost += 100;
        updateCounter();
        updateButtons();
        playCashSound();

        if (autoCollectorLevel === 1) {
            startAutoCollector();
        }
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
});

// Tehtaan osto ja päivitys
document.getElementById("buyFactoryButton").addEventListener("click", function() {
    if (coins >= factoryCost) {
        coins -= factoryCost;
        factoryLevel++;
        factoryRate += 5;
        factoryCost += 1000;
        updateCounter();
        updateButtons();
        playCashSound();

        if (factoryLevel === 1) {
            startFactory();
        }
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
});

// Päivittää näytön kolikkomäärän ja tasot
function updateCounter() {
    document.getElementById("counter").textContent = "Kolikot: " + coins.toFixed(1);
    document.getElementById("handLevel").textContent = `Käsi taso: ${handLevel}`;
    document.getElementById("autoCollectorLevel").textContent = `Kerääjä taso: ${autoCollectorLevel}`;
    document.getElementById("factoryLevel").textContent = `Tehdas taso: ${factoryLevel}`;
}

// Päivittää painikkeiden tekstit
function updateButtons() {
    document.getElementById("buyHandButton").textContent = `Päivitä Käsi (${handCost} kolikkoa) - Tasosi: ${handLevel}`;
    document.getElementById("buyAutoCollectorButton").textContent = `Päivitä Kerääjä (${autoCollectorCost} kolikkoa) - Tasosi: ${autoCollectorLevel}`;
    document.getElementById("buyFactoryButton").textContent = `Päivitä Tehdas (${factoryCost} kolikkoa) - Tasosi: ${factoryLevel}`;
}

// Käynnistetään käden animaatio
function startHandAnimation() {
    document.getElementById("hand").addEventListener("animationiteration", function() {
        coins += handRate;
        updateCounter();
    });
}

// Käynnistetään automaattinen kerääjä
function startAutoCollector() {
    autoCollectorInterval = setInterval(() => {
        coins += autoCollectorRate;
        updateCounter();
    }, 1000);
}

// Käynnistetään tehdas
function startFactory() {
    setInterval(() => {
        coins += factoryRate;
        updateCounter();
    }, 1000);
}
