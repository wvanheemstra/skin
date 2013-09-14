/**
 * The mock background service object.
 */
Ext.define("Skin.service.background.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock background service call.
     *
     * @param {String} background The background being set.
     */
    set: function(background) {
        this.logger.debug("set: background = " + background);

        if(background == background) { // allow any background for now

            var response = {
                success: true,
                background: {
                    background: background // return the same background as provided
                }
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
