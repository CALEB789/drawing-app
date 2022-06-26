alert("First Change the Background COLOR. If you are going to use one")
  var x, y, currentX, currentY
  const cnv = document.getElementById("cnv")
  var brush = document.getElementById("brush")
  let eraser = document.getElementById("eraser")
  let clrs = document.querySelectorAll(".clr")
  let colors = document.getElementById("color")
  var erase = document.getElementById("erase")
  let bgcolor = document.getElementById("cnvcolor")
//var body = document.getElementsByTagName("")
  let pen = document.getElementById("pen")
  let erase_b = false
  let draw = false;
  var ctx = cnv.getContext('2d')
  cnv.height = window.innerHeight
  cnv.width = window.innerWidth
  var prevX = null;
  var prevY = null;
  var size_c = 10
  bgcolor.addEventListener("change", function(e) {
    ctx.fillStyle = bgcolor.value
    ctx.fillRect(0,0,cnv.width,cnv.height)
    cnv.style.backgroundColor = bgcolor.value
  })
  brush.addEventListener("click", (e) => {
    draw = true
    ctx.globalCompositeOperation = "source-over"
  })
  erase.onclick = () => {
    draw = false
    erase_b = true
    ctx.globalCompositeOperation = "destination-out"

    erase.addEventListener("click", () => {
      erase.removeEventListener("click", function(e) {

        console.log(erase_b)
        ctx.globalCompositeaOperation = "source-over"
      })
    })
    console.log(erase_b)
  }



  colors.addEventListener("change", () => {
    // ctx.fillStyle = colors.value
    ctx.strokeStyle = colors.value
  })
  class Brush {
    draw() {
      cnv.addEventListener("touchstart", function(e) {
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      })
      cnv.addEventListener("touchmove", function(e) {

        if (prevX == null || prevY == null) {
          prevX = e.touches[0].clientX
          prevY = e.touches[0].clientY
          return
        }

        if (draw) {
          currentX = e.touches[0].clientX
          currentY = e.touches[0].clientY
          ctx.beginPath()
          ctx.lineWidth = pen.value
          ctx.fillStyle = "black"
          ctx.lineCap = "round"
          ctx.moveTo(prevX, prevY)
          ctx.lineTo(currentX, currentY)
          ctx.fill()
          ctx.stroke()
        }
        if (!draw) return
        prevX = currentX
        prevY = currentY

      })
    }

  }
  var dar = new Brush()
  dar.draw()
  cnv.addEventListener("touchstart", function(e) {
    draw = true
  })
  cnv.addEventListener("touchmove", function(e) {
    draw = true
  })
  cnv.addEventListener("touchend", function(e) {
    draw = false
  })

  var a = document.getElementById("test")
  var down = document.getElementById("down")
  download_img = function(el) {
    var imageURI = cnv.toDataURL("image/png");
    el.href = imageURI;
  }
