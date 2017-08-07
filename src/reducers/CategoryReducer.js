export default function(state =[], action){
    if(action.type === "UPDATE_CAT"){
        console.log(action.payload)
        return action.payload;
    }else{
        return state;
    }
}