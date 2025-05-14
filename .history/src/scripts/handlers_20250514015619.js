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
  const imagePopupElement = document.createElement('img');
  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  imagePopupElement.alt = evt.target.alt;  // Можно использовать alt для изображения

  // Стили для картинки в полноэкранном режиме
  imagePopupElement.style.position = 'fixed';
  imagePopupElement.style.top = '0';
  imagePopupElement.style.left = '0';
  imagePopupElement.style.width = '100%';
  imagePopupElement.style.height = '100%';
  imagePopupElement.style.objectFit = 'contain';  // Чтобы изображение не выходило за пределы экрана
  imagePopupElement.style.zIndex = '9999';
  imagePopupElement.style.cursor = 'zoom-out';

  // Добавляем картинку в body
  document.body.appendChild(imagePopupElement);

  // Запрашиваем полноэкранный режим
  if (imagePopupElement.requestFullscreen) {
    imagePopupElement.requestFullscreen();
  } else if (imagePopupElement.mozRequestFullScreen) { // Firefox
    imagePopupElement.mozRequestFullScreen();
  } else if (imagePopupElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    imagePopupElement.webkitRequestFullscreen();
  } else if (imagePopupElement.msRequestFullscreen) { // IE/Edge
    imagePopupElement.msRequestFullscreen();
  }

  // Закрытие полноэкранного режима и удаление картинки при клике
  imagePopupElement.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    document.body.removeChild(imagePopupElement); // Удаляем картинку после закрытия полноэкранного режима
  });
}
