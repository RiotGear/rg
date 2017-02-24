var rg_date_cdn_momentjs = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js" ;
var rg_credit_card_payment_fonts = "https://cdnjs.cloudflare.com/ajax/libs/paymentfont/1.1.2/css/paymentfont.min.css" ;
var rg_markdown_cdn_markdown = "https://cdnjs.cloudflare.com/ajax/libs/markdown-it/8.3.0/markdown-it.min.js" ;

function loadJS(file, callback) {
    // DOM: Create the script element
    var script = document.createElement("script");
    // set the type attribute
    script.type = "application/javascript";
    // make the script element load file
    script.src = file;
    script.onload = callback;
    script.onreadystatechange = callback;
    // finally insert the element to the body element in order to load the script
    document.head.appendChild(script);
}


function toBoolean (bool) {
  if (bool) {
     if (typeof bool === "string") {
        if (bool.toLowerCase() === "true" || bool.toLowerCase() === "false")
           if (bool.toLowerCase() ==="true")
              return true ;
           else
              return false ;
        }
     else if (typeof bool == "boolean")
        return bool ;
     }
  else
    return undefined ;

}
