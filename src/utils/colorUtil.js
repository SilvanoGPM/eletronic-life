const colorUtil = {
    colors: {
        reset: '\33[0;0m',
        red: '\33[31m',
        magenta: '\33[32m',
        pink: '\33[35m',
        yellow: '\33[33m',
        green: '\33[34m',
        cyan: '\33[36m',
    },
    paintText: (text, color) => color + text + colorUtil.colors.reset
}

module.exports = colorUtil;