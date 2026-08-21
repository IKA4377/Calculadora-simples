const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    const value = buttons[i].dataset.value;
    if (value == "clear") {
      display.value = "";
      display.classList.remove("active");
      return;
    }

    if (value == "delete") {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (value == "=") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Erro";
      }

      setTimeout(function () {
        display.classList.remove("active");
      }, 2000);
      return;
    }

    if (display.value == "Erro") {
      display.value = "";
    }

    display.classList.add("active");

    const operators = ["+", "-", "*", "/"];

    if (display.value == "" && ["+", "*", "/"].includes(value)) {
      return;
    }

    if (operators.includes(value)) {
      const lastChar = display.value.slice(-1);
      const secondLastChar = display.value.slice(-2, -1);

      if (operators.includes(lastChar)) {
        if (
          value == "-" &&
          lastChar != "-" &&
          !operators.includes(secondLastChar)
        ) {
        } else {
          return;
        }
      }
    }

    if (value == ".") {
      const parts = display.value.split(/[+\-*/]/);
      const currentNumber = parts[parts.length - 1];

      if (currentNumber.includes(".")) {
        return;
      }
    }

    display.value += value;
  });
}
