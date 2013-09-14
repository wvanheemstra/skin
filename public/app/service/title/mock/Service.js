/**
 * The mock title service object.
 */
Ext.define("Skin.service.title.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock title service call.
     *
     * @param {String} title The title being set.
     */
    set: function(title) {
        this.logger.debug("set: title = " + title);

        if(title == title) { // allow any title for now

            var response = {
                success: true,
                sessionToken: "qwerty0987654321",
                title: title // return the same title as provided
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
