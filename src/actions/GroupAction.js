import $ from 'jquery';

export default function(groupsData){
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + ('/groups'),
        data: groupsData
    });
    return{
        type: "REGISTER",
        payload: thePromise
    }
}
