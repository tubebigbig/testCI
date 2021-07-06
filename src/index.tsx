import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// function QWR<T>(A: T, B: T) {
//   return console.log(A, B);
// }

// QWR<String>("A", "B");


// class BeeKeeper {
//   hasMask: boolean = true;
// }

// class ZooKeeper {
//   nametag: string = "Mikle";
// }

// class Animal {
//   numLegs: number = 4;
// }

// class Bee extends Animal {
//   keeper: BeeKeeper = new BeeKeeper();
// }

// class Lion extends Animal {
//   keeper: ZooKeeper = new ZooKeeper();
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//   return new c();
// }

// console.log(createInstance(Lion).keeper.nametag)
// console.log(createInstance(Bee).keeper.hasMask)

enum NUMBER {
  ONE = 1,
  SECOND = 2
}

console.log(NUMBER.ONE)

localStorage.setItem('game', 'qwe')
// sessionStorage.setItem('qqq', 'www')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
