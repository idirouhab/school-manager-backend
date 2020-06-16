const i18n = require("i18next");
const es = require("./locales/es");
i18n.init({
    interpolation: { escapeValue: false },
    debug: false,
    fallbackLng: 'es',
    defaultNS: 'common',
    resources: {
        es: {
            common: es,
        }
    },
});
module.exports = {
    i18n
};
