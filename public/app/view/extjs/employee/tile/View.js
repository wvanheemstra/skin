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
Ext.define("Skin.view.extjs.employee.tile.View", {
    extend: "Ext.Panel",
    alias: "widget.employeeTileView",
    controller: "Skin.mediator.extjs.employee.tile.Mediator",
    header: false,

    requires: [
        "Ext.data.*",
        "Ext.util.*",
        "Ext.view.View",
        //"Skin.view.extjs.component.LiveSearchGridPanel",
        "Skin.view.extjs.component.TileView",
        "nineam.locale.LocaleManager"
    ],

//    layout: {
//        type: "fit" // WHY DOES 'fit' NOT WORK AS DESIGNED ??
//    },

    height: 330,
	width: 400,
	
    items: [
        {
            xtype: "toolbar",
			itemId: "toolbar",
            width: 400,

            items: [
                {
                    itemId: "logoutButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeTile.logOut"
                        }
                    ]
                },
                {
                    xtype: "tbfill"
                },
                {
                    xtype: "label",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeTile.title"
                        }
                    ]

                },
                {
                    xtype: "tbfill"
                },
                {
                    itemId: "newEmployeeButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeTile.new"
                        }
                    ]
                }
            ]
        },
        {
                xtype: "tileview",
                itemId: "tile",
                itemTpl: "{firstName} {lastName}",
                autoScroll: true,
                emptyText: "No Employees"
        }
/*        
        {
            xtype: "livesearchgridpanel",
            store: null,
            itemId: "tile",
            forceFit: true,
            autoScroll: true,
            height: 300,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    dataIndex:  "firstName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeTile.firstName"
                        }
                    ]
                },
                {
                    dataIndex:  "lastName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeTile.lastName"
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: "localization",
                    method: "setTitle",
                    key: "employeeTile.search"
                }
            ]
        }
*/        
    ]
});