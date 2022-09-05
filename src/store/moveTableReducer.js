const defaultState = {moveTableReducer: {}}
const TABLE = "TABLE"
export const moveTableReducer = (state=defaultState, action)=>{
    switch(action.type){
        case TABLE:
            return{moveTableReducer: action.payload}
        default:
            return state
    }
}

export const moveTable=(payload)=>({
    type: TABLE, payload
})