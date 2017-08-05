import $ from 'jquery';

export default function(groupsData){
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + ('/groups'),
        data: groupsData
    });
    return{
        type: "GROUP_REG",
        payload: thePromise
    }
}
