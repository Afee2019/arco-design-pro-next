import defaultLocale from '@/locale';

export default function useLocale(locale?: Record<string, string>) {
  // 只使用中文locale
  const mergedLocale = {
    ...defaultLocale['zh-CN'],
    ...locale,
  };

  // 返回一个代理对象，当访问不存在的key时返回key本身
  return new Proxy(mergedLocale, {
    get(target, key: string) {
      return target[key] || key;
    },
  });
}
