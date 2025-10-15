export const DEFAULT_CURRENCY = 'GBP';
export const DEFAULT_LOCALE = 'en-GB';
export const DEFAULT_CURRENCY_SYMBOL = '£';

export const formatCurrency = (amount: number, currency: string = DEFAULT_CURRENCY, locale: string = DEFAULT_LOCALE) => {
    return new Intl.NumberFormat(locale || DEFAULT_LOCALE, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};