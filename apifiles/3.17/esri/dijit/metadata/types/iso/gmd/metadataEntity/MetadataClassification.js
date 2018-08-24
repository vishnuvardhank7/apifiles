// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
require({
	cache : {
		"url:esri/dijit/metadata/types/iso/gmd/metadataEntity/templates/MetadataClassification.html" : '\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataFileIdentifier"\x3e\x3c/div\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataLanguage"\x3e\x3c/div\x3e\r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataHierarchy"\x3e\x3c/div\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataOrganization"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e'
	}
});
define(
		"esri/dijit/metadata/types/iso/gmd/metadataEntity/MetadataClassification",
		"dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ./MetadataFileIdentifier ./MetadataLanguage ./MetadataHierarchy ./MetadataOrganization dojo/text!./templates/MetadataClassification.html ../../../../../../kernel"
				.split(" "),
		function(a, b, c, d, g, h, k, e, f) {
			a = a(d, {
				templateString : e
			});
			c("extend-esri")
					&& b
							.setObject(
									"dijit.metadata.types.iso.gmd.metadataEntity.MetadataClassification",
									a, f);
			return a
		});