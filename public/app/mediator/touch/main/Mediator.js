/**
 *  @class Skin.mediator.touch.main.Mediator
 *
 *  This {@link Ext.app.Controller} serves as a demonstration of how to
 *  listen to various events relating to a {@link Ext.ux.slidenavigation.View}.
 *
 */
Ext.define("Skin.mediator.touch.main.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.main.Event"
    ],

    inject: [
        //"employeeStore",
        "logger"
    ],

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");
        
        // ... more
        
    },
    
    config: {
        refs: {
            slideNav:                   'mainView'//,
            //moviePosterListContainer:   'slidenavigationview container[title="Item 8"]'
        },

        control: {
            /**
             *  Here are examples of the various events you can listen for.
             */
            slideNav: {
                open: function(nav, position, duration) {
                    console.log('Container open (position='+position+',duration='+duration+')');
                },

                close: function(nav, position, duration) {
                    console.log('Container close (position='+position+',duration='+duration+')');
                },

                select: function(nav, item, index) {
                    console.log('Selected item (index='+index+')');
                },

                opened: function(nav) {
                    console.log('Container opened');
                },

                closed: function(nav) {
                    console.log('Container closed');
                },

                slideend: function(nav) {
                    console.log('Container slideend');
                },

                slidestart: function(nav) {
                    console.log('Container slidestart');
                },

                dragstart: function(nav) {
                    console.log('Container dragstart');
                },

                dragend: function(nav) {
                    console.log('Container dragend');
                }
            }//,

            /**
             *  The 'activate' event fires on the container, not the child
             *  element.
             *
             */
            //moviePosterListContainer: {
            //    activate: function(container) {
            //        console.log('Activate moviePosterListContainer');
            //    }
            //}
        }
    }
});