/**
* A module containing the mustache templates
* Module init pattern copied from mustachejs
*/

/*global define: false Templates: true*/

(function defineTemplates (global, factory) {
   if(typeof exports === 'object' 
         && exports 
         && typeof exports.nodeName !== 'string') {
      factory(exports); // CommonJS
   }
   else if (typeof define === 'function' && define.amd) {
      define(['exports'], factory); // AMD
   }
   else {
      global.Templates = {};
      factory(global.Templates); // script, wsh, asp
   }
}(this, function templateFactory(templates) {

	templates.teamClasses = [
		"_bg-primary",
		"_bg-success",
		"_bg-info",
		"_bg-warning",
		"_bg-danger",
		"_bg-inverse"
	];

   templates.Player = function(parentElement, player) {
      var playerTemplate = "" +
         '<div id="{{ id }}" class="row player-component text-white rounded">' + 
            '<div class="col-sm-1 text-white player-drag-handle"><span class="glyphicon glyphicon-option-vertical" aria-hidden="true"></div>' +
            '<div class="col-sm-9 text-white"><span class="player-name text-white">{{ name }}</span></div>' + 
            '<div class="col-sm-1 text-white"><a class="change-team text-white"><span class="glyphicon glyphicon-option-horizontal text-white" aria-hidden="true" title="Set team"></span></a></div>' + 
            '<div class="col-sm-1 text-white"><a class="remove-player text-white"><span class="glyphicon glyphicon-remove text-white" aria-hidden="true" title="Delete"></span></a></div>' + 
         '</div>';

      var newRemoveEventHandler = function(playerId) {
        return function(event) {
        	var player = PlayerRepository.delete(playerId);
        	if(!player) {
        		console.log('no player to remove. id: ' + playerId);
        		return;
        	}
         	$("#" + playerId).remove();
        };
      };

      var newNextTeamEventHandler = function(playerId) {
      	return function(event) {
      		var player = PlayerRepository.getPlayer(playerId);
      		if(!player) {
      			console.log('no player to change team. id: ' + playerId);	
      			return;
      		}
      		var prevTeam = PlayerRepository.assignNextTeam(player);
      		var prevTeamClass = Templates.teamClasses[prevTeam];
      		var nextTeamClass = Templates.teamClasses[player.team];
      		var playerEl = $("#" + playerId);
      		playerEl.removeClass(prevTeamClass);
      		playerEl.addClass(nextTeamClass);
      	};
      };

      parentElement.append(Mustache.render(playerTemplate, player));
      var playerEl = $('#' + player.id);
      playerEl
         .find(".remove-player")
         .on('click', newRemoveEventHandler(player.id));
      playerEl
         .find(".change-team")
         .on('click', newNextTeamEventHandler(player.id));
      var teamClass = Templates.teamClasses[player.team];
      playerEl.addClass(teamClass);
   };

}));