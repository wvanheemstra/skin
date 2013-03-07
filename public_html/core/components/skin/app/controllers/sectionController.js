Sections = can.Control({
	init: function() {
		this.element.html(can.view('views/sectionView.ejs', {
			sections: this.options.sections
		}));
	}
})