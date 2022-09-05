import React from 'react'
import styles from './inp.module.scss'

export const Inp = ({value, setValue, placeholder, type, defaultValue}) => {
  return (
    <div className={styles.inp}>
        <input type={type} defaultValue={defaultValue} placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} style={{padding: '5px'}} />
    </div>
  )
}
