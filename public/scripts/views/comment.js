define(['backbone', 'templates'], function(Backbone, T) {
  var CommentView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      this.$el.append(T.comment.render(this.model.toRender()));
    }
  });

  return CommentView;
});