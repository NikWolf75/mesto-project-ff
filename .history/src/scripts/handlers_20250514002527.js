export function handleLike(event) {
  const likeButton = event.target;

  // Проверяем, был ли уже лайкнут

export function handleLike(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

export function handleImageClick(evt) {
  const imageSrc = evt.target.src;
  const popupImage = document.querySelector('.popup_type_image .popup__image');
  const popupCaption = document.querySelector('.popup_type_image .popup__caption');
  popupImage.src = imageSrc;
  popupCaption.textContent = evt.target.alt;

  openModal(document.querySelector('.popup_type_image'));  // Нужно использовать openModal
}