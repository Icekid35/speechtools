const express = require("express")
const app = express()
const path = require("path")
const Tesseract = require("tesseract.js")
const fs=require('fs')
const multer=require('multer')
const upload=multer({dest:'upload/'})
app.use(require('cors')())
app.use(express.json())






app.use(express.static(path.join(__dirname)))


var totalworkers = 0

const scheduler = Tesseract.createScheduler()

function spwarn() {
    if(totalworkers==3) return
  var worker1 = Tesseract.createWorker({
      logger: (e) => console.log(e),

  })

  worker1.load().then(() => {
    worker1.loadLanguage("eng").then(() => {
      worker1.initialize("eng").then(() => {
  totalworkers += 1
  console.log("total workers available is now " + totalworkers)

        scheduler.addWorker(worker1)
        //spwarn()
      })
    })
  })
}

spwarn()
      var data
    
            app.post("*",upload.single('file'),(req,res)=>{
              
        console.log(req.file)
if(!req.file) return res.json({'text':'no file detected pls upload a file','confidence':'100%'})
        scheduler
          .addJob("recognize", req.file.path)
          .then((value) => {
            // worker.terminate()
            data = value
            res.json({
              text: value.data.text,
              confidence: value.data.confidence,
            })
            fs.unlink(path.join(__dirname,req.file.path),(err)=>{
              console.log(err)
            })
          })
      //})
     
})
      //spwarn()
      
      if (process.env.PORT){
      app.listen(process.env.PORT, () => {
        console.log(`your app is up and running on port = ${process.env.PORT} pid=${process.pid}`)
      
      })


}else{
              app.listen(8080, () => {
        console.log(`your app is up and running on port  8080`)
      
      })


}

      app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'404.html'))
})
module.exports=app
