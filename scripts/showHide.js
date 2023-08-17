function show(event) {
    var showBorder = document.getElementById("showBorder-items");
    var showColor = document.getElementById("showColor-items");
    var showSize = document.getElementById("showSize-items");
    var showPosition = document.getElementById("showPosition-items");
    var showBorderIcon = document.getElementById("showBorder-icon");
    var showColorIcon = document.getElementById("showColor-icon");
    var showSizeIcon = document.getElementById("showSize-icon");
    var showPositionIcon = document.getElementById("showPosition-icon");

    switch (`${event.currentTarget.id}-items`) {
        case "showBorder-items":
            addClass(showBorder)
            changeIcon(showBorderIcon)
            break;
        case "showColor-items":
            addClass(showColor)
            changeIcon(showColorIcon)
            break;
        case "showSize-items":
            addClass(showSize)
            changeIcon(showSizeIcon)
            break;
        case "showPosition-items":
            addClass(showPosition)
            changeIcon(showPositionIcon)
            break;
    }
}

function addClass(element) {
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function changeIcon(element) {
    element.classList.toggle('fa-arrow-down');
    element.classList.toggle('fa-arrow-right');
}