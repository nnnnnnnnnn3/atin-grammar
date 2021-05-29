import React from 'react'
import './style.css'

let way = null
const CustomTextField = ({ suggestions, allowedWords, styleBorder, styleCell, cells }) => {

    const dinamic = (e, currentSelection, currentRange) => {
        const currentId = e.target.id
        let elements = document.querySelectorAll("#test > span")

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            element.addEventListener("click", function (event) {
                deleteAllClassToDivs()
                currentSelection = window.getSelection()
                currentRange = currentSelection.getRangeAt(0)

                let newBox = document.createElement("span")
                for (let a = 0; a < suggestions.length; a++) {
                    newBox.className = 'nuevo'
                    newBox.style.left = this.offsetLeft + 'px' //if is neccesary
                    newBox.style.top = document.getElementById(currentId).offsetTop + 15 + 'px';
                    let newDiv = document.createElement("div")
                    newDiv.classList.add('divBorder')
                    newDiv.appendChild(document.createTextNode(suggestions[a]))
                    newDiv.addEventListener('click', function (event) {
                        way.newValue = event.target.innerHTML
                        document.querySelectorAll(".nuevo")[0].classList.add('hidden')
                        document.getElementById(way.item).classList.remove("err")
                        document.getElementById(way.item).innerHTML = way.newValue
                    })
                    newBox.appendChild(newDiv)
                }
                element.appendChild(newBox)
            });
        }
    }

    const deleteAllClassToDivs = () => {
        let rootElements = document.querySelectorAll(".nuevo")
        let selected = document.querySelectorAll(".selected")

        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected')
        }
        for (let i = 0; i < rootElements.length; i++) {
            rootElements[i].classList.add('hidden')
            rootElements[i].remove()
        }
    }

    const getCaret = () => {
        deleteAllClassToDivs()
        const test = document.getElementById('test')
        if (window.getSelection) {
            let range = window.getSelection().getRangeAt(0);
            let preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(test);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            return preCaretRange.toString().length;
        }
    }

    const setCaret = (offset) => {
        const test = document.getElementById('test')
        let nodeSpans = test.getElementsByTagName('span');
        let temp = 0;
        for (let i = 0; i < nodeSpans.length; i++) {
            let len = (nodeSpans[i].innerText || nodeSpans[i].textContent).length;
            if (temp + len >= offset) {
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(nodeSpans[i].childNodes[0], offset - temp);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                break;
            }
            else {
                temp += len;
            }
        }
    }

    const becameSpans = (event) => {
        const test = document.getElementById('test')
        let text = test.innerText || test.textContent;

        let wordsWithSpan = text.split(/\s/ugmi).map(function (c) {
            if (c.length > 0) {
                if (event.nativeEvent.data === " ") {
                    return allowedWords.indexOf(c) === -1 ? `<span class="word err">${c}</span>` : `<span class="word">${c}</span>`
                }
                return `<span class="word">${c}</span>`
            } else return c;
        }).join('<span>&nbsp;</span>')
        test.innerHTML = wordsWithSpan;
    }

    const addIdentifiers = () => {
        const test = document.getElementById('test')
        let nodeSpans = test.getElementsByClassName('word');
        for (let i = 0; i < nodeSpans.length; i++) {
            nodeSpans[i].id = "word" + i
        }
    }

    const emitChange = (e) => {
        const pos = getCaret();
        becameSpans(e);
        addIdentifiers()
        setCaret(pos)
        if (e.nativeEvent.data === " ") {
            let currentSelection = null
            let currentRange = null
            dinamic(e, currentSelection, currentRange)
        }
    }

    const handleClick = (e) => {
        if (e.target && e.target.firstElementChild && e.target.firstElementChild.id === 'word0') {
            deleteAllClassToDivs()
        }
        if (e.nativeEvent.which === 1) {
            way = { item: e.target.id }
            let currentSelection = null
            let currentRange = null
            dinamic(e, currentSelection, currentRange)
        }
    }

    return (<div id="test" onInput={emitChange}
        onClick={handleClick} contentEditable
        className="slot  conversation  word"
    ></div>)
}

export default CustomTextField
