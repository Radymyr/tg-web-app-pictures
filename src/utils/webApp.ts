import { WebApp } from './Initialize';

type MainButtonCallback = () => void | Promise<void>;

export const readyWebApp = () => {
  WebApp.ready();
};

export const setupMainButton = (callback: MainButtonCallback) => {
  WebApp.MainButton.setText('Submit');
  WebApp.MainButton.setParams({ is_visible: true, is_active: true });
  WebApp.MainButton.onClick(callback);
};

export const unSetupMainButton = (callback: MainButtonCallback) => {
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
