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
export function handleImageClick(event) {
  const imageElement = event.target; // Получаем кликнутую картинку
  const popupImage = document.querySelector('.popup__image'); // Элемент изображения в попапе
  const popupCaption = document.querySelector('.popup__caption'); // Элемент подписи в попапе

  // Заполняем попап данными
  popupImage.src = imageElement.src; // Устанавливаем источник изображения
  popupImage.alt = imageElement.alt; // Устанавливаем alt текст (для доступности)
  popupCaption.textContent = imageElement.alt; // Устанавливаем текст из alt (или название)

  // Открываем попап
  openPopup(document.querySelector('.popup_type_image'));
}

// Функция закрытия попапа по нажатию клавиши Escape
export function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closeModal(openPopup); // Закрываем открытый попап
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
