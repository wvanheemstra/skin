/**
 * The basic Viewport for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.extjs.viewport.View", {
    extend: "Ext.container.Viewport",
    alias: "widget.viewportView",
    controller: "Skin.mediator.extjs.viewport.Mediator",
    width: 800,

    requires: [
		"Skin.config.global.Config",
        "Skin.view.extjs.login.View",
		"Skin.view.extjs.main.slide.View",
        "Skin.view.extjs.main.list.View",
        "Skin.view.extjs.main.detail.View",
        "Skin.view.extjs.main.tile.View",
        "Skin.view.extjs.main.modal.View"		
        //"Skin.view.extjs.employee.list.View",
        //"Skin.view.extjs.employee.detail.View",
        //"Skin.view.extjs.employee.tile.View"
    ],

    config: {
        width: 800,
        currentItem: null
    },

    layout: {
        align: "center",
        pack: "center",
        type: "vbox"
    },

    items: [
        {
            xtype: "loginView",
            itemId: "login",
            hidden: true
        },
		// THIS BELOW CAUSES THE ERROR Uncaught TypeError: Object #<Object> has no method 'getById'
        {
            xtype: "mainSlideView",
            itemId: "mainslide", 
            hidden: true
        },		
        {
            xtype: "mainListView",
            itemId: "mainlist",
            hidden: true
        },
        {
            xtype: "mainDetailView",
            itemId: "maindetail",
            hidden: true
        },
        {
            xtype: "mainTileView",
            itemId: "maintile",
            hidden: true
        },
        {
            xtype: "mainModalView",
            itemId: "mainmodal",
            hidden: true
        }		
        // {
            // xtype: "employeeListView",
            // itemId: "employeelist",
            // hidden: true
        // },
        // {
            // xtype: "employeeDetailView",
            // itemId: "employeedetail",
            // hidden: true
        // },
        // {
            // xtype: "employeeTileView",
            // itemId: "employeetile",
            // hidden: true
        // }
    ],

    // TODO: BMR: Remove all logic from views
    setView: function(view) {
        console.log("Viewport.setView: " + view);
        //this.getView().items.getAt(1).show();
        for ( var i=0; i<this.items.length; i++)
        {
            var id = this.items.getAt(i).getItemId();
            if (id == view)
            {
                this.items.getAt(i).show();
            } else {
                this.items.getAt(i).hide();
            }
        }
    }

}, function() {
    this.getCurrentItem = Skin.config.global.Config.getInitialView();// WAS "login";
    console.log("viewport create, currentitem = " + this.getCurrentItem);
});


