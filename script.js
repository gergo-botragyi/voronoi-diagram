let svgcanvas = document.getElementById("svgcanvas");
svgcanvas.addEventListener("mousedown", placePoint, false);
const container = svgcanvas.getBoundingClientRect();

let points = [];
let lines = [];

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

            lines.push(new Line(x1, y1, x2, y2));

            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", "red");
            svgcanvas.appendChild(line);
        }
        
    }
    
}

function whereToCut(x1, y1, x2, y2, x3, y3, x4, y4, midX, midY){
    /*let cutX = (x2+x1)/2;
    let cutY = (y2+y1)/2;
    let cutD1 = distancesqr(cutX, cutY, cx1, cy1);
    let cutD2 = distancesqr(cutX, cutY, cx2, cy2);
    for (const point of points) {
        let pointD = distancesqr(cutX, cutY, point.x, point.y)
        if(pointD < cutD1 || pointD < cutD2){
            whereToCut(cutX, cutY, x2, y2, cx1, cy1, cx2, cy2);
        }else if(pointD > cutD1 || pointD > cutD2){
            whereToCut(x1, y2, cutX, cutY, cx1, cy1, cx2, cy2);
        }else{
            return [cutX,cutY]
        }
    }*/
    let cutDistance = distancesqr(midX, midY, x1, y1);

    let slope1 = (y2-y1)/(x2-x1);
    let yIntercept1 = y1-slope1/line1.x1;

    let slope2 = (y4-y3)/(x4-x3);
    let yIntercept2 = y3-slope2*x3;

    let cutX = (yIntercept2-yIntercept1)/(slope1-slope2);
    let cutY = slope1*x+yIntercept1;

    let newCutDistance = distancesqr(cutX, cutY, midX, midY)
    if(newCutDistance < cutDistance){cutDistance= newCutDistance};
}

function distancesqr(x1, y1, x2, y2){
    return Math.pow((x1-x2),2)+Math.pow((y1-y2),2);
}