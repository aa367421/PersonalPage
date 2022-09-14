const icon = document.querySelector('.list');
const list = document.querySelectorAll('.list li');

icon.addEventListener('mouseenter', () => {
    list.forEach(item => {
        item.classList.add('active');
    })
})

icon.addEventListener('mouseleave', () => {
    list.forEach(item => {
        item.classList.remove('active');
    })
})