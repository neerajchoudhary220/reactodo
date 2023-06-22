import React, { useRef, useState } from 'react'
import firstCap from '../modules/firstCap';

export default function Task() {
  const [items, setItems] = useState(['orange', 'mango'])
  const [itemName, setItemsName] = useState();
  const [errormsg, setErrormsg] = useState();
  const addBtn = useRef()
  

  const HandleItemValue = (e) => {  
     
      
      if((e.target.value).trim()==''){
        addBtn.current.setAttribute('disabled',true);

      }else{
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
      setErrormsg(firstCap(itemName)+" is already added")
    }

    addBtn.current.setAttribute('disabled',true);


  }

  //item add into list when press submit button
  const EnterkeyHandle = (e) => {
    if (e.keyCode == 13 && (itemName.trim())!='') {
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
                      <td><span>{firstCap(obj)}</span></td>
                      <td><button className='btn btn-danger' onClick={() =>
                        deleteItem(indx)}>Delete</button>
                        <button className='btn btn-info ml-3'>Edit</button></td>

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
