declare namespace Telegram {
  interface WebApp {
    BackButton: BackButton;
    MainButton: MainButton;
    HapticFeedback: HapticFeedback;
    version: string;
    initData: string;
    initDataUnsafe: InitDataUnsafe;
    themeParams: ThemeParams;
    colorScheme: string;
    viewportHeight: number;
    viewportStableHeight: number;
    isExpanded: boolean;
    isClosingConfirmationEnabled: boolean;
    platform: string;

    onEvent(eventType: string, callback: () => void): void;
    offEvent(eventType: string, callback: () => void): void;
    close(): void;
    expand(): void;
    ready(): void;
    requestViewPort(): void;
    requestTheme(): void;
    setBackgroundColor(color: string): void;
    setHeaderColor(colorKey: string): void;
    showPopup(params: PopupParams, callback: () => void): void;
    showAlert(message: string, callback: () => void): void;
    showConfirm(message: string, callback: (confirmed: boolean) => void): void;
    sendData(data: string): void;
    switchInlineQuery(query: string, chooseChatTypes?: string[]): void;
  }

  interface BackButton {
    isVisible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  }

  interface MainButtonParams {
    text?: string;
    color?: string;
    text_color?: string;
    is_active?: boolean;
    is_visible?: boolean;
  }

  interface MainButton {
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    text: string;

    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    setParams(params: MainButtonParams): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(): void;
    hideProgress(): void;
  }

  interface HapticFeedback {
    impactOccurred(style: string): void;
    notificationOccurred(type: string): void;
    selectionChanged(): void;
  }

  interface InitDataUnsafe {
    query_id: string;
    user: User;
    receiver: Receiver;
    start_param: string;
    can_send_after: number;
    auth_date: number;
    hash: string;
  }

  interface User {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_bot?: boolean;
  }

  interface Receiver {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }

  interface ThemeParams {
    background_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_background_color?: string;
  }

  interface PopupParams {
    title?: string;
    message: string;
    buttons: PopupButton[];
  }

  interface PopupButton {
    id: string;
    type?: string;
    text: string;
  }
}

interface Window {
  Telegram: {
    WebApp: Telegram.WebApp;
  };
}
