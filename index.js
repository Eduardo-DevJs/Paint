const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = [...document.querySelectorAll(".button__tool")];
const sizeButtons = [...document.querySelectorAll(".button__size")];
const buttonClear = document.querySelector(".button__clear");

let brushSize = 20;
let isPainting = false;
let activeTool = "brush";

inputColor.addEventListener("change", ({ target }) => {
  ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
  isPainting = true;
  if (activeTool === "brush") {
    draw(clientX, clientY);
  }
  if (activeTool === "rubber") {
    erase(clientX, clientY);
  }
});

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isPainting) {
    draw(clientX, clientY);
  }

  if (activeTool === "rubber") {
    erase(clientX, clientY);
  }
});

canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
  isPainting = false;
});

const draw = (x, y) => {
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

const erase = (x, y) => {
  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();
  ctx.arc(
    x - canvas.offsetLeft,
    y - canvas.offsetTop,
    brushSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};

const selectTool = ({ target }) => {
  const selectTool = target.closest("button");
  const action = selectTool.getAttribute("data-action");

  if (action) {
    tools.forEach((tool) => tool.classList.remove("active"));

    activeTool = action;
    selectTool.classList.add("active");
  }
};

const selectSize = ({ target }) => {
  const selectTool = target.closest("button");
  const size = selectTool.getAttribute("data-size");

  if (size) {
    sizeButtons.forEach((tool) => tool.classList.remove("active"));

    activeTool = size;
    selectTool.classList.add("active");
    brushSize = size;
  }
};

tools.forEach((tool) => {
  tool.addEventListener("click", selectTool);
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", selectSize);
});

buttonClear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
