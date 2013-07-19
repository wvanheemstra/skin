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

    // set up view event to mediator mapping
    control: {
        logoutButton: {
            tap: "onLogoutButtonTap"
        },

        newMainButton: {
            tap: "onNewMainButtonTap"
        },

// CURRENTLY WE DO NOT HAVE A SEARCH IN THE TILE VIEW
//        searchInput :{
//            keyup:          "onSearchKeyUp",
//            clearicontap:   "onSearchClearIconTap"
//        },
        
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

        this.navigate(Skin.event.navigation.Event.ACTION_SHOW_MAIN_DETAIL);
        this.mainStore.setSelectedRecord(record);
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

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
        this.logger.debug("onLogoutButtonTap");

        var evt = Ext.create("Skin.event.authentication.Event", Skin.event.authentication.Event.LOGOUT);
        this.eventBus.dispatchGlobalEvent(evt);
    },

    /**
     * Handles the tap of the new main button. Shows the main detail view.
     */
    onNewMainButtonTap: function() {
        this.logger.debug("onNewMainButtonTap");

        this.showMainDetail();
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
        this.logger.debug("onTileDisclose");

        this.mainStore.setSelectedRecord(record);
        this.showMainDetail(record);
    }// TEMPORARILY COMMENTED OUT ,
    
//    config: {
//        refs: {
//            slideNav:                   'mainTileView'//,
//            //moviePosterListContainer:   'slidenavigationview container[title="Item 8"]'
//        },
//
//        control: {
//            /**
//             *  Here are examples of the various events you can listen for.
//             */
//            slideNav: {
//                open: function(nav, position, duration) {
//                    console.log('Container open (position='+position+',duration='+duration+')');
//                },
//
//                close: function(nav, position, duration) {
//                    console.log('Container close (position='+position+',duration='+duration+')');
//                },
//
//                select: function(nav, item, index) {
//                    console.log('Selected item (index='+index+')');
//                },
//
//                opened: function(nav) {
//                    console.log('Container opened');
//                },
//
//                closed: function(nav) {
//                    console.log('Container closed');
//                },
//
//                slideend: function(nav) {
//                    console.log('Container slideend');
//                },
//
//                slidestart: function(nav) {
//                    console.log('Container slidestart');
//                },
//
//                dragstart: function(nav) {
//                    console.log('Container dragstart');
//                },
//
//                dragend: function(nav) {
//                    console.log('Container dragend');
//                }
//            }//,
//
//            /**
//             *  The 'activate' event fires on the container, not the child
//             *  element.
//             *
//             */
//            //moviePosterListContainer: {
//            //    activate: function(container) {
//            //        console.log('Activate moviePosterListContainer');
//            //    }
//            //}
//        }
//    }

});

