import{a as L,S as w,i as l}from"./assets/vendor-Qob_5Ba8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function p(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=p(t);fetch(t.href,o)}})();const f=async(r,e)=>{const a=`https://pixabay.com/api/?key=28678786-a2e7b218e16ae31de09ab66ee&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${e}`;try{return(await L.get(a)).data}catch(t){throw console.error("Error fetching data:",t),t}};function g(r){return r.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
          <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image">
          <div class="info">
              <p><b>Likes</b> <span>${e.likes}</span></p>
              <p><b>Views</b> <span>${e.views}</span></p>
              <p><b>Comments</b> <span>${e.comments}</span></p>
              <p><b>Downloads</b> <span>${e.downloads}</span></p>
          </div>
      </a>
  `).join("")}function v(){document.querySelector(".gallery").innerHTML=""}const q=document.querySelector(".search-form"),y=document.querySelector(".gallery"),m=document.querySelector("#loader"),b=new w(".gallery a"),h=document.querySelector(".loader-more.hidden"),s=document.querySelector(".load-button.hidden");let n=1,c="",d=0,i=0;s.classList.add("hidden");h.classList.add("hidden");q.addEventListener("submit",r=>{if(r.preventDefault(),c=document.querySelector(".input").value.trim(),!c){l.warning({message:"Please enter a search term",position:"topRight",backgroundColor:"#FF0000",color:"white",timeout:5e3});return}v(),s.classList.add("hidden"),m.classList.remove("hidden"),n=1,i=0,f(c,n).then(e=>{if(d=e.totalHits,i=e.hits.length,e.hits.length===0){l.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",color:"white",timeout:5e3});return}y.innerHTML=g(e.hits),n++,b.refresh(),i<d&&s.classList.remove("hidden")}).catch(e=>{l.error({message:"Error fetching images. Please try again later.",position:"topRight",backgroundColor:"#FF0000",color:"white",timeout:5e3})}).finally(()=>{m.classList.add("hidden")})});s.addEventListener("click",()=>{s.classList.add("hidden"),h.classList.remove("hidden"),f(c,n).then(r=>{i+=r.hits.length,i>=d&&(s.classList.add("hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"white",timeout:5e3})),y.insertAdjacentHTML("beforeend",g(r.hits)),n++,b.refresh()}).catch(r=>{}).finally(()=>{const r=document.querySelector(".gallery-item").getBoundingClientRect().height;h.classList.add("hidden"),i<d&&(s.classList.remove("hidden"),window.scrollBy({top:r*2,left:0,behavior:"smooth"}))})});
//# sourceMappingURL=index.js.map
