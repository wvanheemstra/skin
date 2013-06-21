function init()
{
	// get the Model(s)
	$.holdReady(true);
	$.getScript('app.php?app=model/pageModel.js', function() {
	    $.holdReady(false);
		//console.log('Got the model pageModel!');
	});
	var bodyElement= document.getElementsByTagName('body')[0];
	var mvcElement= document.createElement('mvc');
	mvcElement.id='core.mvcElement';
	mvcElement = bodyElement.appendChild(mvcElement);
	appendText(mvcElement,'MVC: initialized for Medium Client Width (<1280px).');
	appendStyles();
	buildPage();
}
function appendStyles()
{
	var headElement= document.getElementsByTagName('head')[0];
	// FOUNDATION
	var foundationStyle = document.createElement('link');
	foundationStyle.id='core.foundationStyle';
	foundationStyle = headElement.appendChild(foundationStyle);
	foundationStyle.rel='stylesheet';
	foundationStyle.href='resources/css/medium/foundation.min.css';
}
function appendText(node,txt)
{
	node.appendChild(document.createTextNode(txt));
}
function appendElement(node,tag,id,htm)
{
	var ne = document.createElement(tag);
	if(id) ne.id = id;
	if(htm) ne.innerHTML = htm;
	node.appendChild(ne);
}
function buildPage()
{	
	// THE CONTROLLER
	Pages = can.Control({
		init: function() {
			this.element.html(can.view('app.php?app=view/pagesList.ejs', {
				pages: this.options.pages
			}));
		}
	})
	// END OF CONTROLLER
	
	// Auto-starts when document is fully loaded
	$(document).ready(function(){
		$.holdReady(true);
		$.getScript('resources/js/parseuri/parseuri.js', function() {
		    $.holdReady(false);
			var page_id = parseUri(document.URL).queryKey.page_id; // takes the value of param 'page_id' in URL
			//console.log('page_id: '+page_id); // for test only
			loadPage(page_id);
		});
	}); // eof ready
	
	// Call this function to load a page by id... OOOOOPPPSSSS THIS IS BY INDEX, NOT ID.. FIX IT!!!
	function loadPage(id){
		var page_id;
		if(id) {page_id = id;}
		else {page_id=0;}
		//alert('page_id: '+page_id); // for test only
		console.log(Page.findAll()); // for test only
		// All Pages
		$.when(Page.findAll()).then(function(pageResponse){
			//alert('inside when'); // for test only
			var bodyElement= document.getElementsByTagName('body')[0];
			var pages = pageResponse; // pick all
			
			console.log(pages[0]); // for test only
			
			var pageElement= document.createElement('page');	
			pageElement.id=pages[page_id].id; // pick the first page
			pageElement.setAttribute('style', pages[page_id].style); // style is a reserved word, use setAttribute
			appendText(pageElement,pages[page_id].text);
			var openingComment;
			var closingComment;
			for (var i = 0; i < pages[page_id].navs.length; i++) {
				var navElement= document.createElement('nav');
				navElement.setAttribute('class', pages[page_id].navs[i].class); // class is a reserved word, use setAttribute
				navElement.innerHTML = pages[page_id].navs[i].data;
				navElement = pageElement.appendChild(navElement);
				for (var n = 0; n < pages[page_id].navs[i].sections.length; n++) {
					var sectionElement= document.createElement('section');
					sectionElement.innerHTML = pages[page_id].navs[i].sections[n].data;
					sectionElement = navElement.appendChild(sectionElement);
					var openingComment = document.createComment(pages[page_id].navs[i].sections[n].openingComment);
					sectionElement.parentNode.insertBefore(openingComment, sectionElement);
					var closingComment = document.createComment(pages[page_id].navs[i].sections[n].closingComment);
					sectionElement.parentNode.insertBefore(closingComment, sectionElement.nextSibling);			
				}	
				var openingComment = document.createComment(pages[page_id].navs[i].openingComment);
				navElement.parentNode.insertBefore(openingComment, navElement);
				var closingComment = document.createComment(pages[page_id].navs[i].closingComment);
				navElement.parentNode.insertBefore(closingComment, navElement.nextSibling);
			}
			for (var i = 0; i < pages[page_id].rows.length; i++) {
				var rowElement= document.createElement('div');
				rowElement.setAttribute('class', pages[page_id].rows[i].class);
				rowElement.setAttribute('style', pages[page_id].rows[i].style);
				rowElement.innerHTML = pages[page_id].rows[i].data;
				rowElement = pageElement.appendChild(rowElement);
				var openingComment = document.createComment(pages[page_id].rows[i].openingComment);
				rowElement.parentNode.insertBefore(openingComment, rowElement);
				var closingComment = document.createComment(pages[page_id].rows[i].closingComment);
				rowElement.parentNode.insertBefore(closingComment, rowElement.nextSibling);
			}
			for (var i = 0; i < pages[page_id].footers.length; i++) {
				var footerElement= document.createElement('footer');
				footerElement.setAttribute('class', pages[page_id].footers[i].class);
				footerElement.setAttribute('style', pages[page_id].footers[i].style);
				footerElement.innerHTML =  pages[page_id].footers[i].data;
				footerElement = pageElement.appendChild(footerElement);
				var openingComment = document.createComment(pages[page_id].footers[i].openingComment);
				footerElement.parentNode.insertBefore(openingComment, footerElement);
				var closingComment = document.createComment(pages[page_id].footers[i].closingComment);
				footerElement.parentNode.insertBefore(closingComment, footerElement.nextSibling);				
			}
			pageElement = bodyElement.appendChild(pageElement);			
			var openingComment = document.createComment(pages[page_id].openingComment);
			pageElement.parentNode.insertBefore(openingComment, pageElement);
			var closingComment = document.createComment(pages[page_id].closingComment);
			pageElement.parentNode.insertBefore(closingComment, pageElement.nextSibling);
			// this below is still to be investigated
			new Pages('#pages', {
				pages: pages
			});
		}); // eof loadPage
	}
}
   //more function and global variable definitions

init();