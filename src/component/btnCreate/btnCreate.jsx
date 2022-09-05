import React from 'react'
import styles from './btnCreate.module.scss'
import cn from 'classnames'
export const BtnCreate = ({text, handle}) => {
  return (
    <div onClick={(handle)} className={cn(styles.btn, styles.boxDark)} >
        {text}
    </div>
  )
}
