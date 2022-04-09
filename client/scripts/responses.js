var x = 0;
let proceed_button = false;

var ind_var = []

function confirm_button(cat_value){
    if(cat_value == "uiLocations"){
        cat_response = document.getElementById("uiLocations").value
        ind_var.push(cat_response)
        console.log(ind_var)
    }
    if(cat_value == "uiBHK"){
        cat_response = document.querySelector('input[name="uiBHK"]:checked').value
        ind_var.push(parseInt(cat_response))
        console.log(ind_var)
    }
    if(cat_value == "uiBathrooms"){
        cat_response = document.querySelector('input[name="uiBathrooms"]:checked').value
        ind_var.push(parseInt(cat_response))
        console.log(ind_var)
    }
    if(cat_value == "uiSqft"){
        cat_response = document.getElementById("uiSqft").value
        ind_var.push(parseFloat(cat_response))
        console.log(ind_var)

    }
    userText = cat_response;
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

function EstimatePrice() {
    //console.log("Estimate price button clicked");
  
    var url = "http://127.0.0.1:5000/predict_home_price";
  
    $.post(url, {
        total_sqft: ind_var[3],
        bhk: ind_var[1],
        bath: ind_var[2],
        location: ind_var[0]
    },function(data, status) {
        console.log(data.estimated_price);
        setTimeout(() => {
            let infHtml = `<p class="botText"><span> Name:` + Hname() + `<br> Price: &#8369;${parseFloat(data.estimated_price)} </span></p>`;
            //let botHtml = document.getElementById("output").style.backgroundImage = "url('" + Link() + "')";
            $("#chatbox").append(infHtml);
            document.getElementById("output").style.backgroundImage = "url('" + Link() + "')";
            document.getElementById("output").style.backgroundUrl = '';
            //$("#output").append(botHtml.style.backgroundUrl = '');
        }, 1000)
    });
  }




function getHardResponse(userText) {
    if (userText == "I would like to buy a house") {
        let botHtml =   `
        <p class="botText">
        <span> Where would you like it to be located? <br/>
        <select class="location" name="" id="uiLocations">
        <option value="" disabled="disabled" selected="selected">Choose a Location</option>
            <option>davao city</option>
            <option>quezon city</option>
        </select>
        <button onclick="confirm_button('uiLocations')">Confirm</button>
        </span></p>
        
        `;

        var url = "http://127.0.0.1:5000/get_location_names";
        $.get(url,function(data, status) {
            if(data) {
                var locations = data.locations;
                $('#uiLocations').empty();
                for(var i in locations) {
                    var opt = new Option(locations[i]);
                    $('#uiLocations').append(opt);
                }
            }
        });

        $("#chatbox").append(botHtml);
        x += 1;
        userText = ""


    } else if (userText == "Nevermind") {
        let botHtml = '<p class="botText"><span> Hope to see you again. </span></p>';
        $("#chatbox").append(botHtml);
    }

    if (x == "1") {
        loc = [
            "alaminos",
            "angeles",
            "antipolo",
            "bacolod",
            "bacoor",
            "bago",
            "baguio",
            "bais",
            "balanga",
            "batac",
            "batangas",
            "bayawan",
            "baybay",
            "bayugan",
            "bislig",
            "bogo",
            "borongan",
            "butuan",
            "cabadbaran",
            "cabanatuan",
            "cabuyao",
            "cadiz",
            "cagayan de oro",
            "calamba",
            "calapan",
            "calbayog",
            "caloocan",
            "candon",
            "canlaon",
            "carcar",
            "catbalogan",
            "cauayan",
            "cavite city",
            "cebu city",
            "cotabato city",
            "dagupan",
            "danao",
            "dapitan",
            "davao city",
            "digos",
            "dipolog",
            "dumaguete",
            "el salvador",
            "escalante",
            "gapan",
            "general santos",
            "general trias",
            "gingoog",
            "guihulngan",
            "himamaylan",
            "ilagan",
            "iligan",
            "iloilo city",
            "imus",
            "iriga",
            "isabela",
            "kabankalan",
            "kidapawan",
            "koronadal",
            "la carlota",
            "lamitan",
            "laoag",
            "lapu-lapu",
            "legazpi",
            "ligao",
            "lipa",
            "lucena",
            "maasin",
            "mabalacat",
            "makati",
            "malabon",
            "malaybalay",
            "malolos",
            "mandaluyong",
            "mandaue",
            "manila",
            "marawi",
            "marikina",
            "masbate",
            "mati",
            "meycauayan",
            "muntinlupa",
            "naga",
            "navotas",
            "olongapo",
            "ormoc",
            "oroquieta",
            "ozamiz",
            "pagadian",
            "palayan",
            "panabo",
            "pasay",
            "pasig",
            "passi",
            "puerto princesa",
            "quezon city",
            "roxas",
            "sagay",
            "samal",
            "san carlos",
            "san fernando",
            "san jose",
            "san jose del monte",
            "san juan",
            "san pablo",
            "san pedro",
            "santa rosa",
            "santiago",
            "santo tomas",
            "silay",
            "sipalay",
            "sorsogon city",
            "surigao",
            "tabaco",
            "tabuk",
            "tacloban",
            "tacurong",
            "tagaytay",
            "tagbilaran",
            "taguig",
            "tagum",
            "talisay",
            "tanauan",
            "tandag",
            "tangub",
            "tanjay",
            "tarlac city",
            "tayabas",
            "toledo",
            "trece martires",
            "tuguegarao",
            "urdaneta",
            "valencia",
            "valenzuela",
            "victorias",
            "vigan",
            "zamboanga city"
            ]
        if (checkValue(userText, loc) == true) {
            let botHtml = `
            <p class="botText">
            <span>
            How many BHK?<br/>
            <input type="radio" id="radio-bhk-1" name="uiBHK" value="1"/>
            <label for="radio-bhk-1">1</label>
            <input type="radio" id="radio-bhk-2" name="uiBHK" value="2" checked/>
            <label for="radio-bhk-2">2</label>
            <input type="radio" id="radio-bhk-3" name="uiBHK" value="3"/>
            <label for="radio-bhk-3">3</label>
            <input type="radio" id="radio-bhk-4" name="uiBHK" value="4"/>
            <label for="radio-bhk-4">4</label>
            <input type="radio" id="radio-bhk-5" name="uiBHK" value="5"/>
            <label for="radio-bhk-5">5</label>
            <button onclick="confirm_button('uiBHK')">Confirm</button>
        </span>
        </p>
            `;
            $("#chatbox").append(botHtml);
            x += 1;
            userText = "";
        }
    }

    if (x == "2") {
        if (between(userText, 1, 5)) {
            let botHtml = `
            <p class="botText">
            <span>
            How many bathrooms? (1-5)<br/>
            
            <input type="radio" id="radio-bath-1" name="uiBathrooms" value="1"/>
            <label for="radio-bath-1">1</label>
            <input type="radio" id="radio-bath-2" name="uiBathrooms" value="2" checked/>
            <label for="radio-bath-2">2</label>
            <input type="radio" id="radio-bath-3" name="uiBathrooms" value="3"/>
            <label for="radio-bath-3">3</label>
            <input type="radio" id="radio-bath-4" name="uiBathrooms" value="4"/>
            <label for="radio-bath-4">4</label>
            <input type="radio" id="radio-bath-5" name="uiBathrooms" value="5"/>
            <label for="radio-bath-5">5</label>
            <button onclick="confirm_button('uiBathrooms')">Confirm</button>
            
            </span>
            </p>
            `;
            $("#chatbox").append(botHtml);
            x += 1;
            userText = "";
        } 
    }

    if (x == "3") {
        if (between(userText, 1, 1000)) {
            let botHtml = `<p class="botText"><span> How big should the area be? (Square Feet) <br />
            
            <input class="area"  type="text" id="uiSqft" class="floatLabel" name="Squareft" value="1000">
            <button onclick="confirm_button('uiSqft')">Confirm</button>
            
            </span></p>`;
            $("#chatbox").append(botHtml);
            x += 1;
            userText = "";
        } 
    }
    
    if (x == "4") {
        if (between(userText, 1, 1000000)) {
            let botHtml = '<p class="botText"><span> Results will be given shortly.</span></p>';
            $("#chatbox").append(botHtml);
            x = 0;
            userText = "";
            EstimatePrice()
        }
    }
}

function checkValue(value, arr) {
    for (var i = 0; i < arr.length; i++) {
        var name = arr[i];
        if (name == value) {
            return true;
        }
    }
}

function between(x, min, max) {
    return x >= min && x <= max;
}

function Link(poutput) {
    var pictures = ["https://hanselmanblogcontent.azureedge.net/WindowsLiveWriter/HowToUseGoogleEarthandSketchItUptoVisual_144CC/reality_2.jpg",
                    "https://i.pinimg.com/originals/eb/a7/cb/eba7cbf153d7770e613cdc300a28587d.jpg",
                    "https://image.cnbcfm.com/api/v1/image/104381663-thumbnail.jpg?v=1529474704",
                    "https://www.mercurynews.com/wp-content/uploads/2020/01/2020-01-san-jose-downtown-GOOGVILLAGE-02.jpg",
                    "https://www.mercurynews.com/wp-content/uploads/2021/08/SJM-L-DOOBIE-0805-1.jpg",
                    "https://activerain.com/image_store/uploads/agents/results/files/1474%20Sharon%20Manor%20Court,%20San%20Jose%20CA%20Front%20View%20flyer.jpg",
                    "https://i.pinimg.com/originals/5f/bf/d1/5fbfd14376a27a223d6508935eaeaf6b.jpg",
                    "http://www.clickdavao.com/realestate/properties/asstd-upload/davao-city-properties-for-sale-28052015041234IMG_7300.JPG",
                    "https://cdn.vox-cdn.com/thumbor/6itLJS9BZ-B5gXPjM1AB_z-ZKVI=/0x0:3000x2000/1200x800/filters:focal(1260x760:1740x1240)/cdn.vox-cdn.com/uploads/chorus_image/image/65890203/iStock_1067331614.7.jpg",
                    "https://cdn.shopify.com/s/files/1/0043/8471/8938/products/164160587923314115_64a79228-66a9-48c9-a67c-7fbc17e00b7b.jpg?v=1642433602"];

    return poutput = pictures[Math.floor(Math.random() * pictures.length)];
}

function Hname(houtput) {
    var housename = ["Lakeways", "Riverside", "Ashley End", "Ivylands", "Grey House",
                     "Roselands", "Bridge End", "Pearlands", "Orchardways", "The Pears"];

    return houtput = housename[Math.floor(Math.random() * housename.length)];
}