class Level1 extends Tableau{

  preload() {
    super.preload();
    // ------pour TILED-------------
    // nos images
    this.load.image('tiles', 'assets/toto/Tuiles/levelSets.png');
    //les données du tableau qu'on a créé dans TILED
    this.load.tilemapTiledJSON('map', 'assets/toto/Level0.json');


    //atlas de texture généré avec https://free-tex-packer.com/app/
    //on y trouve notre étoiles et une tête de mort
    //this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
}

create() {
  super.create();

  //on en aura besoin...
  let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------
        
        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('levelSets', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //---- ajoute les plateformes simples ----------------------------


        this.background = this.map.createLayer('background', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.fond = this.map.createLayer('fond', this.tileset, 0, 0);
        this.assets = this.map.createLayer('assets', this.tileset, 0, 0);
        this.arbres = this.map.createLayer('arbres', this.tileset, 0, 0);
        this.devant = this.map.createLayer('devant', this.tileset, 0, 0);
        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        this.jump = this.map.createLayer('jump', this.tileset, 0, 0);

        this.jumpPad = this.physics.add.sprite(6155,815,'star');
        this.jumpPad.body.allowGravity=false;
        this.jumpPad.body.immovable=true;
        this.jumpPad.scaleX = 5;


     
     
    



        //on définit les collisions, plusieurs méthodes existent:

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.solides.setCollisionByProperty({ collides: true });
        //this.lave.setCollisionByProperty({ collides: true });
        
          //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.solides);
        this.physics.add.collider(this.player, this.jumpPad);
        this.devant.setDepth(7);
        this.arbres.setDepth(6);
        this.player.setDepth(5);
        this.assets.setDepth(4);
        this.fond.setDepth(3);
        this.background.setDepth(1);


        const spawnPoint = this.map.findObject("point", obj => obj.name === "Player");

        this.player.setPosition(spawnPoint.x, spawnPoint.y);


        /*
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('final', 'tiles');
        this.background = this.map.createLayer('Calque Tuiles décorative', this.tileset, 0, 0);
        this.player.setDepth(10000);
        this.platforms = this.map.createLayer('Calque Tuiles solide', this.tileset, 0, 0);
        this.platforms.setCollisionByExclusion(-1,true);
        this.star1=this.physics.add.sprite(800,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.star1);
        this.physics.add.collider(this.star1, this.platforms);
*/
        //this.derriere.setDepth(z--);
 

          }

          
          

          
}
