
export function handleLike(event) {
  const likeButton = event.target;


  if (likeButton.classList.contains('card__like-button_is-active')) {

    likeButton.classList.remove('card__like-button_is-active');
  } else {

    likeButton.classList.add('card__like-button_is-active');
  }
}

export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image');  
  const popupCaption = document.querySelector('.popup__caption');  

  // Устанавливаем картинку
  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;

  // Извлекаем информацию из карточки
  const cardElement = evt.target.closest('.card');
  const cardTitle = cardElement.querySelector('.card__title').textContent;
  const cardDescription = cardElement.querySelector('.card__text').textContent;

  // Проверяем описание и корректно его выводим
  popupCaption.textContent = cardDescription ? `${cardTitle} - ${cardDescription}` : cardTitle;

  const popupImagePopup = document.querySelector('.popup_type_image'); // Получаем сам попап с изображением
  openModal(popupImagePopup);  // Открываем попап с изображением
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

function handleAvatarChange(evt) {
  evt.preventDefault();  // Останавливаем стандартную отправку формы

  const avatarInput = document.querySelector('input[name="avatar"]');
  const avatarFile = avatarInput.files[0]; // Получаем файл изображения

  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const newAvatar = event.target.result; // URL для нового аватара

      // Обновляем аватар
      const avatarImage = document.querySelector('#profile-avatar');
      avatarImage.src = newAvatar;  // Обновляем аватар

      // Закрываем попап
      closeModal(document.querySelector('.popup_type_avatar')); 
    };
    reader.readAsDataURL(avatarFile);  // Читаем выбранное изображение как Data URL
  } else {
    console.error('Нет изображения для загрузки');
  }
}