Footers = can.Control({
	init: function() {
		this.element.html(can.view('views/footerView.ejs', {
			footers: this.options.footers
		}));
	}
})