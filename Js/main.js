// Alustetaan muuttujat
let coins = 0;
let autoCollectorLevel = 0;  // Kerääjän taso
let autoCollectorCost = 50;   // Ensimmäinen päivitys maksaa 50 kolikkoa
let autoCollectorRate = 0.1;  // Aluksi kerääjä tuottaa 0.1 kolikkoa per sekunti
let autoCollectorInterval = null;  // Tämä muuttuja pitää kirjaa automaattisen kerääjän toiminnasta

let handLevel = 0; // Käsi on aluksi tasolla 0
let handRate = 1;  // Käsi antaa 1 kolikon per tökkäys, kun taso on 1



// Kuuntelee rahapuun klikkauksia ja lisää kolikoita
document.getElementById("money-tree").addEventListener("click", function() {
    coins += 1;  // Tällä hetkellä klikkaus antaa 1 kolikon
    updateCounter();
});




document.getElementById("buyHandButton").addEventListener("click", function() {
    // Osta käsi -toiminto
    if (coins >= 50) {
        coins -= 50; // Vähennetään kolikoita
        handLevel = 1; // Asetetaan käden taso 1:ksi
        handRate = 1; // Sormen antama kolikkojen määrä tasolla 1 on 1
        updateCounter(); // Päivitetään kolikot näkyville

        // Vaihdetaan ostopainike päivityspainikkeeksi
        const buyButton = document.getElementById("buyHandButton");
        buyButton.textContent = `Päivitä Käsi (Max. hinta: ${handLevel * 100} kolikkoa) - Tasosi: ${handLevel}`;  // Muutetaan painikkeen teksti
        buyButton.removeEventListener("click", arguments.callee);  // Poistetaan alkuperäinen kuuntelija
        buyButton.addEventListener("click", levelUpHand);  // Lisätään kuuntelija tasonnostolle

        // Näytetään käsi ja käynnistetään animaatio
        document.getElementById("hand-container").style.display = "block";
        startHandAnimation();
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
});

function startHandAnimation() {
    // Käynnistetään sormen animaatio, joka osuu kuvaan sekunnin välein
    document.getElementById("hand").addEventListener("animationiteration", function() {
        giveCoinFromHand();
    });
}

function giveCoinFromHand() {
    // Lisätään kolikoita käsin tasosta riippuen
    coins += handRate;
    updateCounter();
}

function updateCounter() {
    // Päivitetään kolikoiden määrä ja taso
    document.getElementById("counter").textContent = "Kolikot: " + coins.toFixed(1);
    document.getElementById("handLevel").textContent = `Käsi taso: ${handLevel}`;  // Näytetään käden taso

    // Päivitetään käden taso päivityspainikkeessa
    const buyButton = document.getElementById("buyHandButton");
    buyButton.textContent = `Päivitä Käsi (Max. hinta: ${handLevel * 100} kolikkoa) - Tasosi: ${handLevel}`;  // Lisää taso näkyviin
}

// Funktio päivittää sormen tason ja palkkiot
function levelUpHand() {
    const upgradeCost = handLevel * 100;  // Tasolle n nostaminen maksaa n * 100 kolikoita
    if (coins >= upgradeCost) {  // Tarkistetaan onko tarpeeksi kolikoita
        coins -= upgradeCost;
        handLevel++;
        handRate = handLevel; // Päivitetään sormen antama kolikkojen määrä
        updateCounter();

        // Päivitetään päivityspainikkeen teksti
        const buyButton = document.getElementById("buyHandButton");
        buyButton.textContent = `Päivitä Käsi (Max. hinta: ${handLevel * 100} kolikkoa) - Tasosi: ${handLevel}`;  // Päivitetään päivityshinta ja taso
    } else {
        alert("Ei tarpeeksi kolikoita!");
    }
}


// Osta automaattikerääjä
function buyAutoCollector() {
    if (coins >= autoCollectorCost) {
        coins -= autoCollectorCost;  // Vähennetään kolikoita
        autoCollectorLevel++;         // Nostetaan kerääjän tasoa
        autoCollectorRate += 0.1;     // Kasvatetaan tuotantoa
        autoCollectorCost = Math.floor(autoCollectorCost * 2);  // Seuraava päivitys maksaa 100 kolikkoa enemmän

        // Jos kerääjä on ostettu, käynnistetään se (jos se ei ole jo käynnissä)
        if (autoCollectorInterval === null) {
            startAutoCollector();
        }

        updateCounter();  // Päivitetään käyttöliittymä
    } else {
        alert("Sinulla ei ole tarpeeksi kolikoita!");
    }
}

// Käynnistetään automaattinen kerääjä
function startAutoCollector() {
    autoCollectorInterval = setInterval(() => {
        coins += autoCollectorRate;  // Lisää kolikoita kerääjän tuoton mukaan
        updateCounter();
    }, 1000); // Päivittää joka sekunti
}

// Estetään automaattinen kerääjä ennen ostopainiketta
function stopAutoCollector() {
    if (autoCollectorInterval !== null) {
        clearInterval(autoCollectorInterval);
        autoCollectorInterval = null;
    }
}
