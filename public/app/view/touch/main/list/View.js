/**
 * The main list view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.main.list.View", {
    extend: "Ext.ux.slidenavigation.View",
    //extend: "Ext.Panel",
    alias: "widget.mainListView",
    controller: "Skin.mediator.touch.main.list.Mediator",

    requires: [
        "Ext.TitleBar",
        "Ext.dataview.List",
        "Ext.field.Search",
        "Ext.Container",
        "Ext.MessageBox",
        "Ext.Panel",
        "Ext.Toolbar",
        "Ext.event.publisher.Dom"
    ],

    config: {

//        layout: {
//             type: "fit"
//        },

        fullscreen: true,
        
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector: 'x-toolbar',

        /**
         *  Container must be dragged 10 pixels horizontally before allowing
         *  the underlying container to actually be dragged.
         *
         *  @since 0.2.2
         */
        containerSlideDelay: 10,
        
        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,

        /**
         *  Enable content masking when container is open.
         *
         *  @since 0.2.0
         */
        itemMask: true,

        /**
         *  Define the default slide button config.  Any item that has
         *  a `slideButton` value that is either `true` or a button config
         *  will use these values at the default.
         */
        slideButtonDefaults: {
            selector: 'toolbar'
        },

        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 400,
            width: 200,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',                    
                title: {
                    title: 'Navigation',
                    centered: false,
                    width: 200,
                    left: 0
                }//,
//                /**
//                 *  Here's an example of how to add a different type of
//                 *  component into the toolbar of the list.
//                 */
//                items: [{
//                    docked: 'top',
//                    xtype: 'searchfield',
//                    placeHolder: 'search',
//                    width: 180
//                }]
            }]
        },

        /**
         *  Change this to 'right' to dock the navigation list to the right.
         */
        listPosition: 'left', 
        
        /**
         *  Example of how to re-order the groups.
         */
        groups: {
            'A': 1,
            'B': 2
        },

        /**
         *  These are the default values to apply to the items within the
         *  container.
         */
        defaults: {
            style: 'background: #fff',
            xtype: 'container'
        },
		
        items: [
			{
	            title: 'Administration',
	            group: 'A',
	            // Enable the slide button using the defaults defined above in
	            // `slideButtonDefaults`.
	            slideButton: true,
//                xtype: "titlebar",
//                docked: "top",
//                plugins: [
//                    {
//                         type: "localization",
//                         method: "setTitle",
//                         key: "mainList.title"
//                    }
//                ],
				items: [
					{
		                xtype: 'toolbar',
		                title: 'Administration',
		                docked: 'top',
		                items: [
		                    {
		                        xtype: "button",
		                        itemId: "logoutButton",
		                        align: "left",
		                        plugins: [
		                            {
		                                type: "localization",
		                                method: "setText",
		                                key: "mainList.logOff"
		                            }
		                        ]
		                    },//eof logoutButton
		                    {
		                        xtype: "button",
		                        itemId: "newMainButton",
		                        align: "right",
		                        ui: "action",
		                        plugins: [
		                            {
		                                type: "localization",
		                                method: "setText",
		                                key: "mainList.new"
		                            }
		                        ]
		                    }//eof newMainButton
		                ]//eof items
					},//eof toolbar
					{
		                xtype: 'panel',
		                html: '<img src="resources/img/guide.jpg" width="100%" />',
	
		                // Mask this item when the container is opened
		                maskOnOpen: true
	            	}//eof panel
				]//eof items
			},//eof Item 1
			{
	            title: '...',
	            group: 'A'
			},//eof Item 2
			{
	            title: '...',
	            group: 'B'
			}//eof Item 3			
			
			
			
			

//			{
//                xtype: "list",
//                itemId: "list",
//                layout: {
//                	type: "fit"
//                },
//                width: 200,
//                height: "100%", 
////                fullscreen: true,
//                itemTpl: "<div class='contact'>{name}</div>",
//                grouped: true,
//                onItemDisclosure: true,
//                plugins: [
//                    {
//                        type: "localization",
//                        method: "setLoadingText",
//                        key: "mainList.loading"
//                    },
//                    {
//                        type: "localization",
//                        method: "setEmptyText",
//                        key: "mainList.noMains"
//                    }
//                ]//,

//                items: [
//                    {
//                        xtype: "titlebar" ,
//                        itemId:"titlebar",
//                        id:"titlebar",
//                        docked: "top",
//
//                        items: [
//                            {
//                                xtype: "searchfield" ,
//                                itemId:"searchInput",
//                                id:"searchInput"
//                            }
//                        ]
//                    }
//                ]
//            }//eof list
        
        
        
        
        
//ORIGINAL START        
//            {
//	            title: 'Item 1',
//	            group: 'Group 1',
//	            // Enable the slide button using the defaults defined above in
//	            // `slideButtonDefaults`.
//	            slideButton: true,
//	
//                // xtype: "titlebar",
//                // docked: "top",
//                // plugins: [
//                //     {
//                //         type: "localization",
//                //         method: "setTitle",
//                //         key: "mainList.title"
//                //     }
//                // ],
//
//				items: [
//					{
//		                xtype: 'toolbar',
//		                title: 'Item 1',
//		                docked: 'top',
//		                items: [
//		                    {
//		                        xtype: "button",
//		                        itemId: "logoutButton",
//		                        align: "left",
//		                        plugins: [
//		                            {
//		                                type: "localization",
//		                                method: "setText",
//		                                key: "mainList.logOff"
//		                            }
//		                        ]
//		                    },//eof logoutButton
//		                    {
//		                        xtype: "button",
//		                        itemId: "newMainButton",
//		                        align: "right",
//		                        ui: "action",
//		                        plugins: [
//		                            {
//		                                type: "localization",
//		                                method: "setText",
//		                                key: "mainList.new"
//		                            }
//		                        ]
//		                    }//eof newMainButton
//		                ]//eof items
//					},
////					{
////		                xtype: "list",
////		                itemId: "list",
////		                fullscreen: true,
////		                itemTpl: "<div class='contact'>{name}</div>",
////		                grouped: true,
////		                onItemDisclosure: true,
////		                plugins: [
////		                    {
////		                        type: "localization",
////		                        method: "setLoadingText",
////		                        key: "mainList.loading"
////		                    },
////		                    {
////		                        type: "localization",
////		                        method: "setEmptyText",
////		                        key: "mainList.noMains"
////		                    }
////		                ],
////
////		                items: [
////		                    {
////		                        xtype: "titlebar" ,
////		                        itemId:"titlebar",
////		                        id:"titlebar",
////		                        docked: "top",
////
////		                        items: [
////		                            {
////		                                xtype: "searchfield" ,
////		                                itemId:"searchInput",
////		                                id:"searchInput"
////		                            }
////		                        ]
////		                    }
////		                ]
////		            },//eof list
//	            	{
//		                xtype: 'panel',
//		                html: '<img src="resources/img/guide.jpg" width="100%" />',
////						items:[{
////			               xtype: "tileview",
////			               itemId: "tile",
////			               itemTpl: "{name}",
////			               autoScroll: true,
////			               emptyText: "No Mains"						
////						}],
//		                // Mask this item when the container is opened
//		                maskOnOpen: true
//	            	}		            
//				]//eof items
//            }
//// ORIGINAL END 

           
        ]//eof items
    }//eof config
});



// THE NEW VERSION IS BELOW


//
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
////                xtype: "list",
////                itemId: "list",
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
    
