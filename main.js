const kolvoInput = document.getElementById("kolvo");
const kolvobutton = document.getElementById("resetKolvo");
const servradio = document.querySelectorAll('input[name="service"]');
const prodoptions = document.querySelector(".prodoption");
const dopprops = document.querySelector(".dopproperty");
const finalcost = document.getElementById("totalCost");
const errormeselem = document.getElementById("errorMessage");

const prices = { service1: 10, service2: 15, service3: 20 };
const pricesprod = { product1: 200, product2: 300, product3: 400 };

function  calculateTotal() {
    const chosenserv = document.querySelector('input[name="service"]:checked').value;
    const kolvo = kolvoInput.value;
//проверка значения количества
    if (kolvo < 0) { 
        errormeselem.textContent = "Ошибка ввода: введите положительное число.";
        return;
    } else { 
        errormeselem.textContent = "";
    }

    if (chosenserv) { //выбираем услугу
        let total = 0;

        if (chosenserv === "service2") { //если выбрали вторую услугу
            const selectedProduct = prodoptions.querySelector("select").value;
            const productPrice = pricesprod[selectedProduct];
            total = prices[chosenserv] * kolvo + productPrice;
        } else if (chosenserv === "service3") { //если выбрали третью услугу
            total = dopprops.querySelector("input").checked //если кнопку нажали, умножаем на 2, иначе не умножаем
                ? 3 * prices[chosenserv] * kolvo
                : prices[chosenserv] * kolvo;
        } else {
            total = prices[chosenserv] * kolvo; //1 услуга, просто умножаем цену на кол-во
        }

        finalcost.textContent = total;
    }

    if (chosenserv === "service2") { //если выбираем вторую услугу, то prodoptions отображается, а dopprops скрывается
        prodoptions.style.display = "block";
        dopprops.style.display = "none";
    } else if (chosenserv === "service3") { //если выбираем третью услугу, то prodoptions скрывается, а dopprops отображается
        prodoptions.style.display = "none";
        dopprops.style.display = "block";
    } else { //иначе скрываем все на отображение первой услуги
        prodoptions.style.display = "none";
        dopprops.style.display = "none";
    }
}

kolvoInput.addEventListener("input",  calculateTotal); //кнопка сброса
kolvobutton.addEventListener("click", () => {
    kolvoInput.value = "";
    errormeselem.textContent = "";
});
servradio.forEach((radio) => radio.addEventListener("change",  calculateTotal)); //при нажатии на кнопку
dopprops.querySelector("input").addEventListener("change",  calculateTotal); //введение кол-ва в калькулятор и изменение итоговой стоимости
prodoptions.querySelector("select").addEventListener("change",  calculateTotal); //выбор одной из трех услуг

itog(); //вызов
