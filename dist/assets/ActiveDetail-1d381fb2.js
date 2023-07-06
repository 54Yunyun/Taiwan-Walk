import{_ as E}from"./arrow-right16_R-c2b1940f.js";import{a as w,d as B}from"./api-ec30518d.js";import{_ as F,h as O,r as _,i as R,a as I,o,c as l,k as v,F as m,b as s,d as P,e as y,f as n,t as i,n as T,A as k,m as z,g as W,p as Y,q as j}from"./index-bc3dd73a.js";const p=h=>(Y("data-v-2a02578e"),h=h(),j(),h),M={"aria-label":"breadcrumb",class:"py-2 mt-3"},J={class:"breadcrumb"},G={class:"breadcrumb-item"},H={class:"breadcrumb-item"},K={class:"breadcrumb-item"},Q={class:"breadcrumb-item"},X={class:"carousel"},Z={id:"carouselExampleCaptions",class:"carousel slide","data-bs-ride":"carousel"},ss={class:"carousel-indicators"},ts=["data-bs-slide-to","aria-current","aria-label"],es={class:"carousel-inner carousel-fade"},is=["src","alt"],as=W('<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" data-v-2a02578e><span class="carousel-control-prev-icon" aria-hidden="true" data-v-2a02578e></span><span class="visually-hidden" data-v-2a02578e>Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" data-v-2a02578e><span class="carousel-control-next-icon" aria-hidden="true" data-v-2a02578e></span><span class="visually-hidden" data-v-2a02578e>Next</span></button>',2),cs={class:"active-wrap"},os={class:"active-name"},ls={key:0,class:"active-class-wrap"},ns={key:0,class:"active-class"},rs={key:1,class:"active-class"},ds={class:"active-description-wrap mt-4"},us=p(()=>s("div",{class:"active-description-title"},"活動介紹：",-1)),_s={class:"active-description-content"},ps={class:"row mt-4"},vs={class:"col-lg-6"},ms={class:"bg-light border-radius p-4 mb-5"},hs={class:"active-description-title"},bs={class:"active-description-title"},gs={class:"active-description-title"},Ps={class:"active-description-title"},ys={class:"active-description-title"},fs=["href"],ws={class:"active-description-title"},ks={class:"active-description-title"},Cs={class:"col-lg-6 mb-5"},Ds=["src"],xs={class:"active-wrap"},Us={class:"active-title-wrap d-flex justify-content-between align-items-center mb-4"},As=p(()=>s("div",{class:"active-title title-underline"},"鄰近的活動",-1)),Ss={class:"active-more pointer"},$s=p(()=>s("img",{src:E,class:"arrow",alt:""},null,-1)),Ns=["onClick"],Ls={class:"overflow-hidden places-card shadow"},Is={class:"card-body"},Ts={class:"card-title"},zs={class:"text-muted"},Es=p(()=>s("i",{class:"bi bi-geo-alt"},null,-1)),Vs={class:"city"},qs={class:"active-wrap"},Bs={class:"active-title-wrap d-flex justify-content-between align-items-center mb-4"},Fs=p(()=>s("div",{class:"active-title title-underline"},"鄰近的景點",-1)),Os={class:"active-more pointer"},Rs=p(()=>s("img",{src:E,class:"arrow",alt:""},null,-1)),Ws=["onClick"],Ys={class:"overflow-hidden places-card shadow"},js={class:"card-body"},Ms={class:"card-title"},Js={class:"text-muted"},Gs=p(()=>s("i",{class:"bi bi-geo-alt"},null,-1)),Hs={class:"city"},Ks={__name:"ActiveDetail",setup(h){const C=O();let D=C.currentRoute.value.params.Id;const x=c=>B(c).format("YYYY/MM/DD"),f=_([]),U=_([]),A=_("");let b=_(""),g=_("");const S=_([]),$=_([]),N=async()=>{const c=`v2/Tourism/Activity?$filter=ActivityID%20eq%20'${D}'&$top=1&$format=JSON`,d=await w.fetchOne(c);console.log("cityUrl",c);const{data:e,status:u}=d;u==200&&(U.value=e,b.value=e[0].Position.PositionLat,g.value=e[0].Position.PositionLon,e[0].Picture!=null&&(f.value=[{url:e[0].Picture.PictureUrl1?e[0].Picture.PictureUrl1:"/src/assets/img/nullPicture.png",description:e[0].Picture.PictureDescription1?e[0].Picture.PictureDescription1:""},{url:e[0].Picture.PictureUrl2?e[0].Picture.PictureUrl2:"/src/assets/img/nullPicture.png",description:e[0].Picture.PictureDescription2?e[0].Picture.PictureDescription2:""},{url:e[0].Picture.PictureUrl3?e[0].Picture.PictureUrl3:"/src/assets/img/nullPicture.png",description:e[0].Picture.PictureDescription3?e[0].Picture.PictureDescription3:""}]),e[0].Position!=null&&(A.value=`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${b.value},${g.value}&z=16&output=embed&t=`))},V=async()=>{const c=`v2/Tourism/Activity?$spatialFilter=nearby(Position, ${b.value}, ${g.value}, 2000)`;console.log("placeUrl",c);const d=await w.fetchList(c),{data:e,status:u}=d;u==200&&(console.log("data",e),S.value=e.slice(0,4))},q=async()=>{const c=`v2/Tourism/ScenicSpot?$spatialFilter=nearby(Position, ${b.value}, ${g.value}, 2000)`;console.log("placeUrl",c);const d=await w.fetchList(c),{data:e,status:u}=d;u==200&&(console.log("data",e),$.value=e.slice(0,4))},L=async c=>{console.log("id",c),D=c;const d=`/activeDetail/${c}`;C.push(d),await N()};return R(async()=>{await N(),V(),q()}),(c,d)=>{const e=I("router-Link"),u=I("router-link");return o(!0),l(m,null,v(U.value,t=>(o(),l("div",{class:"detail container p-5",key:t},[s("nav",M,[s("ol",J,[s("li",G,[P(e,{to:{name:"Index"},class:"text-decoration-none"},{default:y(()=>[n("首頁")]),_:1})]),s("li",H,[P(e,{to:{name:"ActiveIndex"},class:"text-decoration-none"},{default:y(()=>[n("精選活動")]),_:1})]),s("li",K,i(t.City),1),s("li",Q,i(t.ActivityName),1)])]),s("div",X,[s("div",Z,[s("div",ss,[(o(!0),l(m,null,v(f.value,(a,r)=>(o(),l("button",{key:r,type:"button","data-bs-target":"#carouselExampleCaptions","data-bs-slide-to":r,class:T({active:r===0}),"aria-current":r===0?"true":"false","aria-label":`Slide ${r+1}`},null,10,ts))),128))]),s("div",es,[(o(!0),l(m,null,v(f.value,(a,r)=>(o(),l("div",{key:r,class:T({"carousel-item":!0,active:r===0})},[s("img",{src:a.url,class:"d-block w-100",alt:a.ActivityName},null,8,is)],2))),128))]),as])]),s("div",cs,[s("div",os,i(t.ActivityName),1),t.Class1||t.Class2?(o(),l("div",ls,[t.Class1?(o(),l("span",ns," # "+i(t.Class1),1)):k("",!0),t.Class2?(o(),l("span",rs," # "+i(t.Class2),1)):k("",!0)])):k("",!0),s("div",ds,[us,s("span",_s,i(t.Description?t.Description:"無"),1)]),s("div",ps,[s("div",vs,[s("div",ms,[s("div",hs,[n(" 活動時間："),s("span",null,i(x(t.StartTime))+" - "+i(x(t.EndTime)),1)]),s("div",bs,[n(" 聯絡電話："),s("span",null,i(t.Phone?t.Phone:"無"),1)]),s("div",gs,[n(" 主辦單位："),s("span",null,i(t.Organizer?t.Organizer:"無"),1)]),s("div",Ps,[n(" 活動地點："),s("span",null,i(t.Address?t.Address:t.Location?t.Location:"無"),1)]),s("div",ys,[n(" 官方網站："),s("a",{href:t.WebsiteUrl},[s("span",null,i(t.WebsiteUrl?t.WebsiteUrl:"無"),1)],8,fs)]),s("div",ws,[n(" 活動費用："),s("span",null,i(t.Charge?t.Charge:"無"),1)]),s("div",ks,[n(" 注意事項："),s("span",null,i(t.Remarks?t.Remarks:"無"),1)])])]),s("div",Cs,[s("iframe",{class:"map border-radius",src:A.value}," ",8,Ds)]),s("div",xs,[s("div",Us,[As,s("div",Ss,[P(u,{to:{name:"ActiveIndex"}},{default:y(()=>[n(" 查看更多活動"),$s]),_:1})])])]),(o(!0),l(m,null,v(S.value,a=>(o(),l("div",{class:"card col-lg-3 col-md-6",key:a,onClick:r=>L(a.ActivityID)},[s("div",Ls,[s("div",{class:"card-img",style:z({"background-image":"url("+(a.Picture.PictureUrl1?a.Picture.PictureUrl1:"/src/assets/img/nullPicture.png")+")"})},null,4)]),s("div",Is,[s("div",Ts,i(a.ActivityName),1),s("div",zs,[Es,s("span",Vs,i(a.Address),1)])])],8,Ns))),128)),s("div",qs,[s("div",Bs,[Fs,s("div",Os,[P(u,{to:{name:"PlacesIndex"}},{default:y(()=>[n(" 查看更多景點"),Rs]),_:1})])])]),(o(!0),l(m,null,v($.value,a=>(o(),l("div",{class:"card col-lg-3 col-md-6",key:a,onClick:r=>L(a.ScenicSpotID)},[s("div",Ys,[s("div",{class:"card-img",style:z({"background-image":"url("+(a.Picture.PictureUrl1?a.Picture.PictureUrl1:"/src/assets/img/nullPicture.png")+")"})},null,4)]),s("div",js,[s("div",Ms,i(a.ScenicSpotName),1),s("div",Js,[Gs,s("span",Hs,i(a.City),1)])])],8,Ws))),128))])])]))),128)}}},st=F(Ks,[["__scopeId","data-v-2a02578e"]]);export{st as default};
