import React, { Component } from "react";
import SideNavMaterialUI from "./SideNavMaterialUI";
import P5Wrapper from "react-p5-wrapper";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      x: 50,
      y: 50,
      numBalls: 11,
      spring: 0.05,
      gravity: 0,
      friction: 0.5,
      balls: []
    };

    this.sketch = p => {
      const { numBalls, spring, gravity, friction, balls } = this.state;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        // p.background(100);
        for (let i = 0; i < numBalls; i++) {
          balls[i] = new Ball(
            p.random(p.width),
            p.random(p.height),
            p.random(100, 170),
            i,
            balls
          );
        }
        // p.noStroke();
        p.stroke(100, 181, 246, 255);
        p.strokeWeight(3);
        p.fill(100, 181, 246, 220);
      };

      p.draw = () => {
        p.background(121, 134, 203);
        // p.background(100, 181, 246, 1); // VERY VERY VERY INTERSTING
        balls.forEach(ball => {
          ball.collide();
          ball.move();
          ball.display();
        });
      };

      class Ball {
        constructor(xin, yin, din, idin, oin) {
          this.x = xin;
          this.y = yin;
          this.vx = 0;
          this.vy = 0;
          this.diameter = din;
          this.id = idin;
          this.others = oin;
        }

        collide() {
          for (let i = this.id + 1; i < numBalls; i++) {
            // console.log(others[i]);
            let dx = this.others[i].x - this.x;
            let dy = this.others[i].y - this.y;
            let distance = p.sqrt(dx * dx + dy * dy);
            let minDist = this.others[i].diameter / 2 + this.diameter / 2;
            //   console.log(distance);
            //console.log(minDist);
            if (distance < minDist) {
              //console.log("2");
              let angle = p.atan2(dy, dx);
              let targetX = this.x + p.cos(angle) * minDist;
              let targetY = this.y + p.sin(angle) * minDist;
              let ax = (targetX - this.others[i].x) * spring;
              let ay = (targetY - this.others[i].y) * spring;
              this.vx -= ax;
              this.vy -= ay;
              this.others[i].vx += ax;
              this.others[i].vy += ay;
            }
          }
        }

        move() {
          this.vy += gravity;
          this.x += this.vx;
          this.y += this.vy;
          if (this.x + this.diameter / 2 > p.width) {
            this.x = p.width - this.diameter / 2;
            this.vx *= friction;
          } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
          }
          if (this.y + this.diameter / 2 > p.height) {
            this.y = p.height - this.diameter / 2;
            this.vy *= friction;
          } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
          }
        }

        display() {
          p.ellipse(this.x, this.y, this.diameter, this.diameter);
        }
      }
    };
  }

  render() {
    return (
      <div style={{ position: "fixed" }}>
        <SideNavMaterialUI />
        <img
          className="dripple-logo"
          src="https://i.imgur.com/SGCBrCs.png"
          alt="dripple-logo"
        />
        <P5Wrapper sketch={this.sketch} />
      </div>
    );
  }
}

export default Home;

// BOUNCY BALLS! /////////////////////////////////////////////////
// function sketch(p) {
//   // let rotation = 0;

//   let numBalls = 11;
//   let spring = 0.05;
//   let gravity = 0.0;
//   let friction = -0.5;
//   let balls = [];

//   p.setup = function() {
//     p.createCanvas(p.windowWidth, p.windowHeight);
//     // p.background(100);
//     for (let i = 0; i < numBalls; i++) {
//       balls[i] = new Ball(
//         p.random(p.width),
//         p.random(p.height),
//         p.random(100, 170),
//         i,
//         balls
//       );
//     }
//     // p.noStroke();
//     p.stroke(100, 181, 246, 255);
//     p.strokeWeight(3);
//     p.fill(100, 181, 246, 220);
//   };

//   p.draw = function() {
//     p.background(121, 134, 203);
//     // p.background(100, 181, 246, 1); // VERY VERY VERY INTERSTING
//     balls.forEach(ball => {
//       ball.collide();
//       ball.move();
//       ball.display();
//     });
//   };

//   class Ball {
//     constructor(xin, yin, din, idin, oin) {
//       this.x = xin;
//       this.y = yin;
//       this.vx = 0;
//       this.vy = 0;
//       this.diameter = din;
//       this.id = idin;
//       this.others = oin;
//     }

//     collide() {
//       for (let i = this.id + 1; i < numBalls; i++) {
//         // console.log(others[i]);
//         let dx = this.others[i].x - this.x;
//         let dy = this.others[i].y - this.y;
//         let distance = p.sqrt(dx * dx + dy * dy);
//         let minDist = this.others[i].diameter / 2 + this.diameter / 2;
//         //   console.log(distance);
//         //console.log(minDist);
//         if (distance < minDist) {
//           //console.log("2");
//           let angle = p.atan2(dy, dx);
//           let targetX = this.x + p.cos(angle) * minDist;
//           let targetY = this.y + p.sin(angle) * minDist;
//           let ax = (targetX - this.others[i].x) * spring;
//           let ay = (targetY - this.others[i].y) * spring;
//           this.vx -= ax;
//           this.vy -= ay;
//           this.others[i].vx += ax;
//           this.others[i].vy += ay;
//         }
//       }
//     }

//     move() {
//       this.vy += gravity;
//       this.x += this.vx;
//       this.y += this.vy;
//       if (this.x + this.diameter / 2 > p.width) {
//         this.x = p.width - this.diameter / 2;
//         this.vx *= friction;
//       } else if (this.x - this.diameter / 2 < 0) {
//         this.x = this.diameter / 2;
//         this.vx *= friction;
//       }
//       if (this.y + this.diameter / 2 > p.height) {
//         this.y = p.height - this.diameter / 2;
//         this.vy *= friction;
//       } else if (this.y - this.diameter / 2 < 0) {
//         this.y = this.diameter / 2;
//         this.vy *= friction;
//       }
//     }

//     display() {
//       p.ellipse(this.x, this.y, this.diameter, this.diameter);
//     }
//   }
// }

////////////////////////////////////////////////////////////////////////////

// function sketch(p) {
//   p.setup = function() {
//     p.createCanvas(p.windowWidth, p.windowHeight);
//     p.background(100);
//   };

//   p.draw = function() {
//     if (p.mouseIsPressed) {
//       p.fill(0);
//     } else {
//       p.fill(255);
//     }
//     p.ellipse(p.mouseX, p.mouseY, 80, 80);
//   };
// }

// Fountain //////////////////////////////////////////////////////////////

// function sketch(p) {
//   let system;

//   p.setup = function() {
//     p.createCanvas(720, 400);
//     system = new ParticleSystem(p.createVector(p.width / 2, 50));
//   };

//   p.draw = function() {
//     p.background(51);
//     system.addParticle();
//     system.run();
//   };

//   // A simple Particle class
//   let Particle = function(position) {
//     this.acceleration = p.createVector(0, 0.05);
//     this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 0));
//     this.position = position.copy();
//     this.lifespan = 255;
//   };

//   Particle.prototype.run = function() {
//     this.update();
//     this.display();
//   };

//   // Method to update position
//   Particle.prototype.update = function() {
//     this.velocity.add(this.acceleration);
//     this.position.add(this.velocity);
//     this.lifespan -= 2;
//   };

//   // Method to display
//   Particle.prototype.display = function() {
//     p.stroke(200, this.lifespan);
//     p.strokeWeight(2);
//     p.fill(127, this.lifespan);
//     p.ellipse(this.position.x, this.position.y, 12, 12);
//   };

//   // Is the particle still useful?
//   Particle.prototype.isDead = function() {
//     return this.lifespan < 0;
//   };

//   let ParticleSystem = function(position) {
//     this.origin = position.copy();
//     this.particles = [];
//   };

//   ParticleSystem.prototype.addParticle = function() {
//     this.particles.push(new Particle(this.origin));
//   };

//   ParticleSystem.prototype.run = function() {
//     for (let i = this.particles.length - 1; i >= 0; i--) {
//       let p = this.particles[i];
//       p.run();
//       if (p.isDead()) {
//         this.particles.splice(i, 1);
//       }
//     }
//   };
// }
////////////////////////////////////////////////////////////////////////

// WORKING INSIDE REACT ///////////////////////////////////////////////////
// class Home extends Component {
//   constructor() {
//     super();
//     this.state = {
//       x: 50,
//       y: 50,
//       test: 0
//     };
//     this.renderRef = React.createRef();
//     this.sketch = p => {
//       p.setup = () => {
//         p.createCanvas(p.windowWidth, p.windowHeight);
//         // .parent(
//         //   this.renderRef.current
//         // );
//         p.background(100);
//       };

//       // p.myCustomRedrawAccordingToNewPropsHandler = props => {
//       //   if (props.test !== null) {
//       //     this.setState({ test: props.test });
//       //   }
//       // };

//       p.draw = () => {
//         if (p.mouseIsPressed) {
//           p.fill(0);
//         } else {
//           p.fill(255);
//         }
//         p.ellipse(this.state.x, this.state.y, 80, 80);
//       };
//     };
//     this._handleClick = this._handleClick.bind(this);
//   }

//   _handleClick() {
//     this.setState({ x: 200, y: 200 });
//   }

//   render() {
//     return (
//       <div>
//         <SideNavMaterialUI />
//         {/* <div ref={this.renderRef} /> */}
//         <P5Wrapper sketch={this.sketch} onClick={this._handleClick} />
//       </div>
//     );
//   }
// }
