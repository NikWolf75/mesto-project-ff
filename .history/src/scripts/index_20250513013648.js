
import 'pages/index.css';


import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard } from './card.js';

import logo from '../images/logo.svg';

const logoImg = document.querySelector('.header__logo');
logoImg.src = logo;
// Вывод карточек
const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});

