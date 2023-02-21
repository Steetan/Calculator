const calcPrint = document.querySelector(".calculator__print");
const calcPrintMini = document.querySelector(".calculator__print-mini");
const calcBtn = document.querySelectorAll(".calculator__btn");
const action2 = document.querySelector(".action-2");
const action3 = document.querySelector(".action-3");
const block = document.querySelector(".eye__block");
const eyeImg = document.querySelector(".eye__img");
const img = document.querySelectorAll("img");
const calculator = document.querySelector(".calculator");
const loading = document.querySelector(".loading");
let print;
let num1 = "";
let num2 = "";
let num3 = ""
let action = "";
let numPrint

calcPrint.textContent = "";

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
        if (!ev.classList.contains("action-4") &&
            !ev.classList.contains("action-6")) {
            calcPrint.textContent += print;
            calcPrintMini.textContent += print;
        }
        if (ev.classList.contains("action")) {
            if (calcPrint.textContent.length > 1) {
                action = ev.textContent;
            }
        }
        if (calcPrint.textContent.length > 1 &&
            calcPrint.textContent.slice(-1) === action) {
                num1 = parseFloat(calcPrint.textContent
                    .substring(0, calcPrint.textContent.length - 1));
                    
            calcPrint.textContent = "";
        }

        calcPrint.textContent = calcPrint.textContent.replace("=", "")
        //action + - * /
        if (ev.classList.contains("action-2")) {
            num2 = parseFloat(calcPrint.textContent.replace("=", ""));
            if(action == "" && num2 == "") {
                num1 = calcPrint.textContent
                calcPrint.textContent = num1
            }
            switch (action) {
                case "+":
                    if(num1 != "" && num2 != "") {
                        calcPrint.textContent = num1 + num2;
                    }
                    if (calcPrint.textContent == "NaN" || num2 == "") {
                        calcPrint.textContent = num1 + num1
                    }
                    if (calcPrint.textContent == "NaN" || num1 == "") {
                        calcPrint.textContent = 0
                    }
                    break;
                case "-":
                    if(num1 != "" && num2 != "") {
                        calcPrint.textContent = num1 - num2;
                    }
                    if (calcPrint.textContent == "NaN" || num2 == "") {
                        calcPrint.textContent = num1 - num1
                    }
                    if (calcPrint.textContent == "NaN" || num1 == "") {
                        calcPrint.textContent = 0
                    }
                    break;
                case "*":
                    if(num1 != "" && num2 != "") {
                        calcPrint.textContent = num1 * num2;
                    }
                    if (calcPrint.textContent == "NaN" || (num2 == "")) {
                        calcPrint.textContent = num1 * num1
                    }
                    if (calcPrint.textContent == "NaN" || num1 == "" || num2 == 0) {
                        calcPrint.textContent = 0
                    }
                    break;
                case "/":
                    if(num1 != "" && num2 != "") {
                        calcPrint.textContent = num1 / num2;
                    }
                    if (calcPrint.textContent == "NaN" || num2 == "") {
                        calcPrint.textContent = num1 / num1
                    }
                    if (calcPrint.textContent == "NaN" || num1 == "") {
                        calcPrint.textContent = 0
                    }
                    if (num2 == 0) {
                        calcPrint.textContent = "The divisor cannot be zero";
                        num1 = ""
                        num2 = ""
                    }
                    break;
            }

        }

        //action C
        if (ev.classList.contains("action-3")) {
            calcPrint.textContent = "";
            calcPrintMini.textContent = "";
            num1 = "";
            num2 = "";
            result = "";
            action = ""
        }

        //NaN and Infinity
        if (ev.classList.contains("action-4")) {
            if (calcPrint.textContent == "NaN" ||
                calcPrint.textContent == "Infinity" ||
                calcPrint.textContent == "The divisor cannot be zero") {
                calcPrint.textContent = "";
            }
            if (calcPrint.textContent != "") {
                calcPrintMini.textContent = "";
            }
            calcPrint.textContent = calcPrint.textContent.slice(0, -1);
        }

        // action sqrt
        if (ev.classList.contains("action-5")) {
            num3 = parseFloat(calcPrint.textContent
                    .replace(`${ev.textContent}`, ""));

            calcPrint.textContent = Math.sqrt(num3);

            numPrint = ""
            numPrint = calcPrintMini.textContent.replace(`${num3}`, `√(${num3})`)
            if (numPrint.split("√").length - 1) {
                numPrint = numPrint.slice(0, -2);
            }
            if (numPrint == `√(${num3})^2`) {
                calcPrintMini.textContent = numPrint
            } 
            else if (numPrint !== `√(${num3})`) {
                calcPrintMini.textContent = numPrint.replace(numPrint, `√(${num3})`)
            }
            calcPrintMini.textContent = calcPrintMini.textContent.replace("(NaN)", "(0)")
            printNaN();
        }

        // action +/-
        if (ev.classList.contains("action-6")) {
            if (calcPrint.textContent[0] !== "-") {
                calcPrint.textContent = "-" + calcPrint.textContent;
                if (num1 == "") {
                    calcPrintMini.textContent = "-" + calcPrintMini.textContent;
                } else if (num1 != "") {
                    numPrint = calcPrint.textContent.replace("-", "")
                    calcPrintMini.textContent = calcPrintMini.textContent
                        .replace(numPrint, `-${numPrint}`)
                }
            } 
            else if (calcPrint.textContent[0] === "-") {
                calcPrint.textContent = calcPrint.textContent.slice(1);
                if (num1 == "") {
                    calcPrintMini.textContent = calcPrintMini.textContent.slice(1);
                } else if (num1 != "") {
                    numPrint = calcPrint.textContent.replace("-", "")
                    calcPrintMini.textContent = calcPrintMini.textContent
                        .replace(`-${numPrint}`, numPrint)
                }
            }
        }

        //action x^2
        if (ev.classList.contains("action-7")) {
            num3 = parseFloat(calcPrint.textContent
                    .replace(`${ev.textContent}`, ""));

            calcPrint.textContent = num3 * num3

            numPrint = ""
            numPrint = calcPrintMini.textContent.replace(`${num3}`, `(${num3})^2`)
            if (numPrint.split("x2").length - 1) {
                numPrint = numPrint.slice(0, -2);
            }
            if (numPrint == `(${num3})^2`) {
                calcPrintMini.textContent = numPrint
            } 
            else if (numPrint !== `(${num3})^2`) {
                calcPrintMini.textContent = numPrint.replace(numPrint, `(${num3})^2`)
            }
            calcPrintMini.textContent = calcPrintMini.textContent.replace("NaN", "0")
            printNaN(); 
        }

        // action 1/x
        if (ev.classList.contains("action-8")) {
            num3 = parseFloat(calcPrint.textContent
                .replace(`${ev.textContent}`, ""));

            calcPrint.textContent = 1 / num3
            if (calcPrint.textContent == "Infinity" ||
                calcPrint.textContent == "0") {
                calcPrint.textContent = "The divisor cannot be zero";
            }

            numPrint = ""
            numPrint = calcPrintMini.textContent.replace(`${num3}`, `1/(${num3})`)
            if (numPrint.split("1/x").length - 1) {
                numPrint = numPrint.slice(0, -2);
            }
            if (numPrint == `1/(${num3})`) {
                calcPrintMini.textContent = numPrint
            } 
            else if (numPrint !== `1/(${num3})`) {
                calcPrintMini.textContent = numPrint.replace(numPrint, `1/(${num3})`)
            }   

            calcPrintMini.textContent = calcPrintMini.textContent.replace("NaN", "0")
            printNaN();
        }

        // action %
        if (ev.classList.contains("action-9")) {
            num2 = parseFloat(calcPrint.textContent
                .replace(`${ev.textContent}`, ""));

            calcPrint.textContent = numPrint = (num2 * num1) / 100;
            if (calcPrint.textContent === "NaN") {
                calcPrint.textContent = num1 / 100;
            }

                calcPrintMini.textContent = calcPrintMini.textContent
                    .replace(`${action}${num2}`, `${action}${numPrint}`)

            if (calcPrintMini.textContent.split("%").length - 1) {
                calcPrintMini.textContent = calcPrintMini.textContent.slice(0, -1);
            }
            printNaN();
        }

        // action CE
        if (ev.classList.contains("action-10")) {
            calcPrint.textContent = "";
            calcPrintMini.textContent = "";
        }

        // point limit
        if (calcPrint.textContent.split(".").length - 1 > 1) {
            calcPrint.textContent = calcPrint.textContent.slice(0, -1);
            calcPrintMini.textContent = calcPrintMini.textContent.slice(0, -1);
        }
        if (calcPrintMini.textContent.split("=").length - 1 > 0 ||
            calcPrintMini.textContent.split("*").length - 1 > 1 ||
            calcPrintMini.textContent.split("/").length - 1 > 1) {
            calcPrintMini.textContent = calcPrintMini.textContent.slice(0, -1);
        }

        function printNaN() {
            if (calcPrint.textContent === "NaN") {
                calcPrint.textContent = 0;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function (ev) {
    loading.classList.add("active");

    setTimeout(() => {
        loading.classList.add("active2");
        eyeImg.classList.remove("eye--off");
    }, 200);
    setTimeout(() => {
        loading.outerHTML = "";
    }, 500);
    setTimeout(() => {
        calculator.classList.add("blick");
    }, 300);
});

setInterval(() => {
    randomNum = Math.floor(Math.random() * (window.innerWidth - 100));
    randomNum2 = Math.floor(Math.random() * (window.innerHeight - 100));
    
    block.style.cssText = `
        top: ${randomNum2}px;
        left: ${randomNum}px;
    `;
}, 7000);