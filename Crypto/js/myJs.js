const allUrl = "https://api.coingecko.com/api/v3/coins/";

// Preloader
    $("#spinner").show();

    let myResult = [];

// Ajax request
$(getData = ()=>{
    $.ajax({
        type: "GET",
        url: allUrl,
        success: response => allCoins(response),
        error: err => console.log(err),
    });
});

//Create a cards
const allCoins = (data)=>{
    $("#spinner").remove();
    //Display 100 coins
    //let coins = data.slice(0, 100);
    sessionStorage.setItem("allCoins", JSON.stringify(data));
    data.map((item)=>{
        $("#result").append(`
        <div class="Box">
                <p class="text-uppercase"><strong>${item.symbol}</strong></p><br/>
                <p >${item.id}</p><br/>
<!-- More info button-->
                <button class="btn btn-success" type="button" id="${item.id}" onclick="moreInfo(this.id)" data-toggle="collapse" data-target="#moreInfoCollapse" aria-expanded="false" aria-controls="moreInfoCollapse">
                More Info
                </button>
                <div class="collapse ${item.id}" id="moreInfoCollapse">
                    <div class="card card-body" id="moreInfoCard">
                        <img src= ${item.image.large}  alt ="" class="coinLogo"><br/>
                        <div class="coinInfo">
                        ${"USD "+item.market_data.current_price.usd+"$"}<br/>
                        ${"EUR "+item.market_data.current_price.eur+"€"}<br/>
                        ${"ILS "+item.market_data.current_price.ils+"₪"}
                        </div>
                    </div>
                </div>
<!-- Toggle button-->
        <div class="custom-control custom-switch" id="toggleSwitch">
            <input type="checkbox" class="custom-control-input" id="${item.name}" value="${item.name}" onchange="addCoin(this)">
            <label class="custom-control-label" for="${item.name}"></label>
        </div>            
        </div>
        `)
        $(".collapse").hide();
    });
    myResult= JSON.parse(sessionStorage.getItem('allCoins'));
    //console.log(myResult);
    coinsList.splice(0);
};

// More info card
const moreInfo = (coinId) => {
    $('.'+coinId).toggle(); 
    setInterval(getData, 120000);
    console.log("interval is starting");  
};

// Selected coins list
let coinsList = [];
let newList = [];
    const addCoin = (element) => {
        let selectedCoin = element.value;
        if (element.checked) {
            coinsList.push(selectedCoin);
        } else {
            
            let index = coinsList.indexOf(selectedCoin);
                coinsList.splice(index, 1);
        };
        console.log(coinsList);
        if(coinsList.length>5){
            coinsList.splice(5, 1);
            newList.splice(0);
            newList.push(...coinsList);
            $(element).prop('checked', false);
            $('#myModal').modal('show');
            coinsList.map((item)=>{
                $(".modal-body").append(`
                <div class="custom-control custom-switch" >
                <input type="checkbox" class="custom-control-input" id="${item}"  value="${item}" onchange="removeCoin(this)" checked>
                <label class="custom-control-label" for="${item}">${item}</label>
                </div>
                `)
            });
        };
    };

    // Modal cancel button
    $("#cancelBtn").click(function () {
        $('.modal-body').empty();
        //To uncheck all the checkboxes
        //$("[type=checkbox]").prop('checked', false);
        console.log(coinsList);
        });

    // Modal save button
        $("#saveBtn").click(function(){
            $('#myModal').modal('hide');
            $('.modal-body').empty();
            coinsList.splice(0, coinsList.length, ...newList);
            console.log(coinsList);
        }) ;

// Remove from the list
const removeCoin = (element) =>{
    let newCoin = element.value;
    if (element.checked) {
        newList.push(newCoin);
    } else {
        let index = newList.indexOf(newCoin);
        newList.splice(index, 1);
    };
    console.log(newList);
};

let aboutMe = `
<div class="aboutBox">
<img src= "media/alex.jpg"  alt ="" class="myPhoto"/><br/>
<h2>About me</h2>
Hello, my name is Alexandr Koryagin.<br/>
I am an Fullstack Web Developer and Industrial designer.<br/>
Education: In 2022 I graduated from John Bryce academy, Israel.<br/>
Fullstack Web Development.<br/>
In 2016 I graduated from H.I.T Holon Institute of Technology, Israel.<br/>
B.Design in Industrial Design.<br/><br/>
Experience: During four years of studying and project working as<br/>
a freelance designer I had experience of
cooperation with companies as<br/>
Xiaomi, Keter Plastic, TinyLove, OTOTO, Kong, ExitRoom etc.<br/>
Email: alexkor2204@gmail.com<br/>
Tel: 0503078524<br/>
https://www.linkedin.com/in/alexandr-koryagin/

</div>
` 
// About button
$("#aboutBtn").click(()=>{
    $("#result").html(aboutMe);
    console.log("about");
});

//Home button
$("#homeBtn").click(()=>{
    $("#result").html('');
    getData();
    console.log("home");
});

// Search
$("#searchBtn").click(()=>{
    const foundCoin = myResult.filter(item => item.id === ($("#searchField").val()) || item.symbol ===($("#searchField").val()));
    console.log(foundCoin);
    $("#result").html(`
    <div class="Box">
                <p class="text-uppercase"><strong>${foundCoin[0].symbol}</strong></p><br/>
                <p >${foundCoin[0].id}</p><br/>
<!-- More info button-->
                <button class="btn btn-success" type="button" id="${foundCoin[0].id}" onclick="moreInfo(this.id)" data-toggle="collapse" data-target="#moreInfoCollapse" aria-expanded="false" aria-controls="moreInfoCollapse">
                More Info
                </button>
                <div class="collapse ${foundCoin[0].id}" id="moreInfoCollapse">
                    <div class="card card-body" id="moreInfoCard">
                        <img src= ${foundCoin[0].image.large}  alt ="" class="coinLogo"><br/>
                        <div class="coinInfo">
                        ${"USD "+foundCoin[0].market_data.current_price.usd+"$"}<br/>
                        ${"EUR "+foundCoin[0].market_data.current_price.eur+"€"}<br/>
                        ${"ILS "+foundCoin[0].market_data.current_price.ils+"₪"}
                        </div>
                    </div>
                </div>
<!-- Toggle button-->
        <div class="custom-control custom-switch" id="toggleSwitch">
            <input type="checkbox" class="custom-control-input" id="${foundCoin[0].name}" value="${foundCoin[0].name}" onchange="addCoin(this)">
            <label class="custom-control-label" for="${foundCoin[0].name}"></label>
        </div>            
        </div>
    `);
});

$("#cryptonite").on('click', function(){
    $("#result").html('');
    getData();
    console.log("cryptonite");
});
$("#cryptonite").css('cursor', 'pointer');


