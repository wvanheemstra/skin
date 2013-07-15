/*
FlowMVC 0.1.0

Copyright (c) 2013 [Web App Solution, Inc.](http://webappsolution.com)
Open source under the [GNU General Public License](http://www.gnu.org/licenses).
*/
Ext.define("FlowMVC.logger.Logger",{statics:{isEnabled:true,LEVEL_LOG:"LOG",LEVEL_DEBUG:"DEBUG",LEVEL_INFO:"INFO",LEVEL_WARN:"WARN",LEVEL_ERROR:"ERROR",LEVEL_FATAL:"FATAL",getLogger:function(b){var a;if(!Ext.isString(b)){b=Ext.getClassName(b)}if((b==null)||(b=="undefined")||(b=="")){b="Unknown Context"}return Ext.create("FlowMVC.logger.Logger",b)},getInjectableLogger:function(){return{fn:function(a){return FlowMVC.logger.Logger.getLogger(a)},singleton:false}}},context:null,constructor:function(a){this.context=a},log:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_LOG,arguments)},debug:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_DEBUG,arguments)},info:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_INFO,arguments)},warn:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_WARN,arguments)},error:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_ERROR,arguments)},fatal:function(){this.internalLog(FlowMVC.logger.Logger.LEVEL_FATAL,arguments)},group:function(){try{if(window.console&&console.group&&Ext.isFunction(console.group)){console.group(msg)}}catch(a){}},groupEnd:function(){try{if(window.console&&console.groupEnd&&Ext.isFunction(console.groupEnd)){console.groupEnd(msg)}}catch(a){}},getTimestamp:function(){var c=new Date();var a=c.getHours();var d=c.getMinutes();var e=c.getSeconds();var b=c.getMilliseconds();if(a<10){a="0"+a}if(d<10){d="0"+d}if(e<10){e="0"+e}if(b<10){b="00"+b}else{if(b<100){b="0"+b}}return a+":"+d+":"+e+":"+b},getPrintFriendlyLogStatement:function(b,a){return this.getTimestamp()+" "+b+"\t["+this.context+"] - "+a},replaceTokens:function(l,b){var a=l[1];if(Ext.isArray(a)){var g=a.length;for(var f=0;f<g;f++){b=b.replace(new RegExp("\\{"+f+"\\}","g"),a[f])}}else{if(Ext.isObject(a)){var m=b.match(/\{(.*?)\}/g);if(Ext.isArray(m)){var n="";var g=m.length;for(var d=0;d<g;d++){var c=m[d].replace(/\{(.*?)\}/g,"$1");var k=c.split(".");getNestedValue=function(p,o){var q="";var e=o.length;for(var i=0;i<e;i++){q=o[i];p=p[q]}return p};try{n=getNestedValue(a,k)}catch(h){n=""}b=b.replace(new RegExp(m[d]),n)}}}}return b},internalLog:function(d,a){if(!FlowMVC.logger.Logger.isEnabled){return}var c=this.getPrintFriendlyLogStatement(d,a[0]);if(a&&(a.length>=2)){c=this.replaceTokens(a,c)}switch(d){case FlowMVC.logger.Logger.LEVEL_INFO:try{if(window.console&&console.info&&Ext.isFunction(console.info)){console.info(c)}}catch(b){}break;case FlowMVC.logger.Logger.LEVEL_WARN:try{if(window.console&&console.warn&&Ext.isFunction(console.warn)){console.warn(c)}}catch(b){}break;case FlowMVC.logger.Logger.LEVEL_ERROR:case FlowMVC.logger.Logger.LEVEL_FATAL:try{if(window.console&&console.error&&Ext.isFunction(console.error)){console.error(c)}}catch(b){}break;case FlowMVC.logger.Logger.LEVEL_LOG:case FlowMVC.logger.Logger.LEVEL_DEBUG:default:try{if(window.console&&console.debug&&Ext.isFunction(console.debug)){console.debug(c)}}catch(b){}break}}});Ext.define("FlowMVC.util.UIDUtil",{statics:{randomUUID:function(){var c=[],d="0123456789ABCDEF";for(var b=0;b<36;b++){c[b]=Math.floor(Math.random()*16)}c[14]=4;c[19]=(c[19]&3)|8;for(var a=0;a<36;a++){c[a]=d[c[a]]}c[8]=c[13]=c[18]=c[23]="-";return c.join("")}}});Ext.define("FlowMVC.mvc.event.EventDispatcher",{extend:"Ext.util.Observable",statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.event.EventDispatcher")},dispatchGlobalEvent:function(b,a){if(b.type!=null){type=b.type;a=b}else{type=b}FlowMVC.mvc.event.EventDispatcher.logger.debug("dispatchGlobalEvent: "+type);return this.fireEvent(type,a)},addGlobalEventListener:function(c,b,a){FlowMVC.mvc.event.EventDispatcher.logger.debug("addGlobalEventListener: "+c);this.addListener(c,b,a)},removeGlobalEventListener:function(c,b,a){FlowMVC.mvc.event.EventDispatcher.logger.debug("removeGlobalEventListener");this.removeListener(c,b,a)}});Ext.define("FlowMVC.mvc.event.AbstractEvent",{statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.event.AbstractEvent"),ERROR_TYPE_MUST_BE_VALID_STRING:"The constructor parameter 'type' cannot be null or an empty string."},type:"",data:null,constructor:function(a){if((a==null)||(a=="")||(typeof a!=="string")){Ext.Error.raise({msg:FlowMVC.mvc.event.AbstractEvent.ERROR_TYPE_MUST_BE_VALID_STRING})}FlowMVC.mvc.event.AbstractEvent.logger.debug("AbstractEvent.Constructor: type = {type}",{type:a});this.type=a}});Ext.define("FlowMVC.mvc.service.rpc.AsyncToken",{requires:["FlowMVC.util.UIDUtil"],statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.service.rpc.AsyncToken")},id:null,responder:null,constructor:function(){FlowMVC.mvc.service.rpc.AsyncToken.logger.debug("constructor");this.id=FlowMVC.util.UIDUtil.randomUUID()},addResponder:function(a){FlowMVC.mvc.service.rpc.AsyncToken.logger.debug("addResponder");this.responder=a},applySuccess:function(a){FlowMVC.mvc.service.rpc.AsyncToken.logger.debug("applySuccess");if(this.responder){this.applyCallback(this.responder.success,this.responder.scope,a)}},applyFailure:function(a){FlowMVC.mvc.service.rpc.AsyncToken.logger.debug("applyFailure");if(this.responder){this.applyCallback(this.responder.failure,this.responder.scope,a)}},applyCallback:function(c,b,a){FlowMVC.mvc.service.rpc.AsyncToken.logger.debug("applyCallback");if(c&&b){c.call(b,a)}}});Ext.define("FlowMVC.mvc.service.rpc.Responder",{statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.service.rpc.Responder"),ERROR_SUCCESS_MUST_BE_VALID_FUNCTION:"The constructor parameter 'success' cannot be null or not a function.",ERROR_FAILURE_MUST_BE_VALID_FUNCTION:"The constructor parameter 'failure' cannot be null or not a function.",ERROR_SCOPE_MUST_BE_VALID_OBJECT:"The constructor parameter 'scope' cannot be null or not an object"},success:null,failure:null,scope:null,constructor:function(c,a,b){if((c==null)||(typeof(c)!=="function")){Ext.Error.raise({msg:FlowMVC.mvc.service.rpc.Responder.ERROR_SUCCESS_MUST_BE_VALID_FUNCTION})}if((a==null)||(typeof(a)!=="function")){Ext.Error.raise({msg:FlowMVC.mvc.service.rpc.Responder.ERROR_FAILURE_MUST_BE_VALID_FUNCTION})}if((c==null)||(typeof(b)!=="object")){Ext.Error.raise({msg:FlowMVC.mvc.service.rpc.Responder.ERROR_SCOPE_MUST_BE_VALID_OBJECT})}FlowMVC.mvc.service.rpc.Responder.logger.debug("constructor");this.success=c;this.failure=a;this.scope=b}});Ext.define("FlowMVC.mvc.controller.AbstractController",{extend:"Ext.app.Controller",requires:["FlowMVC.mvc.event.EventDispatcher"],inject:{eventBus:"eventBus"},statics:{ROOT_APPLICATION:null,logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.controller.AbstractController")},config:{sessionToken:null},init:function(){FlowMVC.mvc.controller.AbstractController.logger.debug("init");this.setupGlobalEventListeners()},setupGlobalEventListeners:function(){FlowMVC.mvc.controller.AbstractController.logger.debug("setupGlobalEventListeners")},executeServiceCall:function(a,g,c,f,b,e){FlowMVC.mvc.controller.AbstractController.logger.group("FlowMVC.mvc.controller.AbstractController.executeServiceCall");var d;if(a.getUsePromise()){FlowMVC.mvc.controller.AbstractController.logger.info("executeServiceCall: Using Promises");d=this.executeServiceCallWithPromises(a,g,c,f,b,e)}else{FlowMVC.mvc.controller.AbstractController.logger.info("executeServiceCall: Using AsyncToken");d=this.executeServiceCallWithAsyncToken(a,g,c,f,b,e)}return d},executeServiceCallWithAsyncToken:function(a,h,d,g,c,f){FlowMVC.mvc.controller.AbstractController.logger.debug("executeServiceCallWithAsyncToken");var b=Ext.create("FlowMVC.mvc.service.rpc.Responder",g,c,f);var e=h.apply(a,d);e.addResponder(b);return e},executeServiceCallWithPromises:function(a,f,c,e,b,d){FlowMVC.mvc.controller.AbstractController.logger.debug("executeServiceCallWithPromises");return f.apply(a,c).then({success:e,failure:b,scope:d}).always(function(){FlowMVC.mvc.controller.AbstractController.logger.debug("executeServiceCall: always do after promise")})},getService:function(b){b=(b&&b.value)?b.value:b;FlowMVC.mvc.controller.AbstractController.logger.debug("getService: using: ",b);var a=Ext.ClassManager.get(b);return new a()},getMVCApplication:function(){if(FlowMVC.mvc.controller.AbstractController.ROOT_APPLICATION==null){if(Ext.getVersion("extjs")){FlowMVC.mvc.controller.AbstractController.logger.warn("AbstractController.getMVCApplication: using 'this.application' because ExtJS 4.1 and below doesn't use a getter for the root application.");FlowMVC.mvc.controller.AbstractController.ROOT_APPLICATION=this.application}else{FlowMVC.mvc.controller.AbstractController.logger.info("AbstractController.getMVCApplication: using 'this.getApplication() because we're in Touch 2.x+'");FlowMVC.mvc.controller.AbstractController.ROOT_APPLICATION=this.getApplication()}}return FlowMVC.mvc.controller.AbstractController.ROOT_APPLICATION}});Ext.define("FlowMVC.mvc.mediator.AbstractMediator",{extend:"Deft.mvc.ViewController",statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.mediator.AbstractMediator")},inject:{eventBus:"eventBus"},init:function(){FlowMVC.mvc.mediator.AbstractMediator.logger.debug("init");this.setupGlobalEventListeners()},getComponentById:function(b,a){return a.down("#"+b)},getSlideLeftTransition:function(){return{type:"slide",direction:"left"}},getSlideRightTransition:function(){return{type:"slide",direction:"right"}},addEventListenerBySelector:function(b,d,e){FlowMVC.mvc.mediator.AbstractMediator.logger.debug("addEventListenerBySelector: selector = "+b+" eventType = "+d);var c={};c[d]=e;var a={};a[b]=c;this.control(a)},getViewByXType:function(d,c){FlowMVC.mvc.mediator.AbstractMediator.logger.debug("getViewByXType: xtype = ",d);var a=null;var b=Ext.ComponentQuery.query(d);c=c||true;if(b){a=c?b[0]:b}return a},setupGlobalEventListeners:function(){FlowMVC.mvc.mediator.AbstractMediator.logger.debug("setupGlobalEventListeners")}});Ext.define("FlowMVC.mvc.service.AbstractService",{requires:["FlowMVC.mvc.service.rpc.Responder","FlowMVC.mvc.service.rpc.AsyncToken"],statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.service.AbstractService"),NO_RESPONDER_DEFINED:"You must provide a responder object to the service that contains either a custom defined success method that exists on the service's caller or a default 'success()' or 'failure()' callback.Set the responder on the object by doing:\nvar responder = Ext.create('FlowMVC.mvc.service.rpc.Responder', this.myCustomSuccess, this.myCustomFailure, this);\nservice.setResponder(responder);\nor\nservice.setResponder({ success: this.myCustomSuccess, fault: this.myCustomFailure, scope: this});"},config:{usePromise:false,responder:null},applyResponderMethod:function(a,d){FlowMVC.mvc.service.AbstractService.logger.debug("applyResponderMethod: ",d);var b=null;if(this.getResponder()&&this.getResponder().scope){var c=this.getResponder().scope;if(this.getResponder()[d]){FlowMVC.mvc.service.AbstractService.logger.debug("applyResponderMethod: using service caller's custom defined "+d+" callback");b=this.getResponder()[d]}else{if(typeof c[d]==="function"){FlowMVC.mvc.service.AbstractService.logger.debug("applyResponderMethod: using service caller's default "+d+" callback");b=c[d]}else{Ext.Error.raise({msg:"["+Ext.getDisplayName(arguments.callee)+"] "+CafeTownsend.service.AbstractService.NO_RESPONDER_DEFINED})}}FlowMVC.mvc.service.AbstractService.logger.groupEnd();b.call(c,a);this.setResponder(null)}else{Ext.Error.raise({msg:"["+Ext.getDisplayName(arguments.callee)+"] "+CafeTownsend.service.AbstractService.NO_RESPONDER_DEFINED})}},success:function(a,b){FlowMVC.mvc.service.AbstractService.logger.info("success");FlowMVC.mvc.service.AbstractService.logger.info(a);if((a.success!=null)&&(a.success!==true)){this.failure(a,b);return}FlowMVC.mvc.service.AbstractService.logger.groupEnd();if(b&&(b instanceof FlowMVC.mvc.service.rpc.AsyncToken)){b.applySuccess(a)}else{if(b&&(b instanceof Deft.promise.Deferred)){b.resolve(a)}else{this.applyResponderMethod(a,"success")}}},failure:function(a,b){FlowMVC.mvc.service.AbstractService.logger.info("failure");FlowMVC.mvc.service.AbstractService.logger.groupEnd();if(b&&(b instanceof FlowMVC.mvc.service.rpc.AsyncToken)){b.applyFailure(a)}else{if(b&&(b instanceof Deft.promise.Deferred)){deferred.reject("There was a service error.")}else{this.applyResponderMethod(a,"failure")}}}});Ext.define("FlowMVC.mvc.service.mock.AbstractServiceMock",{extend:"FlowMVC.mvc.service.AbstractService",statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.service.mock.AbstractServiceMock"),DELAY_IN_MILLISECONDS:3000},delayedSuccess:function(b,c){FlowMVC.mvc.service.mock.AbstractServiceMock.logger.debug("delayedSuccess");var d=this.getTokenOrPromise();var e=this;var a=Ext.create("Ext.util.DelayedTask",function(){e.success(b,d)});c=this.getDelayInMilliSeconds(c);a.delay(c);return(d.promise)?d.promise:d},delayedFailure:function(b,c){FlowMVC.mvc.service.mock.AbstractServiceMock.logger.debug("delayedFailure");var d=this.getTokenOrPromise();var e=this;var a=Ext.create("Ext.util.DelayedTask",function(){e.failure(b,d)});c=this.getDelayInMilliSeconds(c);a.delay(c);return(d.promise)?d.promise:d},getTokenOrPromise:function(){FlowMVC.mvc.service.mock.AbstractServiceMock.logger.debug("getTokenOrPromise");return(this.getUsePromise())?Ext.create("Deft.promise.Deferred"):Ext.create("FlowMVC.mvc.service.rpc.AsyncToken")},getDelayInMilliSeconds:function(a){a=(a==null)?FlowMVC.mvc.service.mock.AbstractServiceMock.DELAY_IN_MILLISECONDS:a;FlowMVC.mvc.service.mock.AbstractServiceMock.logger.debug("getDelayInMilliSeconds: "+a);return a},getRandomInt:function(b,a){return Math.floor(Math.random()*(a-b+1))+b}});Ext.define("FlowMVC.mvc.store.AbstractStore",{extend:"Ext.data.Store",statics:{logger:FlowMVC.logger.Logger.getLogger("FlowMVC.mvc.store.AbstractStore"),ERROR_SET_DATA_PARAM_NOT_VALID:"The setData() method's 'data' parameter must be an array or null.",ERROR_SET_SELECTED_RECORD_PARAM_NOT_VALID:"The setSelectedRecord() method's 'record' parameter must null or be an instance of the expected model for this store.",ERROR_SET_UPDATE_PARAM_NOT_VALID:"The update() method's 'record' parameter must be not null and be an instance of the expected model for this store."},_selectedRecord:null,setSelectedRecord:function(a,b){FlowMVC.mvc.store.AbstractStore.logger.debug("setSelectedRecord");if(!this.isModel(a)&&(a!=null)){Ext.Error.raise({msg:FlowMVC.mvc.store.AbstractStore.ERROR_SET_SELECTED_RECORD_PARAM_NOT_VALID})}b=typeof b!=="undefined"?b:true;if(a&&b&&(this.getById(a.id)==null)){this.add(a)}this._selectedRecord=a;this.fireEvent("selectedRecordChange",this,a)},getSelectedRecord:function(){FlowMVC.mvc.store.AbstractStore.logger.debug("getSelectedRecord");return this._selectedRecord},removeAll:function(){FlowMVC.mvc.store.AbstractStore.logger.debug("removeAll");this._selectedRecord=null;this.callParent(arguments)},setData:function(a){if(!Ext.isArray(a)&&(a!=null)){Ext.Error.raise({msg:FlowMVC.mvc.store.AbstractStore.ERROR_SET_DATA_PARAM_NOT_VALID})}if(Ext.getVersion("extjs")){FlowMVC.mvc.store.AbstractStore.logger.info("setData: using 'store.removeAll() and store.add(data)' because ExtJS 4.1 doesn't support store.setData().");this.removeAll();if(a){this.add(a)}else{this.removeAll()}}else{FlowMVC.mvc.store.AbstractStore.logger.info("setData");this.callParent(arguments)}},update:function(c,e){e=e?e:"id";if((c==null)||(this.isModel(c)==false)){Ext.Error.raise({msg:FlowMVC.mvc.store.AbstractStore.ERROR_SET_UPDATE_PARAM_NOT_VALID})}if(Ext.getVersion("extjs")){var b=this.find(e,c.get(e));if(b<0){return}this.insert(b,c);this.removeAt(b+1);FlowMVC.mvc.store.AbstractStore.logger.debug("update: updating ExtJS model with "+e);this.fireEvent("updatedRecord",this,c);return c}else{var d=c.data[e];var a=this.findRecord(e,d);if(a){a=c;a.dirty=true;this.sync();FlowMVC.mvc.store.AbstractStore.logger.debug("update: updating Touch model with "+e);this.fireEvent("updatedRecord",this,a);return c}}return null},isModel:function(a){var c=(Ext.getVersion("extjs"))?this.model:this._model;var b=(a instanceof c);return(a instanceof c)}});