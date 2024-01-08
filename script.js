let svgcanvas = document.getElementById("svgcanvas");
svgcanvas.addEventListener("mousedown", placePoint, false);
const container = svgcanvas.getBoundingClientRect();

let keymap = []
document.onkeydown = document.onkeyup = function(e){
    keymap[e.key] = e.type == 'keydown';

    if(keymap["a"]){drawLines();}
}

let points = [];
let lines = [];

function placePoint(evt){
    let cursorpt = cursorPoint(evt)
    let point = new Point(cursorpt.x,cursorpt.y);
    svgcanvas.appendChild(point.svgo);
    points.push(point);
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

            let x1 = 0;
            let y1 = m*(x1-midX)+midY;

            let x2 = container.width;
            let y2 = m*(x2-midX)+midY;

            lines.push(new Line(x1, y1, x2, y2, midX, midY));            
        }        
    }

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if(lines[i]!=lines[j]){whereToCut(lines[i], lines[j]);}
        }        
    }

    for (const line of lines) {
        console.log(line.cutPoints)
        let cuts = line.cutPoints.sort(function(d1, d2){
            return d2[0]-d1[0];
        });
        line.redraw(cuts[0][1],cuts[0][2], cuts[1][1], cuts[1][2]);
        svgcanvas.appendChild(line.svgo);
    }
    
}

function whereToCut(line1, line2){
    
    let m1 = (line1.y2-line1.y1)/(line1.x2-line1.x1);
    let b1 = line1.y1-m1*line1.x1;
    
    let m2 = (line2.y2-line2.y1)/(line2.x2-line2.x1);
    let b2 = line2.y1-m2*line2.x1;
    
    let cutX = (b2-b1)/(m1-m2);
    let cutY = m1*cutX+b1;
    
    line1.cutPoints.push(new Array(distancesqr(line1.midX, line1.midY, cutX, cutY),cutX, cutY));
}

function distancesqr(x1, y1, x2, y2){
    return Math.pow((x1-x2),2)+Math.pow((y1-y2),2);
}