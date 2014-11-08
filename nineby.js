//client only code
if (Meteor.isClient) {
  var randnum = function() {
    return Math.floor((Math.random() * 9) + 1);
  };

  var initQuiz = function() {
    Session.set('op1value', randnum());
    Session.set('op2value', randnum());
    Session.set('ansval', '?');
  };

  initQuiz();

  Template.quiz.helpers( {
    op1: function() {
      return Session.get('op1value');
    },
    op2: function() {
      return Session.get('op2value');
    },
    answerValue: function () {
      return Session.get('ansval');
    }
  });

  Template.numpad.helpers( {
  });

  Template.numpad.events( {
    'click .clear': function() {
      Session.set('ansval', '?');
    }
  });

  Template.numbtn.events( {
    "click": function(e) {
      var ansval = Session.get('ansval');
      if ( typeof(ansval) != "number" ) {
        ansval = 0;
      }
      if ( ansval !== 0 ) {
        ansval *= 10;
      }
      ansval += this.number;

      Session.set('ansval', ansval);
    }
  });

  Template.evaluationBar.helpers( {
    answerValue: function () {
      return Session.get('ansval');
    },
    isCorrect: function() {
      return Session.get('ansval') === (Session.get('op1value') * Session.get('op2value'));
    }
  });

  Template.evaluationBar.events( {
    'click .next': function(e) {
      initQuiz();
    }
  });

}
