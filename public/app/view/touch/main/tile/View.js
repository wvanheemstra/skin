/**
 * The main tile view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.tile.View", {
    //extend: "Ext.ux.slidenavigation.View",
    extend: "Ext.Panel",
    alias: "widget.mainTileView",
    controller: "Skin.mediator.touch.main.tile.Mediator",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.field.Search",
        "Ext.Container",
        "Ext.MessageBox",
        "Ext.Panel",
        "Ext.Toolbar",
        "Ext.event.publisher.Dom",
        "Skin.view.touch.component.TileView"
    ],

    config: {

        layout: {
            type: "fit"
        },
        
        items: [
            {
                xtype: "titlebar",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "mainTile.title"
                    }
                ],
                items: [
                    {
                        xtype: "button",
                        itemId: "logoutButton",
                        align: "left",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainTile.logOff"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "newMainButton",
                        align: "right",
                        ui: "action",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "mainTile.new"
                            }
                        ]
                    }
                ]
            },           
            {
                xtype: "tileview",
                itemId: "tile",
                itemTpl: "{name}",
                autoScroll: true,
                emptyText: "No Mains"        	
            }
 /*
            {
                xtype: "list",
                itemId: "tile",
                fullscreen: true,
                itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
                grouped: true,
                onItemDisclosure: true,
                plugins: [
                    {
                        type: "localization",
                        method: "setLoadingText",
                        key: "employeeTile.loading"
                    },
                    {
                        type: "localization",
                        method: "setEmptyText",
                        key: "employeeTile.noEmployees"
                    }
                ],

                items: [
                    {
                        xtype: "titlebar" ,
                        itemId:"titlebar",
                        id:"titlebar",
                        docked: "top",

                        items: [
                            {
                                xtype: "searchfield" ,
                                itemId:"searchInput",
                                id:"searchInput"
                            }
                        ]
                    }
                ]
            }// eof list 
*/                      
        ]
    }



// THE NEW VERSION IS BELOW


//    config: {
//    	
//        fullscreen: true,
//        
//        /**
//         *  Any component within the container with an 'x-toolbar' class
//         *  will be draggable.  To disable draggin all together, set this
//         *  to false.
//         */
//        slideSelector: 'x-toolbar',
//
//        /**
//         *  Container must be dragged 10 pixels horizontally before allowing
//         *  the underlying container to actually be dragged.
//         *
//         *  @since 0.2.2
//         */
//        containerSlideDelay: 10,
//        
//        /**
//         *  Time in milliseconds to animate the closing of the container
//         *  after an item has been clicked on in the list.
//         */
//        selectSlideDuration: 200,
//
//        /**
//         *  Enable content masking when container is open.
//         *
//         *  @since 0.2.0
//         */
//        itemMask: true,
//
//        /**
//         *  Define the default slide button config.  Any item that has
//         *  a `slideButton` value that is either `true` or a button config
//         *  will use these values at the default.
//         */
//        slideButtonDefaults: {
//            selector: 'toolbar'
//        },
//         
//        /**
//         *  This allows us to configure how the actual list container
//         *  looks.  Here we've added a custom search field and have
//         *  modified the width.
//         */
//        list: {
//            maxDrag: 400,
//            width: 200,
//            items: [{
//                xtype: 'toolbar',
//                docked: 'top',
//                ui: 'light',                    
//                title: {
//                    title: 'Navigation',
//                    centered: false,
//                    width: 200,
//                    left: 0
//                }
//                
//                /**
//                 *  Here's an example of how to add a different type of
//                 *  component into the toolbar of the list.
//                 */
//                /*
//                items: [{
//                    docked: 'top',
//                    xtype: 'searchfield',
//                    placeHolder: 'search',
//                    width: 180
//                }]
//                */
//            }]
//            
//        },
//        
//        /**
//         *  Change this to 'right' to dock the navigation list to the right.
//         */
//        listPosition: 'left', 
//        
//        /**
//         *  Example of how to re-order the groups.
//         */
//        groups: {
//            'Group 1': 1,
//            'Group 2': 3,
//            'Group 3': 2
//        },
//        
//        /**
//         *  These are the default values to apply to the items within the
//         *  container.
//         */
//        defaults: {
//            style: 'background: #fff',
//            xtype: 'container'
//        }, 
//        
//        items: [{
//            title: 'Item 1',
//            group: 'Group 1',
//
//            // Enable the slide button using the defaults defined above in
//            // `slideButtonDefaults`.
//            slideButton: true,
//            items: [{
//                xtype: 'toolbar',
//                title: 'Item 1',
//                docked: 'top'
//            }
////            ,{
////                xtype: "tileview",
////                itemId: "tile",
////                itemTpl: "{name}",
////                autoScroll: true,
////                emptyText: "No Main"        	
////            }
//            ,{
//                xtype: 'panel',
//                html: '<img src="resources/img/guide.jpg" width="100%" />',
//
//                // Mask this item when the container is opened
//                maskOnOpen: true
//            }]
//        }]//eof items
//        
//    }//eof config
    
    
    
    
    
    
    
});