/**
 * The mock main service object.
 */
Ext.define("Skin.service.main.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],
    
    /**
     * The mock service call.
     */
    getMainList: function() {
        this.logger.debug("getMainList");

        var response = {
            success: true,
            mainList: [
                { id: 0,    name: "Tommy" },
                { id: 1,    name: "Rob" },
                { id: 2,    name: "Ed" },
                { id: 3,    name: "Jamie" },
                { id: 4,    name: "Aaron" },
                { id: 5,    name: "Dave" },
                { id: 6,    name: "Jacky" },
                { id: 7,    name: "Abraham" },
                { id: 8,    name: "Jay" },
                { id: 9,    name: "Nigel" },
                { id: 10,   name: "Don" },
                { id: 11,   name: "Nico" },
                { id: 12,   name: "Jason" }
            ]
        };

        return this.delayedSuccess(response);
    },
    
    /**
     * The mock service call.
     */
    getMainTile: function() {
        this.logger.debug("getMainTile");

        var response = {
            success: true,
            mainTile: [
                { id: 0,    name: "Tommy" },
                { id: 1,    name: "Rob" },
                { id: 2,    name: "Ed" },
                { id: 3,    name: "Jamie" },
                { id: 4,    name: "Aaron" },
                { id: 5,    name: "Dave" },
                { id: 6,    name: "Jacky" },
                { id: 7,    name: "Abraham" },
                { id: 8,    name: "Jay" },
                { id: 9,    name: "Nigel" },
                { id: 10,   name: "Don" },
                { id: 11,   name: "Nico" },
                { id: 12,   name: "Jason" }
            ]
        };

        return this.delayedSuccess(response);
    },
    
    /**
     * The mock service call.
     */
    createMain: function(main) {
        this.logger.debug("createMain");

        var response = {
            success: true,
            main: {
                id: this.getRandomInt(1000, 99999),
                name: main.name
            }
        };

        response = Ext.create("Skin.model.main.Model", response.main);
        return this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    updateMain: function(main) {
        this.logger.debug("updateMain: id = ", main.id);

        var response = {
            success: true,
            main: {
                id: main.id,
                name: main.name
            }
        };

        response = Ext.create("Skin.model.main.Model", response.main);
        return this.delayedSuccess(response);
    },

    /**
     * The mock service call.
     */
    deleteMain: function(main) {
        this.logger.debug("deleteMain: id = ", main.id);

        var response = {
            success: true,
            main: {
                id: main.id,
                name: main.name
            }
        };

        response = Ext.create("Skin.model.main.Model", response.main);
        return this.delayedSuccess(response);
    }      
});