//client only code
if (Meteor.isClient) {
var randnum = function() {
    return Math.floor((Math.random() * 9) + 1);
};
Session.set('op1value', randnum());
Session.set('op2value', randnum());

Template.quiz.helpers( {
  op1: function() {
    return Session.get('op1value');
  },
  op2: function() {
    return Session.get('op2value');
  }
});

Template.numpad.helpers( {
  numbers: function() {
    return [{ number: 1}, 
    { number: 2}, 
    { number: 3}, 
    { number: 4}, 
    { number: 5}, 
    { number: 6}, 
    { number: 7}, 
    { number: 8}, 
    { number: 9}, 
    { number: 0}];
  }
});

Template.numpad.events( {
  'click .clear': function() {
    Session.set('ansval', 0);
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

Template.answerPad.helpers( {
  answerValue: function () {
    return Session.get('ansval');
  },
  isCorrect: function() {
    return Session.get('ansval') == (Session.get('op1value') * Session.get('op2value'));
  }
});

Template.answerPad.events( {
  'click .next': function(e) {
    Session.set('op1value', randnum());
    Session.set('op2value', randnum());
    Session.set('ansval', 0);
  }
});

}
