
import '../pages/index.css';


import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

import logo from './images/logo.svg'; // Используем import для загрузки изображений

const img = document.createElement('img');
img.src = logo;
img.alt = 'Логотип проекта место';
img.classList.add('logo', 'header__logo');
document.body.appendChild(img);

const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;
// Вывод карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

