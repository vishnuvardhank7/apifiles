/* See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * Esri Inc. licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/string",
        "dojo/topic",
        "dojo/request/xhr",
        "app/context/app-topics",
        "dojo/dom-class",
        "dojo/dom-construct",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/Tooltip",
        "dojo/text!./templates/ItemCard.html",
        "dojo/i18n!app/nls/resources",
        "app/context/AppClient",
        "app/etc/ServiceType",
        "app/etc/util",
        "app/common/ConfirmationDialog",
        "app/content/ChangeOwner",
        "app/content/MetadataEditor",
        "app/context/metadata-editor",
        "app/content/UploadMetadata"], 
function(declare, lang, array, string, topic, xhr, appTopics, domClass, domConstruct,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Tooltip, template, i18n, 
    AppClient, ServiceType, util, ConfirmationDialog, ChangeOwner, 
    MetadataEditor, gxeConfig, UploadMetadata) {
  
  var oThisClass = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
 
    i18n: i18n,
    templateString: template,
    
    isItemCard: true,
    item: null,
    itemsNode: null,
    searchPane: null,
    
    allowedServices: {
      "featureserver":"agsfeatureserver",
      "imageserver":"agsimageserver",
      "mapserver":"agsmapserver",
      "csw": "csw",
      "ims": "image",
      "sos": "sos",
      "wcs": "wcs",
      "wfs": "wfs",
      "wms": "wms"
    },
    
    postCreate: function() {
      this.inherited(arguments);
      var self = this;
      topic.subscribe(appTopics.ItemOwnerChanged,function(params){
        if (self.item && self.item === params.item) {
          self._renderOwnerAndDate(self.item);
        }
      });
    },
    
    render: function(hit) {
      var item = this.item = hit._source;
      item._id = hit._id; 
      var links = this._uniqueLinks(item);
      util.setNodeText(this.titleNode,item.title);
      this._renderOwnerAndDate(item);
      util.setNodeText(this.descriptionNode,item.description);
      this._renderThumbnail(item);
      this._renderItemLinks(hit._id,item);
      this._renderLinksDropdown(item,links);
      this._renderOptionsDropdown(hit._id,item);
      this._renderAddToMap(item,links);
      this._renderServiceStatus(item);
    },
    
    _canEditMetadata: function(item,isOwner,isAdmin,isPublisher) {
      var v;
      if ((isOwner && isPublisher) || isAdmin) {
        v = item.sys_metadatatype_s;
        if (typeof v === "string") {
          if (gxeConfig.editable.geoportalTypes.indexOf(v) !== -1) {
            if (gxeConfig.editable.allowNonGxeDocs) {
              return true;
            }
            v = item.app_editor_s;
            if (typeof v === "string" && v === "gxe") {
              return true;
            }
          }
        }
      }
      return false;
    },
    
    _isOwner: function(item) {
      var username = AppContext.appUser.getUsername();
      if (typeof username === "string" && username.length > 0) {
        return (username === item.sys_owner_s);
      }
      return false;
    },
    
    _mitigateDropdownClip: function(dd,ddul) {
      // Bootstrap dropdown menus clipped by scrollable container
      var self = this;
      var reposition = function() {
        //console.warn($(dd).offset());
        var t = $(dd).offset().top + 15 - $(window).scrollTop();
        var l = $(dd).offset().left;
        $(ddul).css('top',t);
        $(ddul).css('left',l);
        
        var position = dd.getBoundingClientRect().top;
        var buttonHeight = dd.getBoundingClientRect().height;
        var menuHeight = $(ddul).outerHeight();
        var winHeight = $(window).height();
        if (position > menuHeight && winHeight - position < buttonHeight + menuHeight) {
          //console.warn("dropup","position:",position,"t",t,"buttonHeight",buttonHeight,"menuHeight",menuHeight);
          t = t - menuHeight - buttonHeight - 4;
          $(ddul).css('top',t);
        } 
      };
      $(ddul).css("position","fixed");
      $(dd).on('click', function() {reposition();});
      //$(window).scroll(function() {reposition();});
      //$(this.itemsNode).scroll(function() {reposition();});
      //$(window).resize(function() {reposition();});
    },
    
    _mouseenter: function(e) {
      topic.publish(appTopics.OnMouseEnterResultItem,{item:this.item});
    },

    _mouseleave: function(e) {
      topic.publish(appTopics.OnMouseLeaveResultItem,{item:this.item});
    },
    
    _renderAddToMap: function(item,links) {
      if (links.length === 0) return;
      var endsWith = function(v,sfx) {return (v.indexOf(sfx,(v.length-sfx.length)) !== -1);};
      var actionsNode = this.actionsNode;
      array.some(links, function(u){
        var serviceType = new ServiceType();
        serviceType.checkUrl(u);
        //console.warn("serviceType",serviceType.isSet(),serviceType);
        if (serviceType.isSet()) {
          domConstruct.create("a",{
            href: "javascript:void(0)",
            innerHTML: i18n.item.actions.addToMap,
            onclick: function() {
              topic.publish(appTopics.AddToMapClicked,serviceType);
            }
          },actionsNode);
          return true;
        }
      });
    },
    
    _renderItemLinks: function(itemId,item) {
      var actionsNode = this.actionsNode;
      var uri = "./rest/metadata/item/"+encodeURIComponent(itemId);
      var htmlNode = domConstruct.create("a",{
        href: uri+"/html",
        target: "_blank",
        innerHTML: i18n.item.actions.html
      },actionsNode);
      var xmlNode = domConstruct.create("a",{
        href: uri+"/xml",
        target: "_blank",
        innerHTML: i18n.item.actions.xml
      },actionsNode);
      domConstruct.create("a",{
        href: uri+"?pretty=true",
        target: "_blank",
        innerHTML: i18n.item.actions.json
      },actionsNode);
      var v = item.sys_metadatatype_s;
      if (typeof v === "string" && v === "json") {
        htmlNode.style.visibility = "hidden";
        xmlNode.style.visibility = "hidden";
      }
    },
    
    _renderLinksDropdown: function(item,links) {
      if (links.length === 0) return;
      var dd = domConstruct.create("div",{
        "class": "dropdown",
        "style": "display:inline-block;"
      },this.actionsNode);
      var ddbtn = domConstruct.create("a",{
        "class": "dropdown-toggle",
        "href": "#",
        "data-toggle": "dropdown",
        "aria-haspopup": true,
        "aria-expanded": true,
        innerHTML: i18n.item.actions.links
      },dd);
      domConstruct.create("span",{
        "class": "caret"
      },ddbtn);
      var ddul = domConstruct.create("ul",{
        "class": "dropdown-menu",
      },dd);
      array.forEach(links, function(u){
        var ddli = domConstruct.create("li",{},ddul);
        domConstruct.create("a",{
          "class": "small",
          href: u,
          target: "_blank",
          innerHTML: u
        },ddli);
      });
      this._mitigateDropdownClip(dd,ddul);
    },
    
    _renderOptionsDropdown: function(itemId,item) {
      var self = this;
      var isOwner = this._isOwner(item);
      var isAdmin = AppContext.appUser.isAdmin();
      var isPublisher = AppContext.appUser.isPublisher();
      var links = [];
      
      if (this._canEditMetadata(item,isOwner,isAdmin,isPublisher)) {
        links.push(domConstruct.create("a",{
          "class": "small",
          href: "javascript:void(0)",
          innerHTML: i18n.item.actions.options.editMetadata,
          onclick: function() {
            var editor = new MetadataEditor({itemId:itemId});
            editor.show();
          }
        }));
      }
      
      if ((isOwner && isPublisher) || isAdmin) {
        
        links.push(domConstruct.create("a",{
          "class": "small",
          href: "javascript:void(0)",
          innerHTML: i18n.item.actions.options.uploadMetadata,
          onclick: function() {
            (new UploadMetadata({itemId:itemId})).show();
          }
        }));
        
        links.push(domConstruct.create("a",{
          "class": "small",
          href: "javascript:void(0)",
          innerHTML: i18n.item.actions.options.deleteItem,
          onclick: function() {
            var dialog = new ConfirmationDialog({
              title: i18n.item.actions.options.deleteItem,
              content: item.title,
              okLabel: i18n.general.del,
              status: "danger"
            });
            dialog.show().then(function(ok){
              if (ok) {
                dialog.okCancelBar.showWorking(i18n.general.deleting,false);
                var client = new AppClient();
                client.deleteItem(itemId).then(function(response){
                  topic.publish(appTopics.ItemDeleted,{
                    itemId: itemId,
                    searchPane: self.searchPane
                  });
                  self.domNode.style.display = "none";
                  dialog.hide();
                }).otherwise(function(error){
                  var msg = i18n.general.error;
                  console.warn("deleteItem.error",error);
                  dialog.okCancelBar.showError(msg,false);
                });
              }
            });
          }
        }));
      }
      
      if (isAdmin) {
        links.push(domConstruct.create("a",{
          "class": "small",
          href: "javascript:void(0)",
          innerHTML: i18n.item.actions.options.changeOwner,
          onclick: function() {
            var dialog = new ChangeOwner({item:item});
            dialog.show();
          }
        }));
      }
      
      if (links.length === 0) return;
      
      var dd = domConstruct.create("div",{
        "class": "dropdown",
        "style": "display:inline-block;"
      },this.actionsNode);
      var ddbtn = domConstruct.create("a",{
        "class": "dropdown-toggle",
        "href": "#",
        "data-toggle": "dropdown",
        "aria-haspopup": true,
        "aria-expanded": true,
        innerHTML: i18n.item.actions.options.caption
      },dd);
      domConstruct.create("span",{
        "class": "caret"
      },ddbtn);
      var ddul = domConstruct.create("ul",{
        "class": "dropdown-menu",
      },dd);
      array.forEach(links,function(link){
        var ddli = domConstruct.create("li",{},ddul);
        ddli.appendChild(link);
      });
      this._mitigateDropdownClip(dd,ddul);
    },
    
    _renderOwnerAndDate: function(item) {
      var owner = item.sys_owner_s;
      var date = item.sys_modified_dt;
      var idx, text = "";
      if (AppContext.appConfig.searchResults.showDate && typeof date === "string" && date.length > 0) {
        idx = date.indexOf("T");
        if (idx > 0) date =date.substring(0,idx);
        text = date;
      }
      if (AppContext.appConfig.searchResults.showOwner && typeof owner === "string" && owner.length > 0) {
        if (text.length > 0) text += " ";
        text += owner;
      }
      if (text.length > 0) {
        util.setNodeText(this.ownerAndDateNode,text);
      }
    },
    
    _renderThumbnail: function(item) {
      var show = AppContext.appConfig.searchResults.showThumbnails;
      var thumbnailNode = this.thumbnailNode;
      if (show && typeof item.thumbnail_s === "string" && item.thumbnail_s.indexOf("http") === 0) {
        setTimeout(function(){
          thumbnailNode.src = util.checkMixedContent(item.thumbnail_s);
        },1);
      } else {
        thumbnailNode.style.display = "none";
      }
      //thumbnailNode.src = "http://placehold.it/80x60";
    },
    
    _uniqueLinks: function(item) {
      var links = [];
      if (typeof item.links_s === "string") {
        links = [item.links_s];
      } else if (lang.isArray(item.links_s)) {
        array.forEach(item.links_s, function(u){
          if (links.indexOf(u) === -1) links.push(u);
        });
      }
      return links;
    },
    
    _renderServiceStatus: function(item) {
      var authKey = AppContext.appConfig.statusChecker.authKey;
      if (authKey && string.trim(authKey).length>0) {
        if (item && item.resources_nst) {
          if (item.resources_nst.length) {
            for (var i=0; i<item.resources_nst.length; i++) {
              var type = this._translateService(item.resources_nst[i].url_type_s);
              if (type) {
                this._checkService(item._id,type);
                break;
              }
            }
          } else {
            var type = this._translateService(item.resources_nst.url_type_s);
            if (type) {
              this._checkService(item._id,type);
            }
          }
        }
      }
    },
    
    _checkService: function(id,type) {
      console.log("Service check for: ", id, type);
      xhr.get("viewer/proxy.jsp?"+AppContext.appConfig.statusChecker.apiUrl,{
        query: {
          auth: AppContext.appConfig.statusChecker.authKey,
          type: type,
          id: id
        },
        handleAs: "json"
      }).then(lang.hitch({self: this, id: id, type: type},this._drawStatusIcon));
    },
    
    _drawStatusIcon: function(response) {
      if (response.error) {
        console.error(response.error);
      } else if (response.data!=null && response.data.constructor==Array && response.data.length>0) {
        var score = response.data[0].summary.scoredTest.currentScore;
        this.self._setServiceCheckerIcon(score,this.id,this.type);
      }    
    },
    
    _setServiceCheckerIcon: function(score,id,type) {
      console.log("SCORE", score);
      var imgSrc;
      var info;
      if(!score || score < 0) {
        imgSrc = "Unknown16.png";
        info = i18n.item.statusChecker.unknown;
      } else if(score <= 25) {
        imgSrc = "VeryBad16.png";
      } else if(score <= 50 ) {
        imgSrc = "Bad16.png";
      } else if(score <= 75 ) {
        imgSrc = "Good16.png";
      } else if(score > 75 && score <= 100) {
        imgSrc = "Excellent16.png";
      } else {
        imgSrc = "Unknown16.png";
        info = i18n.item.statusChecker.unknown;
      }
      if (!info) {
        info = string.substitute(i18n.item.statusChecker.status,{score: score});
      }
      
      var link = domConstruct.create("a",{
        href: AppContext.appConfig.statusChecker.infoUrl+"?auth="+AppContext.appConfig.statusChecker.authKey+"&uId="+id+"&serviceType="+type, 
        target: "_blank",
        alt: info,
        "class": "g-item-status"
      });
      domConstruct.place(link,this.titleNode,"first");
      
      var iconPlace = domConstruct.create("img",{
        src: "images/serviceChecker"+imgSrc, 
        alt: info, 
        height: 16, 
        width: 16
      });
      domConstruct.place(iconPlace,link);
      
      var tooltip = new Tooltip({
        connectId: link,
        label: info,
        position: ['below']
      });
      tooltip.startup();
    },
    
    _translateService: function(service) {
      if (service) {
        service = service.toLowerCase();
        if (this.allowedServices[service]) {
          return this.allowedServices[service];
        }
      }
      return null;
    }
    
  });
  
  return oThisClass;
});