//>>built
define("dojox/grid/enhanced/plugins/Rearrange","dojo/_base/kernel dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/connect ../../EnhancedGrid ../_Plugin ./_RowMapLayer".split(" "),function(s,u,v,m,p,w,y,z){s=v("dojox.grid.enhanced.plugins.Rearrange",y,{name:"rearrange",constructor:function(a,b){this.grid=a;this.setArgs(b);var f=new z(a);dojox.grid.enhanced.plugins.wrap(a,"_storeLayerFetch",f)},setArgs:function(a){this.args=u.mixin(this.args||{},a||{});this.args.setIdentifierForNewItem=
this.args.setIdentifierForNewItem||function(b){return b}},destroy:function(){this.inherited(arguments);this.grid.unwrap("rowmap")},onSetStore:function(a){this.grid.layer("rowmap").clearMapping()},_hasIdentity:function(a){var b=this.grid,f=b.store,e=b.layout.cells;return f.getFeatures()["dojo.data.api.Identity"]&&m.some(a,function(a){return f.getIdentityAttributes(b._by_idx[a.r].item)==e[a.c].field})?!0:!1},moveColumns:function(a,b){var f=this.grid,e=f.layout,g=e.cells,h,c,d=0,l=!0;h={};var k={};a.sort(function(a,
b){return a-b});for(c=0;c<a.length;++c)h[a[c]]=c,a[c]<b&&++d;var n=0,q=0,m=Math.max(a[a.length-1],b);m==g.length&&--m;var t=Math.min(a[0],b);for(c=t;c<=m;++c){var r=h[c];0<=r?k[c]=b-d+r:c<b?(k[c]=t+n,++n):c>=b&&(k[c]=b+a.length-d+q,++q)}d=0;b==g.length&&(--b,l=!1);f._notRefreshSelection=!0;for(c=0;c<a.length;++c)h=a[c],h<b&&(h-=d),++d,h!=b&&(e.moveColumn(g[h].view.idx,g[b].view.idx,h,b,l),g=e.cells),b<=h&&++b;delete f._notRefreshSelection;p.publish("dojox/grid/rearrange/move/"+f.id,["col",k,a])},
moveRows:function(a,b){var f=this.grid,e={},g=[],h=[],c=a.length,d,l,k;for(d=0;d<c;++d){h=a[d];if(h>=b)break;g.push(h)}h=a.slice(d);d=g;if(c=d.length){l={};m.forEach(d,function(a){l[a]=!0});e[d[0]]=b-c;g=0;d=d[g]+1;for(k=d-1;d<b;++d)l[d]?(++g,e[d]=b-c+g):(e[d]=k,++k)}d=h;if(c=d.length){l={};m.forEach(d,function(a){l[a]=!0});e[d[c-1]]=b+c-1;g=c-1;d=d[g]-1;for(k=d+1;d>=b;--d)l[d]?(--g,e[d]=b+g):(e[d]=k,--k)}var n=u.clone(e);f.layer("rowmap").setMapping(e);f.forEachLayer(function(a){return"rowmap"!=
a.name()?(a.invalidate(),!0):!1},!1);f.selection.selected=[];f._noInternalMapping=!0;f._refresh();setTimeout(function(){p.publish("dojox/grid/rearrange/move/"+f.id,["row",n,a]);f._noInternalMapping=!1},0)},moveCells:function(a,b){var f=this.grid,e=f.store;if(e.getFeatures()["dojo.data.api.Write"]&&!(a.min.row==b.min.row&&a.min.col==b.min.col)){var g=f.layout.cells,h,c,d,l,k=[],n=[];h=a.min.row;for(d=b.min.row;h<=a.max.row;++h,++d){c=a.min.col;for(l=b.min.col;c<=a.max.col;++c,++l){for(;g[c]&&g[c].hidden;)++c;
for(;g[l]&&g[l].hidden;)++l;k.push({r:h,c:c});n.push({r:d,c:l,v:g[c].get(h,f._by_idx[h].item)})}}this._hasIdentity(k.concat(n))?console.warn("Can not write to identity!"):(m.forEach(k,function(a){e.setValue(f._by_idx[a.r].item,g[a.c].field,"")}),m.forEach(n,function(a){e.setValue(f._by_idx[a.r].item,g[a.c].field,a.v)}),e.save({onComplete:function(){p.publish("dojox/grid/rearrange/move/"+f.id,["cell",{from:a,to:b}])}}))}},copyCells:function(a,b){var f=this.grid,e=f.store;if(e.getFeatures()["dojo.data.api.Write"]&&
!(a.min.row==b.min.row&&a.min.col==b.min.col)){var g=f.layout.cells,h,c,d,l,k=[];h=a.min.row;for(d=b.min.row;h<=a.max.row;++h,++d){c=a.min.col;for(l=b.min.col;c<=a.max.col;++c,++l){for(;g[c]&&g[c].hidden;)++c;for(;g[l]&&g[l].hidden;)++l;k.push({r:d,c:l,v:g[c].get(h,f._by_idx[h].item)})}}this._hasIdentity(k)?console.warn("Can not write to identity!"):(m.forEach(k,function(a){e.setValue(f._by_idx[a.r].item,g[a.c].field,a.v)}),e.save({onComplete:function(){setTimeout(function(){p.publish("dojox/grid/rearrange/copy/"+
f.id,["cell",{from:a,to:b}])},0)}}))}},changeCells:function(a,b,f){var e=this.grid,g=e.store;if(g.getFeatures()["dojo.data.api.Write"]){var h=e.layout.cells,c=a.layout.cells,d,l,k,n,q=[];d=b.min.row;for(k=f.min.row;d<=b.max.row;++d,++k){l=b.min.col;for(n=f.min.col;l<=b.max.col;++l,++n){for(;c[l]&&c[l].hidden;)++l;for(;h[n]&&h[n].hidden;)++n;q.push({r:k,c:n,v:c[l].get(d,a._by_idx[d].item)})}}this._hasIdentity(q)?console.warn("Can not write to identity!"):(m.forEach(q,function(a){g.setValue(e._by_idx[a.r].item,
h[a.c].field,a.v)}),g.save({onComplete:function(){p.publish("dojox/grid/rearrange/change/"+e.id,["cell",f])}}))}},clearCells:function(a){var b=this.grid,f=b.store;if(f.getFeatures()["dojo.data.api.Write"]){var e=b.layout.cells,g,h,c=[];for(g=a.min.row;g<=a.max.row;++g)for(h=a.min.col;h<=a.max.col;++h){for(;e[h]&&e[h].hidden;)++h;c.push({r:g,c:h})}this._hasIdentity(c)?console.warn("Can not write to identity!"):(m.forEach(c,function(a){f.setValue(b._by_idx[a.r].item,e[a.c].field,"")}),f.save({onComplete:function(){p.publish("dojox/grid/rearrange/change/"+
b.id,["cell",a])}}))}},insertRows:function(a,b,f){try{var e=this.grid,g=e.store,h=e.rowCount,c={},d=0,l=[],k,n=0>f,q=this,s=b.length;if(n)f=0;else for(k=f;k<e.rowCount;++k)c[k]=k+s;if(g.getFeatures()["dojo.data.api.Write"]){if(a){var t=a.store,r,x;if(n)x=m.filter(m.map(e.layout.cells,function(a){return a.field}),function(a){return a});else{for(k=0;!r;++k)r=e._by_idx[k];x=g.getAttributes(r.item)}var v=[];m.forEach(b,function(b,e){var k={},n=a._by_idx[b];if(n){m.forEach(x,function(a){k[a]=t.getValue(n.item,
a)});k=q.args.setIdentifierForNewItem(k,g,h+d)||k;try{g.newItem(k),l.push(f+e),c[h+d]=f+e,++d}catch(p){console.log("insertRows newItem:",p,k)}}else v.push(b)})}else if(b.length&&u.isObject(b[0]))m.forEach(b,function(a,b){var e=q.args.setIdentifierForNewItem(a,g,h+d)||a;try{g.newItem(e),l.push(f+b),c[h+d]=f+b,++d}catch(k){console.log("insertRows newItem:",k,e)}});else return;e.layer("rowmap").setMapping(c);g.save({onComplete:function(){e._refresh();setTimeout(function(){p.publish("dojox/grid/rearrange/insert/"+
e.id,["row",l])},0)}})}}catch(w){console.log("insertRows:",w)}},removeRows:function(a){var b=this.grid,f=b.store;try{m.forEach(m.map(a,function(a){return b._by_idx[a]}),function(a){a&&f.deleteItem(a.item)}),f.save({onComplete:function(){p.publish("dojox/grid/rearrange/remove/"+b.id,["row",a])}})}catch(e){console.log("removeRows:",e)}},_getPageInfo:function(){var a=this.grid.scroller,b=a.page,f=a.page,e=a.firstVisibleRow,g=a.lastVisibleRow,h=a.rowsPerPage,c,d,l,k=[];m.forEach(a.pageNodes[0],function(a,
m){a&&(l=!1,c=m*h,d=(m+1)*h-1,e>=c&&e<=d&&(b=m,l=!0),g>=c&&g<=d&&(f=m,l=!0),!l&&(c>g||d<e)&&k.push(m))});return{topPage:b,bottomPage:f,invalidPages:k}}});w.registerPlugin(s);return s});