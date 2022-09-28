const buttonGroup = document.querySelector('.btnGroup');
const btns = document.querySelectorAll('.btnGroup form button');
const expList = document.querySelectorAll('.experienceContent>*');
let viewStatus = 'all';

expList.forEach((item,index) => {
    setTimeout(() => {
        item.classList.add('active');
    }, index * 100)
})

buttonGroup.addEventListener('click', (e) => {
    if (e.target.nodeName === "BUTTON"){
        e.preventDefault();

        // reset viewStatus
        expList.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('unseen');
            setTimeout(() => {
                item.classList.add('active');
            }, 300);
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
            expList.forEach(item => {
                if (!item.dataset.type.includes(`${viewStatus}`)){
                    item.classList.remove('active');
                    setTimeout(() => {
                        item.classList.add('unseen');
                    }, 300);
                }
            })
        }
        e.target.classList.toggle('active');
    }
})