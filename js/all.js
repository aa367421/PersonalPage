
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
                if (t[1] === 'index'){
                    return
                } else {
                    ZoomAndLocate(1);
                }
            } else {
                ZoomAndLocate(0.5);
            }
        } else {
            window.location.href=`${t[1]}.html`;
        }
        
    })
})


// Scroll
let card = document.querySelectorAll('.card li');
let about = document.querySelectorAll('.aboutContent, .about>img');
let contact = document.querySelectorAll('.contact>img, .contactContent')
let homeTitle = document.querySelectorAll('.title');
let [workTitle, aboutTitle, contactTitle] = homeTitle;

const checkScrollPos = () => {
    let windowHeight = window.innerHeight;
    let scrollPos = window.scrollY;
    let posCount = windowHeight /1.5 + scrollPos;
    // console.log(windowHeight);//929 714
    // console.log(scrollPos);
    // console.log(workTitle.offsetTop);//769 633
    // console.log(aboutTitle.offsetTop);//1169 1033
    // console.log(contactTitle.offsetTop);//1712 1486
    let contentPopUp = (nodeName) => {
        nodeName.forEach((item, index) =>{
            setTimeout(() => {
                item.classList.add('active')
            }, index * 150);
        })
    }
    if (posCount > workTitle.offsetTop){
        contentPopUp(card);
    }
    if (posCount > aboutTitle.offsetTop){
        contentPopUp(about);
    }
    if (posCount > contactTitle.offsetTop){
        contentPopUp(contact);
    }
}

// home card click

const cardList = document.querySelector('.card');

if (cardList !== null){
    cardList.addEventListener('click', (e) => {
        let el = e.target.closest('li');
        el.classList.add('locating');

        setTimeout(() => {
            location.href=`work.html?now=${el.dataset.id}`;
        }, 700)
    })
}


let viewStatus = 'all';

// workbtn
const buttonGroup = document.querySelector('.btnGroup');
const btns = document.querySelectorAll('.btnGroup form button');
const workCardList = document.querySelector('.workCard');
let workCard;

// get json
// let jsonURL = 'json/test.json';
// let request = new XMLHttpRequest();
// request.open('GET', jsonURL);
// request.responseType= 'json';
// request.send();

// request.onload = () => {
//     let ary = request.response;
//     let obj = ary[0];
//     let {type, titilImg, typeText} = obj;
//     workCardList.innerHTML = `
//                 <li data-type="${type}">
//                     <img src="./img/workCard/${titilImg}.jpg" alt="">
//                     <p>${typeText}</p>
//                 </li>`;
//     workCards = document.querySelectorAll('.workCard li');
// 
    // checkWork();
// }

const checkWork = () => {
    let url = new URL(location.href);
        let now = url.searchParams.get('now');
        if (now !== null){
            viewStatus = now;
            workCards.forEach(item => {
                if (item.dataset.type !== viewStatus){
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
if (card.length !== 0){
    checkScrollPos();
    window.addEventListener('scroll', () =>{
        checkScrollPos();
    })
}
checkWork();

// workbtn click
// buttonGroup.addEventListener('click', (e) => {
//     if (e.target.nodeName === "BUTTON"){
//         e.preventDefault();

//         // reset viewStatus
//         workCards.forEach(item => {
//             item.classList.remove('unseen');
//         })
//         // toggle class
//         if (!e.target.classList.contains('active')){
//             let ary = Array.from(btns);
//             ary.forEach(item => {
//                 item.classList.remove('active');
//             })

//             ary = ary.filter(item => {
//             if (item.classList.contains('active')){
//                 return true
//                 }
//             })

//             // change viewStatus
//             viewStatus = e.target.value;
//             workCards.forEach(item => {
//                 if (item.dataset.type !== viewStatus){
//                     item.classList.add('unseen');
//                 }
//             })
//         }
//         e.target.classList.toggle('active');
//     }
// })



// workCardList.addEventListener('click', (e) => {
//     if (e.target.closest('li')){
//         location.href=`work.html#lightbox`;
//     }
// //     request.open('GET', jsonURL);
// //     request.responseType= 'json';
// //     request.send();
// //     request.onload = () => {
// //         let ary = request.response;
// //         let obj = ary[0].description;
// //         let {title, job, time, content} = obj;
// //         let lightbox = document.querySelector('.lightbox');
// //         lightbox.innerHTML = `
// //             <div class="lightboxContent">
// //                 <div class="lightboxImg">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <img src="./img/CardImg.jpg" alt="">
// //                     <!-- 燈箱JS -->
// //                 </div>
// //                 <div class="lightboxText">
// //                     <h3>${title}</h3>
// //                     <span>${job} ${time}</span>
// //                     <p>${content}</p>
// //                 </div>
// //             </div>`;
// //         location.href=`work.html#lightbox`;
// //     }
// })

// cursor effect
const cursorDiv = document.createElement('div');
cursorDiv.classList.add('cursor');
document.body.appendChild(cursorDiv);

let a;

const move = () => {
        cursorDiv.style.left = `${a.x - cursorDiv.offsetWidth /2}px`;
        cursorDiv.style.top = `${a.y - cursorDiv.offsetHeight /2}px`;
}

document.body.addEventListener('mousemove', (e) => {
    a = e;
    window.requestAnimationFrame(move);
    if (e.target.closest('h2 a, li,button')){
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
    


})