const myUrl = "https://restcountries.com/v2/name/";
const allUrl= "https://restcountries.com/v2/all"

$(()=>{
    $("#search").click(()=>{
        getData();
    });

});
function getData() {
    $.ajax({
        type: "GET",
        url: myUrl + ($("#countryName").val()),
        success: (response)=>{ countryData(response)},
        error: err=>console.log(err),
    });
};
//Function that hides the country information element
$(()=>{
    $("#countryInfo").hide();
});
// Function creates the country information element
const countryData = (response)=>{
    const flag = response[0].flag;
    console.log(response[0]);
    $("#name").html("Country name: "+ response[0].name);
    $("#topLevelDomain").html("Top Level Domain: " + response[0].topLevelDomain);
    $("#capital").html("Capital City: " + response[0].capital);
    $("#currencies").html("Currency name: " + response[0].currencies[0].name);
    $("#flag").html("<img src= " + flag + ">");
    $("#countryInfo").show();
    $("#countryName").val("");
};
function allCountries(){
    console.log(allUrl);
    $.ajax({
        type: "GET",
        url: allUrl,
        success: (response)=>{ countryData(response)},
        error: err=>console.log(err),
});
};
