 function draw() {
    var can = document.getElementById("cantest");
    if (can.getContext) {
        can.height = can.height;
        var ctx = can.getContext("2d");
        let color = document.getElementById("koch_color").value
        ctx.strokeStyle = color;
        ctx.beginPath();
        var depth = parseInt(document.getElementById("textDepth").value); //绘制维度
        var type = parseInt(document.getElementById("typeSelect").value);
        draw_koch(type, ctx, depth);
    } else {
        alert("不支持Canvas");
    }
}

function draw_koch(type, ctx, depth) {
    if (type == 1) { //三角形
        var x1 = 700.00;
        var y1 = 535.00;

        var x2 = 100.00;
        var y2 = 535.00;

        var x11 = x2 + (x1 - x2) / 2;
        var y11 = y1 - Math.sin(Math.PI / 3) * (x1 - x2);

        koch(ctx, x2, y2, x1, y1, 0, depth);
        koch(ctx, x1, y1, x11, y11, 0, depth);
        koch(ctx, x11, y11, x2, y2, 0, depth);
        ctx.stroke();
    }
    else if(type == 2) { //矩形
        var x1 = 600.00;
        var y1 = 550.00;

        var x3 = 200.00;
        var y3 = 150.00;

        var x2 = x1;
        var y2 = y3;

        var x4 = x3;
        var y4 = y1;

        koch(ctx, x1, y1, x2, y2, 0, depth);
        koch(ctx, x2, y2, x3, y3, 0, depth);
        koch(ctx, x3, y3, x4, y4, 0, depth);
        koch(ctx, x4, y4, x1, y1, 0, depth);
        ctx.stroke();
    }
    else if(type == 3) { //五角星
        var r = 130;
        var R = r / Math.sin(22.3 / 180 * Math.PI);
        var x = 400;
        var y = 300.00 / Math.sqrt(3) + 190;
        var current_x = Math.cos(18 / 180 * Math.PI + 360) * R;
        var current_y = Math.sin(18 / 180 * Math.PI + 360) * R;
        ctx.moveTo(current_x+x, current_y+y);
        for (var i = 0; i <= 5; i++) {
            // 外顶点(x1,y1)  内顶点(x2,y2)
            var x1 = Math.cos((18 + 72 * i) / 180 * Math.PI+360) * R,
                y1 = Math.sin((18 + 72 * i) / 180 * Math.PI+360) * R,
                x2 = Math.cos((54 + 72 * i) / 180 * Math.PI+360) * r,
                y2 = Math.sin((54 + 72 * i) / 180 * Math.PI+360) * r;

            koch(ctx, x1 + x, y1 + y, current_x + x, current_y +y, 0, depth);
            koch(ctx, x2 + x, y2 + y, x1+x, y1+y, 0, depth);
            current_x = x2;
            current_y = y2;
            ctx.stroke();
        }
    }
    else if(type == 4) { //画心形
        var radian = 0,
            radian_add = Math.PI/30;
        var current_x = getX(radian) + 420;
            current_y = getY(radian) + 300;
        var X, Y;
        while(radian <= (Math.PI)){
            X = getX(radian) + 420;
            Y = getY(radian) + 300;
            radian += radian_add;
            koch(ctx, current_x, current_y, X, Y, 0, depth);
            current_x = X;
            current_y = Y;
        }
        koch(ctx, 420, 150, 430, 200, 0, depth);
        koch(ctx, 430, 200, 410, 250, 0, depth);
        koch(ctx, 410, 250, 430, 300, 0, depth);        
        koch(ctx, 430, 300, 410, 350, 0, depth);
        koch(ctx, 410, 350, 430, 400, 0, depth);
        koch(ctx, 430, 400, 410, 450, 0, depth);
        koch(ctx, 410, 450, 430, 500, 0, depth);
        koch(ctx, 430, 500, 410, 550, 0, depth);
        koch(ctx, 410, 550, 425, 600, 0, depth);
        koch(ctx, 425, 600, 420.34, 627, 0, depth);

        current_x = getX(radian) + 375;
        current_y = getY(radian) + 300;
        ctx.moveTo(current_x, current_y);
        while(radian <= (Math.PI*2)){        
            X = getX(radian) + 375;
            Y = getY(radian) + 300;
            radian += radian_add;
            koch(ctx, current_x, current_y, X, Y, 0, depth);
            ctx.moveTo(X, Y)
            current_x = X;
            current_y = Y;
        }
        console.log(current_x, current_y)
        koch(ctx, 375, 150, 385, 200, 0, depth);
        koch(ctx, 385, 200, 365, 250, 0, depth);
        koch(ctx, 365, 250, 385, 300, 0, depth);        
        koch(ctx, 385, 300, 365, 350, 0, depth);
        koch(ctx, 365, 350, 385, 400, 0, depth);
        koch(ctx, 385, 400, 365, 450, 0, depth);
        koch(ctx, 365, 450, 385, 500, 0, depth);
        koch(ctx, 385, 500, 365, 550, 0, depth);
        koch(ctx, 365, 550, 380, 600, 0, depth);
        koch(ctx, 380, 600, 375, 625, 0, depth);
        
        ctx.stroke();
    }
}

function getX(t){  //获取心型线的X坐标
    return 15*(20*Math.pow(Math.sin(t),3))
}

function getY(t){  //获取心型线的Y坐标
    return -15*(18*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
}

function koch(ctx, x1, y1, x2, y2, n, m) {
    if (m == 0) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        return false;
    }
    var x3 = (x2 - x1) / 3 + x1;
    var y3 = (y2 - y1) / 3 + y1;
    var x4 = (x2 - x1) / 3 * 2 + x1;
    var y4 = (y2 - y1) / 3 * 2 + y1;
    var x5 = x3 + ((x2 - x1) - (y2 - y1) * Math.sqrt(3)) / 6;
    var y5 = y3 + ((x2 - x1) * Math.sqrt(3) + (y2 - y1)) / 6;

    n = n + 1;

    if (n == m) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x5, y5);
        ctx.lineTo(x4, y4);
        ctx.lineTo(x2, y2);
        return false;
    }

    koch(ctx, x1, y1, x3, y3, n, m)
    koch(ctx, x3, y3, x5, y5, n, m)
    koch(ctx, x5, y5, x4, y4, n, m)
    koch(ctx, x4, y4, x2, y2, n, m)
}
