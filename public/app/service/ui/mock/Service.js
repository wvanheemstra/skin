/**
 * The mock ui service object.
 */
Ext.define("Skin.service.ui.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock ui service call.
     *
     * @param {String} ui The ui being set.
     */
    set: function(ui) {
        this.logger.debug("set: ui = " + ui);

        if(ui == ui) { // Allow any ui for now

            var response = {
                success: true,
                sessionToken: "qwerty0987654321",
                ui: ui // return the same ui as provided
            };

            return this.delayedSuccess(response);
        }
        else {

            var response = {
                success: false
            };

            return this.delayedFailure(response);
        }
    }
});
