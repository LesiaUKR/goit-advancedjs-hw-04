import{a as w,S as v,i as l}from"./assets/vendor-aa7a424a.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const L="https://pixabay.com/api/",k="33612698-29a0e4fa17aff9da96c8a261f";async function d(a,s,t){const r=new URLSearchParams({key:k,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:t});return(await w.get(`${L}?${r}`)).data}const C=document.querySelector(".gallery");function f(a){const s=a.map(({webformatURL:t,largeImageURL:r,tags:e,likes:o,views:i,comments:b,downloads:S})=>` <li class="gallery__item">
          <a class="gallery__link" href="${r}">
      <div class="gallery__photo-card">
         <img class="gallery__image"src="${t}" alt="${e}" loading="lazy"/>
      </div>
      <div class="gallery__info">
         <p class="info__item">
             <span class="info__item-name">Likes</span><br>
            <span class="info__item-data">${o}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Views</span><br>
             <span class="info__item-data">${i}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Comments</span><br>
             <span class="info__item-data">${b}</span>
         </p>
        <p class="info__item">
             <span class="info__item-name">Downloads</span><br>
             <span class="info__item-data">${S}</span>
         </p>
      </div>
         </a>
     </li>`).join("");C.insertAdjacentHTML("beforeend",s)}const x=document.querySelector("#search-form"),P=document.querySelector(".gallery"),h=document.querySelector(".js-guard"),g=document.querySelector(".finish-text");x.addEventListener("submit",O);let u="",n=1,p=40,c=1;const $={captionsData:"alt",captionPosition:"bottom",captionDelay:250},y=new v(".gallery .gallery__link",$),q={root:null,rootMargin:"300px",threshold:1},_=new IntersectionObserver(z,q);async function O(a){a.preventDefault();const s=a.currentTarget.elements.searchQuery.value.trim();if(!s){l.warning({title:"Caution",message:"Please enter a search query!",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}m(),n=1,u=s;try{const{hits:t,totalHits:r}=await d(u,n,p);if(c=Math.ceil(r/p),r===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again.",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}else f(t),l.success({title:"Success",message:`Hooray! We found ${r} images.`,messageColor:"black",messageSize:"18px",backgroundColor:"green",position:"topRight",timeout:2500}),y.refresh(),n<c&&_.observe(h)}catch(t){console.error(t),l.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})}n>=c?g.classList.remove("is-hidden"):g.classList.add("is-hidden")}function z(a){a.forEach(async s=>{if(s.isIntersecting){n+=1;try{const{hits:t}=await d(u,n,p);f(t),y.refresh();const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),n>=c&&(_.unobserve(h),g.classList.remove("is-hidden"))}catch(t){console.error(t),l.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})}}})}function m(){P.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
