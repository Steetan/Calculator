const calcPrint = document.querySelector(".calculator__print")
const calcBtn = document.querySelectorAll(".calculator__btn")
const action2 = document.querySelector(".action-2")
const action3 = document.querySelector(".action-3")
const action4 = document.querySelector(".action-4")
let num1
let num2
let action

calcBtn.forEach(function(ev) {
    ev.addEventListener("click", function() {
        if (!ev.classList.contains("action") 
            & !ev.classList.contains("action-2")
            & !ev.classList.contains("action-3")
            & !ev.classList.contains("action-4")) {
            calcPrint.textContent += ev.textContent
        }
        else if (ev.classList.contains("action")) {
            num1 = parseFloat(calcPrint.textContent.replace(`${action}`, ""))
            action = ev.textContent
            calcPrint.textContent = ""
        }
        if(ev.classList.contains("action-2")) {
            num2 = parseFloat(calcPrint.textContent.replace("=", ""))
            calcPrint.textContent = ""
            switch (action) {
                case '+':
                    calcPrint.textContent = num1 + num2;
                    break;
                case '-':
                    calcPrint.textContent = num1 - num2;
                    break;
                case '*':
                    calcPrint.textContent = (num1 * num2).toFixed(5);
                    break;
                case '/':
                    calcPrint.textContent = (num1 / num2).toFixed(5);
                    break;
                default:
                    calcPrint.textContent = 0;
                    break;
            }
        }
        if (ev.classList.contains("action-3")) {
            calcPrint.textContent = ""
        }
        if (ev.classList.contains("action-4")) {
            calcPrint.textContent = calcPrint.textContent.slice(0, -1)
        }
        // if (calcPrint.textContent.length > 14) {
        //     calcPrint.textContent = ""
        // }
    })
})

