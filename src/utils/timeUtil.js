const timeUtil = {
    formatMs: (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes >= 60 ? '+ 01:00:00H' : timeUtil.fillingZero(minutes) + ':' + timeUtil.fillingZero(seconds);
    },
    fillingZero: (value) => (value < 10 ? '0' : '') + value,
}

module.exports = timeUtil;