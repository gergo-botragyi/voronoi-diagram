let svgcanvas = document.getElementById("svgcanvas");
svgcanvas.addEventListener("mousedown", placePoint, false);
const container = svgcanvas.getBoundingClientRect();

let points = [];

function placePoint(evt){
    let cursorpt = cursorPoint(evt)
    let point = new Point(cursorpt.x,cursorpt.y);
    svgcanvas.appendChild(point.svgo);
    points.push(point);
    drawLines();
}

function cursorPoint(evt){
    let pt = svgcanvas.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svgcanvas.getScreenCTM().inverse());
}

function drawLines(){
    for (let i = 0; i < points.length-1; i++) {
        for (let j = i+1; j < points.length; j++) {
            let midX = (points[i].x+points[j].x)/2;
            let midY = (points[i].y+points[j].y)/2;        
            
            let rise = points[i].y-points[j].y;
            let run = points[i].x-points[j].x;
            let slope = rise/run;
            let m = -1.0/slope;

            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            let x1 = 0;
            let y1 = m*(x1-midX)+midY;

            let x2 = container.width;
            let y2 = m*(x2-midX)+midY;

            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", "red");
            svgcanvas.appendChild(line);
        }
        
    }
    
}