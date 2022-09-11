"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[292],{36292:function(e,n,t){t.r(n),t.d(n,{default:function(){return me}});var i,r,l=t(72791),a=t(4567),s=t(16030),o=t(64554),c=t(4841),d=t(39281),u=t(62155),m=t(9195),h=t(22041),x=t(15416),g=t(68745),j=t(24698),Z=t(29464),p=t(70885),f=t(65661),v=t(39157),b=t(97123),w=t(30439),P=t(5574),F=t(81153),q=t(48934),C=t(54901),E=t(92506),S=t(93006),y=t(18899),M=t(80184),W=function(e){var n=e.formField,t=n.name,i=n.desc,r=n.students,a=n.id,o=n.teacher,c=n.language,d=(0,s.I0)(),u=(0,s.v9)(j.zv),m=u.studentsAutocompleteValues,h=u.teachersValues,x=u.languagesValues;return(0,l.useEffect)((function(){d((0,j.y6)())}),[]),(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(F.ZP,{container:!0,children:[(0,M.jsx)(F.ZP,{item:!0,xs:12,sm:12,children:(0,M.jsx)(q.Z,{margin:"dense",name:t.name,label:t.label,fullWidth:!0})}),(0,M.jsx)(F.ZP,{item:!0,xs:12,sm:12,children:(0,M.jsx)(q.Z,{margin:"dense",multiline:!0,maxRows:4,name:i.name,label:i.label,fullWidth:!0})}),(0,M.jsx)(F.ZP,{item:!0,xs:12,sm:12,children:(0,M.jsx)(E.gN,{margin:"dense",name:r.name,component:C.Z,options:m,groupBy:function(e){return e.label[0]},textFieldProps:{fullWidth:!0,margin:"normal",variant:"outlined",label:r.label},multiple:!0})}),(0,M.jsx)(F.ZP,{item:!0,xs:12,sm:12,sx:{marginTop:2},children:(0,M.jsx)(y.Z,{name:o.name,label:o.label,data:h,fullWidth:!0})}),(0,M.jsx)(F.ZP,{item:!0,xs:12,sm:12,sx:{marginTop:2},children:(0,M.jsx)(y.Z,{name:c.name,label:c.label,data:x,fullWidth:!0})})]}),(0,M.jsx)(S.Z,{name:a.name,type:"hidden",style:{display:"none"}})]})},k="addGroupForm",N={name:{name:"name",label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435*",requiredErrorMsg:"\u0418\u043c\u044f \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f!"},desc:{name:"desc",label:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"},students:{name:"students",label:"\u0423\u0447\u0435\u043d\u0438\u043a\u0438",requiredErrorMsg:"\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432!"},id:{name:"id"},teacher:{name:"teacher",label:"\u0423\u0447\u0438\u0442\u0435\u043b\u044c",requiredErrorMsg:"\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0447\u0438\u0442\u0435\u043b\u044f!"},language:{name:"language",label:"\u042f\u0437\u044b\u043a",requiredErrorMsg:"\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u044f\u0437\u044b\u043a!"}},I=t(4942),T=t(76863),z=N,V=z.name,A=z.students,B=z.teacher,R=z.language,Y=T.Ry().shape((i={},(0,I.Z)(i,V.name,T.Z_().required("".concat(V.requiredErrorMsg))),(0,I.Z)(i,B.name,T.Z_().nullable().required("".concat(B.requiredErrorMsg))),(0,I.Z)(i,R.name,T.Z_().nullable().required("".concat(R.requiredErrorMsg))),(0,I.Z)(i,A.name,T.IX().required("".concat(A.requiredErrorMsg))),i)),_=N,D=_.name,L=_.desc,O=_.students,G=_.id,J=_.teacher,Q=_.language,X=(r={},(0,I.Z)(r,D.name,""),(0,I.Z)(r,L.name,""),(0,I.Z)(r,O.name,[]),(0,I.Z)(r,J.name,void 0),(0,I.Z)(r,Q.name,void 0),(0,I.Z)(r,G.name,void 0),r),H=k,K=N,U=function(e){var n=e.open,t=e.close,i=e.group,r=(0,s.I0)(),a=(0,l.useState)(X),o=(0,p.Z)(a,2),c=o[0],d=o[1];(0,l.useEffect)((function(){u()}),[]);var u=function(){var e,n,t=null===i||void 0===i||null===(e=i.students)||void 0===e?void 0:e.map((function(e){return{label:"".concat(e.lastName," ").concat(e.firstName),value:String(e.id)}}));d({name:null===i||void 0===i?void 0:i.name.toString(),desc:null===i||void 0===i||null===(n=i.description)||void 0===n?void 0:n.toString(),students:t,id:null===i||void 0===i?void 0:i.id,teacher:String(null===i||void 0===i?void 0:i.teacher.id),language:String(null===i||void 0===i?void 0:i.language.id)})};return(0,M.jsxs)(P.Z,{open:n,onClose:t,fullWidth:!0,maxWidth:"sm",children:[(0,M.jsx)(f.Z,{children:i?"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435 \u0434\u0430\u043d\u043d\u044b\u0445 \u0433\u0440\u0443\u043f\u043f\u044b":"\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0439 \u0433\u0440\u0443\u043f\u043f\u044b"}),(0,M.jsx)(E.J9,{onSubmit:function(e,n){r((0,j.Cr)(e)),t()},initialValues:c,validationSchema:Y,validateOnChange:!0,children:function(e){e.isSubmitting;return(0,M.jsxs)(E.l0,{id:H,children:[(0,M.jsx)(v.Z,{children:(0,M.jsx)(W,{formField:K})}),(0,M.jsxs)(b.Z,{children:[(0,M.jsx)(w.Z,{type:"submit",color:"primary",children:"\u041e\u043a"}),(0,M.jsx)(w.Z,{onClick:t,color:"secondary",children:"\u041e\u0442\u043c\u0435\u043d\u0430"})]})]})}})]})},$=t(90977),ee=t(42419),ne=t(10151),te=function(){var e=(0,l.useState)(!1),n=(0,p.Z)(e,2),t=n[0],i=n[1];return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(U,{open:t,close:function(){i(!1)}}),(0,M.jsx)(ne.Z,{title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c",children:(0,M.jsx)($.Z,{onClick:function(){i(!0)},children:(0,M.jsx)(ee.Z,{})})})]})},ie=function(){return(0,M.jsx)(M.Fragment,{children:(0,M.jsxs)(Z.Z,{children:[(0,M.jsx)(a.Z,{sx:{flex:"1 1 100%"},variant:"h6",id:"tableTitle",component:"div",children:"\u0423\u0447\u0435\u0431\u043d\u044b\u0435 \u0433\u0440\u0443\u043f\u043f\u044b"}),(0,M.jsx)(te,{})]})})},re=t(41286),le=function(e){var n=e.group,t=(0,l.useState)(!1),i=(0,p.Z)(t,2),r=i[0],a=i[1];return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(U,{open:r,close:function(){a(!1)},group:n}),(0,M.jsx)(ne.Z,{title:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c",children:(0,M.jsx)($.Z,{onClick:function(){a(!0)},children:(0,M.jsx)(re.Z,{})})})]})},ae=t(28178),se=t(20186),oe=t(86540),ce=function(){var e=(0,s.I0)(),n=(0,s.v9)(j.zv),t=n.groupsData,i=n.page,r=n.rowsPerPage,a=n.isLoading,Z=function(){e((0,j.Yw)(i,r))};(0,l.useEffect)((function(){Z()}),[i,r]);var p=[{text:"\u041a\u043e\u0434",align:"left"},{text:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",align:"center"},{text:"\u0423\u0447\u0438\u0442\u0435\u043b\u044c",align:"center"},{text:"\u042f\u0437\u044b\u043a",align:"center"},{text:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432",align:"center"},{text:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",align:"center"},{text:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f",align:"right"}];return(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(o.Z,{sx:{width:"100%"},children:(0,M.jsx)(c.Z,{sx:{width:"100%",mb:2},children:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(ie,{}),(0,M.jsxs)(d.Z,{component:c.Z,children:[(0,M.jsxs)(x.Z,{sx:{minWidth:1e3},"aria-labelledby":"tableTitle",size:"medium",children:[(0,M.jsx)(h.Z,{children:(0,M.jsx)(m.Z,{children:p.map((function(e){return(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(g.Z,{align:e.align,children:(0,M.jsx)("b",{children:e.text})})})}))})}),(0,M.jsx)(u.Z,{children:!a&&t?(0,M.jsx)(M.Fragment,{children:t.data.length?(0,M.jsx)(M.Fragment,{children:t.data.map((function(n){var t,i,r;return(0,M.jsxs)(m.Z,{children:[(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"left",children:n.id}),(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"center",children:n.name}),(0,M.jsxs)(g.Z,{component:"th",scope:"row",align:"center",children:[n.teacher.lastName," ",n.teacher.firstName," ",null!==(t=n.teacher.middleName)&&void 0!==t?t:""]}),(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"center",children:null===(i=n.language)||void 0===i?void 0:i.name}),(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"center",children:null===(r=n.students)||void 0===r?void 0:r.length}),(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"center",children:n.description}),(0,M.jsxs)(g.Z,{component:"th",scope:"row",align:"right",children:[(0,M.jsx)(le,{group:n}),(0,M.jsx)(oe.Z,{id:n.id,confirmationText:"\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443?",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443?",onDeleteMethod:function(){e((0,j.nz)(n.id))}})]})]},n.id)}))}):(0,M.jsx)(m.Z,{sx:{"& > *":{borderBottom:"unset"}},children:(0,M.jsx)(g.Z,{component:"th",scope:"row",align:"center",children:"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442 \u0434\u0430\u043d\u043d\u044b\u0435"},4)})}):(0,M.jsx)(se.Z,{columnsCount:p.length})})]}),t?(0,M.jsx)(ae.Z,{rowsPerPageOptions:[5,10,15],component:"div",count:null===t||void 0===t?void 0:t.meta.itemCount,rowsPerPage:r,page:i,onPageChange:function(n,t){e((0,j.YA)(t)),Z()},onRowsPerPageChange:function(n){e((0,j.vB)(parseInt(n.target.value,10))),e((0,j.YA)(0)),Z()}}):null]})]})})})})},de=t(92465),ue=t(9812),me=function(){(0,s.v9)(de.Qj).isLoading;return(0,M.jsx)(M.Fragment,{children:(0,M.jsxs)(ue.Z,{title:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u0430\u043c\u0438",children:[(0,M.jsx)(a.Z,{variant:"h4",sx:{mb:6},children:"\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u0430\u043c\u0438"}),(0,M.jsx)(ce,{})]})})}}}]);
//# sourceMappingURL=292.02c65a9c.chunk.js.map