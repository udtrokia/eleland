import Util from "./util.js";

class ShapeConfig {
    constructor(target) {
        this.target = target;
        this.rotate = Util.Rand(100);
        this.size = 500;
        this.style = Util.Rand(2) === 1? "rect": "ellipse";
        this.gradient = {
            enable: true,
            rotate: Util.Rand(100),
            style: Util.Rand(2) === 1? "linearGradient": "radialGradient",
            stops: [{
                value: "5%",
                color: Util.Color(),
            }, {
                value: "20%",
                color: Util.Color(),
            },{
                value: "45%",
                color: Util.Color(),
            }, {
                value: "75%",
                color: Util.Color(),
            }, {
                value: "100%",
                color: Util.Color(),
            }],
        };
        this.animate = {
            enable: true,
        };
        this.x = this.size * 3 / 10;
        this.y = this.size * 3 / 10;
        this.rx = 50 + Util.Rand(this.size / 8);
        this.ry = 50 + Util.Rand(this.size / 8);
    }
}

class Shape {
    static NewConfig(target) {
        return new ShapeConfig(target);
    }

    constructor(conf) {
        conf.target = d3.select(conf.target).append("svg");
        this.conf = conf;
    }

    Render() {
        const conf = this.conf;

        // Apply grandient
        if (conf.gradient.enable) {
            this.gradient();
        }

        // Render shape
        conf.target = conf.target
            .append(conf.style)
            .attr("rx", conf.rx)
            .attr("ry", conf.ry)
            .attr("fill", `url(#s0)`);

        if (conf.style === "rect") {
            conf.target
                .attr("x", conf.size / 18)
                .attr("y", conf.size / 18)
                .attr("width", conf.size / 2)
                .attr("height", conf.size / 2);
        } else {
            conf.target
                .attr("cx", conf.x)
                .attr("cy", conf.y);
        }

        // Render Animate
        if (conf.animate.enable) {
            this.animate();
        }
    }

    // Apply gradient
    gradient() {
        const conf = this.conf;
        const lg = conf.target
              .append("defs")
              .append(conf.gradient.style)
              .attr("gradientTransform", `rotate(${conf.rotate})`)
              .attr("id", "s0");

        const g = conf.gradient;
        for (let i = 1; i<g.stops.length; i++) {
            lg.append("stop")
                .attr("offset", `${g.stops[i].value}`)
                .attr("stop-color", g.stops[i].color);
        }
    }

    // Apply animate
    animate() {
        const conf = this.conf;
        conf.target.append("animate")
            .attr("attributeName", "rx")
            .attr("values", `${conf.rx};${conf.rx / 2};${conf.rx}`)
            .attr("dur", "10s")
            .attr("repeatCount","indefinite");

        conf.target.append("animate")
            .attr("attributeName", "ry")
            .attr("values", `${conf.ry};${conf.ry / 2};${conf.ry}`)
            .attr("dur", "5s")
            .attr("repeatCount","indefinite");
    }
}

export default Shape;
