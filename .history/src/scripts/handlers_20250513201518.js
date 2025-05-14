export function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
},

  // Переключаем активный класс
  likeButton.classList.toggle('card__like-button_is-active');
  
  // Обновляем счетчик лайков
  const currentLikes = parseInt(likeCountSpan.textContent, 10) || 0;
  likeCountSpan.textContent = likeButton.classList.contains('card__like-button_is-active') ? currentLikes + 1 : currentLikes - 1;
}

// Обработчик клика по изображению
export function handleImageClick(event) {
  const imageUrl = event.target.src; // получаем ссылку на изображение
  const popupImage = document.querySelector('.popup_type_image'); // находим попап

  if (!popupImage) return; // Если попап не найден, выходим

  const popupImageElement = popupImage.querySelector('.popup__image'); // находим элемент для изображения
  const popupImageCaption = popupImage.querySelector('.popup__caption'); // находим элемент для подписи

  if (popupImageElement && popupImageCaption) {
    popupImageElement.src = imageUrl; // ставим изображение
    popupImageCaption.textContent = event.target.alt; // ставим подпись
    openPopup(popupImage); // открываем попап
  }
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose); // добавляем слушатель для закрытия по Esc
}

// Обработчик закрытия попапа при нажатии на Esc
function handleEscClose(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose); // удаляем слушатель
}
