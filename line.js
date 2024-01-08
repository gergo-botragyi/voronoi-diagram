class Line{
    constructor(x1, y1, x2, y2, midX, midY){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.midX = midX;
        this.midY = midY;
        this.svgo = this.createSvg();
        this.cutPoints = [];
    }

    redraw(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    createSvg(){
        let svgobject = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svgobject.setAttribute("x1", this.x1);
        svgobject.setAttribute("y1", this.y1);
        svgobject.setAttribute("x2", this.x2);
        svgobject.setAttribute("y2", this.y2);
        svgobject.setAttribute("stroke", "red");
        return svgobject;
    }
}