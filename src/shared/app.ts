import store from 'storejs';

export const setFontSize = () => {
  const html = document.documentElement,
    w = html.offsetWidth;
  html.style.fontSize = 10 * (w / 1920) + 'px';
};

export const saveTreeData = data => {
  store.set('data', JSON.stringify(data));
};
