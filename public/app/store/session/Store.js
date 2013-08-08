/**
 * Contains the list of session domain objects.
 */
Ext.define("Skin.store.session.Store", {
	extend: "FlowMVC.mvc.store.AbstractStore",
	storeId: "sessionStore",
    // Touch uses properties inside of config
	config: {
	    model: "Skin.model.session.Model",
	    sorters: "id",
	    isAutoUpdate: true,
	    grouper: {
	        groupFn: function(record) {
	            try {
	                return record.get("id")[0];
	            } catch(err) {
	
	            }
	        }
	    },
	    autoLoad: true,
	    proxy: {
	    	type: 'localstorage',
	    	id: 'Skin.session.ApplicationKey'
	    }
	},//eof config
	// Ext requires properties outside of config
    model: "Skin.model.session.Model",
    sorters: "id",
    isAutoUpdate: true,
    grouper: {
        groupFn: function(record) {
            try {
                return record.get("id")[0];
            } catch(err) {

            }
        }
    },
    autoLoad: true,
    proxy:{
    	type: 'localstorage',
    	id: 'Skin.session.ApplicationKey'	
    }	
});