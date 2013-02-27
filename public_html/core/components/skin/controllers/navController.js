Navs = can.Control({
	init: function() {
		this.element.html(can.view('views/navView.ejs', {
			navs: this.options.navs
		}));
	}
})