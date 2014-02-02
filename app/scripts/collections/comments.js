define(['backbone', 'moment', 'models/comment'],
  function(Backbone, moment, Comment) {
    var instanceProps = {
      model: Comment,
      comparator: function(a, b) {
        return a.get('comment').date_posted.localeCompare(b.get('comment').date_posted);
      },
      initialize: function() {
        this.fetch();
      },
      /*
        Overriding this as a hack for the homework assignment
      */
      fetch: function() {
        var cb = _.bind(function(comments) {
          _.each(comments, function(comment) {
            var c = Comment.fromJSON(comment);
            this.add(c);
          }, this);
          this.trigger('fetch-complete');
        }, this);
        $.get('/data/data.json', cb, 'json');
      }
    };

    var classProps = {
      
    };
    var CommentCollection = Backbone.Collection.extend(instanceProps, classProps);

    return CommentCollection;
});