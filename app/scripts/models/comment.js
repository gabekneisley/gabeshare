define(['underscore', 'backbone', 'moment', 'session'],
  function(_, Backbone, moment, session) {
    var instanceProps = {
      formatDate: function() {
        var date = moment(this.get('comment').date_posted).format(Comment.DATE_FORMAT);
        if((/Tue /).test(date)) {
          return date.replace("Tue", "Tues");
        }
        return date;
      },
      toRender: function() {
        var raw = this.toJSON();
        raw.comment.date_posted = this.formatDate();
        return raw;
      }
    };

    var classProps = {
      DATE_FORMAT: "ddd MMM Do",
      maxId: 3,
      nextId: function() {
        this.maxId += 1;
        return this.maxId;
      },
      parseDate: function(dateString) {
        // expecting a dateString as Sat Feb 1st
        var parts = dateString.split(' ').slice(1);
        var month, day, year = moment().year();
        switch(parts[0]) {
          case 'Jan':
            month = '01';
            break;
          case 'Feb':
            month = '02';
            break;
          case 'Mar':
            month = '03';
            break;
          case 'Apr':
            month = '04';
            break;
          case 'May':
            month = '05';
            break;
          case 'Jun':
            month = '06';
            break;
          case 'Jul':
            month = '07';
            break;
          case 'Aug':
            month = '08';
            break;
          case 'Sep':
            month = '09';
            break;
          case 'Oct':
            month = '10';
            break;
          case 'Nov':
            month = '11';
            break;
          case 'Dec':
            month = '12';
            break;
        }
        day = parts[1].match(/\d{1,2}/)[0];
        date = moment([month, day, year].join('-'), "MM-DD-YYYY");
        if(date.isAfter(moment())) {
          date.subtract('y', 1);
        }
        return date.toISOString();
      },
      fromJSON: function(json) {
        // fix the date
        json.comment.date_posted = Comment.parseDate(json.comment.date_posted);
        return new Comment(json);
      },
      fromText: function(text) {
        var hash = {};
        hash.id = Comment.nextId;
        hash.comment = {
          date_posted: moment().toISOString(),
          description: text
        };
        hash.user = session.currentUser();
        return new Comment(hash);
      }
    };
    var Comment = Backbone.Model.extend(instanceProps, classProps);

    return Comment;
});