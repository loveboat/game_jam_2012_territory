ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
animSheet: new ig.AnimationSheet( 'media/pirate.png', 60, 102 ),
size: {x: 60, y:102},
offset: {x: 0, y: 0},
maxVel: {x: 100, y: 200},
friction: {x: 600, y: 0},
accelGround: 400,
accelAir: 200,
jump: 160,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
init: function( x, y, settings ) {
	this.parent( x, y, settings );
	this.addAnim( 'idle', 1, [2,3] );
	this.addAnim( 'run', 0.5, [0,1] );
	this.addAnim( 'jump', 1, [3] );
	this.addAnim( 'fall', 1, [0] );

	this.itemT = new ig.Timer(2);
},

update: function() {
	// move left or right
	var accel = this.standing ? this.accelGround : this.accelAir;
	if( ig.input.state('left') ) {
		this.accel.x = -accel;
		this.flip = true;
		
	}
	else if( ig.input.state('right') ) {
		this.accel.x = accel;
		this.flip = false;
	}
	else {
		this.accel.x = 0;
	}
	// jump
	if( this.standing && ig.input.pressed('jump') ) {
		this.vel.y = -this.jump;
	}
	// move!
	this.currentAnim.flip.x = this.flip;
	
	// set the current animation, based on the player's speed
	if( this.vel.y < 0 ) {
	    this.currentAnim = this.anims.jump;
	}else if( this.vel.y > 0 ) {
	    this.currentAnim = this.anims.fall;
	}else if( this.vel.x != 0 ) {
	    this.currentAnim = this.anims.run;
	    
	}else{
	    this.currentAnim = this.anims.idle;
	}
	this.currentAnim.flip.x = this.flip;

	// spawn cannonball
	if (this.itemT.delta() > 0)
	{
		var posx = Math.floor((Math.random()*30)+1)*30;
		//console.log('fire');
		ig.game.spawnEntity( EntityBullet, posx, -50, {flip:this.flip} );
	
		this.itemT.set(1);
	}
	this.parent();
}
	
});


EntityBullet = ig.Entity.extend({
	size: {x: 47, y: 47},
	animSheet: new ig.AnimationSheet( 'media/bomb.png', 47, 47 ), 
	maxVel: {x: 0, y:200},
	type: ig.Entity.TYPE.B, checkAgainst: ig.Entity.TYPE.A, collides: ig.Entity.COLLIDES.PASSIVE,

init: function( x, y, settings ) {
	this.parent( x, y, settings );
	this.addAnim( 'idle', 1, [0] );
},

handleMovementTrace: function( res ) { 
	this.parent( res );
	if( res.collision.x || res.collision.y ){
		this.kill(); 
		  //console.log('floor'+(res.pos.x));
		ig.game.backgroundMaps[1].setTile( this.pos.x, this.pos.y+50, 0 );
		ig.game.collisionMap.setTile( this.pos.x, this.pos.y+50, 0 );
		
		ig.game.backgroundMaps[1].setTile( this.pos.x+30, this.pos.y+50, 0 );
		ig.game.collisionMap.setTile( this.pos.x+30, this.pos.y+50, 0 );  
  
		if (res.collision.y) {
			
			//ig.game.EntityPlayer.vel.y = -200; 
			//console.log('git');
			
		}	
	}
},
	
check: function( other ) {
	 //other.receiveDamage( 3, this );
	 ig.game.scores+=10;
	 this.kill();
	// console.log('guy');
}
});


});