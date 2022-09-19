const list = document.querySelector('.list');
const listContent = document.querySelectorAll('.list li a');

list.addEventListener('mouseenter', () => {
    listContent.forEach(item => {
        item.classList.add('active');
    })
})

list.addEventListener('mouseleave', () => {
    listContent.forEach(item => {
        item.classList.remove('active');
    })
})

$(document).ready(function(){
    $('.list li a').click(function(event){
        let target = $(this).attr('href');
        let t = target.split('#');
        event.preventDefault();

        if (t[1] === "banner"){
            t[1] = 'index';
        }

        if ($(target).offset()){
            $('html, body').animate({
                scrollTop: $(target).offset().top - 75,
            }, 700);
            setTimeout(() => {
                window.location.href=`${t[1]}.html`;
            }, 1500)
        } else {
            window.location.href=`${t[1]}.html`;
        }
        
    })
})

let card = document.querySelectorAll('.card li');
let about = document.querySelectorAll('.aboutContent, .about>img');
let contact = document.querySelectorAll('.contact>img, .contactContent')

window.addEventListener('scroll', () =>{
    let windowHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    // console.log(scrollPos + windowHeight);
    if ((windowHeight + scrollPos) > 428){
        card.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 250);
        })
    }
    if ((windowHeight + scrollPos) > 1400){
        about.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 250);
        })
    }
    if ((windowHeight + scrollPos) > 1700){
        contact.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 250);
        })
    }
})