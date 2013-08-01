/*
 * Config for values that can be globally get and set at runtime
 *
 * Example to set a global value:
 * Skin.config.global.Config.setMyLastCustomer(12345);
 *
 * Example to get a global value:
 * Skin.config.global.Config.getMyLastCustomer();
 *
 */
Ext.define("Skin.config.global.Config",{
    singleton : true,
    config : {
        //myLastCustomer : 0,   // initialize to 0
        previousView : '',    // initialize to empty
        currentView : '',     // initialize to empty
        nextView : '',        // initialize to empty
        ui: '',        	  	  // initialize to empty
    },
    constructor : function(config){
        this.initConfig(config);
    }
});