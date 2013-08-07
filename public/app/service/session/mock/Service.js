/**
 * The mock session service object.
 */
Ext.define("Skin.service.session.mock.Service", {
    extend: "FlowMVC.mvc.service.mock.AbstractServiceMock",

    inject: [
        "sessionStore",
        "logger"
    ],

    /**
     * The mock set session service call.
     *
     * @param {Int} id The id being set.
     * @param {String} sessionId The sessionId being set.
     */
	setSession: function(id, sessionId) {
		this.logger.debug("set: id = " + id + ", sessionId = " + sessionId);		

        var me = this;
        me.id = id;
        me.sessionId = sessionId;

		var sessionStore = me.sessionStore;
		sessionStore.removeAll(id);
		sessionStore.sync(); 		
	    var sessionModel = new Skin.model.session.Model({
	      id: me.id,
	      sessionId: me.sessionId
	    });
	    
	    this.logger.debug("sessionModel: ");// for testing only
	    console.log(sessionModel);
	    
	    sessionStore.add(sessionModel);
	    sessionStore.sync();

		if(null!=sessionStore.getAt(0).get('sessionId')){
			this.logger.debug("setSession.success");
		
			var response = {
                success: true,
                sessionToken: "qwerty1234567890",
                session: {
                    id: me.id,
                    sessionId: me.sessionId
                }
            };
            
			this.logger.debug("sessionStore: ");// for testing only
	    	console.log(sessionStore);
            
            return me.delayedSuccess(response);
		}
		else {   
			this.logger.debug("setSession.failure");
			
			var response = {
                success: false
            };
            return me.delayedFailure(response);
		}

	},

    /**
     * The mock clear session service.
     *
     * @param {Int} id The id being cleared.
     * @param {String} sessionId The sessionId being cleared.
     */	
	clearSession: function(id, sessionId) {
		this.logger.debug("clear: id = " + id + ", sessionId = " + sessionId);

        var me = this;
        me.id = id;
        me.sessionId = sessionId;
                
		var sessionStore = me.sessionStore;
		sessionStore.removeAll(me.id);
		sessionStore.sync();
		
		if(null!=sessionStore.getAt(0).get('sessionId')){
			this.logger.debug("setSession.failure");
			return me.delayedFailure(response);
		}
		else {   
			this.logger.debug("setSession.success");
			return me.delayedSuccess(response);
		}
	} 
	
});
