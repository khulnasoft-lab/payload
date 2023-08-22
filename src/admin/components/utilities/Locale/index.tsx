import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '../../../../config/types';
import { useConfig } from '../Config';
import { useAuth } from '../Auth';
import { usePreferences } from '../Preferences';
import { useSearchParams } from '../SearchParams';
import { findLocaleFromCode } from '../../../../utilities/findLocaleFromCode';

const LocaleContext = createContext(null);

export const LocaleProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { localization } = useConfig();

  const { user } = useAuth();
  const defaultLocale = (localization && localization.defaultLocale)
    ? localization.defaultLocale
    : 'en';
  const searchParams = useSearchParams();
  const [localeCode, setLocaleCode] = useState<string>(
    (searchParams?.locale as string) || defaultLocale,
  );
  const [locale, setLocale] = useState<Locale | null>(
    localization && findLocaleFromCode(localization, localeCode),
  );
  const { getPreference, setPreference } = usePreferences();
  const localeFromParams = searchParams.locale;

  useEffect(() => {
    if (!localization) {
      return;
    }

    // set locale from search param
    if (
      localeFromParams
      && localization.localeCodes.indexOf(localeFromParams as string) > -1
    ) {
      setLocaleCode(localeFromParams as string);
      setLocale(
        findLocaleFromCode(localization, localeFromParams as string),
      );
      if (user) setPreference('locale', localeFromParams);
      return;
    }

    // set locale from preferences or default
    (async () => {
      let preferenceLocale: string;
      let isPreferenceInConfig: boolean;
      if (user) {
        preferenceLocale = await getPreference<string>('locale');
        isPreferenceInConfig = preferenceLocale
          && localization.localeCodes.indexOf(preferenceLocale) > -1;
        if (isPreferenceInConfig) {
          setLocaleCode(preferenceLocale);
          setLocale(
            findLocaleFromCode(localization, preferenceLocale as string),
          );
          return;
        }
        setPreference('locale', defaultLocale);
      }
      setLocaleCode(defaultLocale);
      setLocale(findLocaleFromCode(localization, defaultLocale));
    })();
  }, [
    defaultLocale,
    getPreference,
    localeFromParams,
    setPreference,
    user,
    localization,
  ]);

  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  );
};

/**
 * A hook that returns the current locale object.
 */
export const useLocale = (): Locale | null => useContext(LocaleContext);
export default LocaleContext;
