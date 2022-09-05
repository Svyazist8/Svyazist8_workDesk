
import {createStore,combineReducers} from "redux"
import { moveReducer } from "./moveReducer"
import { noteReducer } from "./noteReducer"
import { refreshReducer } from "./refreshReducer"
import { moveNoteReducer } from "./moveNoteReducer"
import { moveTableReducer } from "./moveTableReducer"

const rootReducer = combineReducers({
    moveReducer:moveReducer, 
    noteReducer: noteReducer, 
    refreshReducer: refreshReducer,
    moveNoteReducer:moveNoteReducer,
    moveTableReducer:moveTableReducer
})

export const store = createStore(rootReducer)