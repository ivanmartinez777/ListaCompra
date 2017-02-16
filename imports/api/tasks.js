import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

 

export const Productos = new Mongo.Collection('productos');


Meteor.methods({

  'productos.insert'(text, quantity, place) {

    check(text, String);
    

    // Make sure the user is logged in before inserting a product

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

 

    Productos.insert({

      text,

      quantity,

      place,

      createdAt: new Date(),

      owner: this.userId,

      username: Meteor.users.findOne(this.userId).username,

    });

  },

  'productos.remove'(prodId) {

    check(prodId, String);

 

    Productos.remove(prodId);

  },

  'productos.setChecked'(prodId, setChecked) {

    check(prodId, String);

    check(setChecked, Boolean);

 

    Productos.update(prodId, { $set: { checked: setChecked } });

  },

});


