import { rootElement } from "./detailView";

export function renderLoadingScreen(message) {
  rootElement.innerHTML = getLoadingHtml(message);
}

function getLoadingHtml(message) {
  return `
        <div class="loading-screen">
          <p class="loading-message">${message}</p>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>`;
}
