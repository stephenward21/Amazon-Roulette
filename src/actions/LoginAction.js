import $ from 'jquery';

export default function(loginData){
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + ('/'),
        data: loginData
    });
    return{
        type: "REGISTER",
        payload: thePromise
    }
}
