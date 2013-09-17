/**
 * The modal of main view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
 Ext.define("Skin.view.touch.main.modal.View", {
    extend: "Skin.view.touch.main.base.View",
    alias: "widget.mainModalView",
    controller: "Skin.mediator.touch.main.modal.Mediator",

    requires: [
        // empty
    ],
	
	config: {
		layout: {
			type: "fit"
		},
	//	src: 'about:blank',
	//	loadingText: 'Loading ...', // Make this dynamic
		// border: false,
	//	scroll : "vertical",
        items: [{
			xtype: "toolbar", // WAS "titlebar", BUT THAT FAILED
			itemId: "titlebar",
			ui: "neutral",
			docked: "top",
			//plugins: [  // TITLE IS SET DYNAMICALLY, MAKE locale SUITABLE FOR USE
			//	{
			//		type: "localization",
			//		method: "setTitle",
			//		key: "mainModal.title"
			//	}
			//],
			items: [{
				xtype: "button",
				iconMask: true,
				iconCls: 'delete',
				itemId: "closeButton",
				align: "left",
				plugins: [
					{
						type: "localization",
						method: "setText",
						key: "mainModal.close"
					}
				]
			},{
				xtype: 'image',
				width: 218,
				height: 44,	
				src:'/resources/logos/headerlogo.png',
				name: 'modalheader'
			}]
		},{
			xtype: "panel",
			itemId: "iframeContainer",
			html: "", // empty initially
			src: "about:blank",
			loadingText: 'Loading ...' // Make this dynamic
			// border: false,
			// scroll : "vertical" // A scroll might block the iframe from showing
		},{
			xtype: "toolbar",
			itemId: "bottombar",
			ui: "neutral",
			docked: "bottom"
		}]
    },
	
	initConfig: function(){
		console.log("initConfig");
		var me = this;
        me.callParent(arguments);		
	},
	
	initialize: function(){
		console.log("initialize");	
	},
	
	updateHTML: function() {
		console.log("updateHTML");
		this.down("#iframeContainer").html='<iframe id="iframe-'+this.id+'"'+
			' style="overflow:auto;width:100%;height:100%;"'+
			' frameborder="0" '+
			' onload="this.contentWindow.focus();" '+
			' src=""'+
			'></iframe>';
		this.setSrc(this.down("#iframeContainer").src);
	},
	reload: function() {
		console.log("reload");		
		this.setSrc(this.down("#iframeContainer").src);
	},
	reset: function() {	
		console.log("reset");		
		var iframe = this.getDOM();
		var iframeParent = iframe.parentNode;
		if (iframe && iframeParent) {
			iframe.src = 'about:blank';
			iframe.parentNode.removeChild(iframe);
		}
		iframe = document.createElement('iframe');
		iframe.frameBorder = 0;
		iframe.src = this.down("#iframeContainer").src;
		iframe.id = 'iframe-'+this.id;
		iframe.style.overflow = 'auto';
		iframe.style.width = '100%';
		iframe.style.height = '100%';	
		iframe.style.margin = 0;
		iframe.onload = 'this.contentWindow.focus()';	
		iframeParent.dom.firstChild.insertBefore(iframe); // Move the iframe before any other children
	},
	setSrc: function(src, loadingText){
		console.log("setSrc");
		var iframeParent = this.down("#iframeContainer");
		if(loadingText){
			iframeParent.loadingText = loadingText;
		}
		iframeParent.src=src;
		var iframe = document.getElementById('iframe-'+this.id);
		if(iframe == null){
			iframe = this.getDOM();
		}
		if (iframe) {
		  iframe.src = src;
		}
	},
	getSrc: function() {
		console.log("getSrc");	
		return this.down("#iframeContainer").src;
	},	
	getDOM: function() {
		console.log("getDOM");		
		var iframe = document.getElementById('iframe-'+this.id);
		console.log("iframe: ");
		console.log(iframe);		
		if(iframe == null){
			iframe = document.createElement('iframe');
			iframe.frameBorder = 0;
			iframe.src = this.down("#iframeContainer").src;
			iframe.id = 'iframe-'+this.id;
			iframe.style.overflow = 'auto';
			iframe.style.width = '100%';
			iframe.style.height = '100%';		
			iframe.style.margin = 0;
			iframe.onload = 'this.contentWindow.focus()';
			var iframeParent = Ext.get(this.down("#iframeContainer").id);
			//iframeParent.dom.appendChild(iframe);
			iframeParent.dom.firstChild.insertBefore(iframe); // Move the iframe before any other children
		}
		return iframe;
	},
	getDocument: function() {	
		console.log("getDocument");		
		var iframe=this.getDOM();
		iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
		console.log("iframe.document:");
		console.log(iframe.document);		
		return iframe.document;
	},
	destroy: function() {
		console.log("destroy");		
		var iframe=this.getDOM();
		if (iframe && iframe.parentNode) {
		  iframe.src='about:blank';
		  iframe.parentNode.removeChild(iframe);
		}
		this.callParent(arguments);
	},
	update: function(content) {
		console.log("update");		
		this.setSrc('about:blank');
		try {
			var doc=this.getDocument();
			doc.open();
			doc.write(content);
			doc.close();
		} catch(err) {
		    console.log(err);
			// reset if any permission issues
			this.reset();
			var doc=this.getDocument();
			if(doc){
				doc.open();
				doc.write(content);
				doc.close();
			}
		}
	}
});	