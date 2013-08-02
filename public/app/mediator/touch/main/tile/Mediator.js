/**
 * The main tile mediator essentially fulfills the passive view pattern for the main tile view.
 */
Ext.define("Skin.mediator.touch.main.tile.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event"
    ],

    inject: [
        "mainStore",
        "logger"
    ],

	// refs: {
	// 	slideNav:  'slidenavigationview'		
	// },

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

// CURRENTLY WE DO NOT HAVE A SEARCH IN THE TILE VIEW
        searchInput :{
            keyup:          "onSearchKeyUp",
            clearicontap:   "onSearchClearIconTap"
        },
        
        tile: {
            disclose: "onTileDisclose"
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

        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_TILE_SUCCESS, this.onGetMainTileSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.main.Event.GET_MAIN_TILE_FAILURE, this.onGetMainTileFailure, this);
    },

    /**
     * Dispatches the application event to get the tile of mains.
     */
    getMainTileData: function() {
        this.logger.debug("getMainTileData");

        this.getView().setMasked({
            xtype: "loadmask",
            message: nineam.locale.LocaleManager.getProperty("mainTile.loading")
        });

        var evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.GET_MAIN_TILE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the show main detail event from the main tile view. Grab the data model
     * from the selected item in the tile and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the tile currently selected.
     */
    showMainDetail: function(record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", main = " + record.get("name")
            : "new main";
        this.logger.debug("showMainDetail = " + logMsg);
		Skin.config.global.Config.setPreviousView('mainTileView');
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
     * Handles the painted application-level event. Set the main tile view
     * as the current view.
     */    
    onPainted: function() {
    	Skin.config.global.Config.setCurrentView('mainTileView');
    	this.logger.debug("current view: " + Skin.config.global.Config.getCurrentView());
    },

    /**
     * Handles the login success application-level event. Slide the main tile view
     * onto stage.
     */
    onLoginSuccess: function() {
        this.logger.debug("onLoginSuccess");
        
        console.log("next view: " + Skin.config.global.Config.getNextView()); // added by wvh, for testing only
                
		if(Skin.config.global.Config.getNextView()==='mainTileView') {
        	this.navigate(Skin.event.authentication.Event.LOGIN_SUCCESS);
        	this.getMainTileData();
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
    onGetMainTileSuccess: function() {
        this.logger.debug("onGetMainTileSuccess");

        this.getView().setMasked(false);
        this.getTile().setStore(this.mainStore);
    },

    /**
     * Handles the get main failure event from the login controller.
     */
    onGetMainTileFailure: function() {
        this.logger.debug("onGetMainTileFailure");

        this.getView().setMasked(false);
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the tap of the logout button. Dispatches the logout application-level event.
     */
    onLogoutButtonTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') { 	
	        this.logger.debug("onLogoutButtonTap");

	        var evt = Ext.create("Skin.event.authentication.Event", Skin.event.authentication.Event.LOGOUT);
	        this.eventBus.dispatchGlobalEvent(evt);
		}//eof if
    },

    /**
     * Handles the tap of the new main button. Shows the main detail view.
     */
    onNewMainButtonTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') { 	
	        this.logger.debug("onNewMainButtonTap");

	        this.showMainDetail();
		}//eof if
    },

    /**
     * Handles the tile disclose of a main tile item. Shows the main detail view passing in a reference to
     * the selected item in the tile.
     *
     * @param {Ext.dataview.List} tile  Reference to the visual tile component.
     * @param {Object/Ext.data.Model} record Reference to the selected item in the tile.
     * @param {Object} target The item in the tile that's selected.
     * @param {Number} index The index of the selected item.
     * @param {Object/Event} evt the event that triggered the handler.
     * @param {Object} options ???
     */
    onTileDisclose: function(tile, record, target, index, evt, options) {
    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') { 	
	        this.logger.debug("onTileDisclose");
	        this.mainStore.setSelectedRecord(record);
	        this.showMainDetail(record);
		}//eof if
    },

    /**
     * Handles the clear icon tap event on the search field. Clears all filter on the tile's store.
     */
    onSearchClearIconTap: function() {
    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') {    	
	        this.logger.debug("onSearchClearIconTap");
	
	        var store = this.getTile().getStore();
	        store.clearFilter();
    	}//eof if    
    },

    /**
     * Handles the key up event on the search field. Filters the tile component's store by the value in the
     * search field and determining if it matches the first or last name elements of each record in the tile.
     *
     * @param {Ext.field.Search} field Reference to the search field.
     *
     * TODO: BMR: 02/28/13: clean this up. pulled directly from another example with minor changes: http://www.phs4j.com/2012/05/add-a-searchfield-to-a-sencha-touch-2-list-mvc/
     */
    onSearchKeyUp: function(field) {
    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') {
	        this.logger.debug("onSearchKeyUp");
	
	        //get the store and the value of the field
	        var value = field.getValue();
	        var store = this.getTile().getStore();
	
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
