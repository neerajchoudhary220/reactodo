export default function firstCap(txt) {
    let text = txt.trim()
    return text.toLowerCase().charAt(0).toUpperCase() +
        text.toLowerCase().slice(1);

}
