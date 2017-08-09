export default function(state =[], action){
    console.log(action.type)
    console.log(action)
    if(action.type === "OPEN_LOGIN"){
        console.log(action.payload + 'is about to occur')
        return action.payload;
    }else{
        return state;
    }
}