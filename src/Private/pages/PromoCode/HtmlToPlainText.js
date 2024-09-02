function HtmlToPlainText(html) {
    var temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.innerText || temp.textContent;
}

export default HtmlToPlainText;
