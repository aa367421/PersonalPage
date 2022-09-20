
// Nav bar hover
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


// Nav bar click
$(document).ready(function(){
    $('.list li a, .title a').click(function(event){
        let target = $(this).attr('href');
        let t = target.split('#');
        event.preventDefault();

        let ZoomAndLocate = (sec) => {
            let obj = document.querySelector(`#${t[1]} + *`);
            setTimeout(() => {
                obj.classList.add('active');
            }, sec * 1000)
            setTimeout(() => {
                window.location.href=`${t[1]}.html`;
            }, sec * 2000)
        }

        if (t[1] === "banner"){
            t[1] = 'index';
        }
        // if @ homepage -> $(target).offset == true
        if ($(target).offset()){
            // if @ nav bar -> parent node == a -> scroll
            if ($(this)[0].parentNode.nodeName !== 'H2'){
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 90,
                }, 700);
                ZoomAndLocate(1);
            } else {
                ZoomAndLocate(0.5);
            }
        } else {
            window.location.href=`${t[1]}.html`;
        }
        
    })
})


// Scroll
window.addEventListener('scroll', () =>{
    checkScrollPos();
})

let card = document.querySelectorAll('.card li');
let about = document.querySelectorAll('.aboutContent, .about>img');
let contact = document.querySelectorAll('.contact>img, .contactContent')

const checkScrollPos = () => {
    let windowHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    if (((windowHeight + scrollPos) /2 ) > 500){
        card.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 150);
        })
    }
    if (((windowHeight + scrollPos) /2 ) > 800){
        about.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 150);
        })
    }
    if (((windowHeight + scrollPos) /2 ) > 1000){
        contact.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 150);
        })
    }
}

// home card click

const cardList = document.querySelector('.card');

if (cardList !== null){
    cardList.addEventListener('click', (e) => {
        let el = e.target.closest('li');
        el.classList.add('locating');

        setTimeout(() => {
            window.location.href=`work.html?now=${el.dataset.id}`;
        }, 700)
    })
}


let viewStatus = 'all';
// workbtn
const buttonGroup = document.querySelector('.btnGroup');
const btns = document.querySelectorAll('.btnGroup form button');
const workCards = document.querySelectorAll('.workCard li');

const checkWork = () => {
    let url = new URL(location.href);
        let now = url.searchParams.get('now');
        if (now !== null){
            viewStatus = now;
            workCards.forEach(item => {
                if (item.dataset.id !== viewStatus){
                    item.classList.add('unseen');
                }
            })
            btns.forEach(item => {
                if(item.value === viewStatus){
                    item.classList.add('active');
                }
            })
        } else {
            return;
        }
}

// render after f5
checkScrollPos();
checkWork();

// workbtn click
buttonGroup.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON"){
        e.preventDefault();

        // reset viewStatus
        workCards.forEach(item => {
            item.classList.remove('unseen');
        })
        // toggle class
        if (!e.target.classList.contains('active')){
            let ary = Array.from(btns);
            ary.forEach(item => {
                item.classList.remove('active');
            })

            ary = ary.filter(item => {
            if (item.classList.contains('active')){
                return true
                }
            })

            // change viewStatus
            viewStatus = e.target.value;
            workCards.forEach(item => {
                if (item.dataset.id !== viewStatus){
                    item.classList.add('unseen');
                }
            })
        }
        e.target.classList.toggle('active');
    }
})