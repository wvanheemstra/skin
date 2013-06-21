Navs = can.Control({
	init: function() {
		this.element.html(can.view('view/navView.ejs', {
			navs: this.options.navs
		}));
	}
})