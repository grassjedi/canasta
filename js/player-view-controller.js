/**
* A module maninging the configuration
* user interface
*/

/*global define: false Controller: true*/

(function defineController (global, factory) {
   if(typeof exports === 'object' 
         && exports 
         && typeof exports.nodeName !== 'string') {
      factory(exports); // CommonJS
   }
   else if (typeof define === 'function' && define.amd) {
      define(['exports'], factory); // AMD
   }
   else {
      global.Controller = {};
      factory(global.Controller); // script, wsh, asp
   }
}(this, function controllerFactory(controller) {

   $('#player-configuration');
   $('#player-form');

   var playerNameInput = $('#player-name-input');
   var playerListElement = $('#player-list');   
   var addPlayerButton = $('#add-player-button');

   addPlayerButton
   	.on('click', function(event) {
   		var playerName = playerNameInput.val();
   		playerName = playerName.trim();
   		if(playerName === '') {
   			alert('Please enter a unique name for the new player.');
   			return;
   		}
   		try {
   			var player = PlayerRepository.createPlayer(playerName);
   			Templates.Player(playerListElement, player);
   			playerNameInput.val('');
   		}
   		catch(existingPlayer) {
				alert('The player name "' + existingPlayer.name + '" has already been used. '
					+ 'Please enter a unique name for the new player.');
   		}
   		Controller.makeSortable();
   });

   controller.makeSortable = function() {
	   new Sortable(document.getElementById('player-list'), {
	   	handle: ".player-drag-handle",
	   	onEnd: function(event) {
	   		PlayerRepository.reorderDealing(event.oldIndex, event.newIndex);
	   	}
	   });
	};
}));