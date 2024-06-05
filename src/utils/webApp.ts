import { WebApp } from './Initialize';

type MainButtonCallback = () => void | Promise<void>;

export const readyWebApp = () => {
  WebApp.ready();
};

export const setupMainButton = () => {
  WebApp.MainButton.setText('Submit');
  WebApp.MainButton.setParams({ is_visible: true, is_active: true });
};

export const setMainButtonHandler = (callback: MainButtonCallback) => {
  WebApp.MainButton.onClick(callback);
};

export const disableMainButton = () => {
  WebApp.MainButton.showProgress();
  WebApp.MainButton.setParams({ color: '#eeeeee' });
};

export const enableMainButton = () => {
  WebApp.MainButton.hideProgress();
  WebApp.MainButton.setParams({ color: WebApp.themeParams.button_color });
};

export const clearMainButtonHandler = (callback: MainButtonCallback) => {
  WebApp.MainButton.offClick(callback);
};

export const showMainButton = () => {
  WebApp.MainButton.show();
};

export const hideMainButton = () => {
  WebApp.MainButton.hide();
};

export const getUserData = () => {
  return WebApp.initDataUnsafe.user;
};
