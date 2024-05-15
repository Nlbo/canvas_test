// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext('2d');
//
// let game = {
//     start: function () {
//         let background  = new Image();
//         background.src = './background.svg';
//
//         let ball = new Image();
//         ball.src = './adobe.png'
//         ball.style.width = '20px'
//         ball.style.height = '20px'
//
//         background.onload = () => {
//             canvas.width = background.width;
//             canvas.height = background.height;
//             ctx.imageSmoothingEnabled = false;
//             window.requestAnimationFrame(() => {
//                 ctx.drawImage(background, 0, 0);
//             });
//         };
//         ball.onload = () => {
//             window.requestAnimationFrame(() => {
//                 ctx.drawImage(ball, 100, 100);
//             })
//         }
//     }
// };
//
// window.onload = () => {
//     game.start();
// };


let game = {
    ctx: null,
    canvas: null,
    sprites: {
        background: null,
        adobe: null,
    },
    loadedSprites: 0,
    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
    },
    preload: function (callback) {

        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = `./${key}.svg`;
            if(key === 'adobe') {
                this.sprites[key].style.border = '1px solid red'
            }
            this.sprites[key].onload = () => {
                ++this.loadedSprites;
                if (this.loadedSprites === Object.keys(this.sprites).length) {
                    callback()
                }
            }
        }
    },
    render() {
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.adobe, this.canvas.width / 2 - 50, this.canvas.height / 2 - 50, 100, 100);
    },
    run: function () {
        this.canvas.width = this.sprites.background.width;
        this.canvas.height = this.sprites.background.height;
        requestAnimationFrame(() => {
            this.render()
        });
    },
    start: function () {
        this.init();
        this.preload(this.run.bind(this));
    },
};

window.onload = () => {
    game.start();
};

