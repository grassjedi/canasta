/**
* A module maninging the configuration
* user interface
*/

/*global define: false PlayerRepository: true*/

(function definePlayerRepository (global, factory) {
   if(typeof exports === 'object' 
         && exports 
         && typeof exports.nodeName !== 'string') {
      factory(exports); // CommonJS
   }
   else if (typeof define === 'function' && define.amd) {
      define(['exports'], factory); // AMD
   }
   else {
      global.PlayerRepository = {};
      factory(global.PlayerRepository); // script, wsh, asp
   }
}(this, function playerRepositoryFactory(playerRepository) {
   
   playerRepository.playerId = 0;
   playerRepository.players = [];

   playerRepository.maxTeamNumber = 5;
   playerRepository.teamAssignment = 0;

   playerRepository.nextTeam = function() {
      var nextTeamIndex = playerRepository.teamAssignment + 1;
      if(nextTeamIndex > 1) {
         nextTeamIndex = 0;
      }
      var result = playerRepository.teamAssignment;
      playerRepository.teamAssignment = nextTeamIndex;
      return result;
   }

   playerRepository.assignNextTeam = function(player) {
      var curTeam = player.team;
      player.team = (player.team + 1) % playerRepository.maxTeamNumber
      return curTeam;
   }

   /**
   * Get the index of the specified player
   * @returns the 1-based index of the specified player or 
   * 0 if the player does not exist. 
   */
   playerRepository.playerExists = function(playerId) {
      return getPlayer(playerId) != null;
   };

   /**
   * find and return the player with the supplied name
   */
   playerRepository.getPlayerByName = function(playerName) {
      for(var index = 0; index < playerRepository.players.length; index++) {
         if(playerName === playerRepository.players[index].name) {
            return playerRepository.players[index];
         }
      }
      return null;
   }

   playerRepository.getPlayerByDealerNumber = function(dealerNumber) {
      for(var index = 0; index < playerRepository.players.length; index++) {
         if(dealerNumber === playerRepository.players[index].dealerNumber) {
            return playerRepository.players[index];
         }
      }
      return null;
   }

   /**
   * Add the specified player to the list of players
   * @throws playerIndex /playerId if the player already exists
   */
   playerRepository.createPlayer = function(playerName) {
      var player = {
         name: playerName,
         team: playerRepository.nextTeam(),
         dealerNumber: playerRepository.players.length
      };
      var existingPlayer = playerRepository.getPlayerByName(playerName);
      if(!existingPlayer){
         player.id = "player-" + (playerRepository.playerId++);
         playerRepository.players.push(player);
         return player;
      }
      else {
         throw existingPlayer;
      }
   };

   /**
   * Delete the player with the specified id
   * @returns the deleted player or null
   */
   playerRepository.delete = function(playerId) {
      for(var index = 0; index < playerRepository.players.length; index++) {
         if(playerId === playerRepository.players[index].id) {
            return playerRepository.players.splice(index, 1)[0];
         }
      }
      return null;
   };

   /**
   * Retrieve the player with the specified id
   * @returns the deleted player or null
   * @throws the playerId if it does not exist
   */
   playerRepository.getPlayer = function(playerId) {
      for(var index = 0; index < playerRepository.players.length; index++) {
         if(playerId === playerRepository.players[index].id) {
            return playerRepository.players[index];
         }
      }
      throw playerId;
   };

   playerRepository.reorderDealing = function(oldIndex, newIndex) {
      var player = playerRepository.players.splice(oldIndex, 1)[0];
      playerRepository.players.splice(newIndex, 0, player);
      for(var i = 0; i < playerRepository.players.length; i++) {
         playerRepository.players[i].dealerNumber = i;
      }
   };

   playerRepository.getAllPlayers = function() {
      return playerRepository.players;
   }
}));