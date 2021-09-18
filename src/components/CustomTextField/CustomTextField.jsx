import React from 'react'
import './style.css'

let way = null
const CustomTextField = ({ suggestions, allowedWords, styleBorder, styleCell, cells }) => {

    const dinamic2 = (e, currentSelection, currentRange) => {
        const currentId = e.target.id
        console.log('ID', currentId)
        let elements = document.querySelectorAll("#test > span")
        console.log('HHHHH', elements)
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            console.log('LLLL')
            element.addEventListener("click", function (event) {
                deleteAllClassToDivs()
                currentSelection = window.getSelection()
                currentRange = currentSelection.getRangeAt(0)
                console.log(111122223333)
                let newBox = document.createElement("span")
                for (let a = 0; a < suggestions.length; a++) {
                    newBox.className = 'nuevo'
                    newBox.style.left = this.offsetLeft + 'px' //if is neccesary
                    //newBox.style.left = element.offsetLeft + 'px' //if is neccesary

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
            })
        }
    }

    const dinamic = (e, currentSelection, currentRange) => {
        const currentId = e.target.id
        console.log('ID', currentId)
        let elements = document.querySelectorAll("#test > span")
        console.log('HHHHH', elements)
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            console.log('LLLL')
            //element.addEventListener("click", function (event) {
            deleteAllClassToDivs()
            currentSelection = window.getSelection()
            currentRange = currentSelection.getRangeAt(0)
            console.log(111122223333, currentId)
            let newBox = document.createElement("span")
            for (let a = 0; a < suggestions.length; a++) {
                newBox.className = 'nuevo'
                // newBox.style.left = this.offsetLeft + 'px' //if is neccesary
                newBox.style.left = document.getElementById(currentId).offsetLeft + 'px' //if is neccesary

                newBox.style.top = document.getElementById(currentId).offsetTop + 15 + 'px';
                let newDiv = document.createElement("div")
                newDiv.classList.add('divBorder')
                newDiv.appendChild(document.createTextNode(suggestions[a]))
                newDiv.addEventListener('click', function (event) {
                    way.newValue = event.target.innerHTML
                    document.querySelectorAll(".nuevo")[0].classList.add('hidden')
                    document.getElementById(way.item).classList.remove("err")
                    document.getElementById('word0').innerHTML = way.newValue
                    let s = document.getElementById("test")
                    s.innerHTML=s.innerText
                })
                newBox.appendChild(newDiv)
            }
            element.appendChild(newBox)
        //})
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
        
        if (e.nativeEvent.data === " ") {
            console.log("ESPACIO")
            let currentSelection = null
            let currentRange = null
           // dinamic2(e, currentSelection, currentRange)

           var elt = e.target;
           e.preventDefault();
            //elt.focus();
            let sel = document.getSelection();
            sel.modify("extend", "backward", "word");
            let range = sel.getRangeAt(0);
            console.log(range.toString().trim());
            let copy=range.toString().trim()
            range.deleteContents();
            var el = document.createElement("div");
            //el.innerHTML = " " +copy+" "
            el.innerHTML=" " +copy+" "
            if(copy==="estas"){
            el.innerHTML = ` <span class="word err">${" "+copy+" "}</span>`
            }
            var frag = document.createDocumentFragment(), node;
            while (node = el.firstChild) {
                frag.appendChild(node);
            }
            console.log('FRAG', frag)
            range.insertNode(frag);
            range.collapse();
        }

        const pos = getCaret();
        // becameSpans(e);
        addIdentifiers()
        setCaret(pos)
    }


    function play() {
        
        const test = document.getElementById('test');
        const text = test.innerText || test.textContent;
        
        if (!text) return false;

        const select = window.getSelection().getRangeAt(0);
        const index = select.startOffset;

        const focusNode = select.startContainer;
        console.log('TEXT', select, index,focusNode)
        if (focusNode.parentNode.nodeName == "SPAN") return false;
        const nodes = focusNode.parentNode.childNodes;
        console.log("PLAY", nodes)
        let result = '';

        nodes.forEach(node => {
            const nodeText = node.innerText || node.textContent;

            if (node == focusNode) {
                const words = nodeText
                    .split(' ')
                    .reduce((accu, cur, idx, arr) => {
                        const len = cur.length;
                        accu['pre'] += idx ? arr[idx - 1].length : 0;
                        const preLen = accu['pre'];

                        accu['arr'].push([
                            preLen + idx,
                            len + preLen + idx
                        ]);
                        return accu;
                    }, { 'pre': 0, 'arr': [] });
                    
                const word = words['arr'].find(e => index >= e[0] && index <= e[1]);
                
                result += `${nodeText.slice(0, word[0])}<span class="word">${nodeText.slice(word[0], word[1])}</span>${nodeText.slice(word[1])}`;
            }
            else {
                result += nodeText;
            }
        });
        
        test.innerHTML = result;
    }

    const handleClick = async (e) => {

        if (e.target &&
            e.target.firstElementChild &&
            e.target.firstElementChild.id === 'word0') {
            deleteAllClassToDivs()
        }
        if (e.nativeEvent.which === 1) {
            
            const pos = getCaret();
            console.log(5555, pos)
        setCaret(pos)

        }
    }

    return (<div id="test" onInput={emitChange}
        onClick={handleClick} 
        onContextMenu={async(e) => {
            console.log(e);
            e.preventDefault(); 
            e.stopPropagation(); 
            await play()
            addIdentifiers()
            way = { item: e.target.id }
            let elements = document.querySelectorAll("#test > span")
            console.log('eeee', elements)

            dinamic(e, null, null)
        }}
        contentEditable
        className="slot  conversation  word"
    ></div>)
}

export default CustomTextField
