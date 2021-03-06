/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The list of employees view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("Skin.view.touch.employee.tile.View", {
    extend: "Skin.view.touch.employee.base.View",
    alias: "widget.employeeTileView",
    controller: "Skin.mediator.touch.employee.tile.Mediator",

    requires: [
        //"Skin.view.touch.component.TileView"
    ],

    config: {

        layout: {
            type: "fit"
        },
        
        items: [
            {
                xtype: "titlebar",
                itemId: "titlebar",
                ui: "neutral",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "employeeTile.title"
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
                                key: "employeeTile.logOut"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "newEmployeeButton",
                        align: "right",
                        ui: "neutral", // WAS action
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "employeeTile.new"
                            }
                        ]
                    }
                ]
            }, 
/*                      
            {
                xtype: "tileview",
                itemId: "tile",
                itemTpl: "{firstName} {lastName}",
                autoScroll: true,
                emptyText: "No Employees"        	
            }
 */           
            {
                xtype: "list",
                itemId: "tile",
                ui: "neutral",
                fullscreen: true,
                itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
                grouped: false, // WAS true, but this causes an error
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
                        ui: "neutral",
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
        ]
    }// eof config
});