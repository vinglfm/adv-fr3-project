$( document ).ready( function () {
    var posts = Data.getPosts();

    var selectedPage = 0;
    var perPage = 13;

    var postTemplateRow = $('#post-template').html();
    var postsTemplateRow = $('#post-list-template').html();
    var navigationTemplateRow = $('#navigation').html();

    var postTemplate = Handlebars.compile(postTemplateRow);
    var postsTemplate = Handlebars.compile(postsTemplateRow);
    var navigationTemplate = Handlebars.compile(navigationTemplateRow);

    Handlebars.registerPartial('post-preview', postTemplate);
    Handlebars.registerHelper('bold', function(text, options) {
      return new Handlebars.SafeString('<b>' + Handlebars.Utils.escapeExpression(text) + '</b>');
    });
    Handlebars.registerHelper('nav', function(options) {
      return Array.apply(null, Array(options.hash.count)).map(function(elem, index){
        return options.fn(
          {
            number: index + 1,
            selected: options.hash.selected == index
          }
        );
      }).join('');
    });

    var html = postsTemplate({posts: Data.getPosts()});

    $( '.posts-container__list' ).html(html);
    render();
    subscribeHandlers();

    function render() {
        renderPosts();
        renderNavigation();
    }

    function subscribeHandlers() {
        $( '.posts-container__navigation' ).click( function( event ) {
            var selected = parseInt(event.target.getAttribute('data-id')) - 1;
            //var selected = parseInt($(event.target).data('id')) - 1;

            if ( selected === selectedPage ) {
                return;
            }
            selectedPage = selected;
            renderPosts();
            renderNavigation();
            $( 'html,body' ).animate( { scrollTop : 0 }, 0 );
        });

        $( '.posts-container__post' ).click( function () {
            console.log( 'selected post' );
        } );
    }

    function renderNavigation() {
        var count = Math.ceil( posts.length / perPage );

        var html = navigationTemplate({count:count, selected:selectedPage});

        $( '.posts-container__navigation' ).html(html);
    }

    function renderPosts() {
        var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );

        var html = postsTemplate({posts: postsForRender});

        $( '.posts-container__list' ).html(html);
    }
});
