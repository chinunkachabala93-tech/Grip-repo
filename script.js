const header=document.querySelector('[data-header]');const menuButton=document.querySelector('.menu-toggle');const navigation=document.querySelector('#site-nav');const statusMessage=document.querySelector('.contact-status');
// Add the exact official details below. WhatsApp example: https://wa.me/260XXXXXXXXX
const contactChannels={
  whatsapp:{url:'https://wa.me/260770262871',label:'+260 770 262 871'},
  email:{url:'mailto:mackeygrip@gmail.com',label:'mackeygrip@gmail.com'},
  instagram:{url:'https://www.instagram.com/mac_key_grip_engineering?stkn=cW5ham9rYWpjZnM=',label:'@mac_key_grip_engineering'},
  facebook:{url:'https://www.facebook.com/itxchinunkadat.brainboxer',label:'Mac Key Grip on Facebook'},
  tiktok:{url:'https://www.tiktok.com/@mac.key.grip.engi?_r=1&_t=ZS-99ryqGjx6X6',label:'@mac.key.grip.engi'}
};
const closeMenu=()=>{navigation?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
menuButton?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>30),{passive:true});
document.querySelectorAll('[data-contact]').forEach(link=>{const channel=contactChannels[link.dataset.contact];if(channel?.url){link.href=channel.url;link.removeAttribute('aria-disabled');if(!channel.url.startsWith('mailto:')){link.target='_blank';link.rel='noreferrer'}const detail=link.querySelector('small');if(detail&&channel.label)detail.textContent=channel.label}else{link.addEventListener('click',event=>{event.preventDefault();if(statusMessage){statusMessage.textContent=`${link.querySelector('strong')?.textContent||'This channel'} will be activated when the official detail is supplied.`;statusMessage.classList.add('active')}})}});
const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver((entries,watcher)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');watcher.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});items.forEach(item=>observer.observe(item))}else items.forEach(item=>item.classList.add('visible'));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
