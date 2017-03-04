function Currencyconv(){
    
    var usd, inr;
    usd = document.getElementById("#usd").html();
    inr = usd * 67.20;
    document.getElementById("#Currency").html("Rs." + inr);
}
