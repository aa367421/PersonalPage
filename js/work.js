const buttonGroup = document.querySelector('.btnGroup');
const btns = document.querySelectorAll('.btnGroup form button');
const workCardList = document.querySelector('.workCard');
let workCards;

let viewStatus = 'all';

const renderAllCard = (ary) => {
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

renderAllCard(ary);

buttonGroup.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON"){
        e.preventDefault();

        // reset viewStatus
        workCards.forEach(item => {
            item.classList.remove('unseen');
        })
        // toggle btn class
        if (!e.target.classList.contains('active')){
            let ary = Array.from(btns);
            ary.forEach(item => {
                item.classList.remove('active');
            })

            ary = ary.filter(item => {
            if (item.classList.contains('active')){
                return true;
                }
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
        let obj = {};
        ary.filter(item => {
            if (item.index == index){
                obj = item;
                return true;
            }
        })
        let {root, objectFit, imgAmount, video} = obj;
        let {title, job, during, content, footer} = obj.description;
        let imgRoot = `./img/workCard/${index}_${root}/`
        let lightbox = document.querySelector('.lightbox');

        let str = `<div class="lightboxContent">
        <div class="lightboxImg">`;

        for (let i=0; i<imgAmount;i++){
            str += `<img src="${imgRoot}/img${i}.jpg" data-id="${i}">`
        };
        if (video != ""){
            str += `<iframe width="100%" height="50%" src="${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        }
        str += `</div>
            <div class="lightboxText">
                <h3>${title}</h3>
                <div class="jobAndDuring">
                <span class="job">${job}</span>
                <span>${during}</span>
            </div>`
        if (footer != ""){
            str += `<p class="lightboxWorkDescription">${content}</p>
                <p class="lightboxFooter">${footer}</>`
        } else {
            str += `<p>${content}</p>`
        }
        str +=`</div></div>`

        lightbox.innerHTML = str;
        lightbox.classList.add('active');

        if (objectFit == "contain"){
            document.querySelectorAll('.lightboxImg img').forEach(item => {
                item.style.objectFit = "contain";
            })
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target.closest('i')){
                return;
            }
            if (e.target.closest('.lightboxContent')){
                e.preventDefault();
                if (e.target.closest('img')){
                    let id = e.target.closest('img').dataset.id;
                    let lightboxImgLarge = document.querySelector('.lightboxImgLarge');
                    lightboxImgLarge.addEventListener('click', (e) => {
                        if (e.target.closest('img')){
                            e.preventDefault();
                        } else {
                            lightboxImgLarge.classList.remove('active');
                        }
                    })
                    lightboxImgLarge.classList.add('active');
                    lightboxImgLarge.innerHTML = `<img src="${imgRoot}/img${id}.jpg" alt="">`;
                    if (objectFit == "contain"){
                        document.querySelector('.lightboxImgLarge img').style.objectFit = "contain";
                    }
                }
            } else if (e.target.closest('i')){
                return; // link outside
            } else {
                lightbox.classList.remove('active');
            }
        })
    }
})

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

checkWork();