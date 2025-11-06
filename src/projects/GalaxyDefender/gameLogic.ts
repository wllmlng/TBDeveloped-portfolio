import backgroundImg from '../../assets/galaxydefender/images/bg_vert.png';
import shipImg from '../../assets/galaxydefender/images/ship/PlayerRed_Frame_01_55.png';
import shipLeftImg from '../../assets/galaxydefender/images/ship/PlayerRed_Frame_55_left.png';
import shipRightImg from '../../assets/galaxydefender/images/ship/PlayerRed_Frame_55_right.png';
import accelImg from '../../assets/galaxydefender/images/ship/Exhaust_Frame_05.png';
import blasterImg from '../../assets/galaxydefender/images/blaster/laserBlue01.png';
import enemy1Img from '../../assets/galaxydefender/images/enemy/skullBoss_70.png';
import zapperImg from '../../assets/galaxydefender/images/blaster/Laser_Small_green.png';
import spiderBossImg from '../../assets/galaxydefender/images/boss/spiderBoss.png';
import shipExplode2Img from '../../assets/galaxydefender/images/ship/Explosion01_Frame_09_png_processed.png';

import blasterSound from '../../assets/galaxydefender/audio/newNewFrostArrow.mp3';
import enemyDestroyedSound from '../../assets/galaxydefender/audio/sunstrike_new.mp3';
import shipDestroyedSound from '../../assets/galaxydefender/audio/Necrophos_Ghost_Shroud.mp3.mp3';
import musicSound from '../../assets/galaxydefender/audio/slipknot-background-music.mp3';

interface Drawable {
  x: number;
  y: number;
  itemWidth: number;
  itemHeight: number;
  pixelSpeed: number;
  canvasWidth: number;
  canvasHeight: number;
  collidableWith?: string;
  collidableWith2?: string;
  isColliding: boolean;
  type: string;
  context: CanvasRenderingContext2D;
}

interface Bound {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MOVE_DIR = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
  space: 'Space'
};

const KEY_PRESS = {
  left: false,
  right: false,
  up: false,
  down: false,
  space: false
};

class Background implements Drawable {
  x: number = 0;
  y: number = 0;
  itemWidth: number = 0;
  itemHeight: number = 0;
  pixelSpeed: number = 1;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  isColliding: boolean = false;
  type: string = 'background';
  context: CanvasRenderingContext2D;
  private image: HTMLImageElement;

  constructor(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.image = new Image();
    this.image.src = backgroundImg;
  }

  initialize(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.y += this.pixelSpeed;
    this.context.drawImage(this.image, this.x, this.y);
    this.context.drawImage(this.image, this.x, this.y - this.canvasHeight);
    if (this.y >= this.canvasHeight) {
      this.y = 0;
    }
  }
}

class Blaster implements Drawable {
  x: number = 0;
  y: number = 0;
  itemWidth: number = 0;
  itemHeight: number = 0;
  pixelSpeed: number = 0;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  collidableWith?: string;
  isColliding: boolean = false;
  type: string;
  context: CanvasRenderingContext2D;
  fired: boolean = false;
  speed: number = 0;
  private team: string;
  private blasterImage: HTMLImageElement;
  private zapperImage: HTMLImageElement;

  constructor(team: string, context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.team = team;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.type = team === 'blaster' ? 'bullet' : 'enemyBullet';
    this.collidableWith = team === 'blaster' ? 'enemy' : 'ship';
    
    this.blasterImage = new Image();
    this.blasterImage.src = blasterImg;
    this.zapperImage = new Image();
    this.zapperImage.src = zapperImg;
  }

  initialize(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.itemWidth = width;
    this.itemHeight = height;
  }

  create(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = this.team === 'blaster' ? 10 : 5;
    this.fired = true;
  }

  draw(): boolean {
    this.context.clearRect(this.x, this.y, this.itemWidth, this.itemHeight);
    this.team === 'blaster' ? this.y -= this.speed : this.y += this.speed;

    if (this.isColliding === true) {
      return true;
    } else if (this.team === 'blaster' && this.y <= 0) {
      this.resetBulletObj();
    } else if (this.team === 'zapper' && this.y >= this.canvasHeight) {
      this.resetBulletObj();
    } else {
      const img = this.team === 'zapper' ? this.zapperImage : this.blasterImage;
      this.context.drawImage(img, this.x, this.y);
    }
    return false;
  }

  resetBulletObj() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.fired = false;
    this.isColliding = false;
  }
}

class AmmoSupply {
  private pool: (Blaster | Enemy)[] = [];
  private bulletAmt: number = 50;

  initialize(team: string, context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    if (team === 'blaster') {
      for (let i = 0; i < this.bulletAmt; i++) {
        const bullet = new Blaster('blaster', context, canvasWidth, canvasHeight);
        bullet.initialize(0, 0, 10, 30);
        this.pool.push(bullet);
      }
    } else if (team === 'enemyShip') {
      for (let i = 0; i < this.bulletAmt; i++) {
        const enemy = new Enemy('enemyShip', context, canvasWidth, canvasHeight);
        enemy.initialize(0, 0, 70, 70);
        this.pool.push(enemy);
      }
    } else if (team === 'zapper') {
      for (let i = 0; i < this.bulletAmt; i++) {
        const zap = new Blaster('zapper', context, canvasWidth, canvasHeight);
        zap.initialize(0, 0, 10, 30);
        this.pool.push(zap);
      }
    } else if (team === 'enemyBoss') {
      const boss = new Enemy('enemyBoss', context, canvasWidth, canvasHeight);
      boss.initialize(0, 0, 150, 150);
      this.pool.push(boss);
    }
  }

  getPool(): (Blaster | Enemy)[] {
    const obj: (Blaster | Enemy)[] = [];
    for (let i = 0; i < this.pool.length; i++) {
      if (this.pool[i].fired) {
        obj.push(this.pool[i]);
      }
    }
    return obj;
  }

  shoot(x: number, y: number) {
    const lastShot = this.pool[this.pool.length - 1];
    if (lastShot && lastShot.fired === false) {
      const item = this.pool.pop()!;
      item.create(x, y);
      this.pool.unshift(item);
    }
  }

  shootTwo(x1: number, y1: number, x2: number, y2: number) {
    const lastShot = this.pool[this.pool.length - 1];
    const twoLastShot = this.pool[this.pool.length - 2];
    if (lastShot && twoLastShot && lastShot.fired === false && twoLastShot.fired === false) {
      this.shoot(x1, y1);
      this.shoot(x2, y2);
    }
  }

  animateFiring() {
    for (let i = 0; i < this.bulletAmt; i++) {
      if (this.pool[i] === undefined) {
        break;
      } else if (this.pool[i].fired === true) {
        if (this.pool[i].draw() === true) {
          this.pool[i].resetBulletObj();
          this.pool.push(this.pool.splice(i, 1)[0]);
        }
      }
    }
  }
}

class Ship implements Drawable {
  x: number = 0;
  y: number = 0;
  itemWidth: number = 0;
  itemHeight: number = 0;
  pixelSpeed: number = 0;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  collidableWith?: string = 'enemyBullet';
  collidableWith2?: string = 'enemy';
  isColliding: boolean = false;
  type: string = 'ship';
  context: CanvasRenderingContext2D;
  thrust: boolean = false;
  shipLost: boolean = false;
  speed: number = 4;
  ammoSupply: AmmoSupply;
  private shipImage: HTMLImageElement;
  private shipLeftImage: HTMLImageElement;
  private shipRightImage: HTMLImageElement;
  private accelImage: HTMLImageElement;
  private shipExplodeImage: HTMLImageElement;
  private fireCoolDown: number = 30;
  private coolDownCounter: number = 0;
  private blasterAudio: HTMLAudioElement;
  private shipDestroyedAudio: HTMLAudioElement;

  constructor(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ammoSupply = new AmmoSupply();
    
    this.shipImage = new Image();
    this.shipImage.src = shipImg;
    this.shipLeftImage = new Image();
    this.shipLeftImage.src = shipLeftImg;
    this.shipRightImage = new Image();
    this.shipRightImage.src = shipRightImg;
    this.accelImage = new Image();
    this.accelImage.src = accelImg;
    this.shipExplodeImage = new Image();
    this.shipExplodeImage.src = shipExplode2Img;

    this.blasterAudio = new Audio(blasterSound);
    this.blasterAudio.volume = 0.5;
    this.shipDestroyedAudio = new Audio(shipDestroyedSound);
    this.shipDestroyedAudio.volume = 0.5;
    this.shipDestroyedAudio.loop = false;
  }

  initialize(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.itemWidth = width;
    this.itemHeight = height;
  }

  accelAnim() {
    if (this.thrust === true) {
      this.context.drawImage(this.accelImage, this.x + 15, this.y + 39, 35, 40);
      this.context.drawImage(this.accelImage, this.x + 4, this.y + 39, 35, 40);
    }
  }

  draw(currentImage?: HTMLImageElement) {
    if (this.isColliding === false) {
      const imageToUse = currentImage || this.shipImage;
      this.context.drawImage(imageToUse, this.x, this.y);
    } else {
      if (this.shipLost === false) {
        this.shipDestroyedAudio.play();
      }
      this.shipLost = true;
      this.context.clearRect(this.x, this.y, this.itemWidth, this.itemHeight);
      this.context.drawImage(this.shipExplodeImage, this.x, this.y);
    }
  }

  move(currentImage?: HTMLImageElement) {
    this.coolDownCounter += 1;
    if (this.isColliding === false) {
      if (KEY_PRESS.left || KEY_PRESS.right || KEY_PRESS.down || KEY_PRESS.up) {
        this.context.clearRect(this.x, this.y, this.itemWidth, this.itemHeight);

        if (KEY_PRESS.left) {
          this.x <= 0 ? (this.x = 0) : (this.x -= this.speed);
        }
        if (KEY_PRESS.right) {
          this.x >= this.canvasWidth - this.itemWidth
            ? (this.x = this.canvasWidth - this.itemWidth)
            : (this.x += this.speed);
        }
        if (KEY_PRESS.up) {
          this.y <= 0 ? (this.y = 0) : (this.y -= this.speed);
          if (this.isColliding === false) this.accelAnim();
        }
        if (KEY_PRESS.down) {
          this.y >= this.canvasHeight - this.itemHeight
            ? (this.y = this.canvasHeight - this.itemHeight)
            : (this.y += this.speed);
        }

        if (this.isColliding === false) {
          this.draw(currentImage);
        }
      }
    }
    if (KEY_PRESS.space && this.coolDownCounter >= this.fireCoolDown && !this.isColliding) {
      this.fire();
      this.blasterAudio.load();
      this.blasterAudio.play();
      this.coolDownCounter = 0;
    }
  }

  fire() {
    this.ammoSupply.shootTwo(this.x + 8, this.y, this.x + 35, this.y);
  }
}

class Enemy implements Drawable {
  x: number = 0;
  y: number = 0;
  itemWidth: number = 0;
  itemHeight: number = 0;
  pixelSpeed: number = 0;
  canvasWidth: number = 0;
  canvasHeight: number = 0;
  collidableWith?: string = 'bullet';
  isColliding: boolean = false;
  type: string = 'enemy';
  context: CanvasRenderingContext2D;
  fired: boolean = false;
  speed: number = 0;
  speedX: number = 0;
  speedY: number = 0;
  leftBorder: number = 0;
  rightBorder: number = 0;
  bottomBorder: number = 0;
  topBorder: number = 0;
  private monster: string;
  private randomFire: number = 0.01;
  private enemy1Image: HTMLImageElement;
  private spiderBossImage: HTMLImageElement;
  private enemyDestroyedAudio: HTMLAudioElement;
  private enemyAmmo?: AmmoSupply;

  constructor(monster: string, context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    this.monster = monster;
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    this.enemy1Image = new Image();
    this.enemy1Image.src = enemy1Img;
    this.spiderBossImage = new Image();
    this.spiderBossImage.src = spiderBossImg;
    this.enemyDestroyedAudio = new Audio(enemyDestroyedSound);
    this.enemyDestroyedAudio.volume = 0.5;
  }

  initialize(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.itemWidth = width;
    this.itemHeight = height;
  }

  create(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.speedX = 6;
    this.speedY = 1;
    this.fired = true;
    this.leftBorder = this.x - 750;
    this.rightBorder = this.x - 330;
    this.bottomBorder = this.y + 300;
    this.topBorder = this.y + 200;
  }

  setEnemyAmmo(enemyAmmo: AmmoSupply) {
    this.enemyAmmo = enemyAmmo;
  }

  draw(): boolean {
    this.context.clearRect(this.x, this.y, this.itemWidth, this.itemHeight);
    this.x -= this.speedX;
    this.y += this.speedY;
    
    if (this.x === this.leftBorder) {
      this.speedX = -3;
      this.speedY = -1;
    }
    if (this.x === this.rightBorder) {
      this.speedX = 1;
    }
    if (this.y === this.topBorder) {
      this.speedY = 1;
    }
    if (this.y === this.bottomBorder) {
      this.speedY = -1;
    }

    if (this.isColliding === false) {
      if (this.monster === 'enemyShip') {
        this.context.drawImage(this.enemy1Image, this.x, this.y);
      } else if (this.monster === 'enemyBoss') {
        this.context.drawImage(this.spiderBossImage, this.x, this.y);
      }

      const chanceOfFire = Math.floor(Math.random() * 101);
      if (chanceOfFire / 100 < this.randomFire && this.enemyAmmo) {
        this.fire();
      }
    } else {
      this.enemyDestroyedAudio.load();
      this.enemyDestroyedAudio.play();
      return true;
    }
    return false;
  }

  fire() {
    if (this.enemyAmmo) {
      this.enemyAmmo.shoot(this.x + 30, this.y + 40);
    }
  }

  resetBulletObj() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.fired = false;
    this.isColliding = false;
  }
}

class QuadTree {
  private bound: Bound;
  private maxObjects: number = 10;
  private maxLevels: number = 5;
  private level: number;
  private objects: Drawable[] = [];
  private nodes: QuadTree[] = [];

  constructor(bound: Bound, level: number = 0) {
    this.bound = bound;
    this.level = level;
  }

  clear() {
    this.objects = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i] != null) {
        this.nodes[i].clear();
      }
    }
    this.nodes = [];
  }

  split() {
    const subWidth = this.bound.width / 2;
    const subHeight = this.bound.height / 2;

    this.nodes[0] = new QuadTree(
      {
        x: this.bound.x + subWidth,
        y: this.bound.y,
        width: subWidth,
        height: subHeight
      },
      this.level + 1
    );
    this.nodes[1] = new QuadTree(
      {
        x: this.bound.x,
        y: this.bound.y,
        width: subWidth,
        height: subHeight
      },
      this.level + 1
    );
    this.nodes[2] = new QuadTree(
      {
        x: this.bound.x,
        y: this.bound.y + subHeight,
        width: subWidth,
        height: subHeight
      },
      this.level + 1
    );
    this.nodes[3] = new QuadTree(
      {
        x: this.bound.x + subWidth,
        y: this.bound.y + subHeight,
        width: subWidth,
        height: subHeight
      },
      this.level + 1
    );
  }

  getAllObjects(returnedObjects: Drawable[]): Drawable[] {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].getAllObjects(returnedObjects);
    }
    for (let i = 0; i < this.objects.length; i++) {
      returnedObjects.push(this.objects[i]);
    }
    return returnedObjects;
  }

  retrieve(returnedObjects: Drawable[], obj: Drawable): Drawable[] {
    if (typeof obj === 'undefined') {
      return returnedObjects;
    }
    const index = this.getIndex(obj);
    if (index !== -1 && this.nodes.length) {
      this.nodes[index].retrieve(returnedObjects, obj);
    }
    for (let i = 0; i < this.objects.length; i++) {
      returnedObjects.push(this.objects[i]);
    }
    return returnedObjects;
  }

  insert(obj: Drawable | Drawable[]) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        this.insert(obj[i]);
      }
      return;
    }

    if (this.nodes[0] != null) {
      const index = this.getIndex(obj);
      if (index !== -1) {
        this.nodes[index].insert(obj);
        return;
      }
    }

    this.objects.push(obj);

    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      if (this.nodes[0] == null) {
        this.split();
      }
      let i = 0;
      while (i < this.objects.length) {
        const index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  getIndex(obj: Drawable): number {
    let index = -1;
    const verticalMidpoint = this.bound.x + this.bound.width / 2;
    const horizontalMidpoint = this.bound.y + this.bound.height / 2;

    const topQuadrant = obj.y < horizontalMidpoint && obj.y + obj.itemHeight < horizontalMidpoint;
    const bottomQuadrant = obj.y > horizontalMidpoint;

    if (obj.x < verticalMidpoint && obj.x + obj.itemWidth < verticalMidpoint) {
      if (topQuadrant) {
        index = 1;
      } else if (bottomQuadrant) {
        index = 2;
      }
    } else if (obj.x > verticalMidpoint) {
      if (topQuadrant) {
        index = 0;
      } else if (bottomQuadrant) {
        index = 3;
      }
    }
    return index;
  }
}

export class Game {
  private bgCanvas: HTMLCanvasElement;
  private mainCanvas: HTMLCanvasElement;
  private shipCanvas: HTMLCanvasElement;
  private bgContext: CanvasRenderingContext2D;
  private mainContext: CanvasRenderingContext2D;
  private shipContext: CanvasRenderingContext2D;
  private background: Background;
  private ship: Ship;
  private enemyShip: AmmoSupply;
  private spiderBoss: AmmoSupply;
  private enemyAmmo: AmmoSupply;
  private quadTree: QuadTree;
  private animationId: number | null = null;
  private keyDownHandler: (e: KeyboardEvent) => void;
  private keyUpHandler: (e: KeyboardEvent) => void;
  private setGameOver: (gameOver: boolean) => void;
  private setScore: (score: number) => void;
  playerScore: number = 0;
  private music: HTMLAudioElement;
  private currentShipImage: HTMLImageElement;

  constructor(
    bgCanvas: HTMLCanvasElement,
    mainCanvas: HTMLCanvasElement,
    shipCanvas: HTMLCanvasElement,
    setGameOver: (gameOver: boolean) => void,
    setScore: (score: number) => void
  ) {
    this.bgCanvas = bgCanvas;
    this.mainCanvas = mainCanvas;
    this.shipCanvas = shipCanvas;
    this.setGameOver = setGameOver;
    this.setScore = setScore;

    this.bgContext = bgCanvas.getContext('2d')!;
    this.mainContext = mainCanvas.getContext('2d')!;
    this.shipContext = shipCanvas.getContext('2d')!;

    this.background = new Background(this.bgContext, bgCanvas.width, bgCanvas.height);
    this.ship = new Ship(this.shipContext, shipCanvas.width, shipCanvas.height);
    this.enemyShip = new AmmoSupply();
    this.spiderBoss = new AmmoSupply();
    this.enemyAmmo = new AmmoSupply();

    this.quadTree = new QuadTree({
      x: 0,
      y: 0,
      width: mainCanvas.width,
      height: mainCanvas.height
    });

    this.music = new Audio(musicSound);
    this.music.volume = 0.3;
    this.music.loop = true;

    this.currentShipImage = new Image();
    this.currentShipImage.src = shipImg;

    this.keyDownHandler = this.onKeyPress.bind(this);
    this.keyUpHandler = this.onKeyUp.bind(this);
  }

  initialize() {
    this.background.initialize(0, 0);

    this.ship.ammoSupply.initialize('blaster', this.mainContext, this.mainCanvas.width, this.mainCanvas.height);

    const shipStartPosX = this.shipCanvas.width / 2 - 55 / 2;
    const shipStartPosY = this.shipCanvas.height / 2 + 150;
    this.ship.initialize(shipStartPosX, shipStartPosY, 55, 75);

    this.enemyShip.initialize('enemyShip', this.mainContext, this.mainCanvas.width, this.mainCanvas.height);
    this.spiderBoss.initialize('enemyBoss', this.mainContext, this.mainCanvas.width, this.mainCanvas.height);
    this.enemyAmmo.initialize('zapper', this.mainContext, this.mainCanvas.width, this.mainCanvas.height);

    const enemyPool = this.enemyShip.getPool();
    enemyPool.forEach((enemy) => {
      if (enemy instanceof Enemy) {
        enemy.setEnemyAmmo(this.enemyAmmo);
      }
    });

    this.formation1();

    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);

    this.music.load();
    this.music.play();
  }

  formation1() {
    let x = 650;
    let y = -10;
    const spacer = y * 7;
    for (let i = 1; i <= 18; i++) {
      this.enemyShip.shoot(x, y);
      x += 70 + 25;
      if (i % 6 === 0) {
        x -= 400;
        y += spacer;
      }
    }
  }

  start() {
    this.animate();
  }

  private animate = () => {
    this.setScore(this.playerScore);
    this.quadTree.clear();
    this.quadTree.insert(this.ship);
    this.quadTree.insert(this.ship.ammoSupply.getPool());
    this.quadTree.insert(this.enemyShip.getPool());
    this.quadTree.insert(this.enemyAmmo.getPool());
    this.detectCollision();

    this.background.draw();
    this.ship.accelAnim();
    this.ship.draw(this.currentShipImage);
    this.ship.move(this.currentShipImage);
    this.ship.ammoSupply.animateFiring();

    this.enemyShip.animateFiring();
    this.spiderBoss.animateFiring();
    this.enemyAmmo.animateFiring();

    if (this.enemyShip.getPool().length === 0) {
      this.formation1();
    }

    if (this.ship.isColliding) {
      this.gameOver();
      return;
    }

    this.animationId = window.requestAnimationFrame(this.animate);
  };

  private detectCollision() {
    const objects: Drawable[] = [];
    this.quadTree.getAllObjects(objects);
    for (let x = 0; x < objects.length; x++) {
      const obj: Drawable[] = [];
      this.quadTree.retrieve(obj, objects[x]);

      for (let y = 0; y < obj.length; y++) {
        if (
          objects[x].collidableWith === obj[y].type &&
          objects[x].x < obj[y].x + obj[y].itemWidth &&
          objects[x].x + objects[x].itemWidth > obj[y].x &&
          objects[x].y < obj[y].y + obj[y].itemHeight &&
          objects[x].y + objects[x].itemHeight > obj[y].y
        ) {
          objects[x].isColliding = true;
          obj[y].isColliding = true;
          
          if (obj[y].type === 'enemy') {
            this.playerScore += 10;
          }
        }
        if (
          objects[x].collidableWith2 === obj[y].type &&
          objects[x].x < obj[y].x + obj[y].itemWidth &&
          objects[x].x + objects[x].itemWidth > obj[y].x &&
          objects[x].y < obj[y].y + obj[y].itemHeight &&
          objects[x].y + objects[x].itemHeight > obj[y].y
        ) {
          objects[x].isColliding = true;
        }
      }
    }
  }

  private onKeyPress(e: KeyboardEvent) {
    const key = e.code;
    if (key === MOVE_DIR.left) {
      e.preventDefault();
      KEY_PRESS.left = true;
      this.currentShipImage.src = shipLeftImg;
    } else if (key === MOVE_DIR.right) {
      e.preventDefault();
      KEY_PRESS.right = true;
      this.currentShipImage.src = shipRightImg;
    } else if (key === MOVE_DIR.up) {
      e.preventDefault();
      KEY_PRESS.up = true;
      this.ship.thrust = true;
    } else if (key === MOVE_DIR.down) {
      e.preventDefault();
      KEY_PRESS.down = true;
    } else if (key === MOVE_DIR.space) {
      e.preventDefault();
      KEY_PRESS.space = true;
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    const key = e.code;
    if (key === MOVE_DIR.left) {
      this.currentShipImage.src = shipImg;
      KEY_PRESS.left = false;
    } else if (key === MOVE_DIR.right) {
      this.currentShipImage.src = shipImg;
      KEY_PRESS.right = false;
    } else if (key === MOVE_DIR.up) {
      KEY_PRESS.up = false;
      this.ship.thrust = false;
    } else if (key === MOVE_DIR.down) {
      KEY_PRESS.down = false;
    } else if (key === MOVE_DIR.space) {
      KEY_PRESS.space = false;
    }
  }

  gameOver() {
    this.music.pause();
    this.setGameOver(true);
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }
  }

  restart() {
    this.setGameOver(false);
    this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
    this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
    this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.playerScore = 0;
    this.ship.isColliding = false;
    this.ship.shipLost = false;
    this.initialize();
  }

  toggleMusic() {
    if (this.music.muted) {
      this.music.muted = false;
    } else {
      this.music.muted = true;
    }
  }

  cleanup() {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    this.music.pause();
  }
}
