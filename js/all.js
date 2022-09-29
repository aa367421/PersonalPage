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
    $('.list li a, .title a, .work ul li').click(function(e){

        let ZoomAndLocate = (sec) => {
            let obj = document.querySelector(`#${t[1]} + *`);
            setTimeout(() => {
                obj.classList.add('active');
            }, sec * 1000)
            setTimeout(() => {
                window.location.href=`${t[1]}.html${now}`;
            }, sec * 2000)
        }

        e.preventDefault();
        let target, t;
        let now = '';

        if (e.target.nodeName != 'A'){
            target = '#work';
            now = e.target.dataset.now;
        } else {
            target = $(this).attr('href');

            let map = ['?now=theater', '?now=frontend', '?now=other']
            let getRandom = (x) => {
                return Math.floor(Math.random()*x);
            }

            if (target == '#work'){
                now = map[getRandom(3)];
            }
        }

        t = target.split('#'); 

        if (t[1] === "banner"){
            t[1] = 'index';
        }
        // if @ homepage -> $(target).offset == true
        if ($(target).offset()){
            // if click nav bar -> parent node == a -> scroll
            if ($(this)[0].parentNode.nodeName !== 'H2'){
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 90,
                }, 700);
                if (t[1] === 'index'){
                    return
                } else {
                    ZoomAndLocate(1);
                }
            } else {
                ZoomAndLocate(0.5);
            }
        } else {
            window.location.href=`${t[1]}.html${now}`;
        }  
    })
})

// home card click
let cardList = document.querySelector('.card');

if (cardList !== null){
    cardList.addEventListener('click', (e) => {
        let el = e.target.closest('li');
        el.classList.add('locating');

        setTimeout(() => {
            location.href=`work.html?now=${el.dataset.id}`;
        }, 700)
    })

    // Scroll
    let card = document.querySelectorAll('.card li');
    let about = document.querySelectorAll('.aboutContent, .about>img');
    let contact = document.querySelectorAll('.contactImg, .contactContent')
    let homeTitle = document.querySelectorAll('.title');
    let [workTitle, aboutTitle, contactTitle] = homeTitle;
    let homeStatus = {
        "work": false,
        "about": false,
        "contact": false
    };

    let checkScrollPos = () => {
        let windowHeight = window.innerHeight;
        let scrollPos = window.scrollY;
        let posCount = windowHeight /1.5 + scrollPos;
        // console.log(windowHeight); //929 714
        // console.log(scrollPos);
        // console.log(workTitle.offsetTop); //769 633
        // console.log(aboutTitle.offsetTop); //1169 1033
        // console.log(contactTitle.offsetTop); //1712 1486
        let contentPopUp = (nodeName, pos) => {
            if (homeStatus[`${pos}`] != true){
                nodeName.forEach((item, index) =>{
                    setTimeout(() => {
                        item.classList.add('active')
                    }, index * 150);
                })
            }
            homeStatus[`${pos}`] = true;
       }
        if (posCount > workTitle.offsetTop){
            contentPopUp(card, 'work');
            homeStatus.work = true;
        }
        if (posCount > aboutTitle.offsetTop){
            contentPopUp(about, 'about');
        }
        if (posCount > contactTitle.offsetTop){
            contentPopUp(contact, 'contact');
        }
    }
    window.addEventListener('scroll', () =>{
        checkScrollPos();
    })
    checkScrollPos();
}

// cursor effect
const cursorDiv = document.createElement('div');
cursorDiv.classList.add('cursor');
document.body.appendChild(cursorDiv);

let forEvent;

const move = () => {
    cursorDiv.style.left = `${forEvent.x - cursorDiv.offsetWidth /2}px`;
    cursorDiv.style.top = `${forEvent.y - cursorDiv.offsetHeight /2}px`;
    if (forEvent.target.closest('h2 a, li, button, i')){
        if (!cursorDiv.classList.contains('active')){
            cursorDiv.classList.add('active');
        } else {
            return;
        }
    } else {
        if (cursorDiv.classList.contains('active')){
            cursorDiv.classList.remove('active');
        } else {
            return;
        }
    }
}

document.body.addEventListener('mousemove', (e) => {
    forEvent = e;
    window.requestAnimationFrame(move);
})

// get json
let jsonURL = 'json/works.json';
let request = new XMLHttpRequest();
let ary = [];

request.open('GET', jsonURL);
request.responseType= 'json';
request.send();

request.onload = () => {
    let res = request.response;
    res.forEach(item => {
        ary.unshift(item);
    })

    let createPreloadEl = (as, href) => {
        let el = document.createElement('link');
        el.as = as;
        el.rel = "prefetch";
        el.href = href;
        el.crossorigin = "anonymous";
        document.body.appendChild(el);
    }

    createPreloadEl("script", "./js/work.js");
    createPreloadEl("script", "./js/about.js");

    let preloadImages = [];
    let preloadVideos = [];

    ary.forEach(item => {
        let {index, root, imgAmount} = item;
        for (let i=0;i<imgAmount;i++){
            preloadImages.push(`./img/workCard/${index}_${root}/img${i}.jpg`);
        }
    })
    ary.forEach(item => {
        let {video} = item;
        if (video != ""){
            preloadVideos.push(video);
        }
    })

    let nowPage = location.href.split('.html');
    if (nowPage[0].slice(-4) == 'work'){
        el = document.createElement('script');
        el.src = "./js/work.js";
        el.defer = true;
        document.body.appendChild(el);
    }
    if (nowPage[0].slice(-5) == 'about'){
        el = document.createElement('script');
        el.src = "./js/about.js";
        el.defer = true;
        document.body.appendChild(el);
    }

    preloadImages.forEach(item => {
        createPreloadEl("image", item);
    })
    preloadVideos.forEach(item => {
        createPreloadEl('document', item);
        console.log(item);
    })
}