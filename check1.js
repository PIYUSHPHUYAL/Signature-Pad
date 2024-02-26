document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("signatureCanvas");
  var context = canvas.getContext("2d");
  var isDrawing = false;
  var fontSizeSelect = document.getElementById("fontSizeSelect");
  var backgroundColorSelect = document.getElementById("backgroundcolorselect");
  var lineColorSelect = document.getElementById("textcolorselect");


  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  // Add these lines to handle touch events
  canvas.addEventListener("touchstart", startDrawing, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearCanvas);

  var saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveSignature);

  fontSizeSelect.addEventListener("change", updateFontSize);
  backgroundColorSelect.addEventListener("change", updateBackgroundColor);

  function startDrawing(event) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    isDrawing = true;
    context.beginPath();
    context.lineWidth = fontSizeSelect.value; // Set line width before drawing begins
    context.strokeStyle = lineColorSelect.value; // Set line color before drawing begins
    var x = event.clientX || event.touches[0].clientX;
    var y = event.clientY || event.touches[0].clientY;
    context.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
  }

  function draw(event) {
    if (event.type === 'touchmove') {
      event.preventDefault();
    }
    if (isDrawing) {
      context.lineWidth = fontSizeSelect.value; // Set line width before drawing
      context.strokeStyle = lineColorSelect.value; // Set line color before drawing
      var x = event.clientX || event.touches[0].clientX;
      var y = event.clientY || event.touches[0].clientY;
      context.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
      context.stroke();
    }
  }
  

  function stopDrawing() {
    isDrawing = false;
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColorSelect.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  

function saveSignature() {
  var dataURL = canvas.toDataURL("image/png");
  var link = document.createElement('a');
  link.download = 'signature.png';
  link.href = dataURL;
  link.click();
}


  function updateFontSize() {
    try {
      var fontSize = fontSizeSelect.value + "px";
      context.font = fontSize + " Arial";
      console.log("Font size updated to: " + fontSize);
    } catch (error) {
      console.error("Error updating font size:", error);
    }
  }
  


  function updateBackgroundColor() {
    canvas.style.background = backgroundColorSelect.value;
  }
});

  function changeColor(el) {
    var frame = document.getElementById('signatureCanvas');
    frame.style.backgroundColor = el.value;
}

// function changeColor(el) {
//   var frame2 = document.getElementById('signatureCanvas');
//   frame2.style.backgroundColor = el.value;
// }