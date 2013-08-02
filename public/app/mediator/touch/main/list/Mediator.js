/**
 *  @class Skin.mediator.touch.main.list.Mediator
 *
 *  This {@link Ext.app.Controller} serves as a demonstration of how to
 *  listen to various events relating to a {@link Ext.ux.slidenavigation.View}.
 *
 */
Ext.define("Skin.mediator.touch.main.list.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
	
       titlebar: {
    	   painted: "onPainted"
       },	
	
       logoutButton: {
           tap: "onLogoutButtonTap"
       },

       newMainButton: {
           tap: "onNewMainButtonTap"
       },

        searchInput :{
            keyup:          "onSearchKeyUp",
            clearicontap:   "onSearchClearIconTap"
        },
        
        list: {
            disclose: "onListDisclose"
        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(Skin.event.ui.Event.SET_UI_SUCCESS, this.onSetUISuccess, this);
        
        this.eventBus.addGlobalEventListener(Skin.event.authentication.Event.LOGIN_SUCCESS, this.onLoginSuccess, this);
        
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_LIST_SUCCESS, this.onGetMainListSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_LIST_FAILURE, this.onGetMainListFailure, this);
    },

    /**
     * Dispatches the application event to get the list of mains.
     */
    getMainListData: function() {
        this.logger.debug("getMainListData");

        this.getView().setMasked({
            xtype: "loadmask",
            message: nineam.locale.LocaleManager.getProperty("mainList.loading")
        });

        var evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.GET_MAIN_LIST);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the show main detail event from the main list view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the list currently selected.
     */
    showMainDetail: function(record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", main = " + record.get("name")
            : "new main";
        this.logger.debug("showMainDetail = " + logMsg);
		Skin.config.global.Config.setPreviousView('mainListView');
        this.navigate(Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL);
        this.mainStore.setSelectedRecord(record);
    },

    /**
     * Handles the set UI event. 
     *
     */
    setUI: function() {
    	Ext.getCmp('titlebar').ui = Skin.config.global.Config.getUi();
    	this.logger.debug("current ui: " + Skin.config.global.Config.getUi());
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event. Set the main list view
     * as the current view.
     */    
    onPainted: function() {
    	Skin.config.global.Config.setCurrentView('mainListView');
    	this.logger.debug("current view: " + Skin.config.global.Config.getCurrentView());
    },

    /**
     * Handles the login success application-level event. Slide the main view
     * onto stage.
     */
    onLoginSuccess: function() {
        this.logger.debug("onLoginSuccess");
        
        console.log("next view: " + Skin.config.global.Config.getNextView()); // added by wvh, for testing only
                
		if(Skin.config.global.Config.getNextView()==='mainListView') {
        	this.navigate(Skin.event.authentication.Event.LOGIN_SUCCESS);
        	this.getMainListData();
		}
    },

    /**
     * Handles the set ui success application-level event. Update the components for the ui.
     */
    onSetUISuccess: function() {
        this.logger.debug("onSetUISuccess");
        this.logger.debug("ui: " + Skin.config.global.Config.getUi()); // added by wvh, for testing only
        this.setUI();
    },

    /**
     * Handles the get main application-level event.
     */
    onGetMainListSuccess: function() {
        this.logger.debug("onGetMainListSuccess");

        this.getView().setMasked(false);
        this.getList().setStore(this.mainStore);
    },

    /**
     * Handles the get main failure event from the login controller.
     */
    onGetMainListFailure: function() {
        this.logger.debug("onGetMainListFailure");

        this.getView().setMasked(false);
    },    

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the tap of the logout button. Dispatches the logout application-level event.
     */
    onLogoutButtonTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainListView') { 	
	        this.logger.debug("onLogoutButtonTap");

	        var evt = Ext.create("Skin.event.authentication.Event", Skin.event.authentication.Event.LOGOUT);
	        this.eventBus.dispatchGlobalEvent(evt);
		}//eof if
    },

    /**
     * Handles the tap of the new main button. Shows the main detail view.
     */
    onNewMainButtonTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainListView') {	
	        this.logger.debug("onNewMainButtonTap");

	        this.showMainDetail();
		}//eof if
    },

    /**
     * Handles the list disclose of a main list item. Shows the main detail view passing in a reference to
     * the selected item in the main.
     *
     * @param {Ext.dataview.List} list  Reference to the visual list component.
     * @param {Object/Ext.data.Model} record Reference to the selected item in the list.
     * @param {Object} target The item in the list that's selected.
     * @param {Number} index The index of the selected item.
     * @param {Object/Event} evt the event that triggered the handler.
     * @param {Object} options ???
     */
    onListDisclose: function(list, record, target, index, evt, options) {
    	if(Skin.config.global.Config.getCurrentView()==='mainListView') {	
	        this.logger.debug("onListDisclose");
	        this.mainStore.setSelectedRecord(record);
	        this.showMainDetail(record);
		}//eof if
    },

    /**
     * Handles the clear icon tap event on the search field. Clears all filter on the list's store.
     */
    onSearchClearIconTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainListView') {    	
	        this.logger.debug("onSearchClearIconTap");
	
	        var store = this.getList().getStore();
	        store.clearFilter();
    	}//eof if        
    },

    /**
     * Handles the key up event on the search field. Filters the list component's store by the value in the
     * search field and determining if it matches the first or last name elements of each record in the list.
     *
     * @param {Ext.field.Search} field Reference to the search field.
     *
     * TODO: BMR: 02/28/13: clean this up. pulled directly from another example with minor changes: http://www.phs4j.com/2012/05/add-a-searchfield-to-a-sencha-touch-2-list-mvc/
     */
    onSearchKeyUp: function(field) {
    	if(Skin.config.global.Config.getCurrentView()==='mainListView') {
	        this.logger.debug("onSearchKeyUp");
	
	        //get the store and the value of the field
	        var value = field.getValue();
	        var store = this.getList().getStore();
	
	        //first clear any current filters on the store
	        store.clearFilter();
	
	        //check if a value is set first, as if it isn't we don't have to do anything
	        if (value) {
	            //the user could have entered spaces, so we must split them so we can loop through them all
	            var searches = value.split(" "),
	                regexps = [],
	                i;
	
	            //loop them all
	            for (i = 0; i < searches.length; i++) {
	                //if it is nothing, continue
	                if (!searches[i]) continue;
	
	
	                //if found, create a new regular expression which is case insenstive
	                regexps.push(new RegExp(searches[i], "i"));
	            }
	
	            //now filter the store by passing a method
	            //the passed method will be called for each record in the store
	            store.filter(function(record) {
	                var matched = [];
	
	                //loop through each of the regular expressions
	                for (i = 0; i < regexps.length; i++) {
	                    var search = regexps[i],
	                        didMatch = record.get("name").match(search);
	
	                    //if it matched the first or last name, push it into the matches array
	                    matched.push(didMatch);
	                }
	
	                //if nothing was found, return false (dont so in the store)
	                if (regexps.length > 1 && matched.indexOf(false) != -1) {
	                    return false;
	                } else {
	                    //else true true (show in the store)
	                    return matched[0];
	                }
	            });
	        }
    	}//eof if
    }
});