function init() { 
    const catWrapper = document.querySelector('.cat_wrapper')
    const wrapper = document.querySelector('.wrapper')
    const cat = document.querySelector('.cat')
    const head = document.querySelector('.cat_head')
    const legs = document.querySelectorAll('.leg')
    const pos = {
      x: null,
      y: null
    }
  
    const walk = () =>{
      cat.classList.remove('first_pose')
      legs.forEach(leg=>leg.classList.add('walk'))
    }
  
    const handleMouseMotion = e =>{
      pos.x = e.clientX
      pos.y = e.clientY
      walk()
    }
  
    const handleTouchMotion = e =>{
      if (!e.targetTouches) return
      pos.x = e.targetTouches[0].offsetX
      pos.y = e.targetTouches[0].offsetY
      walk()
    }
  
    const turnRight = () =>{
      cat.style.left = `${pos.x - 90}px`
      cat.classList.remove('face_left')
      cat.classList.add('face_right')
    }
  
    const turnLeft = () =>{
      cat.style.left = `${pos.x + 10}px`
      cat.classList.remove('face_right')
      cat.classList.add('face_left')
    }
  
    const decideTurnDirection = () =>{
      cat.getBoundingClientRect().x < pos.x ?
        turnRight()
        :
        turnLeft()
    }
  
    const headMotion = () =>{
      pos.y > (wrapper.clientHeight - 100) ?
        head.style.top = '-15px'
        :
        head.style.top = '-30px'
    }
  
    const jump = () =>{
      catWrapper.classList.remove('jump')
      if (pos.y < (wrapper.clientHeight - 250)) {
        setTimeout(()=>{
          catWrapper.classList.add('jump')
        },100)
      } 
    }
  
    const decideStop = ()=>{
      if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
          cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
        legs.forEach(leg=>leg.classList.remove('walk'))    
      }
    }
    
    setInterval(()=>{
      if (!pos.x || !pos.y) return
      decideTurnDirection()
      headMotion()
      decideStop()
    },100)
  
    setInterval(()=>{
      if (!pos.x || !pos.y) return
      jump()
    },1000)
  
    document.addEventListener('mousemove', handleMouseMotion)
    document.addEventListener('mousemove', handleTouchMotion)
  }
  
  window.addEventListener('DOMContentLoaded', init)

  const arrowBtns = document.querySelectorAll('.arrow-btn')
const cardBtns = document.querySelectorAll('.card')
let currentCard = 2;
let dir = 1;
moveCards()

arrowBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 3px 4px #00000050'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 6px 8px #00000030'
  })
  
  btn.onclick = (e)=> {
    dir = (i==0)? 1:-1
    if (i==0) {
      currentCard--
      currentCard = Math.max(0, currentCard)
    }
    else {
      currentCard++
      currentCard = Math.min(4, currentCard)
    }
    moveCards(0.75)
  }
})

cardBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 6px 11px #00000030'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 0px 0px #00000030'
  })

  btn.onclick = (e)=> {
    dir = (i<currentCard)? 1:-1
    currentCard = i
    moveCards(0.75)
  }
})
