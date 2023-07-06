import{h as F,u as R,r as n,z as q,a as L,o as t,c as a,b as s,d as $,e as T,j as Y,v as B,F as k,k as x,l as _,f as g,A as p,t as c,g as z}from"./index-bc3dd73a.js";import{_ as H}from"./Union-c033cb20.js";import{_ as G}from"./noData-e0e046d0.js";import{a as N,d as K}from"./api-ec30518d.js";import{c as S}from"./cities-ebc38fa7.js";const Q={class:"purpose-index container p-5"},W={"aria-label":"breadcrumb",class:"py-2 mt-3"},X={class:"breadcrumb"},Z={class:"breadcrumb-item"},ee={class:"breadcrumb-item"},se={class:"row py-4 d-flex"},te={class:"col-lg-3 mb-3"},ae={class:"select-wrap"},oe=s("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇縣市",-1),le=["value"],ce={class:"col-lg-3 mb-3"},ie=s("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇活動",-1),ne=["value"],re=s("span",{class:"search-img"},[s("img",{src:H,alt:""})],-1),de={key:0},ue=s("div",{class:"index-title"},"熱門主題",-1),me={class:"card-wrap row"},ve={class:"card-img"},_e=["src","alt"],pe={class:"active-title"},he={key:1},ge={class:"index-title"},fe={class:"search-all"},ye={class:"search-count"},be={key:0,class:"row"},Ce=z('<div class="no-data-wrap pt-5 col-lg-3 col-md-6"><div class="no-data-container"><div class="no-data-img"><div class="no-data-circle"><img src="'+G+'" alt=""></div></div><div class="no-data-info pt-2">很抱歉，找不到任何資料!</div></div></div>',1),ke=[Ce],xe={key:1,class:"row"},Ae=["onClick"],we={class:"overflow-hidden places-card shadow"},Pe={class:"card-img search-card-img"},Ue=["src","alt"],$e={class:"card-body"},Ne={class:"card-date"},Se={class:"card-title"},Ve={class:"text-muted"},je={class:"active-location"},Ie=s("i",{class:"bi bi-geo-alt"},null,-1),De={class:"city"},Le={key:0,class:"active-class-icon"},Te=s("i",{class:"bi bi-tag"},null,-1),Ye=[Te],Be={key:1,class:"active-class"},Je={key:2,class:"active-class"},Me={class:"pagination mt-5"},He={__name:"ActiveIndex",setup(Oe){const y=F(),V=R(),j=o=>K(o).format("YYYY/MM/DD"),b=n(1),C=n([]),A=n(),w=n();let I=n(),m=n(0);const r=n(V.params.city||""),i=n(V.params.active||"");let f=n(!1);const P={city:r.value,active:i.value},J=function(o){b.value=o},M=q(()=>{const o=(b.value-1)*12,l=o+12;return C.value.slice(o,l)}),O=async()=>{const o=r.value!==void 0,l=i.value!==void 0;if(o&&l){w.value=i.value;const d=`v2/Tourism/Activity/${r.value}?${i.value}%27&$top=200&$format=JSON
    &$select=ActivityID,ActivityName,Address,City,Picture,Class1,Class2
    &$filter=contains(Class1,'${i.value}') or contains(Class2,'${i.value}')`,u=await N.fetchList(d),{data:e,status:v}=u;if(v==200){f.value=!0,m.value=e.length,C.value=e;const h=S.find(U=>U.value===r.value);A.value=h?h.name:"",y.replace({name:"ActiveIndex",params:P})}}else if(o){const d=`v2/Tourism/Activity/${r.value}?%24StartTime&%24format=JSON`,u=await N.fetchList(d),{data:e,status:v}=u;if(v==200){f.value=!0,m.value=e.length,C.value=e;const h=S.find(U=>U.value===r.value);A.value=h?h.name:"",y.replace({name:"ActiveIndex",params:P})}}else if(l){w.value=i.value;const d=`v2/Tourism/Activity?$filter=Class1%20eq%20%27${i.value}%27&$top=200&$format=JSON`,u=await N.fetchList(d),{data:e,status:v}=u;console.log("res",u.data),v==200&&(f.value=!0,m.value=e.length,C.value=e,y.replace({name:"ActiveIndex",params:P}))}},E=o=>{I.value=o,console.log("id",o);const l=`/activeDetail/${I.value}`;y.push({path:l})},D=[{name:"節慶活動",imgUrl:"src/assets/img/active_1.jpeg",value:"節慶活動"},{name:"自行車活動",imgUrl:"src/assets/img/active_2.jpeg",value:"自行車活動"},{name:"遊憩活動",imgUrl:"src/assets/img/active_3.jpeg",value:"遊憩活動"},{name:"產業文化",imgUrl:"src/assets/img/active_4.jpeg",value:"產業文化活動"},{name:"年度活動",imgUrl:"src/assets/img/active_5.jpeg",value:"年度活動"},{name:"四季活動",imgUrl:"src/assets/img/active_6.jpeg",value:"四季活動"}];return(o,l)=>{const d=L("router-Link"),u=L("vue-awesome-paginate");return t(),a("div",Q,[s("nav",W,[s("ol",X,[s("li",Z,[$(d,{to:{name:"Index"},class:"text-decoration-none"},{default:T(()=>[g("首頁")]),_:1})]),s("li",ee,[$(d,{to:{name:"ActiveIndex"},class:"text-decoration-none"},{default:T(()=>[g("精選活動")]),_:1})])])]),s("div",se,[s("div",te,[s("div",ae,[Y(s("select",{class:"form-select","onUpdate:modelValue":l[0]||(l[0]=e=>r.value=e)},[oe,(t(!0),a(k,null,x(_(S),e=>(t(),a("option",{value:e.value,key:e.value},c(e.name),9,le))),128))],512),[[B,r.value]])])]),s("div",ce,[Y(s("select",{class:"form-select","onUpdate:modelValue":l[1]||(l[1]=e=>i.value=e)},[ie,(t(),a(k,null,x(D,e=>s("option",{value:e.name,key:e.name},c(e.name),9,ne)),64))],512),[[B,i.value]])]),s("div",{class:"form-btn col-lg-2 mb-3"},[s("button",{class:"search-btn",onClick:O},[re,g(" 搜尋 ")])])]),_(f)?p("",!0):(t(),a("div",de,[ue,s("div",me,[(t(),a(k,null,x(D,e=>s("div",{class:"card g-3 col-lg-3 col-md-6",key:e.name},[s("div",ve,[s("img",{src:e.imgUrl,alt:e.name},null,8,_e)]),s("span",pe,c(e.name),1)])),64))])])),_(f)?(t(),a("div",he,[s("div",ge,[g(c(A.value)+" "+c(w.value)+" 搜尋結果 ",1),s("span",fe,[g("共有 "),s("span",ye,c(_(m)),1),g(" 筆")])]),_(m)==0?(t(),a("div",be,ke)):p("",!0),_(m)>0?(t(),a("div",xe,[(t(!0),a(k,null,x(M.value,(e,v)=>(t(),a("div",{class:"card g-3 col-lg-3 col-md-6",key:v,onClick:h=>E(e.ActivityID)},[s("div",we,[s("div",Pe,[s("img",{src:e.Picture.PictureUrl1?e.Picture.PictureUrl1:e.Picture.PictureUrl2?e.Picture.PictureUrl2:e.Picture.PictureUrl3?e.Picture.PictureUrl3:"src/assets/img/nullPicture.png",alt:e.ActivityName,onerror:"this.style.display='none'"},null,8,Ue)])]),s("div",$e,[s("div",Ne,c(j(e.StartTime))+" - "+c(j(e.EndTime)),1),s("div",Se,c(e.ActivityName),1),s("div",Ve,[s("div",je,[Ie,s("span",De,c(e.Address),1)]),e.Class1||e.Class2?(t(),a("span",Le,Ye)):p("",!0),e.Class1?(t(),a("span",Be," # "+c(e.Class1),1)):p("",!0),e.Class2?(t(),a("span",Je," # "+c(e.Class2),1)):p("",!0)])])],8,Ae))),128)),s("div",Me,[$(u,{"total-items":_(m),"items-per-page":12,"max-pages-shown":4,modelValue:b.value,"onUpdate:modelValue":l[2]||(l[2]=e=>b.value=e),"on-click":J},null,8,["total-items","modelValue"])])])):p("",!0)])):p("",!0)])}}};export{He as default};