// Menu

const TOGGLE_CLOSED_CLASS = 'menu-toggle--closed';
const TOGGLE_OPENED_CLASS = 'menu-toggle--opened';
const TOGGLE_NOJS_CLASS = 'menu-toggle--nojs';
const MENU_NOJS_CLASS = 'menu--nojs';
const DESKTOP_WIDTH = '(min-width: 1234px)';

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const desktop = window.matchMedia(DESKTOP_WIDTH);

menuToggle.classList.remove(TOGGLE_NOJS_CLASS);
menu.classList.remove(MENU_NOJS_CLASS);

function showMenu() {
  menuToggle.classList.remove(TOGGLE_CLOSED_CLASS);
  menuToggle.classList.add(TOGGLE_OPENED_CLASS);
  menu.style.display = 'flex';
}

function hideMenu() {
  menuToggle.classList.remove(TOGGLE_OPENED_CLASS);
  menuToggle.classList.add(TOGGLE_CLOSED_CLASS);
  menu.style.display = 'none';
}

function onMenuToggleClick() {
  const isMenuClosed = this.classList.contains(TOGGLE_CLOSED_CLASS);

  isMenuClosed ? showMenu() : hideMenu();
}

menuToggle.addEventListener('click', onMenuToggleClick);

function onWindowResize() {
  const isDesktopMatches = desktop.matches;

  isDesktopMatches ? showMenu() : hideMenu();
}

window.addEventListener("resize", onWindowResize);
