var load_state = {
	    preload: function() { 
		//this.game.stage.backgroundColor = '#71c5cf';
        this.game.stage.backgroundColor = '#000000';


    	// Load the bird sprite
    	this.game.load.image('coli', 'assets/coli.png');
    	this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('logopipe', 'assets/logopipe.png');
        this.game.load.audio('music', 'assets/The Builder.mp3'); 

        for (i=0; i<tailNodes; i++) {
                            nodes[i]={
                             x:0,
                             y:0
                        };
                        };
        for (i=0; i<tailNodes2; i++) {
                            nodes2[i]={
                             x:0,
                             y:0
                        };
                        };
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
        this.music_sound = this.game.add.audio('music');
    }
};