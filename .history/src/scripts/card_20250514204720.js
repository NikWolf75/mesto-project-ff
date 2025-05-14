export function createCard({ name, link, description }, deleteCard, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardText = cardElement.querySelector('.card__text'); 
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');


  if (link) {
    cardImage.src = link;
  } else {
    cardImage.src = 'path/to/default-image.jpg'; 
    console.warn('Путь к изображению пустой, используется изображение по умолчанию');
  }

  cardImage.alt = name;
  cardTitle.textContent = name;
  cardText.textContent = description;


  if (handleLike) {
    likeButton.addEventListener('click', handleLike);
  }


  if (deleteCard) {
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
  }


  if (handleImageClick) {
    cardImage.addEventListener('click', handleImageClick);
  }

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}


export function handleImageClick(evt) {
  const imagePopupElement = document.querySelector('.popup__image');  
  const popupCaption = document.querySelector('.popup__caption');  // Получаем элемент подписи в попапе

  imagePopupElement.src = evt.target.src;  // Устанавливаем картинку
  imagePopupElement.alt = evt.target.alt;  // Устанавливаем alt (для доступности)
  popupCaption.textContent = evt.target.alt; // Устанавливаем подпись

  const popupImagePopup = document.querySelector('.popup_type_image'); // Получаем сам попап с изображением
  openModal(popupImagePopup);  // Открываем попап с изображением
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
