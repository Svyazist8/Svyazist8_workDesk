import React from 'react'
import { notes, notesUpdate, tables, tablesUpdate } from '../data/info'
import styles from './dump.module.scss'
import { useDispatch } from 'react-redux'
import { refreshData } from '../../store/refreshReducer'
import { booleanMove } from '../../store/moveReducer'

export const Dump = () => {
  const dispatch=useDispatch()
    const kick=()=>{
      if(localStorage.getItem('curNote')){
        var idNote = localStorage.getItem('curNote')
        var newNotes = notes.filter(note => note.idNote !== idNote)
        notesUpdate(newNotes)
        localStorage.setItem('curNote', null)
      }
      if(localStorage.getItem('moveTableId')){
        var idTable = localStorage.getItem('moveTableId')
        var newTables = tables.filter(table => table.idTable !== idTable)
        tablesUpdate(newTables)
        localStorage.setItem('moveTableId', null)
        localStorage.setItem('moveTablePos', null)
        dispatch(booleanMove(false))
      }
      dispatch(refreshData(1))
    }
  return (
    <div className={styles.dump} onMouseUp={kick}>

    </div>
  )
}
