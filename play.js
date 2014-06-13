var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() { 
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this); 

        this.pipes = game.add.group();
        this.pipes.createMultiple(1, 'logopipe');
        this.pipes.createMultiple(4, 'pipe');
        this.pipes.createMultiple(2, 'logopipe');
        this.pipes.createMultiple(4, 'pipe');
        this.pipes.createMultiple(1, 'logopipe');
        this.pipes.createMultiple(8, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);           

        this.bird = this.game.add.sprite(100, 245, 'coli');
        this.bird.body.gravity.y = 1150; 
        this.bird.anchor.setTo(-0.2, 0.5);

        // No 'this.score', but just 'score'
        score = 0; 
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20, 20, "0", style);
        this.label_high_score_title = this.game.add.text(300, 20, "HI:", style);   
        this.label_high_score = this.game.add.text(350, 20, high_score, style);

        this.jump_sound = this.game.add.audio('jump');


        canvas = game.add.graphics(0,0);
    },

    update: function() {
        canvas.clear();
        canvas.lineStyle(2,0x00ff00,1);
        var headX=this.bird.x;
        var headY=this.bird.y;
        nodes[0]={
            x:headX,
            y:headY
        };

        for(i=1;i<tailNodes-1;i++){
            var nodeAngle = Math.atan2(nodes[i].y-nodes[i-1].y,nodes[i].x-nodes[i-1].x);
            nodes[i]={
                x: nodes[i-1].x-0.4+tailLength*Math.cos(nodeAngle),
                y: nodes[i-1].y+tailLength*Math.sin(nodeAngle) 
            }
            canvas.lineTo(nodes[i].x,nodes[i].y);
        }

        if (this.bird.inWorld == false)
            this.restart_game(); 

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);      
    },

    jump: function() {
        if (this.bird.alive == false)
            return; 

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
        console.log(this.bird.y);
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        if (score > high_score){
          high_score = score;
          this.label_high_score.content = high_score;  
      }

      this.pipes.forEachAlive(function(p){
        p.body.velocity.x = 0;
    }, this);
  },

  restart_game: function() {
    this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200; 
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.add_one_pipe(400, i*60+10);   

        // No 'this.score', but just 'score'
        score += 1; 
        this.label_score.content = score;  
    }
};