// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/DataBrowser/_GeoenrichmentVariables","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/promise/all ../../../tasks/geoenrichment/GeoenrichmentTask ../config dojo/i18n!../../../nls/jsapi ./DeferredStore".split(" "),function(k,f,d,l,m,h,g,n){g=g.geoenrichment.dijit.VariableStore;return k(null,{globalCountryID:"_",countries:null,variableFields:null,_currentCountryID:null,_getCountriesPromise:null,_resolveCountryIDPromise:null,constructor:function(){this.countries=
new n({idProperty:"value",resolver:f.hitch(this,this._getCountries)});this.countries.syncQuery=function(a,b){a=a&&a.allowHierarchies?{}:function(a){return 3>a.value.length};return this.queryEngine(a,b)(this.data)};this.categories.resolver=this.dataCollections.resolver=f.hitch(this,this._resolveCountryID)},synchronize:function(a){return void 0===a?this._resolveCountryIDPromise:this._resolveCountryID({countryID:a})},getCurrentCountryID:function(){return this._currentCountryID},_getCountries:function(a){if(!this._getCountriesPromise){var b=
this;this._getCountriesPromise=this._getGeoenrichmentTask().getAvailableCountries().then(function(a){var c=[{value:b.globalCountryID,label:g.global}];d.forEach(a,f.hitch(b,b._collectCountryValues,c));b.countries.setData(c)})}return this._getCountriesPromise},_collectCountryValues:function(a,b){a.push({value:b.id,label:b.name});var e=b.hierarchies;e&&!(2>e.length)&&(b.defaultDatasetID.toUpperCase(),d.some(e,function(a){d.some(a.datasets,function(a){return a.toUpperCase()==a})&&(a.isDefault=!0);return a.isDefault}),
d.forEach(e,function(c){a.push({value:b.id+"/"+c.ID,label:b.name+" ("+c.ID+")",countryID:b.id,countryName:b.name,hierarchyID:c.ID,isDefault:c.isDefault})}))},_resolveCountryID:function(a){a=a||{};if("object"==typeof a){a=a.countryID||this.globalCountryID;if(a!=this._currentCountryID){this._currentCountryID=a;var b=this;this._clearAllStores();this._resolveCountryIDPromise=this._getDataCollections(a==this.globalCountryID?null:a).then(function(a){b._processDataCollections(a)});this.favorites&&this.favorites.synchronize&&
(this._resolveCountryIDPromise=l([this._resolveCountryIDPromise,this.favorites.synchronize(a)]))}return this._resolveCountryIDPromise}},_getDataCollections:function(a){return this._getGeoenrichmentTask().getDataCollections(a,null,this.variableFields)},_getGeoenrichmentTask:function(){var a=new m(h.server);a.token=h.token;return a}})});