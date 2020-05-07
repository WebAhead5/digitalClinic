


function getPostTime(timeInMilliseconds)
{
    let articleTime = new Date(timeInMilliseconds);
    let difference_In_Time = new Date(Date.now()).getTime() - articleTime;
    let difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    let difference_In_Hrs = difference_In_Time/(1000*3600) ;
    let difference_In_mins = difference_In_Time/(1000*60) ;


    if (difference_In_Days >= 10)
        return articleTime.toDateString();

    if (difference_In_Days > 2)
        return parseInt(difference_In_Days) + " days ago";

    if (difference_In_Days >= 1)
        return "yesterday";

    if (difference_In_Hrs > 1)
    {
        let intHrs = parseInt(difference_In_Hrs );
        return intHrs + (intHrs ===1? " hour ago" : " hours ago");
    }

    let intMins = parseInt(difference_In_mins);
    return  intMins + (intMins ===1? " minute ago" : " minutes ago");
}



function isNumber(val){
 return !isNaN(val)

}


function toggler() {
    console.log("toggler")
    const drCertificate = document.getElementById('doctorCertificate');
    drCertificate.classList.toggle('visible')

}


function equals (val1,val2) {
    
    return val1===val2;

} 



module.exports= {getPostTime, toggler, isNumber,equals}

