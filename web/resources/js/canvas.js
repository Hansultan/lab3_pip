//отрисовка области для попадания
const arrowLength = 7;
const lineWidth = 2;
const pointScale = 3;
const signSpace = 9;
const pointRadius = 1.5;

const backgroundColor = "#ffffff";
const axisesColor = "#000000";
const regionColor = "#337dff";
const signsColor = axisesColor;

const signsFont = "14px sans-serif";

const chartWidth = 330;
const chartHeight = 330;
const rCoefficient = 0.4;

const borders = [];
borders["X"] = ["-3", "5"];
borders["Y"] = ["-3", "3"];
borders["R"] = ["0.1", "3"];

(
    function() {
        draw(document.getElementById("r-input-param_input"));
    }
)();

function  draw(r) {
    let canvas = $("#canvas")[0];
    let R = r.value;
    if((isPresented(R, "R", false)) && (validateParam(R,"R", false))){
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        drawBackground(canvas);
        drawArea(canvas);
        drawAxis(canvas);
        drawAxisSigns(canvas);
        drawPointsSigns(canvas, R.slice(0,5));
        if (!$("#result-table-container").hasClass("hidden")) {
            let results = $("#result-table tbody tr");
            for (var i = results.length - 1; i >= 0; i--) {
                let x = results.eq(i).find("td").eq(0).text();
                let y = results.eq(i).find("td").eq(1).text();
                let originalX = toOriginalX(x, R);
                let originalY = toOriginalY(y, R);
                if (
                    ((x <= 0) && (y >= 0) && (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(R,2))) ||
                    ((x >= 0) && (y <= 0) && (y >= x - R/2)) ||
                    ((x <= 0) && (y <= 0) && (x >= -R) && (y >= -R/2))
                ) {
                    drawPoint(canvas, originalX, originalY, "GreenYellow");
                } else {
                    drawPoint(canvas, originalX, originalY, "Red");
                }
            }
        }
    }else{
        drawBackground(canvas);
        drawArea(canvas);
        drawAxis(canvas);
        drawAxisSigns(canvas);
        drawPointsSigns(canvas, "R");
    }
}

function drawBackground(canvas) {
    let context = canvas.getContext("2d");
    context.fillStyle = backgroundColor;

    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawArea(canvas) {
    let context = canvas.getContext("2d");
    context.strokeStyle = regionColor;
    context.fillStyle = regionColor;

    context.beginPath();

    context.moveTo(canvas.width / 2, canvas.height / 2);

    context.arc(canvas.width/2,canvas.height/2,canvas.width*0.4, 3.14159 , 4.71239);
    context.lineTo(canvas.width/2, canvas.height/2);
    context.lineTo(canvas.width*0.7, canvas.height/2);
    context.lineTo(canvas.width/2, canvas.height*0.7);
    context.lineTo(canvas.width*0.1, canvas.height*0.7);
    context.lineTo(canvas.width*0.1, canvas.height/2);

    context.closePath();
    context.fill();
    context.stroke();
}

function drawAxis(canvas) {
    let context = canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = axisesColor;
    context.lineWidth = lineWidth;

    context.moveTo(canvas.width / 2, canvas.height);
    context.lineTo(canvas.width / 2, 0);

    context.lineTo(canvas.width / 2 - arrowLength / 2, arrowLength);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2 + arrowLength / 2, arrowLength);

    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);

    context.lineTo(canvas.width - arrowLength, canvas.height / 2 + arrowLength / 2);
    context.moveTo(canvas.width, canvas.height / 2);
    context.lineTo(canvas.width - arrowLength, canvas.height / 2 - arrowLength / 2);


    context.moveTo(canvas.width * 0.1, canvas.height / 2 - pointScale);
    context.lineTo(canvas.width * 0.1, canvas.height / 2 + pointScale);

    context.moveTo(canvas.width * 0.3, canvas.height / 2 - pointScale);
    context.lineTo(canvas.width * 0.3, canvas.height / 2 + pointScale);

    context.moveTo(canvas.width * 0.7, canvas.height / 2 - pointScale);
    context.lineTo(canvas.width * 0.7, canvas.height / 2 + pointScale);

    context.moveTo(canvas.width * 0.9, canvas.height / 2 - pointScale);
    context.lineTo(canvas.width * 0.9, canvas.height / 2 + pointScale);

    context.moveTo(canvas.width / 2 - pointScale, canvas.height * 0.1);
    context.lineTo(canvas.width / 2 + pointScale, canvas.height * 0.1);

    context.moveTo(canvas.width / 2 - pointScale, canvas.height * 0.3);
    context.lineTo(canvas.width / 2 + pointScale, canvas.height * 0.3);

    context.moveTo(canvas.width / 2 - pointScale, canvas.height * 0.7);
    context.lineTo(canvas.width / 2 + pointScale, canvas.height * 0.7);

    context.moveTo(canvas.width / 2 - pointScale, canvas.height * 0.9);
    context.lineTo(canvas.width / 2 + pointScale, canvas.height * 0.9);

    context.stroke();
}

function drawAxisSigns(canvas) {
    let context = canvas.getContext("2d");
    context.font = signsFont;
    context.fillStyle = signsColor;

    context.fillText("X", canvas.width / 2 + signSpace / 2, signSpace);
    context.fillText("Y", canvas.width - signSpace, canvas.height / 2 - signSpace / 2);
}

function drawPointsSigns(canvas, r) {
    let context = canvas.getContext("2d");
    context.font = signsFont;
    context.fillStyle = signsColor;

    let rIsNumber = !isNaN(Number(r));

    let sign;
    rIsNumber ? sign = -r + "" : sign = "-" + r;
    context.fillText(sign, canvas.width * 0.1 - 0.5 * sign.length * signSpace, canvas.height / 2 - signSpace / 2);
    context.fillText(sign, canvas.width / 2 + signSpace / 2, canvas.height * 0.9 + signSpace / 2);
    rIsNumber ?sign = -r / 2 + "" : sign = "-" + r + "/2";
    context.fillText(sign, canvas.width * 0.3 - 0.5 * sign.length * signSpace, canvas.height / 2 - signSpace / 2);
    context.fillText(sign, canvas.width / 2 + signSpace / 2, canvas.height * 0.7 + signSpace / 2);
    rIsNumber ? sign = r / 2 + "" : sign = r + "/2";
    context.fillText(sign, canvas.width * 0.7 - 0.5 * sign.length * signSpace, canvas.height / 2 - signSpace / 2);
    context.fillText(sign, canvas.width / 2 + signSpace / 2, canvas.height * 0.3 + signSpace / 2);
    sign = r + "";
    context.fillText(sign, canvas.width * 0.9 - 0.5 * sign.length * signSpace, canvas.height / 2 - signSpace / 2);
    context.fillText(sign, canvas.width / 2 + signSpace / 2, canvas.height * 0.1 + signSpace / 2);
}

function drawPoint(canvas, x, y, pointColor) {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = pointColor;
    context.fillStyle = pointColor;

    context.arc(x, y, pointRadius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
}

function toOriginalX(computingX, R) {
    let X = computingX / R;
    X *= rCoefficient * chartWidth;
    X += chartWidth / 2;

    return X;
}

function toOriginalY(computingY, R) {
    let Y = computingY / R;
    Y *= rCoefficient * chartHeight;
    Y = -Y + chartHeight / 2;

    return Y;
}

function toComputingX(originalX, R) {
    let X = originalX - chartWidth / 2;
    X /= rCoefficient * chartWidth;
    X *= R;

    return X;
}

function toComputingY(originalY, R) {
    let Y = -originalY + chartHeight / 2;
    Y /= rCoefficient * chartHeight;
    Y *= R;

    return Y;
}

{
    $("#canvas").bind("click", function(event) {
        let R =  document.getElementById("canvas-form:task-chart-r").value;
        if (!(isPresented(R, "R", false) && validateParam(R, "R", false))) {
            showWarning("Укажите корректное значение R для использования интерактивного режима графика", "canvas");
            return;
        } else {
            showWarning("", "canvas");
        }

        let canvas = event.target;

        let originalX = event.pageX - canvas.offsetLeft;
        let originalY = event.pageY - canvas.offsetTop;

        document.getElementById('canvas-form:task-chart-x').value = String(toComputingX(originalX, R)).substring(0, 10);
        document.getElementById('canvas-form:task-chart-y').value = String(toComputingY(originalY, R)).substring(0, 10);
        document.getElementById('canvas-form:canvas-form-button').click();


    });
}

function validateParam(param, paramName, warn) {
    if (!(!isNaN( Number(param) ) && param.lastIndexOf('.') != (param.length - 1))) {
        if (warn) {
            showWarning(paramName + " должен быть числом", paramName);
        }
        return false;
    }
    let bottomBorder = borders[paramName][0];
    let topBorder = borders[paramName][1];

    if (!(Number(param) >= bottomBorder && Number(param) <= topBorder)) {
        if (warn) {
            showWarning(paramName + " не входит в необходимый диапазон (" + bottomBorder + " ... " + topBorder +")", paramName);
        }
        return false;
    }
    showWarning("", paramName);
    return true;

}

function showWarning(warningMessage, paramName) {

    let warningContainer = document.getElementById("warning-container-" + paramName);

    if (warningContainer != null) {
        warningContainer.textContent = warningMessage;
    }

}

function isPresented(param, paramName, warn) {
    if (param == "" || param == null || param.length == 0) {
        if (warn) {
            showWarning(paramName + " должен быть указан", paramName);
        }
        return false;
    } else {
        showWarning("", paramName);
    }


    return true;
}


