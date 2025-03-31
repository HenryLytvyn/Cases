// Создаем переменную для запись в хранилище
const STORAGE_KEY = "feedback-message";

// Находим необходимые элементы из HTML
const form = document.querySelector(".feedback-form");
const input = form.querySelector(".email-input");
const textArea = form.querySelector(".textarea");

// Добавляем слушателя
form.addEventListener("submit", handleSubmit);
textArea.addEventListener("input", handleInput);

getTextArea();

function handleInput(event) {
  // Записываем значение input в переменную и записываем ее в хранилище
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
  console.log(message);
}

function getTextArea() {
  // Записываем в текстовое поле значение из localstorage, чтобы не потерять данные введенные пользователем при перезагрузке страницы.
  // Для этого записываем данные в переменную и если это не пустая строка перезаписываем текстовое поле
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    textArea.value = savedMessage;
  }
}

// Добавляем очистку формы при её отправке
function handleSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
