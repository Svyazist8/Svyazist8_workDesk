import React, {useState} from 'react'
import styles from './deskInfo.module.scss'
import cn from 'classnames'
import { CreateTable } from '../createTable/createTable'
import {desks,tables,notes ,desksUpdate, notesUpdate, tablesUpdate} from './../data/info.js'

export const DeskInfo = ({idDesk,setIdDesk}) => {
    const [newTable, setNewTable] = useState(false)
    function deleteDesk(){
      var newDesks = desks.filter(desk => desk.idDesk !== idDesk)
      var newNotes = notes.filter(note => note.idDesk !== idDesk)
      var newTables = tables.filter(table => table.idDesk !== idDesk)
      desksUpdate(newDesks)
      tablesUpdate(newTables)
      notesUpdate(newNotes)
      setIdDesk(false)
    }
  return (
    <div className={styles.infoTable}>
        <div className={cn(styles.add, styles.boxDark)} onClick={()=>setNewTable(true)}>Новая таблица</div>
        <div className={cn(styles.add, styles.boxDark)} onClick={()=>deleteDesk()}> Удалить доску</div>
        <div className={cn(styles.close,styles.boxDark)} onClick={()=>setIdDesk(false)}>+</div>

        <CreateTable active={newTable} setActive={setNewTable} idDesk={idDesk} />
    </div>
  )
}
