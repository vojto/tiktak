Router.configure({
  layoutTemplate: 'tiktak'
});

Router.onBeforeAction(function() {
  var userId = Session.get('user');

  if (!userId) {
    Router.go('login');
    this.stop();
  } else {
    this.next();
  }

}, { except: ['login', 'signup'] });

Router.route('/', function() {
  Router.go('/stories');
});

Router.route('/login');

Router.route('/logout', function() {
  Session.clear('user');
  Router.go('/');
});

Router.route('/signup');

Router.route('/stories');
Router.route('/stories/new');

Router.route('stories.show', {
  path: '/stories/:_id',
  data: function() {
    var _id = this.params._id;
    return Stories.findOne({ _id: _id });
  }
});