
const cancelbtn=document.querySelector('.cancel')
const hamburgerbtn=document.querySelector('.hambuger')
const menu=document.querySelector('.menu')
const main=document.querySelector('main')
const header=document.querySelector('header')
const supercarousel=document.querySelector('.supercarousel')
const alldiv=document.querySelectorAll('div')
const allh1=document.querySelectorAll('h1')
const allh2=document.querySelectorAll('h2')
const allmain=document.querySelectorAll('main')
const allfooter=document.querySelectorAll('footer')
const allspan=document.querySelectorAll('span')
const allbutton=document.querySelectorAll('button')
const allp=document.querySelectorAll('p')
const allElement=[...allp,...alldiv,...allh1,...allh2,...allmain,...allspan,...allfooter,...allbutton]
const footer=document.querySelector('footer')

if(footer.getBoundingClientRect().bottom<2){
footer.classList.add('fixedbottom')
}
  
const observer=new IntersectionObserver((elements)=>{
  elements.forEach(element=>{

  element.target.classList.toggle('hide',!element.isIntersecting)
  })
})
allElement.forEach(element=>{
  
  observer.observe(element)
})






cancelbtn.addEventListener('click',()=>{
 if (menu.classList.contains('active')) return
  menu.classList.add('active')
    menu.classList.remove('now')
})  
hamburgerbtn.addEventListener('click',()=>{
  menu.classList.remove('active')
    menu.classList.add('now')
})  

document.addEventListener('scroll',()=>{
  client=main.getBoundingClientRect()
  
  header.classList.toggle('fixed',client.top<=-1) 

})

/*carousel   */

