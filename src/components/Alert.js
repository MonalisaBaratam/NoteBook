import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'

function Alert(props) {
    const capital = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
    const context = useContext(AlertContext)
    const {alert} = context 
    return (
        alert &&
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capital(alert.type)}</strong> : {alert.msg}
        </div>
    )
}

export default Alert
