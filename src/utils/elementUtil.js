module.exports = {
    randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    },
    elementFromChar(legend, ch) {
        if (ch === " ") return null;
        
        const element = new legend[ch]();
        element.originChar = ch;
        return element;
    },
    charFromElement(element) {
        if (element == null) return " ";
        return element.originChar;
    }
}