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
     * The mock get session service call.
     *
     * @param {Int} id The id being get.
     * @param {String} sessionId The sessionId being get.
     */
	getSession: function(id, sessionId) {
		this.logger.debug("get session: id = " + id + ", sessionId = " + sessionId);
		
        var me = this;
        me.id = id;
        me.sessionId = sessionId;

	    // THIS IS A FORCEFULL FIX TO GET THE SAME DATA IN localstorage
	    var key = "Skin.session.ApplicationKey";
	    var value = localStorage.getItem(key);
	    
	    if(value[id] === sessionModel.get('id') && value[sessionId] === sessionModel.get('sessionId')) {

			var sessionStore = me.sessionStore;
			sessionStore.removeAll(id);
			sessionStore.sync(); 		
		    var sessionModel = new Skin.model.session.Model({
		      id: me.id,
		      sessionId: me.sessionId
		    });
		    sessionStore.add(sessionModel);
		    sessionStore.sync();

			if(null!=sessionStore.getAt(0).get('sessionId')){
				this.logger.debug("getSession.success");
			
				Skin.config.global.Config.setId(me.id);
				Skin.config.global.Config.setSessionId(me.sessionId);

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
			}// eof second if
			else {   
				this.logger.debug("getSession.failure");
				
				var response = {
	                success: false
	            };
	            return me.delayedFailure(response);
			}
	    }// eof first if
	    else {
			this.logger.debug("getSession.failure");
			
			var response = {
                success: false
            };
            return me.delayedFailure(response);	    	
	    }
	    // REPLACE ONCE SENCHA WORKS WITH localstorage AS DESIGNED

	},        
        
    /**
     * The mock set session service call.
     *
     * @param {Int} id The id being set.
     * @param {String} sessionId The sessionId being set.
     */
	setSession: function(id, sessionId) {
		this.logger.debug("set session: id = " + id + ", sessionId = " + sessionId);		

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
	    
	    this.logger.debug("sessionStore: data.all = " + sessionStore.data.all);
	    
	    // THIS IS A FORCEFULL FIX TO GET THE SAME DATA IN localstorage
	    var key = "Skin.session.ApplicationKey";
	    var value = {};
	    value[id] = sessionModel.get('id');
	    value[sessionId] = sessionModel.get('sessionId');
	    localStorage.setItem(key, value);
	    // REPLACE ONCE SENCHA WORKS WITH localstorage AS DESIGNED
	    
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
		this.logger.debug("clear session: id = " + id + ", sessionId = " + sessionId);

        var me = this;
        me.id = id;
        me.sessionId = sessionId;
                
		var sessionStore = me.sessionStore;
		sessionStore.removeAll(me.id);
		sessionStore.sync();
		
		// THIS IS A FORCEFULL FIX TO CLEAR THE SAME DATA FROM localstorage
	    var key = "Skin.session.ApplicationKey";
	    var value = {};
	    localStorage.setItem(key, value);
	    // REPLACE ONCE SENCHA WORKS WITH localstorage AS DESIGNED
		
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
