var load_state = {
	    preload: function() { 
		this.game.stage.backgroundColor = '#71c5cf';

    	// Load the bird sprite
    	this.game.load.image('coli', 'assets/coli.png');
    	this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};