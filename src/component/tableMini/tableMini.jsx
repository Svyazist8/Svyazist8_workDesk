import React from 'react'
import styles from './tableMini.module.scss'
import { notes } from '../data/info';
import cn from 'classnames'

export const TableMini = ({name,idTable}) => {
    
    let allNote = notes.filter(note => note.idTable === idTable );
    allNote = allNote.sort((a, b) => a.posId > b.posId ? 1 : -1);
    if(name){
        return (
            <div className={cn(styles.tableMini, styles.boxDark)} >
                <div className={styles.name} >{name} </div>
                {
                    allNote.map(note=>{
                        return(
                            <div key={note.idNote}>{note.name}</div>
                        )
                    })
                }
            </div>
        )
    }   
  
}
