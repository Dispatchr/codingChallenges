Order = new Mongo.Collection('order');

if (Meteor.isClient) {

    Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
  });

  // This code only runs on the client

  angular.module('simple-order',['angular-meteor']);

  angular.module('simple-order').controller('OrderListCtrl', ['$scope', '$meteor',

    function ($scope, $meteor) {

      $scope.$meteorSubscribe('order');

      $scope.order = $meteor.collection( function() {
        return Order.find($scope.getReactively('query'), { sort: { createdAt: -1 } })
      });
      

      $scope.addOrder = function (newOrder) {
        $meteor.call('addOrder', newOrder);
      };


      $scope.deleteOrder = function (order) {
        $meteor.call('deleteOrder', order._id);
      };


      $scope.setChecked = function (order) {
        $meteor.call('setChecked', order._id, !order.checked);
      };

      $scope.setPrivate = function (order) {
        $meteor.call('setPrivate', order._id, ! order.private);
      };


      $scope.$watch('hideCompleted', function() {
        if ($scope.hideCompleted)
          $scope.query = {checked: {$ne: true}};

        else
          $scope.query = {};

      });

      $scope.incompleteCount = function () {
        return Order.find({ checked: {$ne: true} }).count();

      };

    }]);
}

Meteor.methods({

  addOrder: function (text) {

    // Make sure the user is logged in before inserting a order
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Order.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });

  },

  deleteOrder: function (orderId) {
    var order = Order.findOne(orderId);

    if (order.private && order.owner !== Meteor.userId()) {
      // If the order is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Order.remove(orderId);
  },

  setChecked: function (orderId, setChecked) {
    var order = Order.findOne(orderId);

    if (order.private && order.owner !== Meteor.userId()) {
      // If the order is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Order.update(orderId, { $set: { checked: setChecked} });
  },
  
  setPrivate: function (orderId, setToPrivate) {

    var order = Order.findOne(orderId);
    // Make sure only the order owner can make a order private

    if (order.owner !== Meteor.userId()) {

      throw new Meteor.Error('not-authorized');

    }
    Order.update(orderId, { $set: { private: setToPrivate } });
  }
});

if (Meteor.isServer) {

  Meteor.publish('order', function () {

    return Order.find({

      $or: [

        { private: {$ne: true} },

        { owner: this.userId }

      ]

    });

  });

}