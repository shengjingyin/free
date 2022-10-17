export const setFontSize = () => {
    const html = document.documentElement,
        w = html.offsetWidth;
    html.style.fontSize = 10 * (w / 1920) + "px";
};
