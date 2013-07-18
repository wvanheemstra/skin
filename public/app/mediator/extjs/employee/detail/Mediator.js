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
 * The employee list mediator essentially fulfills the passive view pattern for the employee list view.
 */
Ext.define("Skin.mediator.extjs.employee.detail.Mediator", {
    extend: "Skin.mediator.abstract.Mediator",

    requires: [
        "Skin.event.employee.Event",
        "Skin.event.navigation.Event",
        "nineam.locale.LocaleManager"
    ],

    inject: [
        "employeeStore",
        "logger"
    ],

    // set up view event to mediator mapping
    control: {
        backButton: {
            click: "onBackButtonClick"
        },

        saveEmployeeButton: {
            click: "onSaveEmployeeButtonClick"
        },

        deleteButton: {
            click: "onDeleteButtonClick"
        }
    },

    // set up injected object event listening
    observe: {
        employeeStore: {
            selectedRecordChange: "onSelectedRecordChange"
        }
    },

    /**
     * Sets up global event bus handlers. Called by the parent superclass during the initialization phase.
     */
    setupGlobalEventListeners: function() {
        this.callParent();
        this.logger.debug("setupGlobalEventListeners");

        this.eventBus.addGlobalEventListener(Skin.event.employee.Event.CREATE_EMPLOYEE_SUCCESS, this.onCreateEmployeeSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.employee.Event.UPDATE_EMPLOYEE_SUCCESS, this.onUpdateEmployeeSuccess, this);
        this.eventBus.addGlobalEventListener(Skin.event.employee.Event.DELETE_EMPLOYEE_SUCCESS, this.onDeleteEmployeeSuccess, this);
    },

    /**
     * Functional method to save an employee. Determines if the employee is new and it needs to be
     * created, or existing and needs to be updated and fires off the corresponding application-level event.
     *
     * @param employee    The employee is the data model for the item in the list currently selected.
     */
    saveEmployee: function(employee) {
        this.logger.debug("saveEmployee");

        var evt;
        var msg;

        if(employee != null) {

            var id = employee.id;

            if( (id != null) && (id != "") ) {
                evt = Ext.create("Skin.event.employee.Event", Skin.event.employee.Event.UPDATE_EMPLOYEE);
                msg = nineam.locale.LocaleManager.getProperty("employeeDetail.updatingEmployee");
            } else {
                evt = Ext.create("Skin.event.employee.Event", Skin.event.employee.Event.CREATE_EMPLOYEE);
                msg = nineam.locale.LocaleManager.getProperty("employeeDetail.creatingEmployee");
            }

            this.getView().setLoading(msg);

            evt.employee = employee;
            this.eventBus.dispatchGlobalEvent(evt);
        }
    },

    /**
     * Functional method to delete an employee. Fires off the corresponding application-level event.
     *
     * @param employee    The employee is the data model for the item in the list currently selected.
     */
    deleteEmployee: function(employee) {
        this.logger.debug("deleteEmployee");

        if(employee != null) {

            this.getView().setLoading(nineam.locale.LocaleManager.getProperty("employeeDetail.deletingEmployee"));

            var evt = Ext.create("Skin.event.employee.Event", Skin.event.employee.Event.DELETE_EMPLOYEE);
            evt.employee = employee;

            this.eventBus.dispatchGlobalEvent(evt);
        }
    },

    /**
     * Simple navigation method used to navigate back, depending on the previous view.
     */
    backToPrevious: function() {
        switch(Skin.config.global.Config.getPreviousView()) {
            case 'employeeListView':
            	this.backToEmployeeList();
                break;
            case 'employeeTileView':
            	this.backToEmployeeTile();
                break;               
        }
    },

    /**
     * Simple navigation method used to navigate back to the employee list view.
     */
    backToEmployeeList: function() {
        this.logger.debug("backToEmployeeList");

        this.navigate(Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_LIST);
    },

    /**
     * Simple navigation method used to navigate back to the employee tile view.
     */
    backToEmployeeTile: function() {
        this.logger.debug("backToEmployeeTile");

        this.navigate(Skin.event.navigation.Event.ACTION_BACK_SHOW_EMPLOYEE_TILE);
    },

    /**
     * Rests the view to it's default state -- no record set on the view's fields.
     */
    reset: function() {
        this.logger.debug("reset");

        this.getView().setLoading(false);
        // TODO: there doesn't appear to be an easy way to reset the currently loaded record in a form so we're hacking this. Might need to be updated for future vrs of ExtJS
        // resets the visual side so we're tapping into some u
        this.getView().getForm()._record = null;
//        this.getView().getForm().setRecord(null); // doesn't work as expected
//        this.getView().getForm().loadRecord(null); // doesn't work as expected
        this.getView().getForm().reset();
    },

    ////////////////////////////////////////////////
    // EVENT BUS HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the create employee success application-level event. Navigates back to the employee list view.
     */
    onCreateEmployeeSuccess: function() {
        this.logger.debug("onCreateEmployeeSuccess");

        this.getView().setLoading(false);
        this.backToPrevious(); // WAS this.backToEmployeeList();
    },

    /**
     * Handles the update employee success application-level event. Navigates back to the employee list view.
     */
    onUpdateEmployeeSuccess: function() {
        this.logger.debug("onUpdateEmployeeFailure");

        this.getView().setLoading(false);
        this.backToPrevious(); // WAS this.backToEmployeeList();
    },

    /**
     * Handles the delete employee success application-level event. Navigates back to the employee list view.
     */
    onDeleteEmployeeSuccess: function() {
        this.logger.debug("onDeleteEmployeeSuccess");

        this.reset();
        this.backToPrevious(); // WAS this.backToEmployeeList();
    },

    /**
     * Handles the change of the selected record in the employee store. Loads the appropriate record in the view or
     * resets it if the record is null.
     *
     * @param {Skin.store.EmployeeStore} store The store that ahs the selected record.
     * @param {Skin.model.EmployeeModel} record The selected record of the store.
     */
    onSelectedRecordChange: function(store, record) {
        var logMsg = (record != null)
            ? ": id = " + record.get("id") + ", employee = " + record.get("firstName")
            : "new employee";
        this.logger.debug("onSelectedRecordChange = " + logMsg);

        if (record) {
            this.getView().loadRecord(record);
        } else {
            this.reset();
        }
    },

    ////////////////////////////////////////////////
    // VIEW EVENT HANDLERS
    ////////////////////////////////////////////////

    /**
     * Handles the back button tap event. Navigates back to the employee list view.
     */
    onBackButtonClick: function() {
        this.logger.debug("onBackButtonClick");

        this.backToPrevious(); // WAS this.backToEmployeeList();
    },

    /**
     * Handles the save button tap event. Grabs the view's current employee data and passes the record
     * to the functional save method.
     */
    onSaveEmployeeButtonClick: function() {
        this.logger.debug("onSaveEmployeeButtonClick");

        var employee = this.getView().getRecord();
        var newEmployee = this.getView().getValues();

        // if this is a new employee record, there's no id available
        if(employee != null) {
            newEmployee.id = employee.data.id;
        }

        this.saveEmployee(newEmployee);
    },

    /**
     * Handles the delete button tap event. Grabs the view's current employee data and passes the record
     * to the functional delete method.
     */
    onDeleteButtonClick: function() {
        this.logger.debug("onDeleteButtonClick");

        var employee = this.getView().getRecord();

	    if(employee) {
		    this.deleteEmployee(employee.data);
	    }
    }

});

