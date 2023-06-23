import React, { useRef, useState } from 'react'
import firstCap from '../modules/firstCap';

export default function Task() {
  const [items, setItems] = useState(['orange', 'mango'])
  const [itemName, setItemsName] = useState();
  const [errormsg, setErrormsg] = useState();
  const [EditInput, setEditInput] = useState();
  const [currentUpdateItem, setCurrentUpdateItem] = useState();
  const addBtn = useRef()
  const disableUpdateBtn = useRef()


  const HandleItemValue = (e) => {


    if ((e.target.value).trim() == '') {
      addBtn.current.setAttribute('disabled', true);

    } else {
      addBtn.current.removeAttribute('disabled');

    }
    setItemsName(e.target.value);
    setErrormsg('')
  }
  //Item add into list when click '+' button
  const AddItem = () => {

    //check existing item in list
    if (items.indexOf(itemName) === -1) {
      setItems(olditems => [...olditems, itemName.toLowerCase()]) //copy elements
      setItemsName('')

    } else {
      setErrormsg(firstCap(itemName) + " is already added")
    }

    addBtn.current.setAttribute('disabled', true);


  }

  //item add into list when press submit button
  const EnterkeyHandle = (e) => {
    if (e.keyCode == 13 && (itemName) !== '') {
      AddItem()
    }
  }

  //delete item, click by delete button from list
  const deleteItem = (indx) => {
    let temp = [...items]
    temp.splice(indx, 1)
    setItems(temp)
    setErrormsg('')

  }

  //edit  item 
  const editItem = (indx) => {
    setCurrentUpdateItem(indx)
    setErrormsg('')
  }

  //Get Edit value
  const HandleEditInput = (e) => {
    setErrormsg('')
    setEditInput(e.target.value)
    if ((e.target.value).trim() == '') {
      disableUpdateBtn.current.setAttribute('disabled', true);
    } else {
      disableUpdateBtn.current.removeAttribute('disabled');
    }

  }

  //update item
  const updateItem = (indx) => {
    let tempItem = [...items]
    let edtVal = (EditInput ?? items[indx]).toLowerCase()
    console.log(edtVal)
    tempItem.splice(indx, 1)
    if (tempItem.indexOf(edtVal) === -1) {
      let temp = [...items]
      temp[indx] = edtVal
      setItems(temp)
      setCurrentUpdateItem(null)
      setEditInput(null)
      

    } else {
      setErrormsg(firstCap(edtVal) + " is already added")

    }

  }



  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-header p-3'>
            <div className=' d-flex'>
              <input value={itemName} type='text' onKeyDown={EnterkeyHandle} onChange={HandleItemValue} className='mr-auto form-control w-50' placeholder='Enter Your Items Name'></input>
              <button className='btn btn-info ml-3' ref={addBtn} onClick={AddItem} disabled>+</button>
            </div>
            <div className='mt-2'>
              <span className='text-danger'>{errormsg}</span>
            </div>
          </div>
          <div className='card-body'>
            <table className='table table-striped '>
              <thead>
                <tr>
                  <th scope='col' className='w-75'>Items</th>
                  <th scope='col'>Action</th>
                </tr>

              </thead>
              <tbody>
                {items.map((obj, indx) => {
                  return (
                    <tr>
                      <td>
                        {(currentUpdateItem == indx) ? (<input type="text" className='form-control'
                          onChange={HandleEditInput}
                          value={EditInput ?? firstCap(obj)}></input>)
                          : (<span>{firstCap(obj)}</span>)}
                      </td>
                      <td>

                        {(currentUpdateItem == indx) ? (
                          <button className='btn btn-success mr-3 ' onClick={() => updateItem(indx)} ref={disableUpdateBtn}>Update</button>
                        ) : (
                          <button className='btn btn-info mr-3 ' onClick={() => editItem(indx)}>Edit</button>
                        )}

                        <button className='btn btn-danger' onClick={() =>
                          deleteItem(indx)}>Delete</button>

                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
