export function createCard({ name, link }, deleteCard, handleLike = null, handleImageClick = null) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

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
  punku@DESKTOP-0UA3CAI MINGW64 ~/dev/mesto-project-ff-my2 (main)
$ npm run build

> mesto-project-ff-my@1.0.0 build
> webpack --mode production

assets by info 432 KiB [immutable]
  assets by path *.svg 7.63 KiB
    asset 0863e5bc26221680f1e2.svg 5.04 KiB [emitted] [immutable] [from: src/ima
ges/logo.svg] (auxiliary name: main)
    asset df0c965524717a3fd8e9.svg 850 bytes [emitted] [immutable] [from: src/im
ages/like-inactive.svg] (auxiliary name: main)
    asset 2af49b82d305a6ea3442.svg 626 bytes [emitted] [immutable] [from: src/im
ages/delete-icon.svg] (auxiliary name: main)
    asset a7ffe37dcb927ba0c46c.svg 437 bytes [emitted] [immutable] [from: src/im
ages/like-active.svg] (auxiliary name: main)
    asset 8a65f75d3d836c291cc9.svg 291 bytes [emitted] [immutable] [from: src/im
ages/close.svg] (auxiliary name: main)
    + 2 assets
  assets by path *.woff2 342 KiB
    asset 8d07d4e4ea9833df9373.woff2 123 KiB [emitted] [immutable] [from: src/ve
ndor/fonts/Inter-Black.woff2] (auxiliary name: main)
    asset dcba3388310e6ae77440.woff2 116 KiB [emitted] [immutable] [from: src/ve
ndor/fonts/Inter-Regular.woff2] (auxiliary name: main)
    asset e481ef8133a3c71636e5.woff2 104 KiB [emitted] [immutable] [from: src/ve
ndor/fonts/Inter-Medium.woff2] (auxiliary name: main)
  asset 6666407ac3aa5af1d5de.jpg 82.2 KiB [emitted] [immutable] [from: src/image
s/avatar.jpg] (auxiliary name: main)
asset main.js 33.4 KiB [emitted] [minimized] (name: main)
asset index.html 3.14 KiB [emitted]
runtime modules 2.59 KiB 8 modules
orphan modules 4.93 KiB [orphan] 4 modules
javascript modules 64.5 KiB
  modules by path ./src/blocks/ 34.6 KiB 37 modules
  modules by path ./node_modules/ 8.73 KiB 9 modules
  modules by path ./src/vendor/*.css 8.33 KiB 2 modules
  ./src/scripts/index.js + 6 modules 10.2 KiB [built] [code generated]
  ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.j
s!./src/pages/index.css 2.6 KiB [built] [code generated]
asset modules 432 KiB (asset) 462 bytes (javascript)
  modules by path ./src/images/ 89.9 KiB (asset) 336 bytes (javascript)
    ./src/images/logo.svg 5.04 KiB (asset) 42 bytes (javascript) [built] [code g
enerated]
    + 7 modules
  modules by path ./src/vendor/ 342 KiB (asset) 126 bytes (javascript)
    ./src/vendor/fonts/Inter-Regular.woff2 116 KiB (asset) 42 bytes (javascript)
 [built] [code generated]
    + 2 modules

WARNING in ./src/scripts/index.js 26:37-47
export 'deleteCard' (imported as 'deleteCard') was not found in './card.js' (pos
sible exports: createCard)

WARNING in ./src/scripts/index.js 26:49-59
export 'handleLike' (imported as 'handleLike') was not found in './handlers.js'
(possible exports: handleImageClick)

WARNING in ./src/scripts/index.js 127:40-50
export 'deleteCard' (imported as 'deleteCard') was not found in './card.js' (pos
sible exports: createCard)

WARNING in ./src/scripts/index.js 127:52-62
export 'handleLike' (imported as 'handleLike') was not found in './handlers.js'
(possible exports: handleImageClick)

webpack 5.99.8 compiled with 4 warnings in 3784 ms

}