/**
 * Contains the list of main domain objects.
 */
Ext.define("Skin.store.main.Store", {
    extend: "FlowMVC.mvc.store.AbstractStore",
    // Touch uses properties inside of config
	config: {
	    model: "Skin.model.main.Model",
	    sorters: "name",
	    isAutoUpdate: true,
	    grouper: {
	        groupFn: function(record) {
	            try {
	                return record.get("name")[0];
	            } catch(err) {
	
	            }
	        }
	    }
	},//eof config
	// Ext requires properties outside of config
    model: "Skin.model.main.Model",
    sorters: "name",
    isAutoUpdate: true,
    grouper: {
        groupFn: function(record) {
            try {
                return record.get("name")[0];
            } catch(err) {

            }
        }
    }	
});