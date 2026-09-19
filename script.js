const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projects.forEach((project) => {
      const categories = project.dataset.category.split(' ');
      project.classList.toggle('hidden', category !== 'all' && !categories.includes(category));
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
