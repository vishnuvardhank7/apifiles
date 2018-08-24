// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.17/esri/copyright.txt for details.
//>>built
define(
		"esri/dijit/metadata/types/iso/base/DataDocumentTypeDA&A",
		"dojo/_base/declare dojo/_base/lang dojo/has ./IsoDocumentType ./DataRootDA&A dojo/i18n!../../../nls/i18nIso ../../../../../kernel"
				.split(" "), function(a, c, d, e, f, b, g) {
			a = a(e, {
				caption : b.documentTypes.datadaa.caption,
				description : b.documentTypes.datadaa.description,
				key : "iso-19115-DA&A",
				isService : !1,
				metadataStandardName : "ISO 19139/19115 Metadata for Datasets",
				metadataStandardVersion : "2003",
				newRootDescriptor : function() {
					return new f
				}
			});
			d("extend-esri")
					&& c.setObject(
							"dijit.metadata.types.iso.base.DataDocumentTypeDA&A",
							a, g);
			return a
		});