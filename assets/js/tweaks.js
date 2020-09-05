// tweaks via javascript
$(document).ready(function(){
	
	// open external links in a new tab/window
	$('a').filter(function() {
		return this.hostname && this.hostname !== location.hostname;
	}).attr('target', '_blank').append('<sup><small class="icon icon-external"></small></sup>');

	// activate Bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	// stop default action of .no-action
	$('.no-action').click(function(event){
		event.preventDefault();
	});
		
});

/*
// using Web Share API if it is available
const shareButton = document.querySelector('#share-toggle-sns');

if (navigator.share) { 
	shareButton.classList.remove("popover-toggles");
}
    
shareButton.addEventListener('click', event => {
   navigator.share({
      title: document.title,
      text: document.title,
      url: document.URL,
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
});
*/


// Scrolls smoothly to anchor
$(document).ready(function() {
  // Add smooth scrolling to all .sjump links
  $(".sjump").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
	    
      // prevent default action
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    } // End if
  });
});

//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
  if ($(this).scrollTop() > 200) {
    if (!fixed) {
      fixed = true;
      // $('#to-top').css({position:'fixed', display:'block'});
      $('#to-top').show("slow", function() {
        $('#to-top').css({
          position: 'fixed',
          display: 'block'
        });
      });
    }
  } else {
    if (fixed) {
      fixed = false;
      $('#to-top').hide("slow", function() {
        $('#to-top').css({
          display: 'none'
        });
      });
    }
  }
});

// initialise typeahead

$(function() {

  function initSearchBox() {

    var pages = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace(['title', 'abstract']),
      // datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,

      prefetch: {
      	url: '/search.json',
        ttl: 600000,
      }
    });


    $('#search-box').typeahead({
      minLength: 2,
      highlight: true,
      classNames: {
        menu: 'w-100 typeahead-dropdown-menu',
        hint: 'text-muted',
        dataset: 'typeahead-dropdown dropdown-menu show shadow mt-1 w-100',
        //suggestion: 'dropdown-item small text-truncate',
        highlight: 'bg-warning',
      },
    }, {
      name: 'pages',
      display: 'title',
      source: pages,
      templates: {
        notFound: '<div class="dropdown-item py-2 small disabled empty-message">Nothing found</div>',
        suggestion: function(data) {
          return '<div class="dropdown-item py-2 small"><h6 class="text-truncate my-1">' + data.title + '</h6><p class="my-1 text-truncate">' + data.abstract + '</p></div>';
        },
      }
    });

    $('#search-box').bind('typeahead:select', function(ev, suggestion) {
      window.location.href = suggestion.url;
    });
  }

  initSearchBox();
});

