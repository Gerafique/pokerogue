import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { deConfig } from '#app/locales/de/config.js';
import { enConfig } from '#app/locales/en/config.js';
import { esConfig } from '#app/locales/es/config.js';
import { frConfig } from '#app/locales/fr/config.js';
import { itConfig } from '#app/locales/it/config.js';
import { ptBrConfig } from '#app/locales/pt_BR/config.js';
import { zhCnConfig } from '#app/locales/zh_CN/config.js';

export interface SimpleTranslationEntries {
  [key: string]: string
}

export interface MoveTranslationEntry {
  name: string,
  effect: string
}

export interface MoveTranslationEntries {
  [key: string]: MoveTranslationEntry
}

export interface AbilityTranslationEntry {
  name: string,
  description: string
}

export interface AbilityTranslationEntries {
  [key: string]: AbilityTranslationEntry
}

export interface ModifierTypeTranslationEntry {
  name?: string,
  description?: string,
  extra?: SimpleTranslationEntries
}

export interface ModifierTypeTranslationEntries {
  ModifierType: { [key: string]: ModifierTypeTranslationEntry },
  AttackTypeBoosterItem: SimpleTranslationEntries,
  TempBattleStatBoosterItem: SimpleTranslationEntries,
  BaseStatBoosterItem: SimpleTranslationEntries,
  EvolutionItem: SimpleTranslationEntries,
  FormChangeItem: SimpleTranslationEntries,
  TeraType: SimpleTranslationEntries,
}

export interface Localizable {
  localize(): void;
}

export function initI18n(): void {
  let lang = '';

  if (localStorage.getItem('prLang'))
    lang = localStorage.getItem('prLang');

  /**
   * i18next is a localization library for maintaining and using translation resources.
   *
   * Q: How do I add a new language?
   * A: To add a new language, create a new folder in the locales directory with the language code.
   *    Each language folder should contain a file for each namespace (ex. menu.ts) with the translations.
   *    Don't forget to declare new language in `supportedLngs` i18next initializer
   *
   * Q: How do I add a new namespace?
   * A: To add a new namespace, create a new file in each language folder with the translations.
   *    Then update the `resources` field in the init() call and the CustomTypeOptions interface.
   *
   * Q: How do I make a language selectable in the settings?
   * A: In src/system/settings.ts, add a new case to the Setting.Language switch statement.
   */

  i18next.use(LanguageDetector).init({
    lng: lang,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'it', 'de', 'zh_CN','pt_BR'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        ...enConfig
      },
      es: {
        ...esConfig
      },
      fr: {
        ...frConfig
      },
      it: {
        ...itConfig
      },
      de: {
        ...deConfig
      },
      pt_BR: {
        ...ptBrConfig
      },
      zh_CN: {
        ...zhCnConfig
      }
    },
  });
}

// Module declared to make referencing keys in the localization files type-safe.
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      menu: SimpleTranslationEntries;
      menuUiHandler: SimpleTranslationEntries;
      move: MoveTranslationEntries;
      battle: SimpleTranslationEntries;
      abilityTriggers: SimpleTranslationEntries;
      ability: AbilityTranslationEntries;
      pokeball: SimpleTranslationEntries;
      pokemon: SimpleTranslationEntries;
      pokemonStat: SimpleTranslationEntries;
      commandUiHandler: SimpleTranslationEntries;
      fightUiHandler: SimpleTranslationEntries;
      tutorial: SimpleTranslationEntries;
      starterSelectUiHandler: SimpleTranslationEntries;
      nature: SimpleTranslationEntries;
      growth: SimpleTranslationEntries;
      weather: SimpleTranslationEntries;
      modifierType: ModifierTypeTranslationEntries;
    };
  }
}

export default i18next;
