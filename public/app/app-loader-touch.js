// Configure Loader paths
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		"CafeTownsend": "app",
		"Ext": "resources/js/touch/src",
		"nineam": "resources/js/locale/nineam",
		enabled: true,
		disableCaching: true
	}
});

/**
 * DeftJS relies on several core Sencha classes to function. For some strange reason, these core classes are
 * not part of the ext.js file, so you'll need to ensure that these classes are loaded and available before the
 * DeftJS library is loaded.
 */
// Include dependent Sencha classes
Ext.syncRequire([
//    "Ext.Component", 
//    "Ext.ComponentManager", 
//    "Ext.ComponentQuery"
]);