const calcPrint = document.querySelector(".calculator__print");
const calcBtn = document.querySelectorAll(".calculator__btn");
const action2 = document.querySelector(".action-2");
const action3 = document.querySelector(".action-3");
const block = document.querySelector(".eye__block");
const img = document.querySelectorAll("img");
const calculator = document.querySelector(".calculator")
const loading = document.querySelector(".loading")
let print;
let num1 = "";
let num2 = "";
let action;

calcPrint.textContent = ""

img.forEach(function (event) {
    event.addEventListener("dragstart", function (e) {
        e.preventDefault();
    });
});

randomNum = Math.floor(Math.random() * (window.innerWidth - 100));
randomNum2 = Math.floor(Math.random() * (window.innerHeight - 100));

block.style.cssText = `
    top: ${randomNum2}px;
    left: ${randomNum}px;
`;

calcBtn.forEach(function (ev) {
    ev.addEventListener("click", function () {
        print = ev.textContent;
        if (
            !ev.classList.contains("action-4") &&
            !ev.classList.contains("action-6")
        ) {
            calcPrint.textContent += print;
        }
        if (ev.classList.contains("action")) {
            if (calcPrint.textContent.length > 1) {
                action = ev.textContent;
            }
        }
        if (
            calcPrint.textContent.length > 1 &&
            calcPrint.textContent.slice(-1) === action
        ) {
            num1 = parseFloat(
                calcPrint.textContent.substring(
                    0,
                    calcPrint.textContent.length - 1
                )
            );
            calcPrint.textContent = "";
        }

        //action + - * /
        if (ev.classList.contains("action-2")) {
            num2 = parseFloat(calcPrint.textContent.replace("=", ""));
            calcPrint.textContent = "";
            switch (action) {
                case "+":
                    calcPrint.textContent = num1 + num2;
                    break;
                case "-":
                    calcPrint.textContent = num1 - num2;
                    break;
                case "*":
                    calcPrint.textContent = num1 * num2;
                    break;
                case "/":
                    calcPrint.textContent = num1 / num2;
                    if (num2 == "") {
                        calcPrint.textContent = "Error!";
                    }
                    break;
                default:
                    calcPrint.textContent = 0;
                    break;
            }

            //if calcPrint = NaN
            if (num2 == "" || calcPrint.textContent == "NaN") {
                calcPrint.textContent = num1
            }
            if (num1 == "" || calcPrint.textContent == "NaN") {
                calcPrint.textContent = num2
            }
            
        }

        //action C
        if (ev.classList.contains("action-3")) {
            calcPrint.textContent = "";
            num1 = "";
            num2 = "";
        }

        //NaN and Infinity
        if (ev.classList.contains("action-4")) {
            if (
                calcPrint.textContent == "NaN" ||
                calcPrint.textContent == "Infinity"
            ) {
                calcPrint.textContent = "";
            }
            calcPrint.textContent = calcPrint.textContent.slice(0, -1);
        }

        // action sqrt
        if (ev.classList.contains("action-5")) {
            actionNum(Math.sqrt(num1));
            num2 = parseFloat(
                calcPrint.textContent.replace(`${ev.textContent}`, "")
            );
            calcPrint.textContent = Math.sqrt(num2);
        }

        // action +/-
        if (ev.classList.contains("action-6")) {
            if (calcPrint.textContent[0] !== "-") {
                calcPrint.textContent = "-" + calcPrint.textContent;
            } else if (calcPrint.textContent[0] === "-") {
                calcPrint.textContent = calcPrint.textContent.slice(1);
            }
        }

        //action x^2
        if (ev.classList.contains("action-7")) {
            actionNum(num1 * num1);
            num2 = parseFloat(
                calcPrint.textContent.replace(`${ev.textContent}`, "")
            );
            calcPrint.textContent = num2 * num2;
        }

        // action 1/x
        if (ev.classList.contains("action-8")) {
            actionNum(1 / num1);
            num2 = parseFloat(
                calcPrint.textContent.replace(`${ev.textContent}`, "")
            );
            calcPrint.textContent = 1 / num2;
        }

        // action %
        if (ev.classList.contains("action-9")) {
            num2 = parseFloat(
                calcPrint.textContent.replace(`${ev.textContent}`, "")
            );
            calcPrint.textContent = (100 * num2) / num1;
        }

        // action CE
        if (ev.classList.contains("action-10")) {
            calcPrint.textContent = "";
        }

        // point limit
        if (calcPrint.textContent.split(".").length - 1 > 1) {
            calcPrint.textContent = calcPrint.textContent.slice(0, -1);
        }

        function actionNum(num) {
            if (num1 !== "" && num2 == "") {
                num1 = parseFloat(
                    calcPrint.textContent.replace(`${ev.textContent}`, "")
                );
                calcPrint.textContent = num;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function(ev) {
    loading.classList.add("active")
    setTimeout(() => {
        loading.style.display = "none"
    }, 500);
    setTimeout(() => {
        calculator.classList.add("blick")
    }, 300);
})

setInterval(() => {
    randomNum = Math.floor(Math.random() * (window.innerWidth - 100));
    randomNum2 = Math.floor(Math.random() * (window.innerHeight - 100));
    block.style.cssText = `
        top: ${randomNum2}px;
        left: ${randomNum}px;
    `;
}, 7000);