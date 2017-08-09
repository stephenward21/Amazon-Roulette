
export default function(actionToTake){
    console.log("Open nav action here...")
    console.log(actionToTake)
    return{
        type: "OPEN_LOGIN",
        payload: actionToTake
    }
}

