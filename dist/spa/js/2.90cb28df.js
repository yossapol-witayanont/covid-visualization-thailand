(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"713b":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{attrs:{view:"lHh Lpr lFf"}},[n("q-header",{staticClass:"bg-positive",attrs:{elevated:""}},[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}}),n("q-toolbar-title",[e._v("\n        "+e._s(e.$t("title"))+"\n      ")]),n("language-switcher")],1)],1),n("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[n("q-list",[n("q-item-label",{staticClass:"text-grey-8",attrs:{header:""}},[e._v("\n        Essential Links\n      ")]),e._l(e.essentialLinks,(function(t){return n("EssentialLink",e._b({key:t.title},"EssentialLink",t,!1))}))],2)],1),n("q-page-container",[n("router-view")],1)],1)},l=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-item",{attrs:{clickable:"",tag:"a",target:"_blank",href:e.link}},[e.icon?n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:e.icon}})],1):e._e(),n("q-item-section",[n("q-item-label",[e._v(e._s(e.title))]),n("q-item-label",{attrs:{caption:""}},[e._v("\n      "+e._s(e.caption)+"\n    ")])],1)],1)},s=[],r=n("e4fd"),o=Object(r["defineComponent"])({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}}),c=o,u=n("2877"),p=n("66e5"),b=n("4074"),d=n("0016"),f=n("0170"),m=n("eebe"),g=n.n(m),h=Object(u["a"])(c,i,s,!1,null,null,null),v=h.exports;g()(h,"components",{QItem:p["a"],QItemSection:b["a"],QIcon:d["a"],QItemLabel:f["a"]});var w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-select",{staticStyle:{"min-width":"100px"},attrs:{options:e.langOptions,label:"Language",dense:"",borderless:"","emit-value":"","map-options":"","options-dense":""},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}})},k=[],q=n("2b0e"),_=n("a925"),L=q["default"].extend({data(){return{lang:this.$i18n.locale,langOptions:[{value:"en-us",label:"English"},{value:"th-th",label:"Thai"}]}},watch:{lang(e){this.$i18n instanceof _["a"]&&(this.$i18n.locale=e)}}}),O=L,Q=n("ddd8"),y=Object(u["a"])(O,w,k,!1,null,null,null),D=y.exports;g()(y,"components",{QSelect:Q["a"]});const E=[{title:"API Reference",caption:"Department of Disease Control",icon:"code",link:"https://covid19.th-stat.com/en/api"}];var x=Object(r["defineComponent"])({name:"MainLayout",components:{EssentialLink:v,LanguageSwitcher:D},setup(){const e=Object(r["ref"])(!1),t=Object(r["ref"])(E);return{leftDrawerOpen:e,essentialLinks:t}}}),S=x,j=n("4d5a"),$=n("e359"),C=n("65c6"),I=n("9c40"),T=n("6ac5"),H=n("9404"),J=n("1c1c"),M=n("09e3"),P=Object(u["a"])(S,a,l,!1,null,null,null);t["default"]=P.exports;g()(P,"components",{QLayout:j["a"],QHeader:$["a"],QToolbar:C["a"],QBtn:I["a"],QToolbarTitle:T["a"],QDrawer:H["a"],QList:J["a"],QItemLabel:f["a"],QPageContainer:M["a"]})}}]);