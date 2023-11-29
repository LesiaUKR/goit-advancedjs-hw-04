import{a as w,S as v,i as l}from"./assets/vendor-aa7a424a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const L="https://pixabay.com/api/",k="33612698-29a0e4fa17aff9da96c8a261f";async function f(a,o,t){const r=new URLSearchParams({key:k,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:t});return(await w.get(`${L}?${r}`)).data}const x=document.querySelector(".gallery");function d(a){const o=a.map(({webformatURL:t,largeImageURL:r,tags:e,likes:s,views:i,comments:b,downloads:S})=>` <li class="gallery__item">
          <a class="gallery__link" href="${r}">
      <div class="gallery__photo-card">
         <img class="gallery__image"src="${t}" alt="${e}" loading="lazy"/>
      </div>
      <div class="gallery__info">
         <p class="info__item">
             <span class="info__item-name">Likes</span><br>
            <span class="info__item-data">${s}</span>
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
     </li>`).join("");x.insertAdjacentHTML("beforeend",o)}const P=document.querySelector("#search-form"),C=document.querySelector(".gallery"),h=document.querySelector(".js-guard"),p=document.querySelector(".finish-text");P.addEventListener("submit",O);let u="",n=1,g=40,c=1;const $={captionsData:"alt",captionPosition:"bottom",captionDelay:250},y=new v(".gallery .gallery__link",$),q={root:null,rootMargin:"300px",threshold:1},_=new IntersectionObserver(z,q);async function O(a){a.preventDefault();const o=a.currentTarget.elements.searchQuery.value.trim();if(!o){l.warning({title:"Caution",message:"Please enter a search query!",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}m(),n=1,u=o;try{const{hits:t,totalHits:r}=await f(u,n,g);if(c=Math.ceil(r/g),r===0){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again.",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}else d(t),l.success({title:"Success",message:`Hooray! We found ${r} images.`,messageColor:"black",messageSize:"18px",backgroundColor:"green",position:"topRight",timeout:2500}),y.refresh(),n<c&&_.observe(h)}catch(t){console.error(t),l.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})}n>=c?p.classList.remove("is-hidden"):p.classList.add("is-hidden")}function z(a){a.forEach(async o=>{if(o.isIntersecting){n+=1;try{const{hits:t}=await f(u,n,g);d(t),y.refresh(),n>=c&&(_.unobserve(h),p.classList.remove("is-hidden"))}catch(t){console.error(t),l.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})}}})}function m(){C.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
