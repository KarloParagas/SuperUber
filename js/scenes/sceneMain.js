class SceneMain extends Phaser.Scene { //All properties and functions of Phaser.Scene is now inherited by SceneMain
    //This gets called as soon as the screen comes into existence
    constructor() {
        //super() calls the Phaser.Scene constructor
        super('SceneMain'); 
        //Note: The parameter has to match the class name
    }

    //This function is for loading all resources before using them
    //Ex: Images, sounds
    preload() {
        //Load images
        this.load.image('road', 'images/road.jpg');
        this.load.image('line', 'images/line.png');
        this.load.spritesheet('cars', 'images/cars.png', {frameWidth: 60, frameHeight: 126});
        this.load.image('pcar1', 'images/pcar1.png'); 
        this.load.image('pcar2', 'images/pcar2.png');
        this.load.image('cone', 'images/cone.png');
        this.load.image('barrier', 'images/barrier.png');
    }

    //This function is for defining objects
    //Ex: Spaceships, bullets
    create() {
        //Phaser.Events.EventEmitter() is a build in phaser function, that will allow global access to other parts of the game
        emitter = new Phaser.Events.EventEmitter();

        //Declare the instance of controller
        controller = new Controller(); //Note: The instance of the emitter HAS to exist before the controller can be used.

        this.scorebox = new ScoreBox({scene: this}); //Create an instance of scorebox
        this.scorebox.x = game.config.width - 55 ; //Put it in the center
        this.scorebox.y = 20; //Put it in the game,  50 pixels down from the top

        this.road = new Road({scene: this}); //Create an instance of road
        this.road.x = game.config.width / 2; //Put the road in the center       
        this.road.makeLines(); //Put it in the game, on top of the road image

        this.alignGrid = new AlignGrid({scene: this, rows: 5, cold: 5}); //Create an instance of grid
        this.alignGrid.showNumbers(); //Display the grid squares
        this.alignGrid.placeAtIndex(4, this.scorebox); //Place the scoreboard according to the grid square index/number
    }

    //This function is a contant running loop. Anything that needs to be checked over and over
    //Ex: Collision, constantly update something
    update() {
        //Simulate movement of the lines so it looks like the car sprites (when added) are driving through the road
        this.road.moveLines();

        this.road.moveObject();
    }

    /*
        Note:
        preload(), create(), and update() are the main functions, but you can also have custom/helper functions
        to help achieve whats needed
    */
}