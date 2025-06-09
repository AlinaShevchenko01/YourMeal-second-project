import iconsHTML from '../../html-partials/icons.html?raw';

function insertIcon(iconId, targetSelector) {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(iconsHTML, 'text/html');
  const icon = parsedHTML.getElementById(iconId);

  if (icon) {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.innerHTML = '';
      target.appendChild(icon.cloneNode(true));
    }
  }
}

insertIcon('logo', '#logoHead-container');
insertIcon('burger', '#burger-container');
insertIcon('logo', '#logoFoot-container');
insertIcon('vk', '#vk-container');
insertIcon('telegram', '#tg-container');
insertIcon('donut', '#donut-container');
insertIcon('donut', '#donut-container');
insertIcon('call', '#call-container');
insertIcon('close', '#close-delivery-container');
insertIcon('close', '#close-modal-accepted');
insertIcon('close', '#close-modal-container');






