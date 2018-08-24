// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
require({
	cache : {
		"url:esri/dijit/metadata/types/iso/gmd/metadataEntity/templates/MetadataSectionDA&A.html" : '\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Tabs"\x3e\r\n  \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataClassification"\r\n      data-dojo-props\x3d"label:\'${i18nIso.metadataSection.identifierdaa}\'"\x3e\x3c/div\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataContact"\r\n      data-dojo-props\x3d"label:\'${i18nIso.metadataSection.contact}\'"\x3e\x3c/div\x3e\r\n      \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataDate"\r\n      data-dojo-props\x3d"label:\'${i18nIso.metadataSection.date}\'"\x3e\x3c/div\x3e\r\n    \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataStandard"\r\n      data-dojo-props\x3d"label:\'${i18nIso.metadataSection.standard}\'"\x3e\x3c/div\x3e\r\n      \r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataReference"\r\n      data-dojo-props\x3d"label:\'${i18nIso.metadataSection.reference}\'"\x3e\x3c/div\x3e\r\n    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'
	}
});
define(
		"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataSectionDA&A",
		"dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Tabs ./MetadataClassification ./MetadataContact ./MetadataDate ./MetadataStandard ./MetadataReference dojo/text!./templates/MetadataSectionDA&A.html ../../../../../../kernel"
				.split(" "),
		function(a, b, c, d, g, h, k, l, m, n, e, f) {
			a = a(d, {
				templateString : e
			});
			c("extend-esri")
					&& b
							.setObject(
									"dijit.metadata.types.iso.gmd.metadataEntity.MetadataSectionDA&A",
									a, f);
			return a
		});