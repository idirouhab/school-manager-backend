import i18n from "i18next";
import es from "./locales/es.json";

i18n.init(
    {
        interpolation: {escapeValue: false},
        debug: false,
        fallbackLng: 'es',
        defaultNS: 'common',
        resources: {
            es: {
                common: es,
            }
        },
    }
);

export default i18n;