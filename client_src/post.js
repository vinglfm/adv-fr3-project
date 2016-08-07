$(document).ready(function(){

  var post = Data.getCurrentPost();

  if(post == null) {
    renderNotFound();
    return;
  }

  render();

  function render() {
    renderPostHeader();
    renderPostComments();
    renderRelatedPosts();
  }

  function renderNotFound() {
    var postNotFoundTemplateRow = $('#post-not-found-template').html();
    var postNotFoundTemplate = Handlebars.compile(postNotFoundTemplateRow);
    var html = postNotFoundTemplate({exist: post != null,
      imgUrl: Errors.notFoundImgUrl});
    $('.post-container').html(html);
  }

  function renderPostHeader() {
    var headerTemplateRow = $('#post-header-template').html();
    var headerTemplate = Handlebars.compile(headerTemplateRow);
    Handlebars.registerHelper('header', function(elem, options){
      return options.fn({
        userId: elem.userId,
        imgUrl: elem.imgUrl,
        description: elem.description
       });
    });
    var html = headerTemplate({elem: post});
    $('.post-container__header').html(html);
  }

  function renderPostComments() {
    var postComments = Data.getPostComments();

    var commentsTemplateRow = $('#post-comments-template').html();
    var commentsTemplate = Handlebars.compile(commentsTemplateRow);

    var html = commentsTemplate({comments: postComments});
    $('.post-container__comments').html(html);
  }

  function renderRelatedPosts() {
    var relatedPosts = Data.getRelatedPosts();
    var postTemplateRow = $('#post-template').html();
    var postsTemplateRow = $('#post-list-template').html();

    var postTemplate = Handlebars.compile(postTemplateRow);
    var postsTemplate = Handlebars.compile(postsTemplateRow);
    Handlebars.registerPartial('post-preview', postTemplate);
    Handlebars.registerHelper('boldEscaped', function(text, options) {
      var escapedText = Handlebars.Utils.escapeExpression(text);
      return new Handlebars.SafeString('<b>' + escapedText + '</b>');
    });
    var html = postsTemplate({posts: relatedPosts});
    $('.posts-container__related-posts').html(html);
  }
});
