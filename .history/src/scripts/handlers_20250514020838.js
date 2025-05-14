// handlers.js

// Функция обработки клика по лайку
export function handleLike(event) {
  const likeButton = event.target;

  // Проверяем, был ли уже лайкнут
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем активный класс
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    // Добавляем активный класс
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Функция обработки клика по изображению
export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image');  // Получаем элемент изображения в попапе
  const popupCaption = document.querySelector('.popup__caption');  // Получаем элемент подписи в попапе

  // Устанавливаем изображение без закруглений
  imagePopupElement.src = evt.target.src;
  imagePopupElement.style.borderRadius = '0'; // Убираем закругления

  // Передаем подпись (alt текст) изображения
  popupCaption.textContent = evt.target.alt;

  // Получаем попап с изображением
  const popupImagePopup = document.querySelector('.popup_type_image');
  
  // Открываем попап с изображением
  openModal(popupImagePopup);
}

// Функция открытия попапа
export function openModal(popup) {
  popup.classList.add('popup_opened');  // Добавляем класс, чтобы попап открылся
  document.addEventListener('keydown', handleEscClose);  // Обработчик закрытия попапа по клавише Esc
}

// Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove('popup_opened');  // Убираем класс, чтобы скрыть попап
  document.removeEventListener('keydown', handleEscClose);  // Убираем обработчик клавиши Escape
}

// Функция обработки клавиши Escape
export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');  // Ищем открытый попап
    if (openPopup) {
      closeModal(openPopup);  // Закрываем попап
    }
  }
}
