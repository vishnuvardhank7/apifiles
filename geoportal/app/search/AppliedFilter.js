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
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/text!./templates/AppliedFilter.html",
        "dojo/i18n!app/nls/resources"], 
function(declare, lang, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, i18n) {
  
  var oThisClass = declare([_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin], {
    
    isAppliedFilter: true,
    label: null,
    tip: null,
    qClause: null,
    visibility: "hidden",
    
    i18n: i18n,
    templateString: template,
    
    postMixInProperties: function() {
      this.inherited(arguments);
      try {
        var sLabel = this.label, qClause = this.qClause;
        if (typeof sLabel !== "string" || (sLabel.length === 0)) {
          if (qClause) {
            sLabel = qClause.appliedFilterLabel;
            if (typeof sLabel !== "string" || (sLabel.length === 0)) {
              sLabel = qClause.label;
            }
            if (typeof sLabel !== "string" || (sLabel.length === 0)) {
              sLabel = qClause.urlParameterValue;
            }
            if (typeof sLabel === "string") this.label = sLabel;
          }
        }
        if (qClause && qClause.removable) this.visibility = "visible";
        if (qClause) this.tip = qClause.tip;
      } catch(e) {
        console.warn("Error: AppliedFilter.postMixInProperties");
        console.error(e);
      }
    },
    
    clearFilter: function() {
      if (!this.qClause) return;
      if (!this.qClause.removable) return;
      var qClause = this.qClause;
      var qComp = qClause.parentQComponent;
      var i, n, nClauseIdx = -1, qClauses = qComp.activeQClauses;
      if (!qClauses) return;
      n = qClauses.length;
      for (i=0;i<n;i++) {
        if (qClauses[i].clauseId === qClause.clauseId) {
          nClauseIdx = i;
          break;
        }
      }
      if (nClauseIdx != -1) {
        qClauses.splice(nClauseIdx,1);
        qComp.whenQClauseRemoved(qClause);
        qComp.search();
      }
    }
  
  });
  
  return oThisClass;
});