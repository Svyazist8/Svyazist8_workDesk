import React from 'react'
import { desks,notes,saveAll,tables } from '../data/info'
import styles from './allDesks.module.scss'
import { useDispatch } from 'react-redux'
import { refreshData } from '../../store/refreshReducer';
import { moveTable } from '../../store/moveTableReducer';
import { booleanMove } from '../../store/moveReducer';

export const AllDesks = ({idDesk,setIdDesk}) => {
    const dispatch = useDispatch()
    function drag(desk){
        if(localStorage.getItem('curNote')!=='null'||localStorage.getItem('moveTableId')!=='null'){
            setIdDesk(desk)
        }
    }
    function moveInDesk(desk){
        if(localStorage.getItem('moveTableId')!=='null'){
            tables.forEach(table => {
                if(table.idTable ===localStorage.getItem('moveTableId')){
                    table.idDesk=desk
                }
            })
            notes.forEach(note => {
                if(note.idTable ===localStorage.getItem('moveTableId')){
                    note.idDesk=desk
                }
            })
            saveAll()
            dispatch(refreshData(1))
            dispatch(moveTable(null))
            dispatch(booleanMove(false))
        }
    }
  return (
    <div className={styles.allDesks}>
        {
            desks.map(desk=>{
                if(desk.idDesk){
                    return(<div 
                            key={desk.idDesk} 
                            onMouseOver={()=>drag(desk.idDesk)} 
                            onClick={()=>setIdDesk(desk.idDesk)} 
                            onMouseUp={()=>moveInDesk(desk.idDesk)}
                            className={styles.desk} 
                            style={idDesk===desk.idDesk?{borderBottom: 'none'}:{borderBottom: '1px solid whitesmoke'}}
                    >
                        {desk.name}
                    </div>)
                }
                return null
            })
        }
    </div>
  )
}
