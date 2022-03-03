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
        this.drawRectangle({x:100, y:100}, {x:500, y:500}, [0,0,255,255], ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle({x:250, y:250}, 100, [0,0,255,255], ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve({x:250, y:150}, {x:300, y:350}, {x:450, y:100}, {x:500, y:250}, [0,0,255,255], ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        this.drawLine({x:50, y:450}, {x:130, y:450}, [0,0,255,255], ctx);
        this.drawBezierCurve({x:50, y:350},  {x:55, y:250}, {x:100, y:275}, {x:90, y:450}, [0,0,255,255], ctx);
        this.drawCircle({x:130, y:310}, 20, [0,0,255,255], ctx);
        this.drawLine({x:148, y:320}, {x:155, y:290}, [0,0,255,255], ctx);
        this.drawBezierCurve({x:195, y:320},  {x:160, y:310}, {x:160, y:290}, {x:195, y:290}, [0,0,255,255], ctx);
        this.drawLine({x:205, y:410}, {x:205, y:290}, [0,0,255,255], ctx);
        this.drawBezierCurve({x:240, y:320},  {x:192, y:310}, {x:192, y:290}, {x:240, y:290}, [0,0,255,255], ctx);
        this.drawBezierCurve({x:255, y:290},  {x:290, y:280}, {x:240, y:320}, {x:280, y:320}, [0,0,255,255], ctx);
        this.drawCircle({x:310, y:305}, 15, [0,0,255,255], ctx);
        this.drawBezierCurve({x:340, y:290},  {x:330, y:330}, {x:370, y:330}, {x:370, y:290}, [0,0,255,255], ctx);
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
        let numberpts = 360/this.num_curve_sections;
        let vertices = [];
        let point = {x: center.x + (radius*Math.cos((Math.PI*0)/180)), y: center.y + (radius*Math.sin((Math.PI*0/180))) };
        vertices[0] = point;
        for(let i = 1; i < this.num_curve_sections; i++){
            point = {x: center.x + (radius*Math.cos((Math.PI*numberpts*i)/180)), y: center.y + (radius*Math.sin((Math.PI*numberpts*i)/180)) };
            vertices[i] = point;
            this.drawLine(vertices[i-1], vertices[i], color, ctx);
        }
        this.drawLine(vertices[this.num_curve_sections-1], vertices[0], color, ctx);
        if(this.show_points){
            for(let i = 0; i<vertices.length; i++){
                this.drawPointRectangle({x:vertices[i].x-5, y:vertices[i].y-5},{x:vertices[i].x+5, y:vertices[i].y+5}, [0,0,0,255], ctx);
            }
        }
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let numberpts = 1/this.num_curve_sections;
        let vertices = [];
        let point = pt0;
        vertices[0] = point;
        for(let i = 1; i < this.num_curve_sections; i++){
            let t = i*numberpts
            point = {x: (Math.pow(1-t,3)*pt0.x + 3*Math.pow(1-t,2)*t*pt1.x + 3*(1-t)*Math.pow(t,2)*pt2.x + Math.pow(t,3)*pt3.x), y: (Math.pow(1-t,3)*pt0.y + 3*Math.pow(1-t,2)*t*pt1.y + 3*(1-t)*Math.pow(t,2)*pt2.y + Math.pow(t,3)*pt3.y)}
            vertices[i] = point;
            this.drawLine(vertices[i-1], vertices[i], color, ctx);
        }
        this.drawLine(vertices[this.num_curve_sections-1], pt3, color, ctx);
        if(this.show_points){
            for(let i = 0; i<vertices.length; i++){
                this.drawPointRectangle({x:vertices[i].x-5, y:vertices[i].y-5},{x:vertices[i].x+5, y:vertices[i].y+5}, [0,0,0,255], ctx);
            }
            this.drawPointRectangle({x:pt1.x-5, y:pt1.y-5},{x:pt1.x+5, y:pt1.y+5}, [0,0,0,255], ctx);
            this.drawPointRectangle({x:pt2.x-5, y:pt2.y-5},{x:pt2.x+5, y:pt2.y+5}, [0,0,0,255], ctx);
            this.drawPointRectangle({x:pt3.x-5, y:pt3.y-5},{x:pt3.x+5, y:pt3.y+5}, [0,0,0,255], ctx);
        }
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
