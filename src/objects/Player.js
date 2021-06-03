class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(700);
        this.setFriction(1,1);
        this.setMaxVelocity(600,600);

        this.setBodySize(this.body.width-20,this.body.height-20);
        this.setOffset(10, 20);
        this.jumping = false;

        /********** On définit les animations du joueur **********/
        this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end:  6}),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 19 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'turn',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 5
        });

        this.anims.create(
        {
            key: 'jumpLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 20, end: 22}),
            frameRate: 2
        });

        this.anims.create(
        {
            key: 'jumpRight',
            frames: this.anims.generateFrameNumbers('player', {start: 25, end: 23}),
            frameRate: 2
        });

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /********** Arrête le joueur **********/
    stop()
    {
        console.log("playerStop");
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


    /********** Déplace le joueur en fonction des directions données **********/
    move()
    {

        if(!Tableau.current.playerMoveStop)
        {
            //console.log("Tu peux bouger")
            switch (true)
            {
                case this._directionX < 0 && !this.jumping:
                    this.setVelocityX(-160);
                    this.anims.play('left', true);
                    break;
    
                case this._directionX > 0 && !this.jumping:
                    this.setVelocityX(160);
                    this.anims.play('right', true);
                    break;
    
                case this._directionX < 0 && this.jumping:
                    this.setVelocityX(-160);
                    this.anims.play('jumpLeft', true);
                    break;
                
                case this._directionX > 0 && this.jumping:
                    this.setVelocityX(160);
                    this.anims.play('jumpRight', true);
                    break;
    
                default:
                    this.setVelocityX(0);
                    this.anims.play('turn', true);
            }
    
            if(this._directionY<0)
            {
                if(this.body.blocked.down || this.body.touching.down)
                {
                    this.jumping = true;
                    this.setVelocityY(-700);
                }
            }
            else//(this._directionY == 0 && this._directionX == 0)
            {
                this.jumping = false;
            }

        }

    }

}
