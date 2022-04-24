const express = require("express")
const app = express()
const path = require("path")
const Tesseract = require("tesseract.js")
const cluster=require('cluster')
const formidable=require('formidable')
app.use(require('cors')())
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

const worker = Tesseract.createWorker({
  logger: (e) => console.log(e),
})

worker.load().then(() => {
  worker.loadLanguage("eng").then(() => {
    worker.initialize("eng").then(() => {
      var data
      scheduler.addWorker(worker)
            app.post("*",(req,res,next)=>{
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({text:'serious error occured',confidence:'102'});
      return;
    }
    req.file=files.file
   
        console.log(req.file)

        scheduler
          .addJob("recognize", req.file)
          .then((value) => {
            // worker.terminate()
            data = value
            res.json({
              text: value.data.text,
              confidence: value.data.confidence,
            })
          })
      })
})
      spwarn()
      
      if (process.env.PORT){
        //* i wont be using this now because it cost is really high to host , but it's very useful to speed up conversation
// if(cluster.isMaster){
  
// // require('os').cpus().forEach(function(){
// //   startworker()
  
// // })
//}else{
      app.listen(process.env.PORT, () => {
        console.log(`your app is up and running on port = ${process.env.PORT} pid=${process.pid}`)
      
      })

//}
}else{
              app.listen(8080, () => {
        console.log(`your app is up and running on port  8080`)
      
      })


}
    })
  })
})
      app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'404.html'))
})
module.exports=app
