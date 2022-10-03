const viewport = () => {
    if (window.innerWidth > 1200){
        return 'pc';
    } else if (window.innerWidth <= 1200 && window.innerWidth > 820){
        return 'padHorizon';
    } else if (window.innerWidth <= 820 && window.innerWidth > 425){
        return 'pad';
    } else {
        return 'mobile';
    }
}

$(document).ready(() => {

    device = viewport();
    window.addEventListener('resize', () => {
        device = viewport();
    })

    const list = document.querySelector('.headerList');
    const listContent = document.querySelectorAll('.headerList li a');

    if (device == 'pc'){
        // Nav bar hover
        list.addEventListener('mouseenter', () => {
            bindLocateEvent();
            listContent.forEach(item => {
                item.classList.add('active');
            })
        })
    
        list.addEventListener('mouseleave', () => {
            listContent.forEach(item => {
                item.classList.remove('active');
            })
        })
    } else {
        list.addEventListener('click', () => {
            listContent.forEach(item => {
                item.classList.add('active');
            })
            bindLocateEvent();
        })
    }

        // Nav bar click
    $('.headerList li a, .title a, .work ul li').click((e) => {
        e.preventDefault();
    })
    let bindLocateEvent = () => {
        $('.headerList li a, .title a, .work ul li').click((e) => {
            locate (e); 
        })
    }

    let locate = (e) => {
        let ZoomAndLocate = (sec) => {
            let obj = document.querySelector(`#${targetName} + *`);
            setTimeout(() => {
                obj.classList.add('active');
            }, sec * 1000)
            setTimeout(() => {
                window.location.href=`${targetName}.html${now}`;
            }, sec * 2000)
        }

        let target, targetName;
        let now = '';

        if (e.target.nodeName != 'A'){
            target = '#work';
            now = e.target.dataset.now;
        } else {
            target = e.target.getAttribute('href');

            let locateMap = ['?now=theater', '?now=frontend', '?now=other'];
            let getRandom = (x) => {
                return Math.floor(Math.random()*x);
            }

            if (target == '#work'){
                now = locateMap[getRandom(3)];
            }
        }
        targetName = target.split('#')[1]; 

        if (targetName === "banner"){
            targetName = 'index';
        }

        let clickStatus = {
            "isHomePage": false,
            "isClickNavBar": false,
            "isClickWork": false
        };
        let checkClickPos = () => {
            if ($(target).offset() != undefined){
                clickStatus.isHomePage = true;
            }
            if (e.target.parentNode.nodeName !== 'H2'){
                clickStatus.isClickNavBar = true;
                if (e.target.closest('li').classList.contains('work')){
                    clickStatus.isClickWork = true;
                }
            }
        }
        checkClickPos();

        if (clickStatus.isClickWork == true && device != 'pc'){
            return;
        }

        if (clickStatus.isHomePage == true){
            if (clickStatus.isClickNavBar == true){
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 90,
                }, 700);
                if (targetName === 'index'){
                    return;
                } else {
                    ZoomAndLocate(1);
                }
            } else {
                ZoomAndLocate(0.5);
            }
        } else {
            window.location.href=`${targetName}.html${now}`;
        }
    }

    $('.top').click(() => {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    }); 
    
})

// home card click
let cardList = document.querySelector('.card');

if (cardList != null){
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
    let toTop = document.querySelector('.top');
    let homeTitle = document.querySelectorAll('.title');
    let [workTitle, aboutTitle, contactTitle] = homeTitle;
    let homeStatus = {
        "work": false,
        "about": false,
        "contact": false,
        "toTop": false
    };

    let checkScrollPos = () => {
        let windowHeight = window.innerHeight;
        let scrollPos = window.scrollY;
        let posCount = windowHeight /1.5 + scrollPos;

        /*  For debug
            console.log(windowHeight); //929 714
            console.log(scrollPos);
            console.log(workTitle.offsetTop); //769 633
            console.log(aboutTitle.offsetTop); //1169 1033
            console.log(contactTitle.offsetTop); //1712 1486
        */

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
        }
        if (posCount > aboutTitle.offsetTop){
            contentPopUp(about, 'about');
        }
        if (posCount > contactTitle.offsetTop){
            contentPopUp(contact, 'contact');
            toTop.classList.add('active');
            homeStatus.toTop = true;
        }
        
        if (posCount < aboutTitle.offsetTop && homeStatus.toTop == true){
            toTop.classList.remove('active');
            homeStatus.toTop = false;
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

// get worksJson & prefetch
let jsonURL = 'json/works.json';
let request = new XMLHttpRequest();
let worksData = [];

request.open('GET', jsonURL);
request.responseType = 'json';
request.send();

request.onload = () => {
    let rawWorksData = request.response;
    rawWorksData.forEach(item => {
        worksData.unshift(item);
    })

    let createPreloadEl = (as, href) => {
        let el = document.createElement('link');
        el.as = as;
        el.rel = "prefetch";
        el.href = href;
        el.crossorigin = "anonymous";
        document.querySelector('.forPreload').appendChild(el);
    }
    let runScript = (src) => {
        el = document.createElement('script');
        el.src = src;
        el.defer = true;
        document.querySelector('.forPreload').appendChild(el);
    }

    
    createPreloadEl("stylesheet", "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css");
    createPreloadEl("stylesheet", "./css/lightbox.min.css");
    createPreloadEl("script", "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js");
    createPreloadEl("script", "./js/lightbox.min.js");
    createPreloadEl("script", "./js/work.js");
    createPreloadEl("script", "./js/about.js");

    let preloadImagesAry = [];
    let preloadVideosAry = [];

    worksData.forEach(item => {
        let {index, root, imgAmount} = item;
        for (let i=0;i<imgAmount;i++){
            preloadImagesAry.push(`./img/workCard/${index}_${root}/img${i}.jpg`);
        }
    })
    worksData.forEach(item => {
        let {video} = item;
        if (video != ""){
            preloadVideosAry.push(video);
        }
    })

    let nowPage = location.href.split('.html');
    if (nowPage[0].slice(-5) == 'index'){
        document.querySelector('.footerContact').style.display = 'none';
    }
    if (nowPage[0].slice(-4) == 'work'){

        runScript("https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js");
        runScript("./js/lightbox.min.js");
        runScript("./js/work.js");
    }
    if (nowPage[0].slice(-5) == 'about'){
        runScript("./js/about.js");
    }

    preloadImagesAry.forEach(item => {
        createPreloadEl("image", item);
    })
    preloadVideosAry.forEach(item => {
        createPreloadEl('document', item);
    })
}