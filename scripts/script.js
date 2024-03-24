add_button = document.querySelector(".add")
border_width_input = document.querySelector(".bd_w")
border_radius_input = document.querySelector(".bd_r")
border_color_input = document.querySelector(".bd_color")
color_input = document.querySelector(".color")
background_color_input = document.querySelector(".bg")

rotate_input = document.querySelector(".rotate")
width_input = document.querySelector(".scale_x")
height_input = document.querySelector(".scale_y")

position_x = document.querySelector(".p_x")
position_y = document.querySelector(".p_y")

zindex_input = document.querySelector(".zindex")

set_button = document.querySelector(".set")
set_button.addEventListener("click",()=>{submit()})
// get_button = document.querySelector("get")


playground = document.querySelector(".playground")

box_name_pad = document.querySelector(".name_boxes")

all_inputs = document.querySelectorAll("input")

function update_translate(){
	selected.box.style.transform = "rotate(" + rotate_input.value + "deg)"
    selected.box.style.left = position_x.value + "px" 
    selected.box.style.top = position_y.value + "px"
    // console.log(width_input.value,height_input.value)
}
function submit(){
    if(!selected.box){return}
    selected.box.style.borderWidth = border_width_input.value
    selected.box.style.borderRadius = border_radius_input.value
    selected.box.style.borderColor = border_color_input.value
    
    selected.box.style.color = color_input.value
    selected.box.style.backgroundColor = background_color_input.value
    selected.oldcolor = background_color_input.value
    
    selected.box.style.width = width_input.value + "px"
    selected.box.style.height = height_input.value + "px"

    // alert(selected.box.style.width + " from " + width_input.value)

    update_translate()
    selected.box.style.zIndex = zindex_input.value
}
all_inputs.forEach((elem)=>{
    elem.addEventListener("keydown",(event)=>{
        if (event.keyCode==13){
            submit()
        }

        console.log(event.keyCode)
    })

    elem.addEventListener("mousemove",(event)=>{
        if(event.buttons==1 & elem.type=="number"){
            // console.log(event)
            if(!elem.value){elem.value = 0}
            elem.value = parseInt(elem.value) + event.movementX
            submit()
        }
    })

})
function godown(no){
    selected.box.style.top = (parseInt(selected.box.style.top) + no) + "px"
    position_y.value = parseInt(selected.box.style.top)
}
function goup(no){
    godown(-no)
}
function goright(no){
    selected.box.style.left = (parseInt(selected.box.style.left) + no) + "px"
    position_x.value =  parseInt(selected.box.style.left)
}
function goleft(no){
    goright(-no)
}
playground.addEventListener("click",(event)=>{
    unselect()
})
document.addEventListener("keydown",(event)=>{
    if(selected.box){
        
        if(event.key=="ArrowDown"){
            event.preventDefault()
            godown(1)
        }
        if(event.key=="ArrowUp"){
            event.preventDefault()
            goup(1)
        }
        if(event.key=="ArrowRight"){
            event.preventDefault()
            goright(1)
        }
        if(event.key=="ArrowLeft"){
            event.preventDefault()
            goleft(1)
        }
        if(event.key=="Delete"){
            console.log("Delete kaise kare boxes se ????")
        }
    }
    else{console.log(event.key)}
})
var selected = {
    "box":null,
    "oldcolor":null,
    "active":false,
    "currentX":0,
    "currentY":0,
    "initialX":0,
    "initialY":0,
    "xOffset":0,
    "yOffset":0
}
function select_box(event){
    event.stopPropagation();
    if(selected.box != null){
        unselect()
    }
    
    selected.box = event.target
    bg = selected.box.style.backgroundColor
    if(bg){
        selected.oldcolor = bg
        selected.box.style.backgroundColor = ""
    }
    cst = window.getComputedStyle(selected.box,null)
    splitted = cst.transform
    //draggable
    // selected.box.addEventListener("mousedown", dragStart, false);
    // document.addEventListener("mouseup", dragEnd, false);
    // document.addEventListener("mousemove", drag, false);
    window.addEventListener("mousemove",(event)=>{
        if(event.buttons==1){
            
            no = (event.pageX - playground.offsetLeft)//parseInt(selected.box.style.left) + 
            // if (parseInt(selected.box.style.width) < 50){
                no -= parseInt(selected.box.style.width)/2
            // }
            // else{no-=30}
            selected.box.style.left = no + "px"
            
            no = (event.pageY - playground.offsetTop)//parseInt(selected.box.style.top) + event.movementY
            // if (parseInt(selected.box.style.height) < 50){
                no -= parseInt(selected.box.style.height)/2
            // }
            // else{no-=30}
            selected.box.style.top = no + "px"
            
            // console.log(selected.box.style.left,selected.box.style.top)
            position_x.value = parseInt(selected.box.style.left)
            position_y.value = parseInt(selected.box.style.top)   
            // console.log(event)
        }
    })
    if(splitted!="none"){
        splitted = splitted.split("(")[1]
        splitted = splitted.split(")")[0]
        splitted = splitted.split(",")
        a = splitted[0]
        b = splitted[1]
        // c = splitted[2]
        // d = splitted[3]
        // x_pos = parseInt(splitted[4])
        // y_pos = parseInt(splitted[5])
        // selected.xOffset = x_pos 
        // selected.yOffset = y_pos 
        // scale_x = Math.sqrt(a*a + b*b)
        // scale_y = Math.sqrt(c*c+d*d)
        angle = Math.round(Math.atan2(b,a) * (180/Math.PI))  //converted to degree
        rotate_input.value = angle;
        // width_input.value = scale_x;
        // height_input.value = scale_y;
        
    }


    // background_color_input.value = selected.oldcolor
    zindex_input.value = cst.zIndex
    color_input.value = cst.color
    border_width_input.value = cst.borderWidth
    border_radius_input.value = cst.borderRadius
    border_color_input.value = cst.borderColor
    width_input.value = parseInt(cst.width)
    height_input.value = parseInt(cst.height)
    // console.log(cst)
    box_name_pad.querySelector("#"+selected.box.classList[0]).classList.add("select")
    selected.box.classList.add("select")
}
function unselect(){
    if(!selected.box){
        return
    }
    //not draggable
    // selected.box.removeEventListener("mousedown", dragStart, false);
    // selected.box.removeEventListener("mouseup", dragEnd, false);
    // selected.box.removeEventListener("mousemove", drag, false);
    
    selected.box.style.backgroundColor = selected.oldcolor

    selected.box.classList.remove("select")
    box_name_pad.querySelector("#"+selected.box.classList[0]).classList.remove("select")
    
    selected = {
        "box":null,
        "oldcolor":null,
        "active":false,
        "currentX":0,
        "currentY":0,
        "initialX":0,
        "initialY":0,
        "xOffset":0,
        "yOffset":0
    }
    

}
var boxes = []
class Box{
    constructor(box,name){
        this.element = box
        this.name = name

    }


}
add_button.onclick = function(){
    let box = document.createElement("div");



    box.style.width = "100px";
    box.style.height = "100px";
    box.style.transform = "rotate(0deg)";
    box.style.borderStyle = "solid"
    box.style.left = "0px"
    box.style.top = "0px"
    box.onclick = select_box
    box.style.zIndex = 0;


    box.addEventListener("keydown",(event)=>{
        console.log(event)
        event.stopPropagation()
        // if (event.keyCode==40){godown(1)}
        // if (event.keyCode==38){goup(1)}
        // if (event.keyCode==37){goleft(1)}
        // if (event.keyCode==39){goright(1)}
    })
    classname = "box-"+boxes.length
    box.classList.add(classname)
    box_object = new Box(box,classname)
    boxes.push(box_object);
    playground.appendChild(box);
    get_values(box)
    update_box_name_pad()
}
//get properties
function get_values(elem){
    var cst = window.getComputedStyle(elem,null);

    let bg = cst.getPropertyValue("background-color");


}

function update_box_name_pad(){
    boxes.forEach((box)=>{
        if(box_name_pad.querySelector("#"+box.name)){
            console.log("present:",box.name )
        }
        else{
            // console.log(playground.querySelector("."+box.name)) 
            console.log("absent:",box.name )
            x = document.createElement("div")
            
            box_name_pad.appendChild(x)
            x.id = box.name
            y = document.createElement("input")
            y.setAttribute("value",box.name)
            x.appendChild(y)
            x.addEventListener("click",(event)=>{
    // box_name_pad.querySelector("#"+selected.box.classList[0]).classList.add("select")
                box.element.click()
                
            })
        }

    })
}




submit_design_button = document.querySelector(".submit_design")
submit_design_button.addEventListener("click",write_code)
function write_code(event){
    html_code_full = ""
    css_code_full = ""
    boxes.forEach((box_object,index)=>{
        box = box_object.element
        // console.log(box_name_pad.querySelector("#box-0"))
        box_class_name = box_name_pad.querySelector("#" + box_object.name).childNodes[0].value.toLowerCase()
        html_code = '<div class="' + box_class_name + '"></div>'
        css_code = 'div.'+box_class_name+"{"

        //the pos
        css_code += "position:absolute;"
        css_code += "left:"+ position_x.value + "px;"
        css_code += "top:"+ position_y.value + "px;"
        
        //width and height
        css_code += "width:" + width_input.value + "px;"
        css_code += "width:" + height_input.value + "px;"

        //border
        if(box.style.borderWidth){css_code+="border:"+box.style.borderWidth+";"}
        if(box.style.borderColor){css_code+="border:"+box.style.borderColor+";"}
        if(box.style.border){css_code+="border:"+box.style.border+";"}
        if(box.style.borderRadius){css_code+="border-radius"+box.style.borderRadius+";" }
        

        //color
        if(box.style.color){css_code+="color:"+box.style.color +";"}
        if(box.style.backgroundColor){css_code+="background-color:"+box.style.backgroundColor+";"}
        
        //rotate
        if(box.style.transform){css_code += "transform:"+box.style.transform+";"}
        if(box.style.zIndex){css_code += "z-index:"+box.style.zIndex+";"}
        
        
        // if(_________________){__________________________}



        css_code += "}"
        
        html_code_full += html_code + "\n\n"
        css_code_full += css_code + "\n\n"
    })
    
    console.log(html_code_full)
    console.log(css_code_full)
}



