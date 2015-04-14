// Layout
// -----------------------------------------------------

Template.tiktak.events({
  'click h1': function() {
    Router.go('/');
  }
})

// Login/Signup
// -----------------------------------------------------

Template.login.events({
  'submit form': function(ev) {
    ev.preventDefault();


    var name = $('#name').val();
    var password = $('#password').val();



    var user = Users.findOne({ name: name, password: password });

    if (user) {
      Session.setPersistent('user', user._id);
      Router.go('/stories');
    } else {
      alert('Nesprávne meno alebo heslo. :-(');
    }

    return false;
  }
});


Template.signup.events({
  'submit form': function(ev) {
    ev.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();

    Users.insert({ name: name, email: email, password: password });

    Router.go('/');

    return false;
  }
});


// Stories
// -----------------------------------------------------



Template.stories.helpers({
  stories: function() {
    return Stories.find();
  }
});

Template.story.helpers({
  author: function() {
    return Users.findOne({ _id: this.userId }).name;
  },

  replyCount: function() {
    return Replies.find({ storyId: this._id }).count();
  }
});


Template.storiesNew.events({
  'submit form': function(ev) {
    ev.preventDefault();

    var content = $('#content').val();

    if (!content) {
      return false;
    }

    Stories.insert({
      content: content,
      userId: Session.get('user'),
      createdAt: new Date()
    })

    Router.go('/stories');

    return false;
  }
});


Template.storiesShow.helpers({
  author: function() {
    var author = Users.findOne({ _id: this.userId });
    return author && author.name;
  },

  replies: function() {
    return Replies.find({ storyId: this._id });
  }
});

Template.storiesShow.events({
  'submit form': function(ev) {
    ev.preventDefault();

    var story = this;

    var content = $('#content').val();

    Replies.insert({
      storyId: story._id,
      userId: Session.get('user'),
      content: content
    });

    $('#content').val('');

    return false;
  }
});