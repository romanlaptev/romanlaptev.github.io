var jg_ihtm,jg_ie,jg_fast,jg_dom,jg_moz,jg_n4=(document.layers&&typeof document.classes!="undefined");function chkDHTM(_,q){_=document.body||null;jg_ie=_&&typeof _.insertAdjacentHTML!="undefined";jg_dom=(_&&!jg_ie&&typeof _.appendChild!="undefined"&&typeof document.createRange!="undefined"&&typeof(q=document.createRange()).setStartBefore!="undefined"&&typeof q.createContextualFragment!="undefined");jg_ihtm=!jg_ie&&!jg_dom&&_&&typeof _.innerHTML!="undefined";jg_fast=jg_ie&&document.all&&!window.opera;jg_moz=jg_dom&&typeof _.style.MozOpacity!="undefined"}
function pntDoc()
{
var _=this;_.wnd.document.write(jg_fast?_.htmRpc():_.htm);_.htm=''
}

function pntCnvDom()
{
var _=this,q=document.createRange();
q.setStartBefore(_.cnv);
q=q.createContextualFragment(jg_fast?_.htmRpc():_.htm);_.cnv.appendChild(q);_.htm=''
}

function pntCnvIe()
{
var _=this;_.cnv.insertAdjacentHTML("BeforeEnd",jg_fast?_.htmRpc():_.htm);_.htm=''
}

function pntCnvIhtm()
{
var _=this;_.cnv.innerHTML+=_.htm;_.htm=''
}

function pntCnv(){this.htm=''}

function mkDiv(q,e,w,r){var _=this;_.htm+='<div style="position:absolute;'+'left:'+q+'px;'+'top:'+e+'px;'+'width:'+w+'px;'+'height:'+r+'px;'+'clip:rect(0,'+w+'px,'+r+'px,0);'+'background-color:'+_.color+(!jg_moz?';overflow:hidden':'')+';"><\/div>'}

function mkDivIe(q,e,w,r){var _=this;_.htm+='%%'+_.color+';'+q+';'+e+';'+w+';'+r+';'}

function mkDivPrt(q,e,w,r){var _=this;_.htm+='<div style="position:absolute;'+'border-left:'+w+'px solid '+_.color+';'+'left:'+q+'px;'+'top:'+e+'px;'+'width:0px;'+'height:'+r+'px;'+'clip:rect(0,'+w+'px,'+r+'px,0);'+'background-color:'+_.color+(!jg_moz?';overflow:hidden':'')+';"><\/div>'}

function mkLyr(q,e,w,r){var _=this;_.htm+='<layer '+'left="'+q+'" '+'top="'+e+'" '+'width="'+w+'" '+'height="'+r+'" '+'bgcolor="'+_.color+'"><\/layer>\n'}

var regex=/%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;function htmRpc(){return this.htm.replace(regex,'<div style="overflow:hidden;position:absolute;background-color:'+'$1;left:$2;top:$3;width:$4;height:$5"></div>\n')}

function htmPrtRpc(){return this.htm.replace(regex,'<div style="overflow:hidden;position:absolute;background-color:'+'$1;left:$2;top:$3;width:$4;height:$5;border-left:$4px solid $1"></div>\n')}

function mkLin(o,i,y,r){var _=this;if(o>y){var s=y,d=r;y=o;r=i;o=s;i=d}

var a=y-o,u=Math.abs(r-i),f=o,h=i,q=(i>r)?-1:1;if(a>=u){var t=u<<1,w=t-(a<<1),g=t-a,p=f;while((a--)>0){++f;if(g>0){_.mkDiv(p,h,f-p,1);h+=q;g+=w;p=f}else g+=t}
_.mkDiv(p,h,y-p+1,1)}else{var t=a<<1,w=t-(u<<1),g=t-u,e=h;if(r<=i){while((u--)>0){if(g>0){_.mkDiv(f++,h,1,e-h+1);h+=q;g+=w;e=h}else{h+=q;g+=t}}
_.mkDiv(y,r,1,e-r+1)}else{while((u--)>0){h+=q;if(g>0){_.mkDiv(f++,e,1,h-e);g+=w;e=h}else g+=t}
_.mkDiv(y,e,1,r-e+1)}}}

function mkLin2D(s,a,p,i){var _=this;if(s>p){var f=p;var g=i;p=s;i=a;s=f;a=g}
var e=p-s,r=Math.abs(i-a),j=s,l=a,q=(a>i)?-1:1;var k=_.stroke;if(e>=r){if(e>0&&k-3>0){var w=(k*e*Math.sqrt(1+r*r/(e*e))-e-(k>>1)*r)/e;w=(!(k-4)?Math.ceil(w):Math.round(w))+1}else var w=k;var y=Math.ceil(k/2);var u=r<<1,t=u-(e<<1),h=u-e,d=j;while((e--)>0){++j;if(h>0){_.mkDiv(d,l,j-d+y,w);l+=q;h+=t;d=j}else h+=u}
_.mkDiv(d,l,p-d+y+1,w)}else{if(k-3>0){var w=(k*r*Math.sqrt(1+e*e/(r*r))-(k>>1)*e-r)/r;w=(!(k-4)?Math.ceil(w):Math.round(w))+1}else var w=k;var y=Math.round(k/2);var u=e<<1,t=u-(r<<1),h=u-r,o=l;if(i<=a){++y;while((r--)>0){if(h>0){_.mkDiv(j++,l,w,o-l+y);l+=q;h+=t;o=l}else{l+=q;h+=u}}
_.mkDiv(p,i,w,o-i+y)}else{while((r--)>0){l+=q;if(h>0){_.mkDiv(j++,o,w,l-o+y);h+=t;o=l}else h+=u}
_.mkDiv(p,o,w,i-o+y+1)}}}

function mkLinDott(t,y,o,p){var _=this;if(t>o){var a=o,s=p;o=t;p=y;t=a;y=s}
var i=o-t,u=Math.abs(p-y),d=t,g=y,w=(y>p)?-1:1,q=true;if(i>=u){var e=u<<1,r=e-(i<<1),f=e-i;while((i--)>0){if(q) _.mkDiv(d,g,1,1);q=!q;if(f>0){g+=w;f+=r}else f+=e;++d}
if(q) _.mkDiv(d,g,1,1)}else{var e=i<<1,r=e-(u<<1),f=e-u;while((u--)>0){if(q) _.mkDiv(d,g,1,1);q=!q;g+=w;if(f>0){++d;f+=r}else f+=e}
if(q) _.mkDiv(d,g,1,1)}}

function mkOv(p,f,e,q){var _=this,g=e>>1,z=q>>1,t=e&1,w=(q&1)+1,o=p+g,a=f+z,k=0,h=z,y=0,r=z,i=(g*g)<<1,u=(z*z)<<1,s=(i>>1)*(1-(z<<1))+u,d=(u>>1)-i*((z<<1)-1),l,j;while(h>0){if(s<0){s+=u*((k<<1)+3);d+=(u<<1)*(++k)}else if(d<0){s+=u*((k<<1)+3)-(i<<1)*(h-1);d+=(u<<1)*(++k)-i*(((h--)<<1)-3);l=k-y;j=r-h;if(l&2&&j&2){_.mkOvQds(o,a,-k+2,y+t,-r,r-1+w,1,1);_.mkOvQds(o,a,-k+1,k-1+t,-h-1,h+w,1,1)}else _.mkOvQds(o,a,-k+1,y+t,-r,r-j+w,l,j);y=k;r=h}else{d-=i*((h<<1)-3);s-=(i<<1)*(--h)}}
_.mkDiv(o-g,a-r,g-y+1,(r<<1)+w);_.mkDiv(o+y+t,a-r,g-y+1,(r<<1)+w)}

function mkOv2D(b,m,e,w){var _=this,R=_.stroke;e+=R-1;w+=R-1;var S=e>>1,U=w>>1,p=e&1,u=(w&1)+1,x=b+S,z=m+U,Y=0,T=U,d=(S*S)<<1,f=(U*U)<<1,l=(d>>1)*(1-(U<<1))+f,k=(f>>1)-d*((U<<1)-1);if(R-4<0&&(!(R-2)||e-51>0&&w-51>0)){var s=0,r=U,P,I,t,E,y,W,a;while(T>0){if(l<0){l+=f*((Y<<1)+3);k+=(f<<1)*(++Y)}else if(k<0){l+=f*((Y<<1)+3)-(d<<1)*(T-1);k+=(f<<1)*(++Y)-d*(((T--)<<1)-3);P=Y-s;I=r-T;if(P-1){a=P+1+(R&1);I=R}else if(I-1){a=R;I+=1+(R&1)}else a=I=R;_.mkOvQds(x,z,-Y+1,s-a+P+p,-r,-I+r+u,a,I);s=Y;r=T}else{k-=d*((T<<1)-3);l-=(d<<1)*(--T)}}
_.mkDiv(x-S,z-r,R,(r<<1)+u);_.mkDiv(x+S+p-R+1,z-r,R,(r<<1)+u)}else{var Q=(e-((R-1)<<1))>>1,v=(w-((R-1)<<1))>>1,n=0,c=v,o=(Q*Q)<<1,i=(v*v)<<1,g=(o>>1)*(1-(v<<1))+i,j=(i>>1)-o*((v<<1)-1),t=[],y=[],q=[];t[0]=0;y[0]=U;q[0]=v-1;while(T>0){if(l<0){l+=f*((Y<<1)+3);k+=(f<<1)*(++Y);t[t.length]=Y;y[y.length]=T}else if(k<0){l+=f*((Y<<1)+3)-(d<<1)*(T-1);k+=(f<<1)*(++Y)-d*(((T--)<<1)-3);t[t.length]=Y;y[y.length]=T}else{k-=d*((T<<1)-3);l-=(d<<1)*(--T)}
if(c>0){if(g<0){g+=i*((n<<1)+3);j+=(i<<1)*(++n);q[q.length]=c-1}else if(j<0){g+=i*((n<<1)+3)-(o<<1)*(c-1);j+=(i<<1)*(++n)-o*(((c--)<<1)-3);q[q.length]=c-1}else{j-=o*((c<<1)-3);g-=(o<<1)*(--c);q[q.length-1]--}}}
var s=0,r=U,h=q[0],A=t.length,P,I;for(var O=0;O<A;O++){if(typeof q[O]!="undefined"){if(q[O]<h||y[O]<r){Y=t[O];_.mkOvQds(x,z,-Y+1,s+p,-r,h+u,Y-s,r-h);s=Y;r=y[O];h=q[O]}}else{Y=t[O];_.mkDiv(x-Y+1,z-r,1,(r<<1)+u);_.mkDiv(x+s+p,z-r,1,(r<<1)+u);s=Y;r=y[O]}}
_.mkDiv(x-S,z-r,1,(r<<1)+u);_.mkDiv(x+s+p,z-r,1,(r<<1)+u)}}

function mkOvDott(y,p,q,_){var j=q>>1,f=_>>1,a=q&1,o=_&1,d=y+j,s=p+f,h=0,g=f,w=(j*j)<<1,t=w<<1,r=(f*f)<<1,i=(w>>1)*(1-(f<<1))+r,u=(r>>1)-w*((f<<1)-1),e=true;while(g>0){if(i<0){i+=r*((h<<1)+3);u+=(r<<1)*(++h)}else if(u<0){i+=r*((h<<1)+3)-t*(g-1);u+=(r<<1)*(++h)-w*(((g--)<<1)-3)}else{u-=w*((g<<1)-3);i-=t*(--g)}
if(e) this.mkOvQds(d,s,-h,h+a,-g,g+o,1,1);e=!e}}

function mkRect(r,w,e,t){var _=this,q=_.stroke;_.mkDiv(r,w,e,q);_.mkDiv(r+e,w,q,t);_.mkDiv(r,w+t,e+q,q);_.mkDiv(r,w+q,q,t-q)}

function mkRectDott(q,e,w,r){var _=this;_.drawLine(q,e,q+w,e);_.drawLine(q+w,e,q+w,e+r);_.drawLine(q,e+r,q+w,e+r);_.drawLine(q,e,q,e+r)}

function jsgFont(){var _=this;_.PLAIN='font-weight:normal;';_.BOLD='font-weight:bold;';_.ITALIC='font-style:italic;';_.ITALIC_BOLD=_.ITALIC+_.BOLD;_.BOLD_ITALIC=_.ITALIC_BOLD}
var Font=new jsgFont;function jsgStroke(){this.DOTTED=-1}
var Stroke=new jsgStroke;function jsGraphics(id,wnd){this.setColor=new Function('arg','this.color = arg.toLowerCase();');this.setStroke=function(x){this.stroke=x;if(!(x+1)){this.drawLine=mkLinDott;this.mkOv=mkOvDott;this.drawRect=mkRectDott}else if(x-1>0){this.drawLine=mkLin2D;this.mkOv=mkOv2D;this.drawRect=mkRect}else{this.drawLine=mkLin;this.mkOv=mkOv;this.drawRect=mkRect}};this.setPrintable=function(arg){this.printable=arg;if(jg_fast){this.mkDiv=mkDivIe;this.htmRpc=arg?htmPrtRpc:htmRpc}else this.mkDiv=jg_n4?mkLyr:arg?mkDivPrt:mkDiv};this.setFont=function(fam,sz,sty){this.ftFam=fam;this.ftSz=sz;this.ftSty=sty||Font.PLAIN};this.drawPolyline=this.drawPolyLine=function(x,y,s){for(var i=0;i<x.length-1;i++)
this.drawLine(x[i],y[i],x[i+1],y[i+1])};this.fillRect=function(x,y,w,h){this.mkDiv(x,y,w,h)};this.drawPolygon=function(x,y){this.drawPolyline(x,y);this.drawLine(x[x.length-1],y[x.length-1],x[0],y[0])};this.drawEllipse=this.drawOval=function(x,y,w,h){this.mkOv(x,y,w,h)};this.fillEllipse=this.fillOval=function(left,top,w,h){var a=(w-=1)>>1,b=(h-=1)>>1,wod=(w&1)+1,hod=(h&1)+1,cx=left+a,cy=top+b,x=0,y=b,ox=0,oy=b,aa2=(a*a)<<1,aa4=aa2<<1,bb=(b*b)<<1,st=(aa2>>1)*(1-(b<<1))+bb,tt=(bb>>1)-aa2*((b<<1)-1),pxl,dw,dh;if(w+1) while(y>0){if(st<0){st+=bb*((x<<1)+3);tt+=(bb<<1)*(++x)}else if(tt<0){st+=bb*((x<<1)+3)-aa4*(y-1);pxl=cx-x;dw=(x<<1)+wod;tt+=(bb<<1)*(++x)-aa2*(((y--)<<1)-3);dh=oy-y;this.mkDiv(pxl,cy-oy,dw,dh);this.mkDiv(pxl,cy+y+hod,dw,dh);ox=x;oy=y}else{tt-=aa2*((y<<1)-3);st-=aa4*(--y)}}
this.mkDiv(cx-a,cy-oy,w+1,(oy<<1)+hod)};this.fillPolygon=function(array_x,array_y){var i,y,miny,maxy,x1,y1,x2,y2,ind1,ind2,ints,n=array_x.length;if(!n) return;miny=array_y[0];maxy=array_y[0];for(i=1;i<n;i++){if(array_y[i]<miny)
miny=array_y[i];if(array_y[i]>maxy)
maxy=array_y[i]}
for(y=miny;y<=maxy;y++){var polyInts=[];ints=0;for(i=0;i<n;i++){if(!i){ind1=n-1;ind2=0}else{ind1=i-1;ind2=i}
y1=array_y[ind1];y2=array_y[ind2];if(y1<y2){x1=array_x[ind1];x2=array_x[ind2]}else if(y1>y2){y2=array_y[ind1];y1=array_y[ind2];x2=array_x[ind1];x1=array_x[ind2]}else continue;if((y>=y1)&&(y<y2))
polyInts[ints++]=Math.round((y-y1)*(x2-x1)/(y2-y1)+x1);else if((y==maxy)&&(y>y1)&&(y<=y2))
polyInts[ints++]=Math.round((y-y1)*(x2-x1)/(y2-y1)+x1)}
polyInts.sort(integer_compare);for(i=0;i<ints;i+=2)
this.mkDiv(polyInts[i],y,polyInts[i+1]-polyInts[i]+1,1)}};this.drawString=function(txt,x,y){this.htm+='<div style="position:absolute;white-space:nowrap;'+'left:'+x+'px;'+'top:'+y+'px;'+'font-family:'+this.ftFam+';'+'font-size:'+this.ftSz+';'+'color:'+this.color+';'+this.ftSty+'">'+txt+'<\/div>'};this.drawStringRect=function(txt,x,y,width,halign){this.htm+='<div style="position:absolute;overflow:hidden;'+'left:'+x+'px;'+'top:'+y+'px;'+'width:'+width+'px;'+'text-align:'+halign+';'+'font-family:'+this.ftFam+';'+'font-size:'+this.ftSz+';'+'color:'+this.color+';'+this.ftSty+'">'+txt+'<\/div>'};this.drawImage=function(imgSrc,x,y,w,h,a){this.htm+='<div style="position:absolute;'+'left:'+x+'px;'+'top:'+y+'px;'+'width:'+w+';'+'height:'+h+';">'+'<img src="'+imgSrc+'" width="'+w+'" height="'+h+'"'+(a?(' '+a):'')+'>'+'<\/div>'};this.clear=function(){this.htm="";if(this.cnv) this.cnv.innerHTML=this.defhtm};this.mkOvQds=function(cx,cy,xl,xr,yt,yb,w,h){this.mkDiv(xr+cx,yt+cy,w,h);this.mkDiv(xr+cx,yb+cy,w,h);this.mkDiv(xl+cx,yb+cy,w,h);this.mkDiv(xl+cx,yt+cy,w,h)};this.setStroke(1);this.setFont('verdana,geneva,helvetica,sans-serif',String.fromCharCode(0x31,0x32,0x70,0x78),Font.PLAIN);this.color='#000000';this.htm='';this.wnd=wnd||window;if(!(jg_ie||jg_dom||jg_ihtm)) chkDHTM();if(typeof id!='string'||!id) this.paint=pntDoc;else{this.cnv=document.all?(this.wnd.document.all[id]||null):document.getElementById?(this.wnd.document.getElementById(id)||null):null;this.defhtm=(this.cnv&&this.cnv.innerHTML)?this.cnv.innerHTML:'';this.paint=jg_dom?pntCnvDom:jg_ie?pntCnvIe:jg_ihtm?pntCnvIhtm:pntCnv}
this.setPrintable(false)}

function integer_compare(_,q){return(_<q)?-1:((_>q)*1)}