/**
 * The main tile mediator essentially fulfils the passive view pattern for the main tile view.
 */
Ext.define("Skin.mediator.extjs.main.tile.Mediator", {
    extend: "Skin.mediator.extjs.main.base.Mediator",

    // set up view event to mediator mapping
    control: {
	    toolbar: {
    		painted: "onPainted"
    	},
        logoutButton: {
            click: "onLogoutButtonClick"
        },
        newMainButton: {
            click: "onNewMainButtonClick"
        },
        tile: {
        	itemclick: "onTileSelect"
        }
    },

    /**
     * Dispatches the application event to get the tile of mains.
     */
    getMainTileData: function() {
        this.logger.debug("getMainTileData");
        this.getView().setLoading(nineam.locale.LocaleManager.getProperty("mainTile.loading"));
        var evt = Ext.create("Skin.event.main.Event", Skin.event.main.Event.GET_MAIN_TILE);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the show main detail event from the main tile view. Grab the data model
     * from the selected item in the list and set it as the data provider for the detail view.
     * Finally, slide the detail view onto stage.
     *
     * @param record    The record is the data model for the item in the list currently selected.
     */
    showMainDetail: function(record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", main = " + record.get("name")
            : "";
        this.logger.debug("showMainDetail = " + logMsg);
		Skin.config.global.Config.setPreviousView('maintile');
        this.mainStore.setSelectedRecord(record);
        this.navigate(Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL);
    },

    /**
     * Handles the set UI event. 
     *
	 * @param ui    The ui to be set.
     */
    setUI: function(ui) {
    	this.logger.debug("setUI: ui = " + ui);
		for ( var i=0; i<this.getView().items.length; i++)
        {
            this.getView().items.getAt(i).setUI(ui);
        }
    },	
	
    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the painted application-level event. 
     * 
     */    
    onPainted: function() {
		this.logger.debug("onPainted");
    },	
	
    /**
     * Handles the login success application-level event. Slide the main tile view
     * onto stage.
     */
    onLoginSuccess: function() {
		if(Skin.config.global.Config.getNextView()==='maintile') {
		    this.logger.debug("onLoginSuccess");
        	this.navigate(Skin.event.authentication.Event.LOGIN_SUCCESS);
        	this.getMainTileData();
		}
    },

    /**
     * Handles the set ui success application-level event. Update the components for the ui.
     */
    onSetUISuccess: function() {
        this.logger.debug("onSetUISuccess");
        this.setUI(Skin.config.global.Config.getUi());
    },	
	
    /**
     * Handles the get mains application-level event.
     */
    onGetMainTileSuccess: function() {
		if(Skin.config.global.Config.getCurrentView()==='maintile') {
			this.logger.debug("onGetMainTileSuccess");
			this.getView().setLoading(false);
			this.getTile().getStore().loadRecords(this.mainStore.getRange());
		}
    },

    /**
     * Handles the get mains failure event from the login controller.
     */
    onGetMainTileFailure: function() {
	    if(Skin.config.global.Config.getCurrentView()==='maintile') {
			this.logger.debug("onGetMainTileFailure");
			this.getView().setLoading(false);
		}
    },

    /**
     * Handles the update mains application-level event.
     */
    onUpdateMainSuccess: function() {
		if(Skin.config.global.Config.getCurrentView()==='maintile') {
			this.logger.debug("onUpdateMainSuccess");
			this.getView().setLoading(false);
			this.getTile().getStore().loadRecords(this.mainStore.getRange());
		}
    },	
	
    /**
     * Handles the delete of a main by refreshing the grid
     * Touch takes care of this for you, not so ext
     */
    onDeleteMainSuccess: function() {
		if(Skin.config.global.Config.getCurrentView()==='maintile') {
			this.logger.debug("onDeleteMainSuccess");
			this.getTile().getStore().loadRecords(this.mainStore.getRange());
		}
    },

    /**
     * Handles the add of a main by refreshing the grid
     * Touch takes care of this for you, not so ext
     */
    onCreateMainSuccess: function() {
    	if(Skin.config.global.Config.getCurrentView()==='maintile') {	
			this.logger.debug("onCreateMainSuccess");
			this.getTile().getStore().loadRecords(this.mainStore.getRange());
		}
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the tap of the logout button. Dispatches the logout application-level event.
     */
    onLogoutButtonClick: function() {
    	if(Skin.config.global.Config.getCurrentView()==='maintile') {	
			this.logger.debug("onLogoutButtonClick");
			var evt = Ext.create("Skin.event.authentication.Event", Skin.event.authentication.Event.LOGOUT);
			this.eventBus.dispatchGlobalEvent(evt);
    	}			
    },

    /**
     * Handles the tap of the new main button. Shows the main detail view.
     */
    onNewMainButtonClick: function() {
    	if(Skin.config.global.Config.getCurrentView()==='maintile') {	
			this.logger.debug("onNewMainButtonClick");
			this.showMainDetail(null);
    	}		
    },

    /**
     * Handles the tile select of a main tile item. Shows the main detail view passing in a reference to
     * the selected item in the tile.
     *
     * @param {Ext.dataview.List} list  Reference to the visual list component.
     * @param {Object/Ext.data.Model} record Reference to the selected item in the list.
     * @param {Number} index The index of the selected item.
     * @param {Object} options ???
     */
    onTileSelect: function(tile, record, index, options) {
    	if(Skin.config.global.Config.getCurrentView()==='maintile') { 	
			this.logger.debug("onTileSelect");
			this.showMainDetail(record);
    	}			
    }

    /**
     * Handles the clear icon tap event on the search field. Clears all filter on the list's store.
     */
//    onSearchClearIconTap: function() {
//    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') {
//	        this.logger.debug("onSearchClearIconTap");
//
//          var store = this.getView().getStore();
//          store.clearFilter();
//    	}	
//    },

    /**
     * Handles the key up event on the search field. Filters the list component's store by the value in the
     * search field and determining if it matches the first or last name elements of each record in the list.
     *
     * @param {Ext.field.Search} field Reference to the search field.
     *
     * TODO: BMR: 02/28/13: clean this up. pulled directly from another example with minor changes: http://www.phs4j.com/2012/05/add-a-searchfield-to-a-sencha-touch-2-list-mvc/
     */
//    onSearchKeyUp: function(field) {
//    	if(Skin.config.global.Config.getCurrentView()==='mainTileView') {
//        this.logger.debug("onSearchKeyUp");
//
//        //get the store and the value of the field
//        var value = field.getValue();
//        var store = this.getView().getStore();
//
//        //first clear any current filters on the store
//        store.clearFilter();
//
//        //check if a value is set first, as if it isn't we don't have to do anything
//        if (value) {
//            //the user could have entered spaces, so we must split them so we can loop through them all
//            var searches = value.split(' '),
//                regexps = [],
//                i;
//
//
//            //loop them all
//            for (i = 0; i < searches.length; i++) {
//                //if it is nothing, continue
//                if (!searches[i]) continue;
//
//
//                //if found, create a new regular expression which is case insenstive
//                regexps.push(new RegExp(searches[i], "i"));
//            }
//
//
//            //now filter the store by passing a method
//            //the passed method will be called for each record in the store
//            store.filter(function(record) {
//                var matched = [];
//
//
//                //loop through each of the regular expressions
//                for (i = 0; i < regexps.length; i++) {
//                    var search = regexps[i],
//                        didMatch = record.get("name").match(search);
//
//
//                    //if it matched the name, push it into the matches array
//                    matched.push(didMatch);
//                }
//
//
//                //if nothing was found, return false (dont so in the store)
//                if (regexps.length > 1 && matched.indexOf(false) != -1) {
//                    return false;
//                } else {
//                    //else true true (show in the store)
//                    return matched[0];
//                }
//            });
//        }
//    	}//eof if
//    },
});

