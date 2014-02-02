define(['jquery', 'underscore', 'backbone', 'templates', 'expanding', 'models/comment', 'views/comment', 'collections/comments'],
  function($, _, Backbone, T, expandingTextarea, Comment, CommentView, CommentCollection) {
    var CommentBlockView = Backbone.View.extend({
      tagName: 'section',
      className: 'comment-component',
      events: {
        'click [data-insertion="user-comment"]': 'postComment'
      },
      initialize: function() {
        this.$el.append(T.commentBlock.render({
          title: "Leave Feedback",
          prompt: "What do you think about this project?"
        }));
        this.$list = this.$('.comment-list');
        this.$input = this.$('.comment-input');
        this.$input.expandingTextarea();
        this.commentViews = [];
        this.comments = new CommentCollection;

        this.comments.on('fetch-complete', this.addAll, this);

        $('#comment_component_placeholder').replaceWith(this.$el);
      },
      addAll: function() {
        this.comments.each(this.add, this);
      },
      add: function(comment) {
        var view = new CommentView({
          model: comment
        });
        this.commentViews.unshift(view);
        this.$list.prepend(view.$el);
      },
      postComment: function(event) {
        var text = this.$input.val();
        if(!text) {
          return false;
        }
        var comment = Comment.fromText(text);
        this.comments.add(comment);
        this.add(comment);
        this.$input.val('');
      }
    });

    return CommentBlockView;
});