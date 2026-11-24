'use strict';
const menu = document.querySelector('#menu');
const links = document.querySelector('#links');
const mobile = window.matchMedia('(max-width: 720px)');
function syncMenu() {
  menu.hidden = !mobile.matches;
  links.hidden = mobile.matches;
  menu.setAttribute('aria-expanded', String(!links.hidden));
}
syncMenu();
mobile.addEventListener('change', syncMenu);
menu.addEventListener('click', () => {
  links.hidden = !links.hidden;
  menu.setAttribute('aria-expanded', String(!links.hidden));
});
links.addEventListener('click', event => {
  if (mobile.matches && event.target.closest('a')) {
    links.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
  }
});
const filters = document.querySelector('#filters');
const projects = [...document.querySelectorAll('.project')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  const category = button.dataset.filter;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(project => { project.hidden = category !== 'all' && project.dataset.category !== category; });
  document.querySelector('#filter-status').textContent = `${projects.filter(project => !project.hidden).length} projects shown.`;
});
document.querySelector('#year').textContent = new Date().getFullYear();
