const kolvoInput = document.getElementById("kolvo");
const kolvobutton = document.getElementById("resetKolvo");
const servradio = document.querySelectorAll('input[name="service"]');
const prodoptions = document.querySelector(".prodoption");
const dopprops = document.querySelector(".dopproperty");
const finalcost = document.getElementById("totalCost");
const errormeselem = document.getElementById("errorMessage");

const prices = { service1: 10, service2: 15, service3: 20 };
const pricesprod = { product1: 200, product2: 300, product3: 400 };

function itog() {
    const chosenserv = document.querySelector('input[name="service"]:checked').value;
    const kolvo = kolvoInput.value;

    if (kolvo < 0) {
        errormeselem.textContent = "Ошибка ввода: введите положительное число.";
        return;
    } else {
        errormeselem.textContent = "";
    }

    if (chosenserv) {
        let total = 0;

        if (chosenserv === "service2") {
            const selectedProduct = prodoptions.querySelector("select").value;
            const productPrice = pricesprod[selectedProduct];
            total = prices[chosenserv] * kolvo + productPrice;
        } else if (chosenserv === "service3") {
            total = dopprops.querySelector("input").checked
                ? 2 * prices[chosenserv] * kolvo
                : prices[chosenserv] * kolvo;
        } else {
            total = prices[chosenserv] * kolvo;
        }

        finalcost.textContent = total;
    }

    if (chosenserv === "service2") {
        prodoptions.style.display = "block";
        dopprops.style.display = "none";
    } else if (chosenserv === "service3") {
        prodoptions.style.display = "none";
        dopprops.style.display = "block";
    } else {
        prodoptions.style.display = "none";
        dopprops.style.display = "none";
    }
}

kolvoInput.addEventListener("input", itog);
kolvobutton.addEventListener("click", () => {
    kolvoInput.value = "";
    errormeselem.textContent = "";
});
servradio.forEach((radio) => radio.addEventListener("change", itog));
dopprops.querySelector("input").addEventListener("change", itog);
prodoptions.querySelector("select").addEventListener("change", itog);

itog();
