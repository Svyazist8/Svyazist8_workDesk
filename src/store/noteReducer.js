const defaultState = {noteReducer:{}}
const openNote = "openNote"
export const noteReducer = (state=defaultState, action)=>{
    switch(action.type){
        case openNote:
            return{noteReducer: action.payload}
        default:
            return state
    }
}

export const openNoteBig=(payload)=>({
    type: openNote, payload
})