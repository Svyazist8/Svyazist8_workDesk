const defaultState = {moveNoteReducer: {}}
const NOTE = "NOTE"
export const moveNoteReducer = (state=defaultState, action)=>{
    switch(action.type){
        case NOTE:
            return{moveNoteReducer: action.payload}
        default:
            return state
    }
}

export const moveNote=(payload)=>({
    type: NOTE, payload
})