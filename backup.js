const express = require("express")
const app = express()
const path = require("path")
const Tesseract = require("tesseract.js")
//const bodyparser=require("body-parser")
const multer = require("multer")

const upload = multer({
  dest: "uploads/img",
})

const cors = require("cors")

var imagesrc = path.join(__dirname, "dummy.jpg")

app.use(express.static(path.join(__dirname)))
app.use(cors())

var totalworkers = 0

const sheduler = Tesseract.createSheduler()

function spwarn() {
  var worker1 = Tesseract.createWorker({
    logger: (e) => console.log(e),
    langPath: "libs",
  })

  worker1.load().then(() => {
    worker1.loadLanguage("eng").then(() => {
      worker1.initialize("eng").then(() => {
        var data
        sheduler.addWorker(worker1)
      })
    })
  })
  totalworkers += 1
  console.log("total workers available is now " + totalworkers)
}
setInterval(() => {
  spwarn()
}, 1000)
const worker = Tesseract.createWorker({
  logger: (e) => console.log(e),
  langPath: "libs",
})

worker.load().then(() => {
  worker.loadLanguage("eng").then(() => {
    worker.initialize("eng").then(() => {
      var data
      sheduler.addWorker(worker)
      app.post("/", upload.single("file"), (req, res) => {
        console.log(req.file)

        sheduler
          .addJob("recognize", req.file.path || imagesrc)
          .then((value) => {
            // worker.terminate()
            data = value
            res.json({
              text: value.data.text,
              confidence: value.data.confidence,
            })
          })
      })
      app.post("*", (req, res) => {
        res.sendStatus(404)
      })

      app.listen(8080, () => {
        console.log("your app is up and running on port 8080")
      })
    })
  })
})
