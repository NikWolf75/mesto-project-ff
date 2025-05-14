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

export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;

  // Получаем карточку, по которой кликнули
  const cardElement = evt.target.closest('.card');
  const cardTitle = cardElement.querySelector('.card__title').textContent;
  const cardDescription = cardElement.querySelector('.card__text').textContent;  // Исправить этот момент

  // Добавляем название и описание в подпись
  popupCaption.textContent = `${cardTitle} - ${cardDescription}`;

  // Открываем попап с изображением
  const popupImagePopup = document.querySelector('.popup_type_image');
  openModal(popupImagePopup);
}






// Функция закрытия попапа по нажатию клавиши Escape
export function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closeModal(openPopup);  // Закрываем открытый попап
  }
}

// Открытие попапа
export function openModal(popup) {
  popup.classList.add('popup_opened');  // Добавляем класс, чтобы попап открылся
  document.addEventListener('keydown', handleEscClose);  // Обработчик закрытия попапа по Escape
}

// Закрытие попапа
export function closeModal(popup) {
  if (popup) {
    popup.classList.remove('popup_opened');  // Убираем класс, чтобы скрыть попап
    document.removeEventListener('keydown', handleEscClose);  // Убираем обработчик клавиши Escape
  }
}
