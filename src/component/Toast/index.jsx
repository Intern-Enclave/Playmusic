import React, { useCallback } from 'react';
import {AiOutlineClose} from "react-icons/ai";
import './toast.scss';

const Toastmenu = ({toastlist, setList}) => {

   const delateToast = useCallback(id => {
    const tostListitem = toastlist.filter(e => e.id !== id);
    setList(tostListitem);
   },[toastlist, toastlist]);

    return (
        <div className='toast-modal'>
            {
            toastlist.map((toast, i) => (
                <div 
                    key={i}
                    className='toast-container'>
                    <div className='toast-header'>
                        <p>{toast.tittle}</p>
                        <button
                        onClick={()=>delateToast(toast.id)}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                    <p>{toast.description}</p>
                </div>
            ))
            }
            
        </div>
    );
};

export default Toastmenu;