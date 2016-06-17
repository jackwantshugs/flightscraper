flightPosts = document.getElementsByClassName("blogpost_preview_fw");
for (var i = 0; i < flightPosts.length; ++i) {
    var item = flightPosts[i];  
    if(item.innerText.indexOf('UK') > -1){
        console.log(item.innerText);
    }
}