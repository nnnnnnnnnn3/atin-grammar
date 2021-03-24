import React, { } from 'react';
import './style.css';
let allowedWords = ['how', 'are', 'you']

const CustomTextField = () => {

    const getMenu = (e) => {
        let currentSelection = null
        let currentRange = null
        let currentNode = null
        let parentNode = null
        let way = null
        let suggestions = ['word1', 'word2', 'word3']
        let items = document.querySelectorAll("#test > span")
        let idLast = -1000

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            item.addEventListener("click", function (event) {
                if (idLast === event.target.id) {
                    return true;
                }
                currentSelection = window.getSelection()
                currentRange = currentSelection.getRangeAt(0)
                currentNode = currentRange.startContainer
                idLast = e.target.id

                deleteAllClassToDivs(event.target.id)
                let newBox = document.createElement("span")
                for (let a = 0; a < suggestions.length; a++) {
                    newBox.className = 'nuevo'
                    newBox.classList.add(e.target.id);
                    newBox.style.left = this.offsetLeft + 'px';
                    newBox.style.top = document.getElementById(idLast).offsetTop + 20 + 'px';

                    let newDiv = document.createElement("div");
                    newDiv.classList.add('divBorder');
                    newDiv.appendChild(document.createTextNode(suggestions[a]));
                    newDiv.addEventListener('click', function (event) {
                        way = { item: idLast, newValue: event.target.innerHTML }
                        deleteAllClassToDivs(event.target.id);
                      
                        document.getElementById(way.item).classList.remove("err");
                        document.getElementById(way.item).innerHTML = way.newValue
                    });
                    newBox.appendChild(newDiv);
                }
                item.appendChild(newBox);
            });
        }
    }

    const deleteAllClassToDivs = (idDivCurrent) => {
        let rootElements = document.querySelectorAll(".nuevo");
        let selected = document.querySelectorAll(".selected");

        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected');
        }
        for (let i = 0; i < rootElements.length; i++) {
            
                console.log('rootElements', rootElements)
                rootElements[i].remove()

        }
    }

    const getCaret = () => {
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
                if (event.which === 32) {
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
        setCaret(pos);
    }

    const handleClick = (e) => {
        if (e.nativeEvent.which === 1) {
            getMenu(e)
        }
    }

    return (<div id="test" onInput={emitChange}
        onClick={handleClick} contentEditable
        class="slot  conversation  word"
    ></div>)
}

export default CustomTextField
