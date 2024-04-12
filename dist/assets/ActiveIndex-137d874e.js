import{h as J,u as K,r as n,s as Q,x as W,i as X,a as T,o as l,c as i,b as e,d as Y,e as Z,j,v as B,F as U,k as S,l as r,f as y,y as p,t as c,z as ee,A as se,g as te}from"./index-b38aff00.js";import{_ as ae}from"./Union-c033cb20.js";import{_ as le}from"./noData-e0e046d0.js";import{a as D,c as R,d as ie}from"./cities-3b3f330e.js";const E=[{name:"節慶活動",imgUrl:"https://i.pinimg.com/564x/35/34/f0/3534f027e430859f29f12b0c2879109e.jpg",value:"節慶活動"},{name:"自行車活動",imgUrl:"https://i.pinimg.com/564x/96/f4/d8/96f4d8bf239ec25fe3d4e90883ec8c63.jpg",value:"自行車活動"},{name:"遊憩活動",imgUrl:"https://i.pinimg.com/564x/3c/ce/3f/3cce3fc73b23fa99b40c0eda11993fd0.jpg",value:"遊憩活動"},{name:"產業文化",imgUrl:"https://i.pinimg.com/564x/30/82/b3/3082b3b9cd7e8e4ec0d7abf357d1def6.jpg",value:"產業文化活動"},{name:"年度活動",imgUrl:"https://i.pinimg.com/564x/3e/ba/26/3eba261615b744436e71a04b9efbd454.jpg",value:"年度活動"},{name:"四季活動",imgUrl:"https://i.pinimg.com/564x/17/60/a2/1760a2a863c457afcd4d6d196c4ecac1.jpg",value:"四季活動"},{name:"藝文活動",imgUrl:"https://i.pinimg.com/564x/4f/2e/d5/4f2ed578e508e1b7fea48daa85728bb5.jpg",value:"藝文活動"}],ce={class:"purpose-index container p-5"},oe={"aria-label":"breadcrumb",class:"py-2 mt-3"},ne={class:"breadcrumb"},de={class:"breadcrumb-item"},re={class:"row py-4 d-flex"},ue={class:"col-lg-3 mb-3"},me={class:"select-wrap"},ve=e("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇縣市",-1),_e=["value"],pe={class:"col-lg-3 mb-3"},he=e("option",{value:"",selected:"",disabled:"",hidden:""},"請選擇主題",-1),ge=["value"],fe=e("span",{class:"search-img"},[e("img",{src:ae,alt:""})],-1),be={key:0},ye=e("div",{class:"index-title"},"熱門主題",-1),ke={class:"card-wrap row"},Ce=["onClick"],xe=["src","alt"],we={class:"active-title"},Ae={key:1},Ue={class:"index-title"},Se={class:"search-all"},De={class:"search-count"},Ve={class:"all-data d-flex mt-2 w-100"},je=e("label",null,"顯示已過期活動",-1),Ie={key:0,class:"row"},Le=te('<div class="no-data-wrap pt-5 col-lg-3 col-md-6"><div class="no-data-container"><div class="no-data-img"><div class="no-data-circle"><img src="'+le+'" alt=""></div></div><div class="no-data-info pt-2">很抱歉，找不到任何資料!</div></div></div>',1),Pe=[Le],$e={key:1,class:"row"},Ne=["onClick"],Me={class:"overflow-hidden places-card shadow"},Te={class:"card-img search-card-img"},Ye=["src","alt"],Be={class:"card-body"},Re={class:"card-date"},Ee={class:"card-title"},Fe={class:"text-muted"},ze={class:"active-location"},He=e("i",{class:"bi bi-geo-alt"},null,-1),Oe={class:"city"},qe={key:0,class:"active-class-icon"},Ge=e("i",{class:"bi bi-tag"},null,-1),Je=[Ge],Ke={key:1,class:"active-class"},Qe={key:2,class:"active-class"},We={class:"pagination mt-5"},V="Activity",ls={__name:"ActiveIndex",setup(Xe){const k=J(),u=K(),I=new Date().toISOString(),L=a=>ie(a).format("YYYY/MM/DD"),C=n(1),h=n([]),P=n(),x=n(),d=n(u.params.city||""),o=n(u.params.active||"");let $=n(),_=n(0),f=n(!1),g=n(!1),m=[],w=n([]);const v={city:String,class:String},F=a=>{C.value=a},z=Q(()=>{const a=(C.value-1)*12,t=a+12;return g.value?(_.value=w.value.length,w.value.slice(a,t)):(_.value=h.value.length,h.value.slice(a,t))}),N=async()=>{const a=d.value!=="",t=o.value!=="";a&&t?(x.value=o.value,m=await D.fetchCityClassList(V,`${d.value}`,`${o.value}`)):a?m=await D.fetchCityList(V,`${d.value}`,""):t&&(x.value=o.value,m=await D.fetchCityClassList(V,"",`${o.value}`)),m.length>0&&(f.value=!0),w.value=m,h.value=m.filter(b=>b.StartTime>=I),_.value=h.value.length;const A=R.find(b=>b.value===d.value);P.value=A?A.name:"",v.city=d.value,v.class=o.value,k.replace({name:"ActiveIndex",params:v})},H=()=>{d.value="",o.value="",f.value=!1,g.value=!1,v.city="",v.class="",k.replace({name:"ActiveIndex",params:v})},O=a=>{$.value=a;const t=`/activeDetail/${$.value}`;k.push({path:t})},q=async a=>{m=await D.fetchCityClassList(V,"",`${a}`),f.value=!0,x.value=a,w.value=m,h.value=m.filter(t=>t.StartTime>=I),_.value=h.value.length,v.city="",v.class=a,k.replace({name:"ActiveIndex",params:v})},G=()=>{d.value="",o.value=""};return W(u,()=>{u.params.city!==void 0&&(d.value=u.params.city),u.params.active!==void 0&&(o.value=u.params.active)}),X(()=>{u.params.city,u.params.class,N()}),(a,t)=>{const A=T("router-Link"),b=T("vue-awesome-paginate");return l(),i("div",ce,[e("nav",oe,[e("ol",ne,[e("li",de,[Y(A,{to:{name:"Index"},class:"text-decoration-none"},{default:Z(()=>[y("首頁")]),_:1})]),e("li",{class:"breadcrumb-item"},[e("a",{onClick:H,class:"text-decoration-none"},"精選活動 ")])])]),e("div",re,[e("div",ue,[e("div",me,[j(e("select",{class:"form-select","onUpdate:modelValue":t[0]||(t[0]=s=>d.value=s)},[ve,(l(!0),i(U,null,S(r(R),s=>(l(),i("option",{value:s.value,key:s.value},c(s.name),9,_e))),128))],512),[[B,d.value]])])]),e("div",pe,[j(e("select",{class:"form-select","onUpdate:modelValue":t[1]||(t[1]=s=>o.value=s)},[he,(l(!0),i(U,null,S(r(E),s=>(l(),i("option",{value:s.name,key:s.name},c(s.name),9,ge))),128))],512),[[B,o.value]])]),e("div",{class:"form-btn col-lg-3 mb-3"},[e("button",{class:"search-btn",onClick:N},[fe,y(" 搜尋 ")]),e("button",{class:"search-btn clear-btn",onClick:G},"清除")])]),r(f)?p("",!0):(l(),i("div",be,[ye,e("div",ke,[(l(!0),i(U,null,S(r(E),s=>(l(),i("div",{class:"card g-3 col-lg-3 col-md-6",key:s.name},[e("div",{class:"card-img",onClick:M=>q(s.name)},[e("img",{src:s.imgUrl,alt:s.name},null,8,xe)],8,Ce),e("span",we,c(s.name),1)]))),128))])])),r(f)?(l(),i("div",Ae,[e("div",Ue,[y(c(P.value)+" "+c(x.value)+" 搜尋結果 ",1),e("span",Se,[y("共有 "),e("span",De,c(r(_)),1),y(" 筆")])]),e("div",Ve,[j(e("input",{type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=s=>se(g)?g.value=s:g=s),onClick:t[3]||(t[3]=(...s)=>a.test&&a.test(...s))},null,512),[[ee,r(g)]]),je]),r(_)==0?(l(),i("div",Ie,Pe)):p("",!0),r(_)>0?(l(),i("div",$e,[(l(!0),i(U,null,S(z.value,(s,M)=>(l(),i("div",{class:"card g-3 col-lg-3 col-md-6",key:M,onClick:Ze=>O(s.ActivityID)},[e("div",Me,[e("div",Te,[e("img",{src:s.Picture.PictureUrl1?s.Picture.PictureUrl1:"src/assets/img/nullPicture.png",alt:s.ActivityName},null,8,Ye)])]),e("div",Be,[e("div",Re,c(L(s.StartTime))+" - "+c(L(s.EndTime)),1),e("div",Ee,c(s.ActivityName),1),e("div",Fe,[e("div",ze,[He,e("span",Oe,c(s.Address),1)]),s.Class1||s.Class2?(l(),i("span",qe,Je)):p("",!0),s.Class1?(l(),i("span",Ke," # "+c(s.Class1),1)):p("",!0),s.Class2?(l(),i("span",Qe," # "+c(s.Class2),1)):p("",!0)])])],8,Ne))),128)),e("div",We,[Y(b,{"total-items":r(_),"items-per-page":12,"max-pages-shown":4,modelValue:C.value,"onUpdate:modelValue":t[4]||(t[4]=s=>C.value=s),"on-click":F},null,8,["total-items","modelValue"])])])):p("",!0)])):p("",!0)])}}};export{ls as default};
