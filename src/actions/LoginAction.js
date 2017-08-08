import $ from 'jquery';

export default function(loginData){
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + ('/home'),
        data: loginData
    });
    return{
        type: "REGISTER",
        payload: thePromise
    }
}
