class MonsterMouvant extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre-mouvant");
        //pas de gravité
        this.body.allowGravity=false;
        this.setCollideWorldBounds(true);
        this.setBodySize(this.body.width-20,this.body.height-15);
//définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-20;
        this.maxX=x+650;

        // Y
        this.originalY=y;
        this.minY=y -64;
        this.maxY=height-128;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*3000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })

    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 5000,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
               
           }
        });
    }

    update(){
        //fait changer de sens
        if(this.body){
            if(this.body.velocity.x<0){
                this.flipX=true;
            }else{
                this.flipX=true;
            }
        }

    }


}
