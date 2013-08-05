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
Ext.define("Skin.view.touch.employee.list.View", {
    extend: "Skin.view.touch.employee.base.View",
    alias: "widget.employeeListView",
    controller: "Skin.mediator.touch.employee.list.Mediator",

    requires: [
        //"Skin.view.touch.component.ListView"
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
                        key: "employeeList.title"
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
                                key: "employeeList.logOff"
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
                                key: "employeeList.new"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "list",
                //xtype: "listview",
                itemId: "list",
                fullscreen: true,
                ui: "neutral",
                itemTpl: "<div class='contact'>{firstName} <strong>{lastName}</strong></div>",
                grouped: false,// WAS true, grouped currently causes an error
                onItemDisclosure: true,
                plugins: [
                    {
                        type: "localization",
                        method: "setLoadingText",
                        key: "employeeList.loading"
                    },
                    {
                        type: "localization",
                        method: "setEmptyText",
                        key: "employeeList.noEmployees"
                    }
                ],

                items: [
                    {
                        xtype: "titlebar" ,
                        itemId:"titlebar",
                        id:"titlebar",
                        ui: "neutral",
                        docked: "top",

                        items: [
                            {
                                xtype: "searchfield" ,
                                itemId:"searchInput",
                                id: "searchInput"
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
