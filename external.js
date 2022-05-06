//we call first page to have our movie list without clicking any thing :)
firstPage()

// a function that make movie list and movies's information and starship button
function firstPage() {
    document.getElementById("header").textContent = "Star Wars Series";
    document.getElementById("mainDiv").innerHTML = "";
    document.getElementById("buttonDiv").innerHTML = "";
    //fetchind data from swapi api
    fetch('https://swapi.dev/api/films/')
        .then(response => response.json())
        .then(data => {
            let count = data.count;
            res = data.results;
            //for each episode of movie
            res.forEach(element => {
                //console.log(element);

                //create a div for each episode content to show
                var div = document.createElement("div");
                div.setAttribute("class", "movie");
                div.style.whiteSpace = "nowrap";

                //just an icon of lightsaber for every line in first page
                var lightsaber = document.createElement("img");
                lightsaber.setAttribute("src", "lighseber.png");
                lightsaber.setAttribute("alt", " ");
                lightsaber.setAttribute("width", "20");
                lightsaber.setAttribute("height", "20");
                lightsaber.style.display = "inline-block";
                lightsaber.style.marginLeft = "6mm";
                lightsaber.style.marginRight = "3mm";
                div.appendChild(lightsaber);

                //name of episode
                var name = document.createElement("P");
                name.style.display = "inline-block"
                name.setAttribute("class", "movietitle");
                var t = document.createTextNode(element.title);
                name.appendChild(t);
                div.appendChild(name);

                //episode id paragraph
                var episode_id = document.createElement("P");
                episode_id.style.display = "inline-block";
                episode_id.setAttribute("class", "episodeAndDate");
                var tmp1 = document.createTextNode(" episode id : ");
                episode_id.appendChild(tmp1);
                var tmp2 = document.createTextNode(element.episode_id);
                episode_id.appendChild(tmp2);
                episode_id.style.marginLeft = "6mm";
                div.appendChild(episode_id);

                // release data paragraph
                var release_date = document.createElement("P");
                release_date.style.display = "inline-block";
                release_date.setAttribute("class", "episodeAndDate");
                var tmp3 = document.createTextNode(",  release date : ");
                release_date.appendChild(tmp3);
                var tmp4 = document.createTextNode(element.release_date);
                release_date.appendChild(tmp4);
                release_date.style.marginLeft = "1mm";
                div.appendChild(release_date);

                // button of starships
                var button = document.createElement("button");
                button.style.display = "inline-block";
                button.setAttribute("class", "mybutton");
                var tmp5 = document.createTextNode("STAR  SHIPS");
                button.appendChild(tmp5);
                button.onclick = function() { starship(element.title) };
                div.appendChild(button);


                //adding div of this episode to main div and show :)
                document.getElementById("mainDiv").appendChild(div);
            });
        })

    .catch(error => {
        //handle error
        console.log("error1")
    });

}

//when we press starship button every thind in maindiv disappear and new information about starships show up
//title parameter show us whis episode information shoud be loaded
function starship(title) {
    document.getElementById("mainDiv").innerHTML = "";
    document.getElementById("header").textContent = "STAR   SHIPS";

    //place home button to go back to episode list whenever we want
    var home = document.createElement("button");
    home.setAttribute("class", "home");
    var tmp10 = document.createTextNode("HOME");
    home.appendChild(tmp10);
    home.onclick = function() { firstPage() };
    document.getElementById("buttonDiv").appendChild(home);

    // fetching data of movies again to cath star ship of this episode
    fetch('https://swapi.dev/api/films/')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            res = data.results;
            res.forEach(element => {
                if (element.title === title) {
                    var starship = element.starships;
                    let num = starship.length;
                    //alert("number of starships is " + num);

                    /* important comment 
                    we show every 4 star ship in one page 
                    bellow code hande disapper of pervious page and showing data of page we clicked on
                    */


                    let numpage = Math.floor(num / 4);
                    let num_res = num % 4;
                    if (num_res != 0) {
                        numpage++;
                    }
                    // we should have sth without clicking :) but if we had less than 4 starship we should click on page to show data
                    if (num > 3) {
                        page_click(starship[0], starship[1], starship[2], starship[3], title, 1);
                    }
                    //creating every page of starship
                    for (let i = 1; i <= numpage; i++) {
                        //creating last page that may contain less than 4
                        if (i == numpage && num_res != 0) {

                            //creating button of every page
                            var page = document.createElement("button");
                            page.setAttribute("id", "page" + i);
                            page.setAttribute("class", "home");
                            var tmp100 = document.createTextNode("" + i);
                            page.appendChild(tmp100);

                            if (num_res == 3) {
                                page.onclick = function() { page_click(starship[(i - 1) * 4], starship[(i - 1) * 4 + 1], starship[(i - 1) * 4 + 2], "0", title, i); };
                            }
                            if (num_res == 2) {
                                page.onclick = function() { page_click(starship[(i - 1) * 4], starship[(i - 1) * 4 + 1], "0", "0", title, i); };
                            }
                            if (num_res == 1) {
                                page.onclick = function() { page_click(starship[(i - 1) * 4], "0", "0", "0", title, i); };
                            }
                            document.getElementById("buttonDiv").appendChild(page);


                        }

                        //creating other pages exept last page
                        else {

                            var page = document.createElement("button");
                            page.setAttribute("id", "page" + i);
                            page.setAttribute("class", "home");
                            var tmp100 = document.createTextNode("" + i);
                            page.appendChild(tmp100);
                            page.onclick = function() { page_click(starship[(i - 1) * 4], starship[(i - 1) * 4 + 1], starship[(i - 1) * 4 + 2], starship[(i - 1) * 4 + 3], title, i); };
                            document.getElementById("buttonDiv").appendChild(page);

                        }
                    }

                }

            });


        })

    .catch(error => {
        //handle error
        console.log("error2")
    });


}


// when we click on every page button this function get url of starships and call fetch and show function
//if we have less than 4 we pass "0"
//title and i are just used to make an unique id
function page_click(input1, input2, input3, input4, title, i) {
    document.getElementById("mainDiv").innerHTML = "";

    if (input1 != "0") {
        console.log("hi");
        let tmp103 = "" + title + i + "1";
        fetchAndshow(input1, tmp103);
    }


    if (input2 != "0") {
        let tmp104 = "" + title + i + "2";
        fetchAndshow(input2, tmp104);

    }
    if (input3 != "0") {
        let tmp101 = "" + title + i + "3";
        fetchAndshow(input3, tmp101);
    }


    if (input4 != "0") {
        let tmp102 = "" + title + i + "4";
        fetchAndshow(input4, tmp102);
    }
}

//get url of one starship and fet it's data and also creat a div to show name of starship
//div id is a unique id that pass to identify every div in our code , maybe useless but maybe usefull :)
function fetchAndshow(url, div_id) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            //creating a div for this starship
            var div = document.createElement("div");
            div.setAttribute("id", div_id);
            div.setAttribute("class", "starship_div");
            div.style.whiteSpace = "nowrap";
            // just an icon befor name of starship
            var space_img = document.createElement("img");
            space_img.setAttribute("src", "spaceship.png");
            space_img.setAttribute("alt", " ");
            space_img.setAttribute("width", "30");
            space_img.setAttribute("height", "30");
            space_img.style.display = "inline-block";
            space_img.style.marginLeft = "6mm";
            space_img.style.marginRight = "3mm";
            div.appendChild(space_img);

            //paragraph of name of starship
            var name = document.createElement("P");
            name.style.display = "inline-block";
            name.setAttribute("class", "movietitle");
            var t = document.createTextNode(data.name);
            name.appendChild(t);
            div.appendChild(name);
            name.onclick = function() { clickedstarship(data.model, data.manufacturer, data.passengers, data.pilots, div_id) };
            document.getElementById("mainDiv").appendChild(div);
        })
        .catch(error => {
            //handle error
            console.log("error3");
        });
}

//a function that handle showing information when we click on starship name
function clickedstarship(model, manufacturer, passengers, pilots, div_id) {
    var mydiv = document.getElementById(div_id);

    //model paragraph
    var mymodel = document.createElement("P");
    mymodel.style.display = "inline-block";
    mymodel.setAttribute("class", "episodeAndDate");
    var tmp11 = document.createTextNode(" model : ");
    mymodel.appendChild(tmp11);
    var tmp12 = document.createTextNode(model);
    mymodel.appendChild(tmp12);
    mymodel.style.marginLeft = "1mm";
    mydiv.appendChild(mymodel);

    //manufacturer paragraph
    var mymanifactur = document.createElement("P");
    mymanifactur.style.display = "inline-block";
    mymanifactur.setAttribute("class", "episodeAndDate");
    var tmp13 = document.createTextNode(" , manufacturer : ");
    mymanifactur.appendChild(tmp13);
    var tmp14 = document.createTextNode(manufacturer);
    mymanifactur.appendChild(tmp14);
    mymanifactur.style.marginLeft = "1mm";
    mydiv.appendChild(mymanifactur);

    //number of passengers paragraph
    var mypassengers = document.createElement("P");
    mypassengers.style.display = "inline-block";
    mypassengers.setAttribute("class", "episodeAndDate");
    var tmp15 = document.createTextNode(" , passengers : ");
    mypassengers.appendChild(tmp15);
    var tmp16 = document.createTextNode(passengers);
    mypassengers.appendChild(tmp16);
    mypassengers.style.marginLeft = "1mm";
    mydiv.appendChild(mypassengers);

    //going to next line to show list of pilotes
    var br = document.createElement("br");
    mydiv.appendChild(br);

    //just write pilots : 
    var pilot_head = document.createElement("P");
    pilot_head.style.display = "inline-block";
    pilot_head.setAttribute("class", "episodeAndDate");
    var tmp150 = document.createTextNode('\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + " pilots : ");
    pilot_head.appendChild(tmp150);
    pilot_head.style.marginLeft = "1mm";
    mydiv.appendChild(pilot_head);

    //fetching names of every pilot and show it 
    pilots.forEach(element => {

        fetch(element)
            .then(response => response.json())
            .then(data => {

                var pilot = document.createElement("P");
                pilot.style.display = "inline-block";
                pilot.setAttribute("class", "episodeAndDate");
                var tmp160 = document.createTextNode(data.name + " , ");
                pilot.appendChild(tmp160);
                pilot.style.marginLeft = "1mm";
                mydiv.appendChild(pilot);

            })

        .catch(error => {
            //handle error
            console.log("error2")
        });

    });




}