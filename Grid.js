class Grid{

    constructor(){
        this.gridSize = 20;
    }

    //To change the text that indicates the snakes size at the top of the page
    setSizeLabelText(size){
        document.getElementById('sizeText').innerHTML = size;
    }




    //to dynamically change the slider position in the range slider
    setRangeSliderPos(newPosition){
        document.querySelector('input[type=range]').value = newPosition;
        this.updateSpeedCount();
    }




    //Updates the speed above the range slider
    updateSpeedCount(){
        let sliderValue = document.getElementById('speedRange').value;
        document.getElementById('speedText').innerHTML = sliderValue;
    }



    //Sets the speed with the value from the slider
    //playable speed is any value between 15 and 60.
    //15 is fast and 60 slowest
    speedAdjaster(){
        let sliderValue = document.getElementById('speedRange').value;
        //speddInterval is defined in Game.js
        speedInterval   = (100-sliderValue )/2 + 14;
    }


    //to toggle the grid on or off
    togleGridOnOff(){
        let bg = document.getElementById('gridBg').style.backgroundColor;
        if( bg != 'white')
            document.getElementById('gridBg').style.backgroundColor = 'white';
            //setGridBackgroungColor('white');
            else
                document.getElementById('gridBg').style.backgroundColor = 'black';
            //setGridBackgroungColor('black');
        }







    //Next five functins were written by Prof. Jinqiu Liu.
    //I did not add code to this fucntions but I did delete some lines because they were not neccessary anymore.
    //I didn't put this in a different file because there are only five and make more sense that are in this same file.
    /*************************************************************************************************************************************/

    //@Author Jinqiu Liu
    clearGrid() { //sample 4
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.setButtonColor(i, j, "white");
            }
        }
    }




    //@Author Jinqiu Liu
    fillMatrix() {
        var matrix = document.getElementById("grid");
        for (let i = 0; i < this.gridSize; i++) {
            var newRow = this.createRow("justify-content-md-center m-0");
            for (let j = 0; j < this.gridSize; j++) {
                newRow.appendChild( this.createDefaultButton(i, j) );
            }
            matrix.appendChild(newRow);
        }
    }



    //@Author Jinqiu Liu
    createRow(className) {
        var rowDiv = document.createElement("div");
        if (className == null) {
            rowDiv.className = "row";
        }
        else {
            rowDiv.className = "row " + className;
        }

        return rowDiv;
    }



    //@Author Jinqiu Liu
    createDefaultButton(i, j) {
        var button = document.createElement("div");
        button.className = "thumbnail";
        button.style.marginLeft = "1px";
        button.style.marginTop = "-3px";

        //the image part
        var img = document.createElement("img");
        img.id = "img_" + i + "_" + j;
        img.setAttribute("src", "images/white.jpg");
        img.setAttribute("alt", "white");
        img.setAttribute("width", "20");
        img.setAttribute("height", "20");

        //the text part
        var text = document.createElement("label");
        text.setAttribute("class", "caption unselectable");
        text.id = "text_" + i + "_" + j;

        button.appendChild(img);
        button.appendChild(text);

        return button;
    }




    //@Author Jinqiu Liu
    setButtonColor(i, j, color) {
        let button = document.getElementById("img_" + i + "_" + j);
        button.setAttribute("src", "images/" + color + ".jpg");
        button.setAttribute("alt", color);
    }

    //@Author Jinqiu Liu
    getButtonColor(i, j) {
      var img = document.getElementById("img_" + i + "_" + j);
      return img.getAttribute("alt");
    }



}
