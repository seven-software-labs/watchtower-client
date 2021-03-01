const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const customColors = {
    "tree-poppy": {
        DEFAULT: "#F7931E",
        "50": "#FFFDFC",
        "100": "#FEF2E3",
        "200": "#FCDAB2",
        "300": "#FBC280",
        "400": "#F9AB4F",
        "500": "#F7931E",
        "600": "#DA7908",
        "700": "#A95E06",
        "800": "#784304",
        "900": "#462703"
    },
    "vermilion": {
        DEFAULT: "#FA4D09",
        "50": "#FFF0EA",
        "100": "#FEDED1",
        "200": "#FDBA9F",
        "300": "#FC956D",
        "400": "#FB713B",
        "500": "#FA4D09",
        "600": "#CC3C04",
        "700": "#9A2E03",
        "800": "#681F02",
        "900": "#361001"
    },    
};

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                orange: customColors["tree-poppy"],
                red: customColors.vermilion,
                primary: customColors["tree-poppy"],
                secondary: customColors.vermilion,
                success: colors.green,
                warning: colors.amber,
                danger: customColors.vermilion,
                gray: colors.trueGray,
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
};