
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


  imagePopupElement.src = evt.target.src;
  imagePopupElement.alt = evt.target.alt;

  const cardElement = evt.target.closest('.card');
  const cardTitle = cardElement.querySelector('.card__title').textContent;
  const cardDescription = cardElement.querySelector('.card__text').textContent;


  popupCaption.textContent = cardDescription ? `${cardTitle} - ${cardDescription}` : cardTitle;

  const popupImagePopup = document.querySelector('.popup_type_image'); 
  openModal(popupImagePopup);  
}


export function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closeModal(openPopup);  
  }
}


export function openModal(popup) {
  popup.classList.add('popup_opened');  
  document.addEventListener('keydown', handleEscClose); 
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