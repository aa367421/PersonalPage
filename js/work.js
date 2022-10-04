if (device != 'pc'){
    let deviceRefresh = device;
    window.addEventListener('resize', () => {
        if (device != deviceRefresh && device != 'pc' && deviceRefresh != 'pc'){
            window.location.href = location.href;
        }
    })
}

const buttonGroup = document.querySelector('.btnGroup');
const btns = document.querySelectorAll('.btnGroup form button');
const workCardList = document.querySelector('.workCard');
let workCards;

let viewStatus = 'all';

let renderAllCards = (ary) => {
    let str = "";
    ary.forEach((item) => {
        let {index, root, type, typeText} = item;
        str += `<li data-type="${type}" data-index="${index}" data-root="${root}">
            <img src="./img/workCard/${index}_${root}/img0.jpg">
            <p>${typeText}</p>
        </li>`;
    })
    workCardList.innerHTML = str;
    workCards = document.querySelectorAll('.workCard li');    
}

renderAllCards(worksData);

buttonGroup.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON"){
        e.preventDefault();

        // reset viewStatus
        viewStatus = 'all';
        workCards.forEach(item => {
            item.classList.remove('unseen');
        })

        // toggle btn class
        if (!e.target.classList.contains('active')){
            btns.forEach(item => {
                item.classList.remove('active');
            })

            // change viewStatus
            viewStatus = e.target.value;
            workCards.forEach(item => {
                if (item.dataset.type !== viewStatus){
                    item.classList.add('unseen');
                }
            })
        }
        e.target.classList.toggle('active');
    }
})

workCardList.addEventListener('click', (e) => {
    if (e.target.closest('li')){
        let index = e.target.closest('li').dataset.index;
        let cardObj = {};
        worksData.filter(item => {
            if (item.index == index){
                cardObj = item;
                return true;
            }
        })

        // get & render lightbox img
        let {root, objectFit, imgAmount, video} = cardObj;
        let {title, job, during, content, footer} = cardObj.description;
        let imgRoot = `./img/workCard/${index}_${root}/`;
        let lightbox = document.querySelector('.lightbox');

        let str;

        if (device == 'pad' || device == 'mobile'){
            str = `<div class="lightboxContent"><div class="lightboxImg swiper"><div class="swiper-wrapper">`

            if (video != ""){
                str += `<div class="swiper-slide"><iframe src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
            }

            for (let i=0; i<imgAmount;i++){
                str += `<div class="swiper-slide"><a href="${imgRoot}/img${i}.jpg" data-id="${i}" data-lightbox="${root}"><img src="${imgRoot}/img${i}.jpg" data-id="${i}"></a></div>`
            }

            str +=`</div><div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>
            <div class="lightboxText">
            <h3>${title}</h3>
            <div class="jobAndDuring">
                <span class="job">${job}</span>
                <span>${during}</span>
            </div>`

            if (footer != ""){
                str += `<p class="lightboxWorkDescription">${content}</p><p class="lightboxFooter">${footer}</p>`
            } else {
                str += `<p>${content}</p>`
            }

            str +=`</div></div>`

        } else {
            str = `<div class="lightboxContent"><div class="lightboxImg">`

            for (let i=0; i<imgAmount;i++){
                str += `<img src="${imgRoot}/img${i}.jpg" data-id="${i}">`
            }
        
            if (video != ""){
                str += `<iframe src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            }

            str += `</div><div class="lightboxText">
                <h3>${title}</h3>
                <div class="jobAndDuring">
                    <span class="job">${job}</span>
                    <span>${during}</span>
                </div>`
            if (footer != ""){
            str += `<p class="lightboxWorkDescription">${content}</p><p class="lightboxFooter">${footer}</p>`
            } else {
                str += `<p>${content}</p>`
            }
            str +=`</div></div>`
        }

        lightbox.innerHTML = str;
        lightbox.classList.add('active');

        if (device == 'pad' || 'mobile'){
            let swiper = new Swiper('.swiper', {
                direction: 'horizontal',
                loop: false,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                  el: '.swiper-pagination',
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              });
        }

        let lightboxStatus = {
            "lightbox": false,
            "lightboxImgLarge": false
        }

        let closeLightboxByEsc = (e) => {
            if (e.key == "Escape"){
                if (lightboxStatus.lightboxImgLarge == true){
                    lightboxStatus.lightboxImgLarge = false;
                    document.querySelector('.lightboxImgLarge').classList.remove('active');
                } else {
                    lightboxStatus.lightbox = false;
                    lightbox.classList.remove('active');
                    document.removeEventListener('keydown', closeLightboxByEsc, false);
                }
            } else {
                return;
            }
        }

        document.addEventListener('keydown', closeLightboxByEsc, false);

        if (objectFit == "contain"){
            document.querySelectorAll('.lightboxImg img').forEach(item => {
                item.style.objectFit = "contain";
            })
        }
        lightbox.addEventListener('click', (e) => {
            lightboxStatus.lightboxImgLarge = true;

            if (e.target.closest('i')){
                return; // link outside
            }
            if (e.target.closest('.lightboxContent')){
                e.preventDefault();
                if (device =='pc' || device == 'padHorizon'){
                    if (e.target.closest('img')){
                        lightboxStatus.lightbox = true;
    
                        let id = e.target.closest('img').dataset.id;
                        let lightboxImgLarge = document.querySelector('.lightboxImgLarge');
    
                        // get & render lightbox Large img
                        lightboxImgLarge.classList.add('active');
                        lightboxImgLarge.innerHTML = `<img src="${imgRoot}/img${id}.jpg" alt="">`;
                        if (objectFit == "contain"){
                            document.querySelector('.lightboxImgLarge img').style.objectFit = "contain";
                        }
    
                        lightboxImgLarge.addEventListener('click', (e) => {
                            if (e.target.closest('img')){
                                e.preventDefault();
                            } else {
                                lightboxStatus.lightboxImgLarge = false;
                                lightboxImgLarge.classList.remove('active');
                            }
                        })
                    }
                }
            }  else {
                lightboxStatus.lightbox = false;
                lightbox.classList.remove('active');
                document.removeEventListener('keydown', closeLightboxByEsc, false);
            }
        })
    }
})

const checkWorkHref = () => {
    let url = new URL(location.href);
    let urlNow = url.searchParams.get('now');
    if (urlNow !== null){
        viewStatus = urlNow;

        btns.forEach(item => {
            if(item.value === viewStatus){
                item.classList.add('active');
            }
        })
        
        workCards.forEach(item => {
            if (item.dataset.type !== viewStatus){
                item.classList.add('unseen');
            }
        })
    } else {
        return;
    }
}

checkWorkHref();