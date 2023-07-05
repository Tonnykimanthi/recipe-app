const openMenuBtn = document.querySelector('.open-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const menuForSm = document.querySelector('.nav-for-sm');

openMenuBtn.addEventListener('click', ()=>{
    openMenuBtn.classList.remove('max-sm:block');
    closeMenuBtn.classList.remove('hidden');
    menuForSm.classList.remove('hidden');
    console.log("Tony")
});
closeMenuBtn.addEventListener('click', ()=>{
    openMenuBtn.classList.add('max-sm:block');
    closeMenuBtn.classList.add('hidden');
    menuForSm.classList.add('hidden');
});