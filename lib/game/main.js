ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.pirate',
	'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	scores:0,
	gravity: 300,
	instructText: new ig.Font( 'media/download.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		this.loadLevel(LevelPirate);
		
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		this.instructText.draw(this.scores, 800, 30, ig.Font.ALIGN.CENTER);
		
		// Add your own drawing code here
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2



ig.main( '#canvas', MyGame, 60, 900, 600, 1 );

});
