/**
 * The mock company service object.
 */
Ext.define("Skin.service.company.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "logger"
    ],

    /**
     * The mock company service call.
     *
     * @param {String} company The company being set.
     */
    set: function(company) {
        this.logger.debug("set: company = " + company);

        if(company == company) { //Allow any company for now

            var response = {
                success: true,
                sessionToken: "qwerty1357908642",
                company: company // return the same company as provided
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
