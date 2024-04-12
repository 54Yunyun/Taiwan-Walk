import{h as z,u as G,r as d,s as J,i as K,a as N,o as a,c as t,b as e,d as S,e as O,j as A,v as D,F as x,k as w,l as r,f as h,y as _,t as u,g as Q}from"./index-b38aff00.js";import{_ as W}from"./Union-c033cb20.js";import{_ as X}from"./noData-e0e046d0.js";import{a as U,c as P}from"./cities-3b3f330e.js";const B=[{name:"地方特產",imgUrl:"https://i.pinimg.com/564x/40/3a/ed/403aedaebed260e80998675e14981aa2.jpg",value:"地方特產"},{name:"中式美食",imgUrl:"https://i.pinimg.com/564x/a2/bb/a2/a2bba27e347604bc1fc39f94d665fe1c.jpg",value:"中式美食"},{name:"甜點冰品",imgUrl:"https://i.pinimg.com/564x/05/fa/87/05fa8738a89c455f2467837da42a2ff2.jpg",value:"甜點冰品"},{name:"異國料理",imgUrl:"https://i.pinimg.com/564x/c8/30/39/c8303907d291a718ad332927d0c46f28.jpg",value:"異國料理"},{name:"伴手禮",imgUrl:"https://i.pinimg.com/564x/8f/1c/aa/8f1caae9912a5624d70a9196134c6ef2.jpg",value:"伴手禮"},{name:"素食",imgUrl:"https://i.pinimg.com/564x/f3/8d/9a/f38d9ac7c196d51aafa36c8897627f87.jpg",value:"素食"},{name:"其他",imgUrl:"https://i.pinimg.com/564x/10/e0/8a/10e08a3b9440dee6accfe14cbcd3dce8.jpg",value:"其他"}],Y={class:"purpose-index container p-5"},Z={"aria-label":"breadcrumb",class:"py-2 mt-3"},ee={class:"breadcrumb"},se={class:"breadcrumb-item"},ae={class:"row py-4 d-flex"},te={class:"col-lg-3 mb-3"},le={class:"select-wrap"},ce=e("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇縣市",-1),oe=["value"],ie={class:"col-lg-3 mb-3"},ne=e("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇主題",-1),de=["value"],re=e("span",{class:"search-img"},[e("img",{src:W,alt:""})],-1),ue={key:0},me=e("div",{class:"index-title"},"熱門主題",-1),ve={class:"card-wrap row"},_e={class:"card-img"},pe=["src","alt","onClick"],he={class:"active-title"},ge={key:1},fe={class:"index-title"},be={class:"search-all"},ye={class:"search-count"},Ce={key:0,class:"row"},ke=Q('<div class="no-data-wrap pt-5 col-lg-3 col-md-6"><div class="no-data-container"><div class="no-data-img"><div class="no-data-circle"><img src="'+X+'" alt=""></div></div><div class="no-data-info pt-2">很抱歉，找不到任何資料!</div></div></div>',1),xe=[ke],we={key:1,class:"row"},Ue=["onClick"],Ve={class:"overflow-hidden places-card shadow"},Re={class:"card-img search-card-img"},je=["src","alt"],Le={class:"card-body"},$e={class:"card-title"},Ie={class:"text-muted"},Ne={class:"active-location"},Se=e("i",{class:"bi bi-geo-alt"},null,-1),Ae={class:"city"},De={key:0,class:"active-class-icon"},Pe=e("i",{class:"bi bi-tag"},null,-1),Be=[Pe],Fe={key:1,class:"active-class"},Me={class:"pagination mt-5"},V="Restaurant",Je={__name:"RestaurantIndex",setup(Ee){const g=z(),f=G(),b=d(1),y=d([]),j=d(),C=d(),i=d(f.params.city||""),o=d(f.params.active||"");let L=d(),v=d(0),p=d(!1),m=[];const n={city:i.value,class:o.value},F=J(()=>{const l=(b.value-1)*12,c=l+12;return y.value.slice(l,c)}),M=l=>{L.value=l;const c=`/restaurantDetail/${L.value}`;g.push({path:c})},$=async()=>{const l=i.value!=="",c=o.value!=="";l&&c?(C.value=o.value,m=await U.fetchCityClassList(V,`${i.value}`,`${o.value}`)):l?m=await U.fetchCityClassList(V,`${i.value}`,""):c&&(C.value=o.value,m=await U.fetchCityClassList(V,"",`${o.value}`)),m.length>0&&(p.value=!0),v.value=m.length,y.value=m;const k=P.find(R=>R.value===i.value);j.value=k?k.name:"",n.city=i.value,n.class=o.value,g.replace({name:"RestaurantIndex",params:n})},E=()=>{i.value="",o.value="",p.value=!1,n.city="",n.class="",g.replace({name:"RestaurantIndex",params:n})},H=()=>{i.value="",o.value=""},T=async l=>{m=await U.fetchCityClassList(V,"",`${l}`),p.value=!0,C.value=l,y.value=m,v.value=y.value.length,n.city="",n.class=l,g.replace({name:"RestaurantIndex",params:n})},q=function(l){b.value=l};return K(async()=>{f.params.city,f.params.class,await $()}),(l,c)=>{const k=N("router-Link"),R=N("vue-awesome-paginate");return a(),t("div",Y,[e("nav",Z,[e("ol",ee,[e("li",se,[S(k,{to:{name:"Index"},class:"text-decoration-none"},{default:O(()=>[h("首頁")]),_:1})]),e("li",{class:"breadcrumb-item"},[e("a",{class:"breadcrumb-item",onClick:E},"品嚐美食")])])]),e("div",ae,[e("div",te,[e("div",le,[A(e("select",{class:"form-select","onUpdate:modelValue":c[0]||(c[0]=s=>i.value=s)},[ce,(a(!0),t(x,null,w(r(P),s=>(a(),t("option",{value:s.value,key:s.value},u(s.name),9,oe))),128))],512),[[D,i.value]])])]),e("div",ie,[A(e("select",{class:"form-select","onUpdate:modelValue":c[1]||(c[1]=s=>o.value=s)},[ne,(a(!0),t(x,null,w(r(B),s=>(a(),t("option",{value:s.name,key:s.name},u(s.name),9,de))),128))],512),[[D,o.value]])]),e("div",{class:"form-btn col-lg-3 mb-3"},[e("button",{class:"search-btn",onClick:$},[re,h(" 搜尋 ")]),e("button",{class:"search-btn clear-btn",onClick:H}," 清除 ")])]),r(p)?_("",!0):(a(),t("div",ue,[me,e("div",ve,[(a(!0),t(x,null,w(r(B),s=>(a(),t("div",{class:"card g-3 col-lg-3 col-md-6",key:s.name},[e("div",_e,[e("img",{src:s.imgUrl,alt:s.name,onClick:I=>T(s.name)},null,8,pe)]),e("span",he,u(s.name),1)]))),128))])])),r(p)?(a(),t("div",ge,[e("div",fe,[h(u(j.value)+" "+u(C.value)+" 搜尋結果 ",1),e("span",be,[h("共有 "),e("span",ye,u(r(v)),1),h(" 筆")])]),r(v)==0?(a(),t("div",Ce,xe)):_("",!0),r(v)>0?(a(),t("div",we,[(a(!0),t(x,null,w(F.value,(s,I)=>(a(),t("div",{class:"card g-3 col-lg-3 col-md-6",key:I,onClick:He=>M(s.RestaurantID)},[e("div",Ve,[e("div",Re,[e("img",{src:s.Picture.PictureUrl1,alt:s.ActivityName},null,8,je)])]),e("div",Le,[e("div",$e,u(s.RestaurantName),1),e("div",Ie,[e("div",Ne,[Se,e("span",Ae,u(s.Address),1)]),s.Class?(a(),t("span",De,Be)):_("",!0),s.Class?(a(),t("span",Fe,"# "+u(s.Class),1)):_("",!0)])])],8,Ue))),128)),e("div",Me,[S(R,{"total-items":r(v),"items-per-page":12,"max-pages-shown":4,modelValue:b.value,"onUpdate:modelValue":c[2]||(c[2]=s=>b.value=s),"on-click":q},null,8,["total-items","modelValue"])])])):_("",!0)])):_("",!0)])}}};export{Je as default};