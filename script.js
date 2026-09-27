let count = 0;

const btn = document.getElementById("btn");
const counter = document.getElementById("counter");
const greeting = document.getElementById("greeting");

btn.addEventListener("click", () => {
  count++;
  counter.textContent = `Klicks: ${count}`;

  if (count === 5) {
    greeting.textContent = "Du bist hartnäckig! 🎉";
  }
});
