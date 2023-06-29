import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Categories from './Categories';
import firstCap from '../modules/firstCap';
export default function ItemModal({ modalshow, SetOldStatus, HandleSaveBtn, edit, oldName, oldSelectedCategory, oldStatus, HandleModalCloseBtn, HandleUpdateBtn }) {

    const [selectedCategory, SetSelectedCategory] = useState('fruit');
    const [status, SetStatus] = useState('Active');
    const [itemName, SetItemName] = useState();
    const [editItemName, SetEditItemName] = useState(null);
    const [error, SetAddEditError] = useState(null);
    const [category, SetCategory] = useState(Categories)
    const [disableSaveBtn, SetSaveDisableBtn] = useState(true)
    const [disableUpdateBtn, SetUpdateDisableBtn] = useState(false)

    const HandleSelectOption = (e) => {
        SetSelectedCategory(e.target.value);
    }
    const HandleRadioButton = (e) => {
        SetOldStatus(null)
        SetStatus(e.target.value);
        console.log("working");

    }


    //handle value of add item
    const HandleAddItemInput = (e) => {
        (e.target.value).trim().length <= 0 ? SetSaveDisableBtn(true) : SetSaveDisableBtn(false)
        SetItemName(e.target.value)
        SetAddEditError(null);
    }

    const HandleEditInput = (e) => {
        (e.target.value).trim().length <= 0 ? SetUpdateDisableBtn(true) : SetUpdateDisableBtn(false)
        SetEditItemName(e.target.value)
        SetAddEditError(null)
    }


    const HandleEnterSave = (e) => {
        if (e.keyCode === 13 && !disableSaveBtn) {

            HandleSaveBtn(itemName, selectedCategory, status, SetAddEditError, SetSelectedCategory, SetStatus, SetEditItemName)
        }

    }

    const HandleEnterUpdateBtn = (e) => {
        
        if (e.keyCode === 13 && !disableUpdateBtn) {
            HandleUpdateBtn(editItemName, oldName, selectedCategory, SetSelectedCategory, SetAddEditError, SetStatus, status, SetEditItemName)
        }
    }


return (
    <Modal show={modalshow} size='lg'>
        <Modal.Header>
            <Modal.Title>{(edit)?"Edit Items":"Add Items"}</Modal.Title>
            <Button variant='danger' onClick={() => HandleModalCloseBtn(SetAddEditError, SetSelectedCategory, SetStatus, SetEditItemName)} closeButton >&times;</Button>
        </Modal.Header>
        <Modal.Body>
            <div className='mt-2'>
                <span class="text-danger">{error}</span>
            </div>
            <div className='d-flex mt-3'>
                {(edit) ? (
                    <input type="text" autoFocus={true} value={editItemName ?? firstCap(oldName)} onKeyUp={HandleEnterUpdateBtn} onChange={HandleEditInput} className='w-50 mr-auto form-control'></input>
                ) : (
                    <input type="text" autoFocus={true} onKeyUp={HandleEnterSave} placeholder='Enter Your Item Name' onChange={HandleAddItemInput} className='w-50 mr-auto form-control'></input>
                )}
                <select className='w-50 ml-3 form-control' onChange={HandleSelectOption}>
                    {
                        category.reverse().map((category) => (<option value={category.value} selected={((oldSelectedCategory ?? selectedCategory) === category.value)}>{firstCap(category.name)}</option>
                        )
                        )}
                </select>

            </div>
            <div className='d-flex mt-3'>
                <div >
                    <label>
                        <input type="radio" name="status" onChange={HandleRadioButton} value="Active" checked={(oldStatus ?? status) === 'Active'} />Active
                    </label>
                    <label className='ml-3'>
                        <input type='radio' name="status" onChange={HandleRadioButton} value="Inactive" checked={(oldStatus ?? status) === "Inactive"} />Inactive
                    </label>
                </div>

            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className='mt-3'>
                {(edit) ? (
                    <Button className='btn btn-success' onClick={() => HandleUpdateBtn(editItemName, oldName, selectedCategory, SetSelectedCategory, SetAddEditError, SetStatus, status, SetEditItemName)} disabled={disableUpdateBtn}>Update</Button>
                ) : (
                    <Button varient="info" onClick={() => HandleSaveBtn(itemName, selectedCategory, status, SetAddEditError, SetSelectedCategory, SetStatus, SetEditItemName)} disabled={disableSaveBtn}>Save</Button>
                )}
            </div>
        </Modal.Footer>
    </Modal>
)
}
