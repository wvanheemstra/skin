Sections = can.Control({
	init: function() {
		this.element.html(can.view('view/sectionView.ejs', {
			sections: this.options.sections
		}));
	}
})