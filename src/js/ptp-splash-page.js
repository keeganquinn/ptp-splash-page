
$(document).ready(function() {
    console.log('document.ready ptp-splash-page');
    
    donorOptOut();
    
	smoothScrolling();

	internetWorks();

});

function donorOptOut() {
    // donors can opt out of public acknowledgement
    // by clicking on the checkbox in the donors section
    // we manipulate some variables which are eventually
    // consumed by the donor polling tools that back
    // http://api.personaltelco.net/api/v0/donors
    $('#optoutpublic').click(function() {
        console.log('optout clicked');
        
        if ($('#optoutpublic').is(':checked')) {
            console.log('donor is opting out');
            $('#item_number').val('splash2014_opt_out');
            $('#item_name').val('Personal Telco Project - Anonymous Donation');
        } else {
            console.log('donor is opting in');
            $('#item_number').val('splash2014');
            $('#item_name').val('Personal Telco Project - Donation');
        }
    });
}

function smoothScrolling() {
    // a bootstrap feature which needs resetting after any manipulation of the DOM
    $("a[href^='#']").unbind( "click" ); // get rid of the existing click event
    $("a[href^='#']").on('click', function(e) {

		// prevent default anchor click behavior
		e.preventDefault();

		// store hash
		var hash = this.hash;
		var further = 0;
		if (hash == '#home' || hash == '#Carousel') {
			further = 50;
		}
		// animate
		$('html, body').animate({
			scrollTop : $(this.hash).offset().top - further
		}, 1250, function() {
			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
		});

	});
}

function internetWorks() {
    
    // test the static server
    // test the apiserver
    // test wikipedia
    
    console.log('internet works');
    $("#staticworks").text("Dynamic content successfully loaded from " + pageConf.staticserver);
    $("#staticworks").removeClass('text-danger');
    $("#statusSidebarWords").text('connected');
    $("#statusSidebarWords").removeClass('text-danger')
            .addClass('text-success');
    $("#statusSidebarIcons").html('<i class="fa fa-sitemap text-success"></i>');
    // tempting to load some overall network stats
    // number of nodes active
    // number of connected users
}

