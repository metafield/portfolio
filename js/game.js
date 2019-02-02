// START GAME
function startGame() {
  let canvas = document.getElementById("game-canvas"),
    c = canvas.getContext("2d");
  let innerWidth = window.innerWidth;
  let innerHeight = window.innerHeight;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.getElementById("game-canvas").style.display = "block";

  // AUDIO

  // MUSIC
  const music = new Audio();
  music.src = "/audio/racing-car.mp3";
  music.play();
  music.loop = true;
  music.controls = true;

  // GUN
  // creating channell to store many instances of the audio
  function Channel(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
  }

  Channel.prototype.play = function() {
    // Try refreshing the resource altogether
    this.resource.play();
  };

  function Switcher(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  let pew = new Switcher("audio/pew.mp3", 20);

  // EXPLOSION
  // creating channell to store many instances of the audio
  function Channel(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
  }

  Channel.prototype.play = function() {
    // Try refreshing the resource altogether
    this.resource.play();
  };

  function Switcher(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }

  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  };

  let explosion = new Switcher("audio/explosion.mp3", 5);

  // VARIABLES
  let score = 0,
    lastTime = 0;

  // KEYS EVENT LISTENERS
  addEventListener("mouseup", function() {
    fire();
    pew.play();
    setInterval;
  });

  window.addEventListener("mousemove", function(event) {
    player.x = event.clientX;
  });

  // PLAYER SETUP
  let player = {},
    player_width = 90,
    player_height = 95,
    player_img = new Image();
  player_img.src = "img/ship.svg";

  // CREATE PLAYER
  player = {
    width: player_width,
    height: player_height,
    x: innerWidth / 2 - player_width / 2,
    y: innerHeight - (player_height + 20),
    life: 10,
    draw: function() {
      if (this.x <= 0) {
        this.x = 0;
      } else if (this.x >= innerWidth - this.width) {
        this.x = innerWidth - this.width;
      }

      if (this.y <= 0) {
        this.y = 0;
      } else if (this.y >= innerHeight - this.height) {
        this.y = innerHeight - this.height;
      }

      c.drawImage(player_img, this.x, this.y, this.width, this.height);
    }
  };

  // ENEMY SETUP
  let enemyArray = [],
    enemyIndex = 0,
    enemy_width = 50,
    enemy_height = 50,
    enemy_timer = 500,
    enemy_img = new Image();
  enemy_img.src = "img/ufo.svg";

  // CREATE ENEMY OBJECT
  function enemy(x, y, dx, dy, enemy_img, enemy_width, enemy_height, rotation) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = enemy_img;
    this.width = enemy_width;
    this.height = enemy_height;
    this.rotation = rotation;
    enemyIndex++;
    enemyArray[enemyIndex] = this;
    this.id = enemyIndex;

    if (this.rotation < 0.2) {
      this.dx = -this.dx;
    } else if (this.rotation > 0.7) {
      this.dx = -this.dx;
    } else {
      this.dx = 0;
      this.dy = this.dy;
    }

    this.update = function() {
      this.y += this.dy;
      this.x += this.dx;

      if (this.x + this.width >= innerWidth) {
        this.dx = -this.dx;
      } else if (this.x <= 0) {
        this.dx = Math.abs(this.dx);
      }

      if (this.y > innerHeight + this.height) {
        this.delete();
      }

      this.draw();
    };

    this.delete = function() {
      delete enemyArray[this.id];
    };

    this.draw = function() {
      c.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }

  // CREATE ENEMY FUNCTION
  function create_enemy() {
    let x = Math.random() * (innerWidth - enemy_width);
    let y = -enemy_height;
    let dx = 3;
    let dy = 3;
    let rotation = Math.random();

    new enemy(x, y, dx, dy, enemy_img, enemy_width, enemy_height, rotation);
  }

  // BULLETS SETUP
  let bulletsArray = [],
    bulletIndex = 0,
    bullet_width = 8,
    bullet_height = 10,
    speed = 15;

  //CREATE BULLET OBJECT
  function bullet(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    bulletIndex++;
    bulletsArray[bulletIndex] = this;
    this.id = bulletIndex;

    this.update = function() {
      this.y += -this.speed;
      if (this.y < -this.height) {
        delete this.delete();
      }
      this.draw();
    };

    this.delete = function() {
      delete bulletsArray[this.id];
    };
    this.draw = function() {
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = "#fff";
      c.fill();
      c.stroke();
    };
  }

  // FIRE BULLETS
  function fire() {
    let x = player.x + player.width / 2 - bullet_width / 2;
    let y = player.y;
    new bullet(x, y, bullet_width, bullet_height, speed);
  }

  function enemyFire() {
    let x = enemy.x + enemy.width / 2 - bullet_width / 2;
    let y = enemy.y;
    new bullet(x, y, bullet_width, bullet_height, speed);
  }

  // COLLISION FUNCTION
  function collides(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // DETECT COLLISION
  function handleCollisions() {
    bulletsArray.forEach(function(bullet) {
      enemyArray.forEach(function(enemy) {
        if (collides(bullet, enemy)) {
          bullet.delete();
          enemy.delete();
          explosion.play();
          score += 10;
        }
      });
    });

    enemyArray.forEach(function(enemy) {
      if (collides(player, enemy)) {
        player.life += -2;
        enemy.delete();
      }
    });
  }
  // ANIMATION LOOP
  function animate(currentTime) {
    let animation = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // SCORE
    c.font = "18px MontSerrat";
    c.fillStyle = "#fff";
    c.fillText("SCORE: " + score, 10, 22);

    // PLAYER LIFE
    c.font = "18px MontSerrat";
    c.fillStyle = "#fff";
    c.fillText("Life: " + player.life, innerWidth - 108, 22);

    // DRAW PLAYER
    player.draw();

    // CREATE NEW ENEMY EVERY X SECONDS
    if (currentTime >= lastTime + enemy_timer) {
      lastTime = currentTime;
      create_enemy();
    }

    // UPDATE ENEMY POSITIONS
    enemyArray.forEach(function(enemy) {
      enemy.update();
    });

    // UPDATE BULLETS POSITIONS
    bulletsArray.forEach(function(bullet) {
      bullet.update();
    });

    // DETECT COLLISIONS
    handleCollisions();

    if (player.life <= 0) {
      cancelAnimationFrame(animation);
      console.log("You Lose");
      document.getElementById("game-canvas").style.display = "none";
      music.pause();
    }
  }
  animate();
}
