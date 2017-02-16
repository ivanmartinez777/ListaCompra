import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 

import { Productos } from '../api/tasks.js';

 
import './task.js';
import './body.html';

 Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();

});

Template.body.helpers({

  tasks() {
  	    const instance = Template.instance();

    if (instance.state.get('hideCompleted')) {

      // If hide completed is checked, filter tasks
    // Show newest tasks at the top

    return Productos.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
}
	return Productos.find({}, { sort: { createdAt: -1 } });
  },
  comprados() {
       

    return Productos.find({ checked: { $eq: true } }, { sort: { createdAt: -1 } });
  	
},
  incompleteCountSuper() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Super'}]}).count();

},
 incompleteCountCongelados() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Congelados'}]}).count();

},
 incompleteCountFruteria() {

    return Productos.find({$and:[{checked: {$ne: true}},{place : 'Fruteria'}]}).count();

},
});

 

Template.body.events({

  'submit .new-product'(event) {

    // Prevent default browser form submit

    event.preventDefault();

    

    // Get value from form element

    const target = event.target;
    const text = target.text.value;
    const quantity = target.quantity.value;
    const place = target.place.value;

    if( text == ""){

      alert("Debe tener un nombre");
    }else if( quantity == ""){
      alert("Debe marcar la cantidad de producto a comprar")
    }else{

    // Insert a task into the collection

        // Insert a task into the collection

    Meteor.call('productos.insert', text, quantity, place);

 

    // Clear form


    target.text.value = '';
   
  }
  },

  
  'change .hide-completed input'(event, instance) {

    instance.state.set('hideCompleted', event.target.checked);

  },

});














