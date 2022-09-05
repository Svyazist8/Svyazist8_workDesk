const defaultState = {refreshReducer: null}
const refresh = "refresh"
export const refreshReducer = (state=defaultState, action)=>{
    switch(action.type){
        case refresh:
            return{...state, refreshReducer: state.refreshReducer+action.payload}
        default:
            return state
    }
}

export const refreshData=(payload)=>({
    type: refresh, payload
})