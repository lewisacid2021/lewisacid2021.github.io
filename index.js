document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
  
    // Function to set canvas dimensions
    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      // Redraw the background image when the canvas dimensions change
      drawBackground();
    }
  
    // Function to draw the background image
    function drawBackground() {
      const backgroundImage = new Image();
      backgroundImage.src = "assets/images/background.png"; // Replace with the actual path to your image
  
      backgroundImage.onload = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      };
    }
  
    // Set initial canvas dimensions
    setCanvasDimensions();
  
    // Redraw the background when the window is resized
    window.addEventListener("resize", setCanvasDimensions);
  });
  