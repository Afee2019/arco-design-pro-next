import { useContext } from 'react';
import { GlobalContext } from '../context';
import defaultLocale from '../locale';

function useLocale(locale = null) {
  try {
    const context = useContext(GlobalContext);
    const lang = context?.lang || 'zh-CN';
    const localeData = locale || defaultLocale;

    if (!localeData || typeof localeData !== 'object') {
      return {};
    }

    const result = localeData[lang] || localeData['zh-CN'] || {};

    if (!result || typeof result !== 'object') {
      return {};
    }

    return result;
  } catch (error) {
    console.warn('useLocale error:', error);
    return {};
  }
}

export default useLocale;
