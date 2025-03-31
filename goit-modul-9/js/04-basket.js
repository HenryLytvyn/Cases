// Находим необходимые элементы
const container = document.querySelector(".js-list");
const clear = document.querySelector(".js-clear");
const totalPrice = document.querySelector(".js-total-price");

const LS_basket = "basket";

// Вытягиваем товары из local storage и преобразуем данные в массив
const products = JSON.parse(localStorage.getItem(LS_basket)) || [];
let totalCost;

// Если корзина не пустая, делаем видимую кнопку Clear basket и считаем сумму товаров
if (products.length) {
  clear.hidden = false;
  totalCost = products.reduce((acc, { qty, price }) => (acc += qty * price), 0);
}

// Выводим сообщение в браузер с суммой товаров или о том, что корзина пуста
totalPrice.textContent = totalCost
  ? `Total cost ${totalCost} грн`
  : "Your basket is empty";

// Отрисовываем карточки товаров из корзины
container.insertAdjacentHTML("beforeend", createMarkup(products));

function createMarkup(arr) {
  return arr
    .map(
      ({ img, name, price, qty }) => `
    <li class="cart-item">
        <img class="product-img" src="${img}" alt="name" />
        <h2>${name}</h2>
        <p>Quantity: ${qty}</p>
        <p>Total price ${price * qty} грн</p>
    </li>
    `
    )
    .join("");
}

// Подключаем функционал кнопки Clear basket, добавляем слушателя. Очищаем корзину и переадрисовываем страницу на 03-shop.html
clear.addEventListener("click", handleClear);

function handleClear() {
  localStorage.removeItem(LS_basket);
  window.location.href = "./03-shop.html";
}
