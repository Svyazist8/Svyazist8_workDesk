import React,{useState} from 'react'
import styles from './bigNote.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { openNoteBig } from '../../store/noteReducer'
import { Inp } from '../inp/inp'
import { notes, saveAll } from '../data/info'
import { refreshData } from '../../store/refreshReducer'

export const BigNote = () => {

    const item = useSelector(state => state.noteReducer.noteReducer)
    const dispatch = useDispatch()

    const [rename, setRename]=useState(false)
    const [newName, setNewName]=useState(item.name)
    const [description, setDescription]=useState(item.description)

    function close(){
        dispatch(openNoteBig({}))
    }
    function changeNote(){
        notes.map(note => {
            if(note.idNote===item.idNote){
                if(newName)note.name=newName;
                if(description)note.description=description;
            }
            return null
        })
        item.name = newName
        item.description = description
        setDescription(item.description)
        setNewName(item.name)
        saveAll()
        dispatch(refreshData(1))
        setRename(false)
    }
    if(item.idNote){
        return (
            <div className={styles.window} onClick={()=>close()}>
                <div className={styles.content} onClick={e => e.stopPropagation()}>
                {
                    rename?
                        <div>
                            <div>
                                <Inp  placeholder={item.name} defaultValue={item.name}  setValue={setNewName}/>
                            </div>
                            <div className={styles.name}>Описание</div>
                            <div className={styles.description}>
                                <textarea defaultValue={item.description}  onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <div style={{display: 'flex', margin: '25px auto', width: '100%', justifyContent: 'space-around'}}>
                                <div  onClick={()=>changeNote()} style={{padding: '10px', width: '40%', textAlign: 'center', border: '1px solid whitesmoke', borderRadius: '15px'}}>Сохранить</div>
                                <div  onClick={()=>setRename(false)} style={{padding: '10px', width: '40%', textAlign: 'center', border: '1px solid whitesmoke', borderRadius: '15px'}}>Отмена</div>
                            </div>
                        </div>
                    :   
                        <div style={{position: 'relative'}}>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.name}>Описание</div>
                            <div className={styles.description}>{item.description}</div>
                            <div className={styles.edit} onClick={()=>setRename(true)}></div>
                        </div>
                }
                    
                    

                </div>
            </div>
        )
    }
    
}
