class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle({x:100, y:100}, {x:500, y:500}, [255,255,0,255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {

    }

    // ctx:          canvas context
    drawSlide2(ctx) {

    }

    // ctx:          canvas context
    drawSlide3(ctx) {

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        
        let vertex0 = {x: right_top.x, y:left_bottom.y};
        this.drawLine(left_bottom, vertex0, color, ctx);
        this.drawLine(vertex0, right_top, color, ctx);

        let vertex1 = {x: left_bottom.x, y:right_top.y};
        this.drawLine(right_top, vertex1, color, ctx);
        this.drawLine(vertex1, left_bottom, color, ctx);
        let vertices = [vertex0, vertex1, left_bottom, right_top];
        if(this.show_points){
            for(let i = 0; i<vertices.length; i++){
                this.drawPointRectangle({x:vertices[i].x-5, y:vertices[i].y-5},{x:vertices[i].x+5, y:vertices[i].y+5}, [0,0,0,255], ctx);
            }
        }
    }
    drawPointRectangle(left_bottom, right_top, color, ctx) {
        console.log(left_bottom.x);
        let vertex0 = {x: right_top.x, y:left_bottom.y};
        this.drawLine(left_bottom, vertex0, color, ctx);
        this.drawLine(vertex0, right_top, color, ctx);

        let vertex1 = {x: left_bottom.x, y:right_top.y};
        this.drawLine(right_top, vertex1, color, ctx);
        this.drawLine(vertex1, left_bottom, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
