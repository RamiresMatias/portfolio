const anchorEl = document.querySelector('.back-top')
const sections = document.querySelectorAll('section')
const navbarLinks = document.querySelectorAll('.header nav ul li a')
const headerEl = document.querySelector('.header')
const menuToggle = headerEl.querySelector(".menu-toggle")
const btnCopy = document.getElementById('button-copy')
const elTextEmail = document.getElementById('text-email')

let show = true

menuToggle.addEventListener("click", () => hiddenMenu())

anchorEl.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}))

navbarLinks.forEach(nav => nav.addEventListener('click', () => {
  headerEl.classList.contains('on') && hiddenMenu()
}))


window.addEventListener('scroll', () => {
  event.preventDefault()
  const currentPos = window.scrollY;

  sections.forEach(function (section) { 
    const sectionTop = section.offsetTop - 500; 
    const sectionHeight = section.offsetHeight; 
    const sectionId = section.getAttribute('id');

    if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
      navbarLinks.forEach(navbarLink => navbarLink.classList.remove('active-link'))
      document.querySelector( `.header nav ul li a[href="#${sectionId}"]`).classList.add('active-link')
    }
  })
})

btnCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(elTextEmail.textContent)
})

const hiddenMenu = () => {
  document.body.style.overflow = show ? "hidden" : "initial"
  headerEl.classList.toggle("on", show)

  show = !show
}