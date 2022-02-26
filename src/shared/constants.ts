import { CONTENT_BUTTON_PLACEMENT_OPTIONS, FONT_SIZE_OPTIONS } from "./options";

export const APP_NAME_SHORT = "vt";
export const APP_NAME_FULL = "Vertical Tabs";
export const SIDEBAR_CONTAINER_ID = `${APP_NAME_SHORT}-sidebar-container`;

export const SETTINGS_DEBOUNCE_TIME = 400;
export const DEFAULT_SIDEBAR_WIDTH = 360; // px
export const DEFAULT_SIDEBAR_OPACITY = 95; // Divided by 100
export const DEFAULT_FONT_SIZES = FONT_SIZE_OPTIONS[3];
export const DEFAULT_HIDE_CONTENT_BUTTON = false;
export const DEFAULT_CONTENT_BUTTON_BACKGROUND = false;
export const DEFAULT_CONTENT_BUTTON_PLACEMENT =
  CONTENT_BUTTON_PLACEMENT_OPTIONS[3];
export const DEFAULT_CONTENT_BUTTON_PLACEMENT_OFFSET = "16px";
export const DEFAULT_SIDEBAR_OPEN_TAB_STATE = false;
export const DEFAULT_INCOGNITO_MODE = false;

// Hotkeys. See reference for special shortcuts.
// https://github.com/JohannesKlauss/react-hotkeys-hook
export const DEFAULT_HOTKEYS_TOGGLE_SIDEBAR = ["ctrl+/", "⌘+/"];
export const DEFAULT_HOTKEYS_CLOSE_SIDEBAR = ["esc"];

// Chrome storage keys
export const KEY_HOTKEYS_TOGGLE_SIDEBAR = "hotkeys-toggle-sidebar";
export const KEY_SIDEBAR_WIDTH = "sidebar-width";
export const KEY_SIDEBAR_OPACITY = "sidebar-opacity";
export const KEY_FONT_SIZES = "font-sizes";
export const KEY_HIDE_CONTENT_BUTTON = "hide-content-button";
export const KEY_CONTENT_BUTTON_BACKGROUND = "content-button-background";
export const KEY_CONTENT_BUTTON_PLACEMENT = "content-button-placement";
export const KEY_SIDEBAR_OPEN_TAB_STATE = "sidebar-open-tab-state";
export const KEY_INCOGNITO_MODE = "sidebar-incognito-mode";

// Cache settings
export const CACHE_URL_DURATION_SEC = 120;
export const CACHE_CLEAR_URL_ALARM_INTERVAL_MIN = 1;
export const CACHE_CLEAR_TABID_ALARM_INTERVAL_MIN = 5;
export const CACHE_CLEAR_URL_ALARM_NAME = "refresh_url_cache";
export const CACHE_CLEAR_TABID_ALARM_NAME = "refresh_tabid_cache";
