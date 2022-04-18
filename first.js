window.convert=(e)=>{
  
let  file=e.target.files[0]
  console.log(file)
  textholder=document.querySelector('.text')
  imagesrc=URL.createObjectURL(file)
  var worker=Tesseract.createWorker({
      logger:e=>{textholder.innerHTML= `<span class='blue' >status </span>:<span class='green'>${e.status}</span><br /><span class='blue' >progress </span>:<span class='green'>${e.progress}</span>
   ` }}
    )
    console.log(worker)
    
    (async ()=>{
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const value= await worker.recognize(file)
    // console.log(value)
      textholder.innerHTML=`<h2 class='blue' >confidence</h2>:<span class='green'>${value.data.confidence}💪</span>
      <br />
      <br />
      <h2 class='blue' >text </h2>:<span class='green'>${value.data.text}</span>
      <br />
      <br />
      <h2 class='blue' >hocr</h2>:<span class='green'>${value.data.hocr}</span>
      `
    await worker.terminate()
  render()
    })()
}
