const defaultState = {moveReducer:false}
const MOVE = "MOVE"
export const moveReducer = (state=defaultState, action)=>{
    switch(action.type){
        case MOVE:
            return{moveReducer: action.payload}
        default:
            return state
    }
}

export const booleanMove=(payload)=>({
    type: MOVE, payload
})