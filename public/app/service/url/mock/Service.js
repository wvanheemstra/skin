/**
 * The mock url service object.
 */
Ext.define("Skin.service.url.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock url service call.
     *
     * @param {String} url The url being set.
     */
    set: function(url) {
        this.logger.debug("set: url = " + url);

        if(url == url) { // allow all urls for now

            var response = {
                success: true,
                sessionToken: "qwerty0987654321",
                url: url// return the same url as provided
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
