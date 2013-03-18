Footers = can.Control({
	init: function() {
		this.element.html(can.view('view/footerView.ejs', {
			footers: this.options.footers
		}));
	}
})