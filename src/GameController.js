export class GameController {
  _user1 = {
    lastSpell: 0,
    x: 100,
    y: window.innerHeight / 2,
    color: "red",
    speed: -0.3,
    hits: 0,
    spell: {
      color: "yellow",
      speed: 0.3,
      intensive: 1,
      position: [],
    },
  };
  _user2 = {
    lastSpell: 0,
    x: window.innerWidth - 100,
    y: window.innerHeight / 2,
    color: "blue",
    speed: 0.3,
    hits: 0,
    spell: {
      color: "green",
      speed: 0.3,
      intensive: 1,
      position: [],
    },
  };

  positionMouse = [0, 0];
  userRadius = 50;
  spellRadius = 20;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
  }


    setUser1Speed(value) {
     this._user1.speed = value;

    }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.userFigure(this._user2);
    this.userFigure(this._user1);
    this.renderSpells(this._user1);
    this.renderSpells(this._user2);
  }

  renderSpells(user) {
    for (let el of user.spell.position) {
      this.spellFigure(user.spell.color, el[0], el[1]);
    }
  }

  gameState(delta) {
    this.upDateUser(delta, this._user1);
    this.upDateUser(delta, this._user2);
    this.createSpell(this._user1);
    this.createSpell(this._user2);
    this.updateSpell(this._user1, "right", delta);
    this.updateSpell(this._user2, "left", delta);
  }

  upDateUser(delta, user) {
    this.checkTouchBorder(user);
    this.checkMouseCollision(user);
    user.y += user.speed * delta;
  }

  createSpell(user) {
    const timestamp = Date.now();
    if (timestamp - user.lastSpell > 1000 / user.spell.intensive) {
      user.spell.position.push([user.x, user.y]);
      user.lastSpell = timestamp;
    }
  }
  updateSpell(user, direction, delta) {
    this.checkTouchBorderSpell(user);
    this.checkHitsSpellUser(user);
    for (let el of user.spell.position) {
      if (direction === "right") el[0] += user.spell.speed * delta;
      else el[0] -= user.spell.speed * delta;
    }
  }

  userFigure(user) {
    this.ctx.beginPath();
    this.ctx.arc(user.x, user.y, this.userRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = user.color;
    this.ctx.fill();
  }

  checkTouchBorder(user) {
    if (
      user.y + user.speed > window.innerHeight - this.userRadius ||
      user.y + user.speed < this.userRadius
    ) {
      user.speed = -user.speed;
    }
  }

  checkMouseCollision(user) {
    let distance = Math.sqrt(
      Math.pow(user.x - this.positionMouse[0], 2) +
        Math.pow(user.y - this.positionMouse[1], 2)
    );
    if (distance < this.userRadius) {
      user.speed = -user.speed;
    }
  }

  spellFigure(color, x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.spellRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  checkTouchBorderSpell(user) {
    for (let i = 0; i < user.spell.position.length; i++) {
      if (
        user.spell.position[i][0] < 0 ||
        user.spell.position[i][0] > window.innerWidth
      ) {
        user.spell.position.splice(i, 1);
      }
    }
  }

  checkHitsSpellUser(user) {
    for (let i = 0; i < user.spell.position.length; i++) {
      let distance1 = Math.sqrt(
        Math.pow(this._user1.x - user.spell.position[i][0], 2) +
          Math.pow(this._user1.y - user.spell.position[i][1], 2)
      );
      let distance2 = Math.sqrt(
        Math.pow(this._user2.x - user.spell.position[i][0], 2) +
          Math.pow(this._user2.y - user.spell.position[i][1], 2)
      );
      if (
        (distance2 < 70 && this._user2.y != user.y) ||
        (distance1 < 70 && this._user1.y != user.y)
      ) {
        user.spell.position.splice(i, 1);
        user.hits++;
      }
    }
  }
}
