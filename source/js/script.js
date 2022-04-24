// Menu | Variables

const TOGGLE_CLOSED_CLASS = 'menu-toggle--closed';
const TOGGLE_OPENED_CLASS = 'menu-toggle--opened';
const TOGGLE_NOJS_CLASS = 'menu-toggle--nojs';
const MENU_NOJS_CLASS = 'menu--nojs';
const DESKTOP_WIDTH = '(min-width: 1234px)';
const ADDRESS_TO = 'https://echo.htmlacademy.ru';
const SUCCESS_MESSAGE = 'Форма успешно отправлена, спасибо! :)';
const ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте еще раз';

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const desktop = window.matchMedia(DESKTOP_WIDTH);
const menuLinks = menu.querySelectorAll('.menu__link');
const buyLinks = document.querySelectorAll('.btn--buy');
const orderPopup = document.querySelector('.order');
const feedbackForm = document.querySelector('.feedback-form');
const noticePopup = document.querySelector('.notice');
const noticeMessage = document.querySelector('.notice__message');
const orderForm = document.querySelector('.order-form');

// Menu | NoJS

menuToggle.classList.remove(TOGGLE_NOJS_CLASS);
menu.classList.remove(MENU_NOJS_CLASS);

// Menu | Show/hide when toggle

const showMenu = () => {
  menuToggle.classList.remove(TOGGLE_CLOSED_CLASS);
  menuToggle.classList.add(TOGGLE_OPENED_CLASS);
  menu.style.display = 'flex';
}

const hideMenu = () => {
  menuToggle.classList.remove(TOGGLE_OPENED_CLASS);
  menuToggle.classList.add(TOGGLE_CLOSED_CLASS);
  menu.style.display = 'none';
}

function onMenuToggleClick() {
  const isMenuClosed = this.classList.contains(TOGGLE_CLOSED_CLASS);

  isMenuClosed ? showMenu() : hideMenu();
}

menuToggle.addEventListener('click', onMenuToggleClick);

// Menu | Hide when window resize

const onWindowResize = () => {
  const isDesktopMatches = desktop.matches;

  isDesktopMatches ? showMenu() : hideMenu();
}

window.addEventListener("resize", onWindowResize);

// Menu | Hide when link click

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener('click', function() {
    const isDesktopMatches = desktop.matches;

    if (!isDesktopMatches) {
      hideMenu();
    }
  });
});

// Modal

const isEscKey = (evt) => {
  return evt.key === 'Escape';
}

const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    hidePopup();
  }
}

const showPopup = () => {
  const currentPopup = document.getElementsByClassName('modal--show');
  const popupCloseButton = currentPopup[0].querySelector('.modal__close');

  popupCloseButton.addEventListener('click', hidePopup);
  document.addEventListener('keydown', onEscKeydown);
}

const hidePopup = () => {
  const currentPopup = document.getElementsByClassName('modal--show');
  const popupCloseButton = currentPopup[0].querySelector('.modal__close');

  popupCloseButton.removeEventListener('click', hidePopup);
  document.removeEventListener('keydown', onEscKeydown);

  currentPopup[0].classList.remove('modal--show');
  removeOverlay();
}

const createOverlay = () => {
  const popupOverlay = document.createElement('div');

  popupOverlay.classList.add('popup-overlay');
  document.body.append(popupOverlay);
  document.body.style.overflowY = 'hidden';

  popupOverlay.addEventListener('click', hidePopup);
}

const removeOverlay = () => {
  const popupOverlay = document.querySelector('.popup-overlay');

  popupOverlay.remove();
  document.body.style.overflowY = 'auto';

  popupOverlay.removeEventListener('click', hidePopup);
}

const onBuyLinkClick = (evt) => {
  evt.preventDefault();

  orderPopup.classList.add('modal--show');
  createOverlay();

  showPopup();
}

buyLinks.forEach((buyLink) => {
  buyLink.addEventListener('click', onBuyLinkClick);
});

// Form

const sendData = (onSuccess, onError, body) => {
  fetch(
    ADDRESS_TO,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onError())
    .catch(() => onError(ERROR_MESSAGE));
};

const showNotice = (message) => {
  noticeMessage.textContent = message;

  noticePopup.classList.add('modal--show');
  createOverlay();

  showPopup();
};

const pristine = new Pristine(feedbackForm, {
  classTo: 'feedback-form__subgroup',
  errorTextParent: 'feedback-form__subgroup',
  errorTextTag: 'p',
  errorTextClass: 'help'
});

feedbackForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    sendData(
      () => {
        showNotice(SUCCESS_MESSAGE);
        feedbackForm.reset(ERROR_MESSAGE);
      },
      () => {
        showNotice();
      },
      new FormData(evt.target),
    );
  }
});
