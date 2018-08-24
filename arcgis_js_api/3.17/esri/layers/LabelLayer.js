// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/labelLayerUtils/DynamicLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../GraphicsLayer ../../geometry/Extent ../../geometry/Polygon".split(" "),function(B,G,A,H,E,C,D){B=B(E,{declaredClass:"esri.layers.labelLayerUtils.DynamicLabelClass",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._y1=this._x1=this._y0=this._x0=this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1},setMap:function(m,
b){this._labelLayer=b;this._xmin=m.extent.xmin;this._xmax=m.extent.xmax;this._ymin=m.extent.ymin;this._ymax=m.extent.ymax;this._scale=(this._xmax-this._xmin)/m.width},_process:function(m){this._preparedLabels=m;this._placedLabels=[];var b;for(m=this._preparedLabels.length-1;0<=m;m--){var a=this._preparedLabels[m],c=Math.min(a.labelWidth,a.labelHeight),h=a.labelWidth+0*c,c=a.labelHeight+0*c,f=(b=a.options)&&void 0!==b.lineLabelPlacement?b.lineLabelPlacement:"PlaceAtCenter",e=b&&void 0!==b.lineLabelPosition?
b.lineLabelPosition:"Above",d=b&&void 0!==b.pointPriorities?b.pointPriorities:"AboveRight",k=[2,2,1,3,0,2,3,3,2];"AboveLeft"==d?k=[1,2,2,2,0,3,2,3,3]:"AboveCenter"==d?k=[2,1,2,2,0,2,3,3,3]:"AboveRight"==d?k=[2,2,1,3,0,2,3,3,2]:"CenterLeft"==d?k=[2,2,3,1,0,3,2,2,3]:"CenterCenter"==d?k=[0,0,0,0,1,0,0,0,0]:"CenterRight"==d?k=[3,2,2,3,0,1,3,2,2]:"BelowLeft"==d?k=[2,3,3,2,0,3,1,2,2]:"BelowCenter"==d?k=[3,3,3,2,0,2,2,1,2]:"BelowRight"==d&&(k=[3,3,2,3,0,2,2,2,1]);var g=b&&void 0!==b.labelRotation?b.labelRotation:
!0,d=a.angle*(Math.PI/180);b=b&&void 0!==b.howManyLabels?b.howManyLabels:"OneLabel";if("point"==a.geometry.type)this._generatePointPositions(a,a.geometry.x,a.geometry.y,a.text,d,h,c,a.symbolWidth,a.symbolHeight,k);else if("multipoint"==a.geometry.type){f=a.geometry;for(e=0;e<f.points.length;e++)this._generatePointPositions(a,f.points[e][0],f.points[e][1],a.text,d,h,c,a.symbolWidth,a.symbolHeight,k)}else"polyline"==a.geometry.type?this._generateLinePositions(a,a.geometry,a.text,h,c,2*a.symbolHeight+
c,f,e,g):"polygon"==a.geometry.type&&this._generatePolygonPositions(a,b,a.geometry,a.text,d,h,c)}return this._placedLabels},_generatePointPositions:function(m,b,a,c,h,f,e,d,k,g){d=(d+f)*this._scale;k=(k+e)*this._scale;var t,n;for(t=1;3>=t;t++)for(n=1;9>=n;n++)if(g[n-1]==t)switch(n){case 1:if(this._findPlace(m,c,b-d,a+k,h,f,e))return;break;case 2:if(this._findPlace(m,c,b,a+k,h,f,e))return;break;case 3:if(this._findPlace(m,c,b+d,a+k,h,f,e))return;break;case 4:if(this._findPlace(m,c,b-d,a,h,f,e))return;
break;case 5:if(this._findPlace(m,c,b,a,h,f,e))return;break;case 6:if(this._findPlace(m,c,b+d,a,h,f,e))return;break;case 7:if(this._findPlace(m,c,b-d,a-k,h,f,e))return;break;case 8:if(this._findPlace(m,c,b,a-k,h,f,e))return;break;case 9:if(this._findPlace(m,c,b+d,a-k,h,f,e))return}},_generateLinePositions:function(m,b,a,c,h,f,e,d,k){var g=c*this._scale*c*this._scale,t,n,l;for(t=0;t<b.paths.length;t++){var r=b.paths[t],q=r.length,p=Math.floor((q-1)/2),v=0!==(q-1)%2?1:-1;"PlaceAtStart"==e&&(p=0,v=1);
"PlaceAtEnd"==e&&(p=q-2,v=-1);for(;0<=p&&p<q-1;){for(n=p;n<q;n++){var u=r[p][0],s=r[p][1],x=r[n][0]-u,w=r[n][1]-s;if(x*x+w*w>g){for(var y=Math.atan2(w,x);y>Math.PI/2;)y-=Math.PI;for(;y<-(Math.PI/2);)y+=Math.PI;var z=Math.sin(y),F=Math.cos(y),I=0,J=0;"Above"==d&&(I=f*z*this._scale,J=f*F*this._scale);"Below"==d&&(I=-f*z*this._scale,J=-f*F*this._scale);if(1==n-p){if(this._clipLine(u,s,r[n][0],r[n][1])&&(u=this._x1-this._x0,l=this._y1-this._y0,u*u+l*l>g&&(n=Math.atan2(l,u),x=c/2+2*h,s=x*this._scale*Math.cos(n),
x=x*this._scale*Math.sin(n),"PlaceAtStart"==e?(u=this._x0+s,l=this._y0+x):"PlaceAtEnd"==e?(u=this._x1-s,l=this._y1-x):(u=this._x0+u/2,l=this._y0+l/2),this._findPlace(m,a,u-I,l+J,k?-n:0,c,h))))return}else{var K=0;for(l=p;l<=n;l++)K=Math.max(K,Math.abs((r[l][1]-s)*F-(r[l][0]-u)*z));if(K<h&&this._findPlace(m,a,u+x/2-I,s+w/2+J,k?-y:0,c,h))return}break}}p+=v}}},_generatePolygonPositions:function(m,b,a,c,h,f,e){var d;if("ManyLabels"==b)for(b=0;b<a.rings.length;b++)d=a.rings[b],D.prototype.isClockwise(d)&&
(d=this._findCentroid(d,this._xmin,this._ymin,this._xmax,this._ymax),this._findPlace(m,c,d[0],d[1],h,f,e));else{d=this._findCentroidForFeature(a,this._xmin,this._ymin,this._xmax,this._ymax);var k=d[1],g=0;for(b=0;10>b;b++){g+=e/4;d=this._findCentroidForFeature(a,this._xmin,k+(g-e/4),this._xmax,k+(g+e/4));if(this._findPlace(m,c,d[0],d[1],h,f,e))break;d=this._findCentroidForFeature(a,this._xmin,k-(g+e/4),this._xmax,k-(g-e/4));if(this._findPlace(m,c,d[0],d[1],h,f,e))break}}},_findCentroid:function(m,
b,a,c,h){var f=m.length,e=[0,0],d=0,k=m[0][0],g=m[0][1];k>c&&(k=c);k<b&&(k=b);g>h&&(g=h);g<a&&(g=a);for(var t=1;t<f-1;t++){var n=m[t][0],l=m[t][1],r=m[t+1][0],q=m[t+1][1];n>c&&(n=c);n<b&&(n=b);l>h&&(l=h);l<a&&(l=a);r>c&&(r=c);r<b&&(r=b);q>h&&(q=h);q<a&&(q=a);var p=(n-k)*(q-g)-(r-k)*(l-g);e[0]+=p*(k+n+r);e[1]+=p*(g+l+q);d+=p}e[0]/=3*d;e[1]/=3*d;if(isNaN(e[0])||isNaN(e[1]))return e;a=[];this._fillBuffer(m,a,e);e[0]=this._sortBuffer(a,e[0],b,c);return e},_findCentroidForFeature:function(m,b,a,c,h){for(var f,
e=0,d=[0,0],k=0;k<m.rings.length;k++){var g=m.rings[k],t=g.length,n=g[0][0],l=g[0][1];n>c&&(n=c);n<b&&(n=b);l>h&&(l=h);l<a&&(l=a);for(f=1;f<t-1;f++){var r=g[f][0],q=g[f][1],p=g[f+1][0],v=g[f+1][1];r>c&&(r=c);r<b&&(r=b);q>h&&(q=h);q<a&&(q=a);p>c&&(p=c);p<b&&(p=b);v>h&&(v=h);v<a&&(v=a);var u=(r-n)*(v-l)-(p-n)*(q-l);d[0]+=u*(n+r+p);d[1]+=u*(l+q+v);e+=u}}d[0]/=3*e;d[1]/=3*e;if(isNaN(d[0])||isNaN(d[1]))return d;a=[];for(f=0;f<m.rings.length;f++)this._fillBuffer(m.rings[f],a,d);d[0]=this._sortBuffer(a,
d[0],b,c);return d},_fillBuffer:function(m,b,a){for(var c=m.length-1,h=m[0][1]>=m[c][1]?1:-1,f=0;f<=c;f++){var e=f,d=f+1;f==c&&(d=0);var k=m[e][0],e=m[e][1],g=m[d][0],d=m[d][1],t=d>=e?1:-1;if(e<=a[1]&&a[1]<=d||d<=a[1]&&a[1]<=e)a[1]!=e&&a[1]!=d?(b.push((a[1]-e)*(g-k)/(d-e)+k),h=t):a[1]==e&&a[1]!=d?(h!=t&&b.push(k),h=t):a[1]!=e&&a[1]==d?(b.push(g),h=t):a[1]==e&&a[1]==d&&(1==h&&b.push(k),b.push(g),h=t)}},_sortBuffer:function(m,b,a,c){var h=m.length;m.sort();if(0<h){for(var f=0,e=b=0;e<h-1;e+=2){var d=
Math.abs(m[e+1]-m[e]);!(m[e]<=a&&m[e+1]<=a)&&(!(m[e]>=c&&m[e+1]>=c)&&d>f)&&(f=d,b=e)}h=m[b];m=m[b+1];h>c&&(h=c);h<a&&(h=a);m>c&&(m=c);m<a&&(m=a);b=(h+m)/2}return b},_findPlace:function(m,b,a,c,h,f,e){if(isNaN(a)||isNaN(c))return!1;for(var d=0;d<this._placedLabels.length;d++){var k=this._placedLabels[d].angle,g=this._placedLabels[d].width*this._scale,t=this._placedLabels[d].height*this._scale,n=this._placedLabels[d].x-a,l=this._placedLabels[d].y-c;if(0===h&&0===k){if(this._findPlace2(-f*this._scale,
-e*this._scale,f*this._scale,e*this._scale,n-g,l-t,n+g,l+t))return!1}else{var r=new C(-f*this._scale,-e*this._scale,f*this._scale,e*this._scale,null),q=0,p=1;0!==h&&(q=Math.sin(h),p=Math.cos(h));var v=n*p-l*q,n=n*q+l*p,k=k-h,q=Math.sin(k),p=Math.cos(k),u=-g*p- -t*q,l=-g*q+-t*p,k=+g*p- -t*q,s=+g*q+-t*p,g=v+u,t=n-l,q=v+k,p=n-s,u=v-u,l=n+l,v=v-k,n=n+s,k=new D;k.addRing([[g,t],[q,p],[u,l],[v,n],[g,t]]);if(r.intersects(k))return!1}}for(;h>Math.PI/2;)h-=Math.PI;for(;h<-(Math.PI/2);)h+=Math.PI;d={};d.layer=
m;d.text=b;d.angle=h;d.x=a;d.y=c;d.width=f;d.height=e;this._placedLabels.push(d);return!0},_findPlace2:function(m,b,a,c,h,f,e,d){return(m>=h&&m<=e||a>=h&&a<=e||m<=h&&a>=e)&&(b>=f&&b<=d||c>=f&&c<=d||b<=f&&c>=d)?!0:!1},_clipLine:function(m,b,a,c){for(var h=this._code(m,b),f=this._code(a,c);0!==h||0!==f;){if(0!==(h&f))return!1;var e=a-m,d=c-b;0!==h?(m<this._xmin?(b+=d*(this._xmin-m)/e,m=this._xmin):m>this._xmax?(b+=d*(this._xmax-m)/e,m=this._xmax):b<this._ymin?(m+=e*(this._ymin-b)/d,b=this._ymin):b>
this._ymax&&(m+=e*(this._ymax-b)/d,b=this._ymax),h=this._code(m,b)):(a<this._xmin?(c+=d*(this._xmin-a)/e,a=this._xmin):a>this._xmax?(c+=d*(this._xmax-a)/e,a=this._xmax):c<this._ymin?(a+=e*(this._ymin-c)/d,c=this._ymin):c>this._ymax&&(a+=e*(this._ymax-c)/d,c=this._ymax),f=this._code(a,c))}this._x0=m;this._y0=b;this._x1=a;this._y1=c;return!0},_code:function(m,b){var a=0;m<this._xmin&&(a+=8);m>this._xmax&&(a+=4);b<this._ymin&&(a+=2);b>this._ymax&&(a+=1);return a}});A("extend-esri")&&G.setObject("layers.labelLayerUtils.DynamicLabelClass",
B,H);return B})},"esri/layers/labelLayerUtils/StaticLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../GraphicsLayer ../../geometry/Extent ../../geometry/Point ../../geometry/Polygon".split(" "),function(B,G,A,H,E,C,D,m){return B(E,{declaredClass:"esri.layers.labelLayerUtils.StaticLabel",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1;this._LINE_STEP_CONST=1.5;
this._POLYGON_X_STEP_CONST=1;this._POLYGON_Y_STEP_CONST=0.75;this._OVERRUN=2},setMap:function(b,a){this._labelLayer=a;this._map=b;this._xmin=b.extent.xmin;this._xmax=b.extent.xmax;this._ymin=b.extent.ymin;this._ymax=b.extent.ymax;this._scale=(this._xmax-this._xmin)/b.width},_process:function(b){var a,c,h,f,e,d,k,g,t;this._preparedLabels=b;this._placedLabels=[];for(b=this._preparedLabels.length-1;0<=b;b--){a=this._preparedLabels[b];e=a.labelWidth;d=a.labelHeight;g=(k=a.options)&&k.lineLabelPlacement?
k.lineLabelPlacement:"PlaceAtCenter";t=k&&k.lineLabelPosition?k.lineLabelPosition:"Above";c=k&&k.labelRotation?k.labelRotation:!0;h=a.angle*(Math.PI/180);f=k&&k.howManyLabels?k.howManyLabels:"OneLabel";var n=[];if("point"===a.geometry.type)this._generatePointPositions(a.geometry.x,a.geometry.y,a.text,h,e,d,a.symbolWidth,a.symbolHeight,k,n);else if("multipoint"===a.geometry.type)for(c=0;c<a.geometry.points.length;c++)this._generatePointPositions(a.geometry.points[c][0],a.geometry.points[c][1],a.text,
h,e,d,a.symbolWidth,a.symbolHeight,k,n);else if("polyline"===a.geometry.type)if("PlaceAtStart"===g)this._generateLinePositionsPlaceAtStart(a.geometry,!0,a.text,e,d,2*a.symbolHeight+d,g,t,c,n);else if("PlaceAtEnd"===g)this._generateLinePositionsPlaceAtEnd(a.geometry,!0,a.text,e,d,2*a.symbolHeight+d,g,t,c,n);else{k=[];var l=a.geometry.getExtent(),r=this._map.extent;if(l.getWidth()<e*this._scale/this._OVERRUN&&l.getHeight()<e*this._scale/this._OVERRUN)continue;else 0.5*l.getWidth()<r.getWidth()&&0.5*
l.getHeight()<r.getHeight()?(l=0.1*Math.min(this._map.width,this._map.height)*this._scale,this._generateLinePositionsPlaceAtCenter(a.geometry,!1,l,a.text,e,d,2*a.symbolHeight+d,g,t,c,k)):(l=0.2*Math.min(this._map.width,this._map.height)*this._scale,this._generateLinePositionsPlaceAtCenter(a.geometry,!0,l,a.text,e,d,2*a.symbolHeight+d,g,t,c,k));this._postSorting(r,k,n)}else if("polygon"===a.geometry.type){g=[];for(c=0;c<a.geometry.rings.length;c++)t=a.geometry.rings[c],m.prototype.isClockwise(t)&&
(k=this._calcRingExtent(t),k.xmax-k.xmin<4*e*this._scale/this._OVERRUN&&k.ymax-k.ymin<4*d*this._scale/this._OVERRUN||g.push(t));g.sort(function(a,b){return b.length-a.length});for(c=0;c<g.length;c++)this._generatePolygonPositionsForManyLabels(g[c],a.geometry.spatialReference,a.text,h,e,d,n)}for(c=0;c<n.length&&!(g=n[c].x,t=n[c].y,void 0!==n[c].angle&&(h=n[c].angle),k=this._findPlace(a,a.text,g,t,h,e,d),"OneLabel"===f&&k&&this._labelLayer._isWithinScreenArea(new D(g,t,a.geometry.spatialReference)));c++);
}return this._placedLabels},_generatePointPositions:function(b,a,c,h,f,e,d,k,g,t){c=g&&g.pointPriorities?g.pointPriorities:"AboveRight";f=(d+f)*this._scale;e=(k+e)*this._scale;switch(c.toLowerCase()){case "aboveleft":b-=f;a+=e;break;case "abovecenter":a+=e;break;case "aboveright":b+=f;a+=e;break;case "centerleft":b-=f;break;case "centercenter":break;case "centerright":b+=f;break;case "belowleft":b-=f;a-=e;break;case "belowcenter":a-=e;break;case "belowright":b+=f;a-=e;break;default:return}t.push({x:b,
y:a})},_generateLinePositionsPlaceAtStart:function(b,a,c,h,f,e,d,k,g,t){d=h*this._scale;var n=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,l,m,q,p,v,u,s,x;for(l=0;l<b.paths.length;l++){var w=b.paths[l],y=d,z=0;for(m=0;m<w.length-1;m++)q=w[m][0],p=w[m][1],v=w[m+1][0],u=w[m+1][1],s=v-q,x=u-p,s=Math.sqrt(s*s+x*x),z+s>y?(z=this._generatePositionsOnLine(b.spatialReference,a,y,n,z,q,p,v,u,c,h,f,e,k,g,t),y=n):z+=s}},_generateLinePositionsPlaceAtEnd:function(b,a,c,h,f,e,d,
k,g,m){d=h*this._scale;var n=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,l,r,q,p,v,u,s,x;for(l=0;l<b.paths.length;l++){var w=b.paths[l],y=d,z=0;for(r=w.length-2;0<=r;r--)q=w[r+1][0],p=w[r+1][1],v=w[r][0],u=w[r][1],s=v-q,x=u-p,s=Math.sqrt(s*s+x*x),z+s>y?(z=this._generatePositionsOnLine(b.spatialReference,a,y,n,z,q,p,v,u,c,h,f,e,k,g,m),y=n):z+=s}},_generateLinePositionsPlaceAtCenter:function(b,a,c,h,f,e,d,k,g,m,n){var l,r,q,p,v,u,s,x;for(k=0;k<b.paths.length;k++){var w=
b.paths[k];if(!(2>w.length)){if(2==w.length){p=w[0];l=w[1];q=p[0];p=p[1];w=l[0];u=l[1];v=(w-q)*(w-q)+(u-p)*(u-p);s=Math.atan2(u-p,w-q);u=Math.cos(s);s=Math.sin(s);w=[];x=q;for(var y=p;(x-q)*(x-q)+(y-p)*(y-p)<v;)w.push([x,y]),x+=c/2*u,y+=c/2*s;w.push(l)}var z=0;for(l=0;l<w.length-1;l++)q=w[l][0],p=w[l][1],v=w[l+1][0],u=w[l+1][1],s=v-q,x=u-p,z+=Math.sqrt(s*s+x*x);for(l=y=0;l<w.length-1;l++){q=w[l][0];p=w[l][1];v=w[l+1][0];u=w[l+1][1];s=v-q;x=u-p;s=Math.sqrt(s*s+x*x);if(y+s>z/2)break;y+=s}l==w.length-
1&&l--;q=w[l][0];p=w[l][1];v=w[l+1][0];u=w[l+1][1];s=v-q;x=u-p;y=z/2-y;s=Math.atan2(x,s);x=q+y*Math.cos(s);s=p+y*Math.sin(s);q=this._angleAndShifts(q,p,v,u,d,g,m);n.push({x:x+q.shiftX,y:s+q.shiftY,angle:q.angle});var z=x,F=s,y=0;for(r=l;r<w.length-1;r++)r==l?(q=z,p=F):(q=w[r][0],p=w[r][1]),v=w[r+1][0],u=w[r+1][1],s=v-q,x=u-p,s=Math.sqrt(s*s+x*x),y=y+s>c?this._generatePositionsOnLine(b.spatialReference,a,c,c,y,q,p,v,u,h,f,e,d,g,m,n):y+s;y=0;for(r=l;0<=r;r--)r==l?(q=z,p=F):(q=w[r+1][0],p=w[r+1][1]),
v=w[r][0],u=w[r][1],s=v-q,x=u-p,s=Math.sqrt(s*s+x*x),y=y+s>c?this._generatePositionsOnLine(b.spatialReference,a,c,c,y,q,p,v,u,h,f,e,d,g,m,n):y+s}}},_generatePositionsOnLine:function(b,a,c,h,f,e,d,k,g,m,n,l,r,q,p,v){m=Math.atan2(g-d,k-e);n=e;l=d;var u=n,s=l;do if(f=c-f,n+=f*Math.cos(m),l+=f*Math.sin(m),this._belongs(n,l,e,d,k,g))f=this._angleAndShifts(e,d,k,g,r,q,p),c=n+f.shiftX,s=l+f.shiftY,a?this._labelLayer._isWithinScreenArea(new C(c,s,c,s,b))&&v.push({x:c,y:s,angle:f.angle}):v.push({x:c,y:s,angle:f.angle}),
u=n,s=l,f=0,c=h;else return b=k-u,g-=s,Math.sqrt(b*b+g*g);while(1)},_postSorting:function(b,a,c){if(b&&0<a.length){var h=0.5*(b.xmin+b.xmax);b=0.5*(b.ymin+b.ymax);for(var f=a[0].x,e=a[0].y,d=Math.sqrt((f-h)*(f-h)+(e-b)*(e-b)),k=a[0].angle,g=0;g<a.length;g++){var m=a[g].x,n=a[g].y,l=Math.sqrt((m-h)*(m-h)+(n-b)*(n-b));l<d&&(f=m,e=n,d=l,k=a[g].angle)}c.push({x:f,y:e,angle:k})}},_belongs:function(b,a,c,h,f,e){if(f==c&&e==h)return!1;if(f>c){if(b>f||b<c)return!1}else if(b<f||b>c)return!1;if(e>h){if(a>e||
a<h)return!1}else if(a<e||a>h)return!1;return!0},_angleAndShifts:function(b,a,c,h,f,e,d){for(b=Math.atan2(h-a,c-b);b>Math.PI/2;)b-=Math.PI;for(;b<-(Math.PI/2);)b+=Math.PI;h=Math.sin(b);var k=Math.cos(b);c=a=0;"Above"==e&&(a=f*h*this._scale,c=f*k*this._scale);"Below"==e&&(a=-f*h*this._scale,c=-f*k*this._scale);f=[];f.angle=d?-b:0;f.shiftX=-a;f.shiftY=c;return f},_generatePolygonPositionsForManyLabels:function(b,a,c,h,f,e,d){f=this._findCentroidForRing(b);h=f[0];var k=f[1],g=this._calcRingExtent(b);
f=g.xmin;e=g.ymin;var m=g.xmax,g=g.ymax,n=(g-e)/(this._map.height*this._scale);if(!(10<(m-f)/(this._map.width*this._scale)&&10<n)){var l=!0;if(m-f>this._map.width*this._scale||g-e>this._map.height*this._scale)l=!1;var n=this._map.width*this._scale*(l?0.1875:0.5),l=this._map.height*this._scale*(l?0.1875:0.5),r=!0,q=!0,p=0;do{k+=(p%2?-1:1)*p*l;if(this._scanRingByX(c,a,b,h,k,f,m,n,d))break;k<e&&(r=!1);k>g&&(q=!1);p++}while(r||q)}},_scanRingByX:function(b,a,c,h,f,e,d,k,g){var m=!0,n=!0,l=0;do{h+=(l%2?
-1:1)*l*k;var r=this._movePointInsideRing(c,h,f),q=this._labelLayer._isWithinScreenArea(new C(r,f,r,f,a)),p=this._isPointWithinRing(b,c,r,f);if(q&&p)return g.push({x:r,y:f}),!0;h<e&&(m=!1);h>d&&(n=!1);l++}while(m||n);return!1},_movePointInsideRing:function(b,a,c){for(var h=[],f=b.length-1,e=b[0][1]>=b[f][1]?1:-1,d=0;d<=f;d++){var k=d,g=d+1;d==f&&(g=0);var m=b[k][0],k=b[k][1],n=b[g][0],g=b[g][1],l=g>=k?1:-1;if(k<=c&&c<=g||g<=c&&c<=k)c!=k&&c!=g?(h.push((c-k)*(n-m)/(g-k)+m),e=l):c==k&&c!=g?(e!=l&&h.push(m),
e=l):c!=k&&c==g?(h.push(n),e=l):c==k&&c==g&&(1==e&&h.push(m),h.push(n),e=l)}h.sort(function(a,b){return a-b});b=h.length;if(0<b){for(d=c=a=0;d<b-1;d+=2)f=Math.abs(h[d+1]-h[d]),f>a&&(a=f,c=d);a=(h[c]+h[c+1])/2}return a},_calcRingExtent:function(b){var a,c;c=new C;for(a=0;a<b.length-1;a++){var h=b[a][0],f=b[a][1];if(void 0===c.xmin||h<c.xmin)c.xmin=h;if(void 0===c.ymin||f<c.ymin)c.ymin=f;if(void 0===c.xmax||h>c.xmax)c.xmax=h;if(void 0===c.ymax||f>c.ymax)c.ymax=f}return c},_isPointWithinPolygon:function(b,
a,c,h){var f;for(f=0;f<a.rings.length;f++)if(this._isPointWithinRing(b,a.rings[f],c,h))return!0;return!1},_isPointWithinRing:function(b,a,c,h){var f,e,d,k,g=[],m=a.length;for(b=0;b<m-1;b++)if(f=a[b][0],e=a[b][1],d=a[b+1][0],k=a[b+1][1],!(f==d&&e==k)){if(e==k)if(h==e)g.push(f);else continue;f==d?(e<k&&(h>=e&&h<k)&&g.push(f),e>k&&(h<=e&&h>k)&&g.push(f)):(e=(d-f)/(k-e)*(h-e)+f,f<d&&(e>=f&&e<d)&&g.push(e),f>d&&(e<=f&&e>d)&&g.push(e))}g.sort(function(a,b){return a-b});for(b=0;b<g.length-1;b++)if(f=g[b],
d=g[b+1],c>=f&&c<d)if(b%2)break;else return!0;return!1},_findCentroidForRing:function(b){for(var a=b.length,c=[0,0],h=0,f=b[0][0],e=b[0][1],d=1;d<a-1;d++){var k=b[d][0],g=b[d][1],m=b[d+1][0],n=b[d+1][1],l=(k-f)*(n-e)-(m-f)*(g-e);c[0]+=l*(f+k+m);c[1]+=l*(e+g+n);h+=l}c[0]/=3*h;c[1]/=3*h;return c},_findCentroidForFeature:function(b){for(var a=0,c=[0,0],h=0;h<b.rings.length;h++)for(var f=b.rings[h],e=f.length,d=f[0][0],k=f[0][1],g=1;g<e-1;g++){var m=f[g][0],n=f[g][1],l=f[g+1][0],r=f[g+1][1],q=(m-d)*(r-
k)-(l-d)*(n-k);c[0]+=q*(d+m+l);c[1]+=q*(k+n+r);a+=q}c[0]/=3*a;c[1]/=3*a;return c},_findPlace:function(b,a,c,h,f,e,d){if(isNaN(c)||isNaN(h))return!1;for(var k=0;k<this._placedLabels.length;k++){var g=this._placedLabels[k].angle,t=this._placedLabels[k].width*this._scale,n=this._placedLabels[k].height*this._scale,l=this._placedLabels[k].x-c,r=this._placedLabels[k].y-h;if(0===f&&0===g){if(this._findPlace2(-e*this._scale,-d*this._scale,e*this._scale,d*this._scale,l-t,r-n,l+t,r+n))return!1}else{var q=new C(-e*
this._scale,-d*this._scale,e*this._scale,d*this._scale,null),p=0,v=1;0!==f&&(p=Math.sin(f),v=Math.cos(f));var u=l*v-r*p,l=l*p+r*v,g=g-f,p=Math.sin(g),v=Math.cos(g),s=-t*v- -n*p,r=-t*p+-n*v,g=+t*v- -n*p,x=+t*p+-n*v,t=u+s,n=l-r,p=u+g,v=l-x,s=u-s,r=l+r,u=u-g,l=l+x,g=new m;g.addRing([[t,n],[p,v],[s,r],[u,l],[t,n]]);if(q.intersects(g))return!1}}for(;f>Math.PI/2;)f-=Math.PI;for(;f<-(Math.PI/2);)f+=Math.PI;k={};k.layer=b;k.text=a;k.angle=f;k.x=c;k.y=h;k.width=e;k.height=d;this._placedLabels.push(k);return!0},
_findPlace2:function(b,a,c,h,f,e,d,k){return(b>=f&&b<=d||c>=f&&c<=d||b<=f&&c>=d)&&(a>=e&&a<=k||h>=e&&h<=k||a<=e&&h>=k)?!0:!1}})})},"*noref":1}});
define("esri/layers/LabelLayer","require dojo/_base/declare dojo/_base/lang dojo/number dojo/i18n!dojo/cldr/nls/number dojo/_base/array dojo/_base/connect dojo/has dojox/gfx/_base ../kernel ../lang ../graphic ../PopupInfo ./labelLayerUtils/DynamicLabelClass ./labelLayerUtils/StaticLabelClass ../symbols/TextSymbol ../symbols/ShieldLabelSymbol ../geometry/Extent ../geometry/Point ../geometry/webMercatorUtils ./GraphicsLayer ./LabelClass ../renderers/SimpleRenderer".split(" "),function(B,G,A,H,E,C,D,
m,b,a,c,h,f,e,d,k,g,t,n,l,r,q,p){function v(a){return"sizeInfo"===a.type}B=G(r,{declaredClass:"esri.layers.LabelLayer",constructor:function(a){this.id="labels";this.featureLayers=[];this._featureLayerInfos=[];this._preparedLabels=[];this._engineType="STATIC";this._mapEventHandlers=[];a&&(a.id&&(this.id=a.id),a.mode&&(this._engineType="DYNAMIC"===a.mode.toUpperCase()?"DYNAMIC":"STATIC"))},_setMap:function(a){var b=this.inherited(arguments);this._map&&this._mapEventHandlers.push(this._map.on("extent-change",
A.hitch(this,"refresh")));this.refresh();return b},_unsetMap:function(){var a;for(a=0;a<this._mapEventHandlers.length;a++)D.disconnect(this._mapEventHandlers[a]);this.refresh();this.inherited(arguments)},setAlgorithmType:function(a){this._engineType=a&&"DYNAMIC"===a.toUpperCase()?"DYNAMIC":"STATIC";this.refresh()},addFeatureLayer:function(a,b,c,d){if(!this.getFeatureLayer(a.layerId)){var e=[];e.push(a.on("update-end",A.hitch(this,"refresh")));e.push(a.on("suspend",A.hitch(this,"refresh")));e.push(a.on("resume",
A.hitch(this,"refresh")));e.push(a.on("edits-complete",A.hitch(this,"refresh")));e.push(a.on("labeling-info-change",A.hitch(this,"refresh")));e.push(a.on("time-extent-change",A.hitch(this,"refresh")));e.push(a.on("show-labels-change",A.hitch(this,"refresh")));this._featureLayerInfos.push({FeatureLayer:a,LabelExpressionInfo:c,LabelingOptions:d,LabelRenderer:b,EventHandlers:e});this.featureLayers.push(a);this.refresh()}},getFeatureLayer:function(a){var b,c;for(b=0;b<this.featureLayers.length;b++)if(c=
this.featureLayers[b],void 0!==c&&c.id==a)return c;return null},removeFeatureLayer:function(a){var b;a=this.getFeatureLayer(a);if(void 0!==a&&(b=C.indexOf(this.featureLayers,a),-1<b)){this.featureLayers.splice(b,1);for(a=0;a<this._featureLayerInfos[b].EventHandlers.length;a++)D.disconnect(this._featureLayerInfos[b].EventHandlers[a]);this._featureLayerInfos.splice(b,1);this.refresh()}},removeAllFeatureLayers:function(){var a;for(a=0;a<this.featureLayers.length;a++){for(var b=0;b<this._featureLayerInfos[a].EventHandlers.length;b++)D.disconnect(this._featureLayerInfos[a].EventHandlers[b]);
this.featureLayers=[];this._featureLayerInfos=[]}this.refresh()},getFeatureLayers:function(){return this.featureLayers},getFeatureLayerInfo:function(a){var b,c;for(b=0;b<this.featureLayers.length;b++)if(c=this.featureLayers[b],void 0!==c&&c.id==a)return this._featureLayerInfos[b];return null},refresh:function(a){var b,c,f,k,h,g=[],m,l="DYNAMIC"===this._engineType?new e:new d;if(this._map){l.setMap(this._map,this);this._preparedLabels=[];for(a=0;a<this.featureLayers.length;a++)if(c=this.featureLayers[a],
c.visible&&c.showLabels&&c.visibleAtMapScale&&!c._suspended)if(b=this._featureLayerInfos[a],h=this._convertOptions(null),b.LabelRenderer){if(g=c.labelingInfo)if(m=g[0])k=this._getLabelExpression(m),h=this._convertOptions(m);f=b.LabelRenderer;b.LabelExpressionInfo&&(k=b.LabelExpressionInfo);b.LabelingOptions&&(h=this._convertOptions(null),void 0!==b.LabelingOptions.pointPriorities&&(g=b.LabelingOptions.pointPriorities,h.pointPriorities="above-center"==g||"AboveCenter"==g||"esriServerPointLabelPlacementAboveCenter"==
g?"AboveCenter":"above-left"==g||"AboveLeft"==g||"esriServerPointLabelPlacementAboveLeft"==g?"AboveLeft":"above-right"==g||"AboveRight"==g||"esriServerPointLabelPlacementAboveRight"==g?"AboveRight":"below-center"==g||"BelowCenter"==g||"esriServerPointLabelPlacementBelowCenter"==g?"BelowCenter":"below-left"==g||"BelowLeft"==g||"esriServerPointLabelPlacementBelowLeft"==g?"BelowLeft":"below-right"==g||"BelowRight"==g||"esriServerPointLabelPlacementBelowRight"==g?"BelowRight":"center-center"==g||"CenterCenter"==
g||"esriServerPointLabelPlacementCenterCenter"==g?"CenterCenter":"center-left"==g||"CenterLeft"==g||"esriServerPointLabelPlacementCenterLeft"==g?"CenterLeft":"center-right"==g||"CenterRight"==g||"esriServerPointLabelPlacementCenterRight"==g?"CenterRight":"AboveRight"),void 0!==b.LabelingOptions.lineLabelPlacement&&(h.lineLabelPlacement=b.LabelingOptions.lineLabelPlacement),void 0!==b.LabelingOptions.lineLabelPosition&&(h.lineLabelPosition=b.LabelingOptions.lineLabelPosition),void 0!==b.LabelingOptions.labelRotation&&
(h.labelRotation=b.LabelingOptions.labelRotation),void 0!==b.LabelingOptions.howManyLabels&&(h.howManyLabels=b.LabelingOptions.howManyLabels));f instanceof q&&(k=this._getLabelExpression(f),f=new p(f.symbol),h=this._convertOptions(f));this._addLabels(c,f,k,h)}else if(g=c.labelingInfo)for(b=g.length-1;0<=b;b--)if(m=g[b])f=new q(m instanceof q?m.toJson():m),k=this._getLabelExpression(m),h=this._convertOptions(m),this._addLabels(c,f,k,h);k=l._process(this._preparedLabels);this.clear();this.drawLabels(this._map,
k)}},drawLabels:function(a,b){this._scale=(a.extent.xmax-a.extent.xmin)/a.width;var c;for(c=0;c<b.length;c++){var e=b[c],f=e.x,d=e.y,g=e.text,m=e.angle,l=e.layer.labelSymbol;"polyline"==e.layer.geometry.type&&e.layer.options.labelRotation&&l.setAngle(m*(180/Math.PI));l.setText(g);e=f;l instanceof k&&(f=l.getHeight(),m=Math.sin(m),e-=0.25*f*this._scale*m,d-=0.33*f*this._scale);m=new h(new n(e,d,a.extent.spatialReference));m.setSymbol(l);this.add(m)}},_addLabels:function(a,b,c,e){var f,d,g,k;if(this._isWithinScaleRange(b.minScale,
b.maxScale)&&c&&""!==c){var h=this._map,m=!a.url&&!h.spatialReference.equals(a.spatialReference);for(f=0;f<a.graphics.length;f++)if(d=a.graphics[f],!1!==d.visible){g=d.geometry;if(m){if(!l.canProject(g,h))continue;g=l.project(g,h)}g&&(this._isWhere(b.where,d.attributes)&&this._isWithinScreenArea(g))&&(k=this._buildLabelText(c,d.attributes,a.fields,e),this._addLabel(k,b,a.renderer,d,e,g,h))}}},_isWithinScreenArea:function(a){a="point"===a.type?new t(a.x,a.y,a.x,a.y,a.spatialReference):a.getExtent();
if(void 0===a)return!1;a=this._intersects(this._map,a);return null===a||0===a.length?!1:!0},_isWithinScaleRange:function(a,b){var c=this._map.getScale();return 0<a&&c>=a||0<b&&c<=b?!1:!0},_isWhere:function(a,b){try{if(!a)return!0;if(a){var c=a.split(" ");if(3===c.length)return this._sqlEquation(b[this._removeQuotes(c[0])],c[1],this._removeQuotes(c[2]));if(7===c.length){var e=this._sqlEquation(b[this._removeQuotes(c[0])],c[1],this._removeQuotes(c[2])),f=c[3],d=this._sqlEquation(b[this._removeQuotes(c[4])],
c[5],this._removeQuotes(c[6]));switch(f){case "AND":return e&&d;case "OR":return e||d}}}return!1}catch(g){console.log("Error.: can't parse \x3d "+a)}},_sqlEquation:function(a,b,c){switch(b){case "\x3d":return a==c?!0:!1;case "\x3c\x3e":return a!=c?!0:!1;case "\x3e":return a>c?!0:!1;case "\x3e\x3d":return a>=c?!0:!1;case "\x3c":return a<c?!0:!1;case "\x3c\x3d":return a<=c?!0:!1}return!1},_removeQuotes:function(a){var b=a.indexOf('"'),c=a.lastIndexOf('"');if(-1!=b&&-1!=c)return a.substr(1,a.length-
2);b=a.indexOf("'");c=a.lastIndexOf("'");return-1!=b&&-1!=c?a.substr(1,a.length-2):a},_getSizeInfo:function(a){return a?a.sizeInfo||C.filter(a.visualVariables,v)[0]:null},_addLabel:function(a,c,e,f,d,h,m){var l,n,p,q;if(a&&""!==A.trim(a)&&c){a=a.replace(/\s+/g," ");l=c.getSymbol(f);l instanceof k?(l=new k(l.toJson()),l.setVerticalAlignment("baseline"),l.setHorizontalAlignment("center")):l=l instanceof g?new g(l.toJson()):new k;l.setText(a);c.symbol=l;if(p=this._getProportionalSize(c.sizeInfo,f.attributes))l instanceof
k?l.setSize(p):l instanceof g&&(l.setWidth(p),l.setHeight(p));q=p=0;if(e){n=e.getSymbol(f);var r=this._getSizeInfo(e),t;r&&(t=e.getSize(f,{sizeInfo:r,resolution:m.getResolutionInMeters()}));if(t&&null!==t)p=q=t;else if(n)if("simplemarkersymbol"==n.type)q=p=n.size;else if("picturemarkersymbol"==n.type)p=n.width,q=n.height;else if("simplelinesymbol"==n.type||"cartographiclinesymbol"==n.type)p=n.width}e={};e.graphic=f;e.options=d;e.geometry=h;e.labelRenderer=c;e.labelSymbol=l;e.labelWidth=l.getWidth()/
2;e.labelHeight=l.getHeight()/2;e.symbolWidth=b.normalizedLength(p)/2;e.symbolHeight=b.normalizedLength(q)/2;e.text=a;e.angle=l.angle;this._preparedLabels.push(e)}},_buildLabelText:function(a,b,e,d){return a.replace(/{[^}]*}/g,function(a){var g,h=a;for(g=0;g<e.length;g++)if("{"+e[g].name+"}"==a){var h=b[e[g].name],k=e[g].domain;if(k&&A.isObject(k)){if("codedValue"==k.type&&d.useCodedValues){g=h;for(a=0;a<k.codedValues.length;a++)if(k.codedValues[a].code==g){h=k.codedValues[a].name;break}}else"range"==
k.type&&(k.minValue<=h&&h<=k.maxValue)&&(h=k.name);break}k=e[g].type;if(d.fieldInfos){var l=d.fieldInfos;for(g=0;g<l.length;g++)if("{"+l[g].fieldName+"}"==a){a=l[g].format;if("esriFieldTypeDate"==k)(a="DateFormat"+f.prototype._dateFormats[a.dateFormat?a.dateFormat:"shortDate"])&&(h=c.substitute({myKey:h},"${myKey:"+a+"}"));else if(("esriFieldTypeInteger"==k||"esriFieldTypeSingle"==k||"esriFieldTypeSmallInteger"==k||"esriFieldTypeLong"==k||"esriFieldTypeDouble"==k)&&a)h=H.format(h,{places:a.places}),
a.digitSeparator||E.group&&(h=h.replace(RegExp("\\"+E.group,"g"),""));break}}break}else h="";return null===h?"":h})},_getLabelExpression:function(a){return a.labelExpressionInfo?a.labelExpressionInfo.value:this._validSyntax(a.labelExpression)?this._convertLabelExpression(a.labelExpression):""},_validSyntax:function(a){return/^(\s*\[[^\]]+\]\s*)+$/i.test(a)},_convertLabelExpression:function(a){return a.replace(RegExp("\\[","g"),"{").replace(RegExp("\\]","g"),"}")},_getProportionalSize:function(a,b){if(!a)return null;
var e=c.substitute(b,"${"+a.field+"}",{first:!0});return!a.minSize||!a.maxSize||!a.minDataValue||!a.maxDataValue||!e||0>=a.maxDataValue-a.minDataValue?null:(a.maxSize-a.minSize)/(a.maxDataValue-a.minDataValue)*(e-a.minDataValue)+a.minSize},_convertOptions:function(a){var b=!0,c="shortDate",e=null,f=null,d="",g=!0;a&&(a.format&&(c=a.format.dateFormat,e={places:a.format.places,digitSeparator:a.format.digitSeparator}),f=a.fieldInfos,d=a.labelPlacement,null!=a.useCodedValues&&(b=a.useCodedValues));if("always-horizontal"==
d||"esriServerPolygonPlacementAlwaysHorizontal"==d)g=!1;return{useCodedValues:b,dateFormat:c,numberFormat:e,fieldInfos:f,pointPriorities:"above-center"==d||"esriServerPointLabelPlacementAboveCenter"==d?"AboveCenter":"above-left"==d||"esriServerPointLabelPlacementAboveLeft"==d?"AboveLeft":"above-right"==d||"esriServerPointLabelPlacementAboveRight"==d?"AboveRight":"below-center"==d||"esriServerPointLabelPlacementBelowCenter"==d?"BelowCenter":"below-left"==d||"esriServerPointLabelPlacementBelowLeft"==
d?"BelowLeft":"below-right"==d||"esriServerPointLabelPlacementBelowRight"==d?"BelowRight":"center-center"==d||"esriServerPointLabelPlacementCenterCenter"==d?"CenterCenter":"center-left"==d||"esriServerPointLabelPlacementCenterLeft"==d?"CenterLeft":"center-right"==d||"esriServerPointLabelPlacementCenterRight"==d?"CenterRight":"AboveRight",lineLabelPlacement:"above-start"==d||"below-start"==d||"center-start"==d?"PlaceAtStart":"above-end"==d||"below-end"==d||"center-end"==d?"PlaceAtEnd":"PlaceAtCenter",
lineLabelPosition:"above-after"==d||"esriServerLinePlacementAboveAfter"==d||"above-along"==d||"esriServerLinePlacementAboveAlong"==d||"above-before"==d||"esriServerLinePlacementAboveBefore"==d||"above-start"==d||"esriServerLinePlacementAboveStart"==d||"above-end"==d||"esriServerLinePlacementAboveEnd"==d?"Above":"below-after"==d||"esriServerLinePlacementBelowAfter"==d||"below-along"==d||"esriServerLinePlacementBelowAlong"==d||"below-before"==d||"esriServerLinePlacementBelowBefore"==d||"below-start"==
d||"esriServerLinePlacementBelowStart"==d||"below-end"==d||"esriServerLinePlacementBelowEnd"==d?"Below":"center-after"==d||"esriServerLinePlacementCenterAfter"==d||"center-along"==d||"esriServerLinePlacementCenterAlong"==d||"center-before"==d||"esriServerLinePlacementCenterBefore"==d||"center-start"==d||"esriServerLinePlacementCenterStart"==d||"center-end"==d||"esriServerLinePlacementCenterEnd"==d?"OnLine":"Above",labelRotation:g,howManyLabels:"OneLabel"}}});m("extend-esri")&&A.setObject("layers.LabelLayer",
B,a);return B});