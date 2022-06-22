import { createMachine, interpret } from "xstate";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Palabras 'web' e 'ebay'</h1>
<div>

 <input type="file">

 <textarea>
 </textarea>

</div>
`;

// Edit your machine(s) here
const machine = createMachine({
  id: "machine",
  initial: "1",
  states: {
    1: {
      on: {
        w: "12",
        e: "15",
        "*": "1"
      }
    },
    12: {
      on: {
        w: "12",
        e: "135",
        "*": "1"
      }
    },
    15: {
      on: {
        e: "15",
        b: "16",
        "*": "1"
      }
    },
    135: {
      on: {
        e: "15",
        w: "12",
        b: "146",
        "*": "1"
      }
    },
    146: {
      on: {
        w: "12",
        e: "15",
        a: "17",
        "*": "1"
      }
    },
    17: {
      on: {
        w: "12",
        e: "15",
        y: "18",
        "*": "1"
      }
    },
    16: {
      on: {
        w: "12",
        e: "15",
        a: "17",
        "*": "1"
      }
    },
    18: {
      on: {
        w: "12",
        e: "15",
        "*": "1"
      }
    }
  }
});

let contador1 = 0;
let contador2 = 0;

// Edit your service(s) here
const service = interpret(machine).onTransition((state) => {
  console.log(state.value);
  if (state.value == 146) {
    contador1++;
  } else if (state.value == 18) {
    contador2++;
  }
});

service.start();

let input = document.querySelector("input");
let textarea = document.querySelector("textarea");

input.addEventListener("change", () => {
  let files = input.files;

  if (files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;
    const lines = file.split(/\r\n|\n/);
    textarea.value = lines.join("\n");

    let arrayentradas = [...file.toLowerCase()];

    for (let i = 0; i < arrayentradas.length; i++) {
      service.send(arrayentradas[i]);
    }
    console.log(contador1);
    console.log(contador2);

    document.write("<h2> La palabra WEB se encuentra: " + contador1 + "</h2>");

    document.write(
      "<h2> La palabra EBAY se encuentra: " + contador2 + " </h2>"
    );
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});
