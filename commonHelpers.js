import{a as S,S as w,i}from"./assets/vendor-aa7a424a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const v="https://pixabay.com/api/",L="33612698-29a0e4fa17aff9da96c8a261f";async function p(r,o,e){const a=new URLSearchParams({key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,perpage:e});return(await S.get(`${v}?${a}`)).data}const k=document.querySelector(".gallery");function f(r){const o=r.map(({webformatURL:e,largeImageURL:a,tags:t,likes:s,views:n,comments:_,downloads:b})=>` <li class="gallery__item">
          <a class="gallery__link" href="${a}">
      <div class="gallery__photo-card">
         <img class="gallery__image"src="${e}" alt="${t}" loading="lazy"/>
      </div>
      <div class="gallery__info">
         <p class="info__item">
             <span class="info__item-name">Likes</span><br>
            <span class="info__item-data">${s}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Views</span><br>
             <span class="info__item-data">${n}</span>
         </p>
         <p class="info__item">
             <span class="info__item-name">Comments</span><br>
             <span class="info__item-data">${_}</span>
         </p>
        <p class="info__item">
             <span class="info__item-name">Downloads</span><br>
             <span class="info__item-data">${b}</span>
         </p>
      </div>
         </a>
     </li>`).join("");k.insertAdjacentHTML("beforeend",o)}const x=document.querySelector("#search-form"),P=document.querySelector(".gallery"),d=document.querySelector(".js-guard"),u=document.querySelector(".finish-text");x.addEventListener("submit",q);let g="",l=1,c=50;const C={captionsData:"alt",captionPosition:"bottom",captionDelay:250},h=new w(".gallery .gallery__link",C),$={root:null,rootMargin:"300px",threshold:1},y=new IntersectionObserver(O,$);function q(r){r.preventDefault();const o=r.currentTarget.elements.searchQuery.value.trim();if(!o){i.warning({title:"Caution",message:"Please enter a search query!",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}m(),l=1,g=o,p(g,l,c).then(e=>{let a=e.totalHits/c;if(e.hits.length===0){i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again.",messageColor:"black",messageSize:"18px",backgroundColor:"yellow",position:"topRight",timeout:2500}),m();return}else f(e.hits),i.success({title:"Success",message:`Hooray! We found ${e.totalHits} images.`,messageColor:"black",messageSize:"18px",backgroundColor:"green",position:"topRight",timeout:2500}),h.refresh(),l<a&&y.observe(d);e.totalHits<=c?u.classList.remove("is-hidden"):u.classList.add("is-hidden")}).catch(e=>{console.error(e),i.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})})}function O(r){r.forEach(o=>{o.isIntersecting&&(l+=1,p(g,l,c).then(e=>{e.hits.length>0?(f(e.hits),h.refresh()):(y.unobserve(d),u.classList.remove("is-hidden"))}).catch(e=>{console.error(e),i.error({title:"Error",message:"Oops! Something went wrong. Please try again later.",messageColor:"white",messageSize:"18px",backgroundColor:"red",position:"topRight",timeout:2500})}))})}function m(){P.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
