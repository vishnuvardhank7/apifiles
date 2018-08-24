// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define("esri/dijit/FeatureLayerQueryStore","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has dojo/promise/all dojo/Deferred ../request ../tasks/query ../tasks/RelationshipQuery ../dijit/FeatureLayerQueryResult dojo/i18n!../nls/jsapi".split(" "),function(e,h,g,q,p,r,s,t,u,v,w){var n=e(null,{layer:null,data:null,objectIds:null,idProperty:"id",totalCount:0,batchCount:25,where:null,orderByFields:null,getAttachments:!1,getRelatedRecords:!1,constructor:function(b){e.safeMixin(this,b);this.idProperty=
this.layer.objectIdField;this.data=[]},get:function(b){return this.data[b]},getIdentity:function(b){return b[this.idProperty]},query:function(b,d){var c=new r,f=new t,k=d.start||0,e=d.count||this.batchCount,n=this.layer.relationships,l=d.objectIds||this.objectIds,m=[];l&&l.length?f.objectIds=l.length>=k+this.batchCount?l.slice(k,k+e):l.slice(k):(f.start=k,f.num=e,f.where=this.where,f.orderByFields=this.orderByFields);f.returnGeometry=!1;f.outFields=["*"];this.layer.queryFeatures(f).then(h.hitch(this,
function(a){var b=a.objectIdFieldName,d={},e=[];b||g.some(a.fields,function(a,c){if("esriFieldTypeOID"===a.type)return b=a.name,!1});this.objectIds&&(g.forEach(a.features,function(a,c){d[a.attributes[b]]=a}),a.features=g.map(f.objectIds,function(a){return d[a]}));g.forEach(a.features,function(c,d){a.features[d]=c.attributes;e.push(a.features[d][b]);this.data[a.features[d][b]]=c},this);a.total=this.totalCount;this.getAttachments&&this.getRelatedRecords?(m.push(this._queryAttachments(e)),g.forEach(n,
function(a){m.push(this._queryRelatedRecords(e,a))},this),p(m).then(h.hitch(this,function(b){a.attachmentInfos=this._createAttachmentInfoLookup(b.shift());a.relatedRecordInfos=this._createRelatedRecordInfoLookup(b);c.resolve(a)})).otherwise(function(){a.attachmentInfos=null;a.relatedRecordInfos={};c.resolve(a)})):this.getRelatedRecords?(g.forEach(n,function(a){m.push(this._queryRelatedRecords(e,a))},this),p(m).then(h.hitch(this,function(b){a.relatedRecordInfos=this._createRelatedRecordInfoLookup(b);
c.resolve(a)})).otherwise(function(){a.relatedRecordInfos=null;c.resolve(a)})):this.getAttachments?this._queryAttachments(e).then(h.hitch(this,function(b){a.attachmentInfos=this._createAttachmentInfoLookup(b);c.resolve(a)})).otherwise(function(){a.attachmentInfos=null;c.resolve(a)}):c.resolve(a)}));return new v(c)},_queryRelatedRecords:function(b,d){var c=new u;c.outFields=[this.idProperty];c.returnGeometry=!1;c.relationshipId=d.id;c.objectIds=b;return this.layer.queryRelatedFeatures(c)},_createRelatedRecordInfoLookup:function(b){var d=
{};g.forEach(b,function(b,e){d[this.layer.relationships[e].id]=b},this);return d},_queryAttachments:function(b){return s({url:this.layer._url.path+"/queryAttachments",content:{f:"json",objectIds:b.toString()},handleAs:"json",callbackParamName:"callback"})},_createAttachmentInfoLookup:function(b){var d={};g.forEach(b.attachmentGroups,function(b){d[b.parentObjectId]={attachments:b.attachmentInfos}});return d}});q("extend-esri")&&h.setObject("dijit.FeatureLayerQueryStore",n,w);return n});