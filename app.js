function init(){
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [
    `radial-Gradient(#2b3760, #0b1023)`,
    `radial-Gradient(#4e3022, #161616)`,
    `radial-Gradient(#4e4342, #161616)`];

    //tracker
    let current = 0;
    let scrollSlide = 0; //for the scroll throttle

    slides.forEach((slide,index) => {
        slide.addEventListener("click",function(){
            changeDots(this);
            nextSlide(index);
            scrollSlide=index;
        });
    });
    function changeDots(dot){
        slides.forEach(slide =>{
            slide.classList.remove('active');
        });
        dot.classList.add('active');
        
    }
    function nextSlide(pageNumber){  //index is parameter/pageNumber here
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelectorAll(".hero .model-left");
        const nextRight = nextPage.querySelectorAll(".hero .model-right");
        const currentLeft = currentPage.querySelectorAll(".hero .model-left");
        const currentRight = currentPage.querySelectorAll(".hero .model-right");
        const nextText = nextPage.querySelectorAll(".details");
        const portfolio = document.querySelectorAll(".portfolio");

        
        
        const tl = new TimelineMax({
            onStart:function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents="none";
                });
            },
            onComplete: function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents="all";
                });
            }
        });
    tl.fromTo(currentLeft, 0.3, {y:"-10%"}, {y: "-100%"})
    .fromTo(currentRight, 0.3, {y:'10%'}, {y:"-100%"}, "-=0.2") //animating the first image

    .to(portfolio, 0.3, {backgroundImage: backgrounds[pageNumber]}) //page background change

    .fromTo(currentPage, 0.3, {opacity:1, pointerEvents: 'all'},{opacity:0, pointerEvents: 'none'}) //current page fade
    .fromTo(nextPage, 0.3, {opacity:0, pointerEvents: 'none'},{opacity:1, pointerEvents:'all'},'-=0.6')//next page fade

    .fromTo(nextLeft, 0.3, {y: '-100%'},{y:'-10%'},'-=0.6')
    .fromTo(nextRight, 0.3, {y: '-100%'},{y:'10%'},'-=0.8')//animating the next image

    .fromTo(nextText, 0.3, {opacity:0,y:30},{opacity:1,y:0}) //to get rid of the nextText override issue and change in y value of details might generate a scroll bar for sometime,to fix it do overflow hidden to class .page  .

    //gsap animation drawback is that hover effect on image doesnt work after changing a slide , unless you refresh the page.

    .set(nextLeft, {clearProps:'all'})
    .set(nextRight, {clearProps:'all'})
    .set(currentLeft, {clearProps:'all'})
    .set(currentRight, {clearProps:'all'})

    current = pageNumber;
    
    }



    //optional trick to work animations on scroll too
  document.addEventListener('wheel',throttle(scrollChange,1500));
  document.addEventListener('touchmove',throttle(scrollChange,1500));
  

  //for switching the dots with scroll

  function dotScroll(dotNumber){
      const dotChanger = document.querySelectorAll('.slide')[dotNumber];
      slides.forEach(slide =>{
        slide.classList.remove('active');
    });
    dotChanger.classList.add('active');
  }

  function scrollChange(e){
      if(e.deltaY>0){
          scrollSlide +=1;
      }else{
          scrollSlide -= 1;
      }
      if(scrollSlide>2){
          scrollSlide = 0;
      }
      if(scrollSlide<0){
          scrollSlide = 2;
      }
      dotScroll(scrollSlide);
      nextSlide(scrollSlide);
      console.log(scrollSlide);
      
      
  }

  //for animating the navbar

  const hamburger = document.querySelector('.menu');
  const hamburgerLines = document.querySelectorAll('.menu line');
  const navOpen = document.querySelector('.nav-open');
  const contact = document.querySelector('.contact');
  const social = document.querySelector('.social');
  const logo = document.querySelector('.logo');

  const tl = new TimelineMax({paused:true,reversed:true});
  tl.to(navOpen, 0.5 , {y:0}) //nav animation
  .fromTo(logo, 0.5, {color:'white'}, {color:'black'},'+=0.1')
  .fromTo(hamburgerLines, 0, {stroke: 'white'}, {stroke: 'black'},'-=1') // burger line color
  .fromTo(contact, 0.5, {opacity: 0, y:-20}, {opacity: 1, y:0},'+=0.1') //contact animation
  .fromTo(social, 0.5, {opacity: 0, y:20}, {opacity: 1, y:0},'+=0.1')//social animation
  


  hamburger.addEventListener('click', () => {
      tl.reversed() ? tl.play() : tl.reverse();  //reversed and reverse is different , reverse at the end is responsible for toggling burger
  })

    
}
function throttle(func, limit){
    let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if (!inThrottle){
            func.apply(context, args);
            inThrottle=true;
            setTimeout(()=>(inThrottle = false),limit);
        }
    };

   
}



init();