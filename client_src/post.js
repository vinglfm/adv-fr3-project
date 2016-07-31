$(document).ready(function(){

  var postContainerTemplateRow = $('#post-container-template').html();
  var postContainerTemplate = Handlebars.compile(postContainerTemplateRow);

  var post = Data.getCurrentPost();

  renderContainer();

  if(post != null) {
    var postTemplateRow = $('#post-template').html();
    var postsTemplateRow = $('#post-list-template').html();

    var postTemplate = Handlebars.compile(postTemplateRow);
    var postsTemplate = Handlebars.compile(postsTemplateRow);
    Handlebars.registerPartial('post-preview', postTemplate);
    Handlebars.registerHelper('bold', function(text, options) {
      var escapedText = Handlebars.Utils.escapeExpression(text);
      return new Handlebars.SafeString('<b>' + escapedText + '</b>');
    });

    var headerTemplateRow = $('#post-header-template').html();
    var headerTemplate = Handlebars.compile(headerTemplateRow);

    Handlebars.registerHelper('header', function(elem, options){
      return options.fn({
        userId:elem.userId,
        imgUrl: elem.imgUrl,
        description: elem.description
       });
    });

    var commentsTemplateRow = $('#post-comments-template').html();
    var commentsTemplate = Handlebars.compile(commentsTemplateRow);

    render();
  }

  function render() {
    renderHeader();
    renderComments();
    renderRelatedPosts();
  }

  function renderContainer() {
    console.log(post);
    var html = postContainerTemplate({exist: post != null,
      imgUrl: Errors.notFoundImgUrl});
    $('.post-container').html(html);
  }

  function renderHeader() {
    var html = headerTemplate({elem: post});
    $('.post-container__header').html(html);
  }

  function renderComments() {
    var postComments = Data.getPostComments();

    var html = commentsTemplate({comments: postComments});
    $('.post-container__comments').html(html);
  }

  function renderRelatedPosts() {
    var relatedPosts = Data.getRelatedPosts();

    var html = postsTemplate({posts: relatedPosts});
    $('.posts-container__related-posts').html(html);
  }
});
