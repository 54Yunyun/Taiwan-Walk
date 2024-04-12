import{_ as A}from"./arrow-right16_R-c2b1940f.js";import{a as P,c as q,d as F}from"./cities-3b3f330e.js";import{_ as G,h as H,r,i as J,a as B,o as i,c as o,k as _,F as p,b as s,d as v,e as m,f as l,t as c,n as E,y as S,m as D,g as K,p as Q,q as X}from"./index-b38aff00.js";const d=g=>(Q("data-v-8d0f162a"),g=g(),X(),g),Z={"aria-label":"breadcrumb",class:"py-2 mt-3"},ss={class:"breadcrumb"},ts={class:"breadcrumb-item"},es={class:"breadcrumb-item"},as={class:"breadcrumb-item"},cs={class:"breadcrumb-item"},is={class:"breadcrumb-item"},os={class:"carousel"},ls={id:"carouselExampleCaptions",class:"carousel slide","data-bs-ride":"carousel"},ns={class:"carousel-indicators"},rs=["data-bs-slide-to","aria-current","aria-label"],ds={class:"carousel-inner carousel-fade"},us=["src","alt"],_s=K('<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" data-v-8d0f162a><span class="carousel-control-prev-icon" aria-hidden="true" data-v-8d0f162a></span><span class="visually-hidden" data-v-8d0f162a>Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" data-v-8d0f162a><span class="carousel-control-next-icon" aria-hidden="true" data-v-8d0f162a></span><span class="visually-hidden" data-v-8d0f162a>Next</span></button>',2),ps={class:"active-wrap"},vs={class:"active-name"},ms={key:0,class:"active-class-wrap"},hs={key:0,class:"active-class"},bs={key:1,class:"active-class"},ys={class:"active-description-wrap mt-4"},gs=d(()=>s("div",{class:"active-description-title"},"活動介紹：",-1)),Ps={class:"active-description-content"},fs={class:"row mt-4"},Cs={class:"col-lg-6"},ws={class:"bg-light border-radius p-4 mb-5"},ks={class:"active-description-title"},xs={class:"active-description-title"},Ss={class:"active-description-title"},Ds={class:"active-description-title"},As={class:"active-description-title"},Ns=["href"],Is={class:"active-description-title"},Us={class:"active-description-title"},Ls={class:"col-lg-6 mb-5"},Rs=["src"],$s={class:"active-wrap"},zs={class:"active-title-wrap d-flex justify-content-between align-items-center mb-4"},Bs=d(()=>s("div",{class:"active-title title-underline"},"鄰近的活動",-1)),Es={class:"active-more pointer"},Vs=d(()=>s("img",{src:A,class:"arrow",alt:""},null,-1)),js=["onClick"],Ms={class:"overflow-hidden places-card shadow"},Os={class:"card-body"},Ts={class:"card-title"},Ws={class:"text-muted"},Ys=d(()=>s("i",{class:"bi bi-geo-alt"},null,-1)),qs={class:"city"},Fs={class:"active-wrap"},Gs={class:"active-title-wrap d-flex justify-content-between align-items-center mb-4"},Hs=d(()=>s("div",{class:"active-title title-underline"},"鄰近的景點",-1)),Js={class:"active-more pointer"},Ks=d(()=>s("img",{src:A,class:"arrow",alt:""},null,-1)),Qs=["onClick"],Xs={class:"overflow-hidden places-card shadow"},Zs={class:"card-body"},st={class:"card-title"},tt={class:"text-muted"},et=d(()=>s("i",{class:"bi bi-geo-alt"},null,-1)),at={class:"city"},ct={class:"active-wrap"},it={class:"active-title-wrap d-flex justify-content-between align-items-center mb-4"},ot=d(()=>s("div",{class:"active-title title-underline"},"鄰近的美食",-1)),lt={class:"active-more pointer"},nt=d(()=>s("img",{src:A,class:"arrow",alt:""},null,-1)),rt=["onClick"],dt={class:"overflow-hidden places-card shadow"},ut={class:"card-body"},_t={class:"card-title"},pt={class:"text-muted"},vt=d(()=>s("i",{class:"bi bi-geo-alt"},null,-1)),mt={class:"city"},V="Activity",ht={__name:"ActiveDetail",setup(g){const f=H();let j=f.currentRoute.value.params.Id;const N=t=>F(t).format("YYYY/MM/DD"),C=r([]),I=r([]),U=r(""),L=r([]),R=r([]),$=r([]),w=r(),z=r();let h=r(""),b=r("");const M=async()=>{const t=await P.fetchOne(V,j);I.value=t;const y=q.find(u=>u.name===t[0].City);w.value=y?y.value:"",z.value=t[0].Class1?t[0].Class1:t[0].Class2,h.value=t[0].Position.PositionLat,b.value=t[0].Position.PositionLon,U.value=`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${h.value},${b.value}&z=16&output=embed&t=`,C.value=[{url:t[0].Picture.PictureUrl1?t[0].Picture.PictureUrl1:"/src/assets/img/nullPicture.png",description:t[0].Picture.PictureDescription1?t[0].Picture.PictureDescription1:""},{url:t[0].Picture.PictureUrl2?t[0].Picture.PictureUrl2:"/src/assets/img/nullPicture.png",description:t[0].Picture.PictureDescription2?t[0].Picture.PictureDescription2:""},{url:t[0].Picture.PictureUrl3?t[0].Picture.PictureUrl3:"/src/assets/img/nullPicture.png",description:t[0].Picture.PictureDescription3?t[0].Picture.PictureDescription3:""}]},O=async()=>{const t=await P.fetchNearbyList(V,h.value,b.value);L.value=t},T=async()=>{const t=await P.fetchNearbyList("ScenicSpot",h.value,b.value);R.value=t},W=async()=>{const t=await P.fetchNearbyList("Restaurant",h.value,b.value);$.value=t},Y=()=>{const t={city:w.value,class:z.value};console.log(t),f.replace({name:"ActiveIndex",params:t})},k=(t,y)=>{const u=`/${t}Detail/${y}`;f.push(u)};return J(async()=>{await M(),await O(),await T(),await W()}),(t,y)=>{const u=B("router-Link"),x=B("router-link");return i(!0),o(p,null,_(I.value,e=>(i(),o("div",{class:"detail container p-5",key:e},[s("nav",Z,[s("ol",ss,[s("li",ts,[v(u,{to:{name:"Index"},class:"text-decoration-none"},{default:m(()=>[l("首頁")]),_:1})]),s("li",es,[v(u,{to:{name:"ActiveIndex"},class:"text-decoration-none"},{default:m(()=>[l("精選活動")]),_:1})]),s("li",as,[v(u,{to:{name:"ActiveIndex",params:{city:w.value}},class:"text-decoration-none"},{default:m(()=>[l(c(e.City),1)]),_:2},1032,["to"])]),s("li",cs,[s("a",{onClick:Y,class:"text-decoration-none"},c(e.Class1?e.Class1:e.Class2?e.Class2:""),1)]),s("li",is,c(e.ActivityName),1)])]),s("div",os,[s("div",ls,[s("div",ns,[(i(!0),o(p,null,_(C.value,(a,n)=>(i(),o("button",{key:n,type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":n,class:E({active:n===0}),"aria-current":n===0?"true":"false","aria-label":`Slide ${n+1}`},null,10,rs))),128))]),s("div",ds,[(i(!0),o(p,null,_(C.value,(a,n)=>(i(),o("div",{key:n,class:E({"carousel-item":!0,active:n===0})},[s("img",{src:a.url,class:"d-block w-100",alt:a.ActivityName},null,8,us)],2))),128))]),_s])]),s("div",ps,[s("div",vs,c(e.ActivityName),1),e.Class1||e.Class2?(i(),o("div",ms,[e.Class1?(i(),o("span",hs," # "+c(e.Class1),1)):S("",!0),e.Class2?(i(),o("span",bs," # "+c(e.Class2),1)):S("",!0)])):S("",!0),s("div",ys,[gs,s("span",Ps,c(e.Description?e.Description:"無"),1)]),s("div",fs,[s("div",Cs,[s("div",ws,[s("div",ks,[l(" 活動時間："),s("span",null,c(N(e.StartTime))+" - "+c(N(e.EndTime)),1)]),s("div",xs,[l(" 聯絡電話："),s("span",null,c(e.Phone?e.Phone:"無"),1)]),s("div",Ss,[l(" 主辦單位："),s("span",null,c(e.Organizer?e.Organizer:"無"),1)]),s("div",Ds,[l(" 活動地點："),s("span",null,c(e.Address?e.Address:e.Location?e.Location:"無"),1)]),s("div",As,[l(" 官方網站："),s("a",{href:e.WebsiteUrl},[s("span",null,c(e.WebsiteUrl?e.WebsiteUrl:"無"),1)],8,Ns)]),s("div",Is,[l(" 活動費用："),s("span",null,c(e.Charge?e.Charge:"無"),1)]),s("div",Us,[l(" 注意事項："),s("span",null,c(e.Remarks?e.Remarks:"無"),1)])])]),s("div",Ls,[s("iframe",{class:"map border-radius",src:U.value},null,8,Rs)]),s("div",$s,[s("div",zs,[Bs,s("div",Es,[v(x,{to:{name:"ActiveIndex"}},{default:m(()=>[l(" 查看更多活動"),Vs]),_:1})])])]),(i(!0),o(p,null,_(L.value,a=>(i(),o("div",{class:"card col-lg-3 col-md-6",key:a,onClick:n=>k("active",a.ActivityID)},[s("div",Ms,[s("div",{class:"card-img",style:D({"background-image":"url("+(a.Picture.PictureUrl1?a.Picture.PictureUrl1:"/src/assets/img/nullPicture.png")+")"})},null,4)]),s("div",Os,[s("div",Ts,c(a.ActivityName),1),s("div",Ws,[Ys,s("span",qs,c(a.Address),1)])])],8,js))),128)),s("div",Fs,[s("div",Gs,[Hs,s("div",Js,[v(x,{to:{name:"ScenicSpotIndex"}},{default:m(()=>[l(" 查看更多景點"),Ks]),_:1})])])]),(i(!0),o(p,null,_(R.value,a=>(i(),o("div",{class:"card col-lg-3 col-md-6",key:a,onClick:n=>k("scenicSpot",a.ScenicSpotID)},[s("div",Xs,[s("div",{class:"card-img",style:D({"background-image":"url("+(a.Picture.PictureUrl1?a.Picture.PictureUrl1:"/src/assets/img/nullPicture.png")+")"})},null,4)]),s("div",Zs,[s("div",st,c(a.ScenicSpotName),1),s("div",tt,[et,s("span",at,c(a.Address),1)])])],8,Qs))),128)),s("div",ct,[s("div",it,[ot,s("div",lt,[v(x,{to:{name:"ScenicSpotIndex"}},{default:m(()=>[l(" 查看更多美食"),nt]),_:1})])])]),(i(!0),o(p,null,_($.value,a=>(i(),o("div",{class:"card col-lg-3 col-md-6",key:a,onClick:n=>k("restaurant",a.RestaurantID)},[s("div",dt,[s("div",{class:"card-img",style:D({"background-image":"url("+(a.Picture.PictureUrl1?a.Picture.PictureUrl1:"/src/assets/img/nullPicture.png")+")"})},null,4)]),s("div",ut,[s("div",_t,c(a.RestaurantName),1),s("div",pt,[vt,s("span",mt,c(a.Address),1)])])],8,rt))),128))])])]))),128)}}},Pt=G(ht,[["__scopeId","data-v-8d0f162a"]]);export{Pt as default};
