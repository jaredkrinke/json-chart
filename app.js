var context = document.getElementById("chart").getContext("2d");
var loadButton = document.getElementById("load");
var input = document.getElementById("data");

var defaultColor = "rgba(255, 0, 0, 0.5)";

loadButton.onclick = function () {
    var raw = JSON.parse(input.value);
    var columns = [];
    var first = raw[0];

    var stringColumns = [];
    var numberColumns = [];

    for (var key in first) {
        columns.push(key);
        switch (typeof(first[key])) {
            case "string":
                stringColumns.push(key);
                break;

            case "number":
                numberColumns.push(key);
                break;
        }
    }

    if (numberColumns.length === 2) {
        // Graph
        var x = numberColumns[0];
        var y = numberColumns[1];
        var data = [];
        for (var i = 0; i < raw.length; i++) {
            var row = raw[i];
            data.push({
                x: row[x],
                y: row[y]
            });
        }

        new Chart(context, {
            type: "line",
            options: {
                scales: {
                    xAxes: [
                        {
                            type: "linear"
                        }
                    ]
                }
            },
            data: {
                datasets: [
                    {
                        label: "Data",
                        borderColor: defaultColor,
                        backgroundColor: defaultColor,
                        data: data
                    }
                ]
            }
        });
    } else if (numberColumns.length === 1 && stringColumns.length === 1) {
        // Bar chart
        var x = stringColumns[0];
        var y = numberColumns[0];
        var labels = [];
        var data = [];
        for (var i = 0; i < raw.length; i++) {
            var row = raw[i];
            labels.push(row[x]);
            data.push(row[y]);
        }
    
        new Chart(context, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: y,
                        borderColor: defaultColor,
                        backgroundColor: defaultColor,
                        borderWidth: 3,
                        data: data
                    }
                ]
            }
        });
    }
};
