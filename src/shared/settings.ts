import {
  DEFAULT_BOLD_INITIAL_CHARS_OF_WORDS,
  DEFAULT_CONTENT_BUTTON_BACKGROUND,
  DEFAULT_CONTENT_BUTTON_PLACEMENT,
  DEFAULT_FONT_SIZES,
  DEFAULT_HIDE_CONTENT_BUTTON,
  DEFAULT_HOTKEYS_TOGGLE_SIDEBAR,
  DEFAULT_INCOGNITO_MODE,
  DEFAULT_IS_DARK_MODE,
  DEFAULT_SHOULD_COLOR_FOR_SUBMITTED_BY,
  DEFAULT_SHOULD_SHOW_SIDEBAR_ONLY_ON_EXACT_RESULTS,
  DEFAULT_SHOULD_SHOW_SIDEBAR_ON_RESULTS,
  DEFAULT_SIDEBAR_OPACITY,
  DEFAULT_SIDEBAR_SQUEEZES_PAGE,
  DEFAULT_SIDEBAR_WIDTH,
  KEY_BOLD_INITIAL_CHARS_OF_WORDS,
  KEY_CONTENT_BUTTON_BACKGROUND,
  KEY_CONTENT_BUTTON_PLACEMENT,
  KEY_FONT_SIZES,
  KEY_HIDE_CONTENT_BUTTON,
  KEY_HOTKEYS_TOGGLE_SIDEBAR,
  KEY_INCOGNITO_MODE,
  KEY_IS_DARK_MODE,
  KEY_SHOULD_COLOR_FOR_SUBMITTED_BY,
  KEY_SHOULD_SHOW_SIDEBAR_ONLY_ON_EXACT_RESULTS,
  KEY_SHOULD_SHOW_SIDEBAR_ON_RESULTS,
  KEY_SIDEBAR_OPACITY,
  KEY_SIDEBAR_SQUEEZES_PAGE,
  KEY_SIDEBAR_WIDTH,
} from "./constants";
import { createChromeStorageStateHookLocal } from "./storage/index";

const SETTINGS_KEY = "settings";
const INITIAL_VALUE = {
  [KEY_IS_DARK_MODE]: DEFAULT_IS_DARK_MODE,
  [KEY_SIDEBAR_WIDTH]: DEFAULT_SIDEBAR_WIDTH,
  [KEY_SIDEBAR_OPACITY]: DEFAULT_SIDEBAR_OPACITY,
  [KEY_HOTKEYS_TOGGLE_SIDEBAR]: DEFAULT_HOTKEYS_TOGGLE_SIDEBAR,
  [KEY_HIDE_CONTENT_BUTTON]: DEFAULT_HIDE_CONTENT_BUTTON,
  [KEY_CONTENT_BUTTON_BACKGROUND]: DEFAULT_CONTENT_BUTTON_BACKGROUND,
  [KEY_CONTENT_BUTTON_PLACEMENT]: DEFAULT_CONTENT_BUTTON_PLACEMENT,
  [KEY_SIDEBAR_SQUEEZES_PAGE]: DEFAULT_SIDEBAR_SQUEEZES_PAGE,
  [KEY_FONT_SIZES]: DEFAULT_FONT_SIZES,
  [KEY_BOLD_INITIAL_CHARS_OF_WORDS]: DEFAULT_BOLD_INITIAL_CHARS_OF_WORDS,
  [KEY_INCOGNITO_MODE]: DEFAULT_INCOGNITO_MODE,
  [KEY_SHOULD_COLOR_FOR_SUBMITTED_BY]: DEFAULT_SHOULD_COLOR_FOR_SUBMITTED_BY,
  [KEY_HOTKEYS_TOGGLE_SIDEBAR]: DEFAULT_HOTKEYS_TOGGLE_SIDEBAR,
  [KEY_SHOULD_SHOW_SIDEBAR_ON_RESULTS]: DEFAULT_SHOULD_SHOW_SIDEBAR_ON_RESULTS,
  [KEY_SHOULD_SHOW_SIDEBAR_ONLY_ON_EXACT_RESULTS]:
    DEFAULT_SHOULD_SHOW_SIDEBAR_ONLY_ON_EXACT_RESULTS,
};

export const useSettingsStore = createChromeStorageStateHookLocal(
  SETTINGS_KEY,
  INITIAL_VALUE
);
