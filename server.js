const express = require("express")
const app = express()
const path = require("path")
const Tesseract = require("tesseract.js")
const multer = require("multer")
const cluster=require('cluster')


function startworker(){
  var worker=cluster.fork()
  console.log('cluster: worker %d started')
}


cluster.on('disconnect',(worker)=>{
  console.log('cluster %d disconnected')
  
})
cluster.on('exit', (worker,code,signal)=>{
  console.log('cluster exit restarting worker')
  startworker()
})



const upload = multer({
  dest: "uploads/img",
})


var imagesrc = path.join(__dirname, "dummy.jpg")

app.use(express.static(path.join(__dirname)))


var totalworkers = 0
//console.log(Tesseract)

const scheduler = Tesseract.createScheduler()

function spwarn() {
    if(totalworkers==3) return
  var worker1 = Tesseract.createWorker({
    
    //langPath: "libs",
  })

  worker1.load().then(() => {
    worker1.loadLanguage("eng").then(() => {
      worker1.initialize("eng").then(() => {
  totalworkers += 1
  console.log("total workers available is now " + totalworkers)

        scheduler.addWorker(worker1)
        spwarn()
      })
    })
  })
}

const worker = Tesseract.createWorker({
  logger: (e) => console.log(e),
  langPath: "libs",
})

worker.load().then(() => {
  worker.loadLanguage("eng").then(() => {
    worker.initialize("eng").then(() => {
      var data
      scheduler.addWorker(worker)
      
      spwarn()
      app.get('*',(req,res)=>{
          res.sendFile(path.join(__dirname,'index.html'))
      })
      
      app.post("/", upload.single("file"), (req, res) => {
        console.log(req.file)

        scheduler
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
      if (process.env.PORT){
if(cluster.isMaster){
  
require('os').cpus().forEach(function(){
  startworker()
  
})
}else{

      app.listen(process.env.PORT, () => {
        console.log(`your app is up and running on port  ${process.env.PORT} ${process.pid}`)
      
      })
}
}else{
              app.listen(8080, () => {
        console.log(`your app is up and running on port  8080`)
      
      })


}
    })
  })
})
