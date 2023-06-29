import React, { useState } from 'react'
import ItemModal from './ItemModal'
import Itemtbl from './Itemtbl'
import firstCap from '../modules/firstCap'


export default function Todo() {
    const [showModal, setShowModal] = useState(false)
    const [itemlist, SetItemList] = useState([])
    const [id, setId] = useState(0)
    const [edit, SetEdit] = useState(false)
    const [oldName, SetOldName] = useState(null)
    const [oldSelectedCategory, SetOldSelectedCategory] = useState(null)
    const [oldStatus, SetOldStatus] = useState(null)
    const [searchResult, SetSearchResult] = useState(null)
    const [searchVal, SetSearchValue] = useState(null)

    const HandleAddItemBtn = () => {
        SetSearchResult(null)
        SetSearchValue('')
        setShowModal(true)
       
    }

    const HandleSaveBtn = (itemName, selectedCategory, status, SetAddEditError, SetSelectedCategory, SetStatus,SetEditItemName) => {
        const tempdata = [...itemlist]
        const checkexist = (d) => {
            if (d.category == selectedCategory) {
                return d
            }
        }
        const existdata = tempdata.filter(checkexist)
        const check = existdata.findIndex(item => item.name == itemName.toLowerCase())
        if (check !== -1) {
            SetAddEditError(firstCap(itemName) + " is alredy added in " + firstCap(selectedCategory) + " category")
        } else {
            const newitems = {
                id: id + 1,
                name: itemName.toLowerCase(),
                category: selectedCategory,
                status: status,
            }
            SetItemList(list => [...list, newitems])
            setId(id => id + 1)
            HandleModalCloseBtn(SetAddEditError, SetSelectedCategory, SetStatus,SetEditItemName);
        }

    }
    const HandleModalCloseBtn = (SetAddEditError, SetSelectedCategory, SetStatus,SetEditItemName) => {
        SetAddEditError(null)
        SetSelectedCategory('fruit')
        SetEdit(false)
        SetOldName(null)
        SetOldSelectedCategory(null)
        SetStatus('Active')
        SetOldStatus(null)
        SetEditItemName(null)
        setShowModal(false)
    }


    const HandleEditBtn = (indexVal, name, category, status, id) => {
        SetOldName(name)
        SetOldSelectedCategory(category)
        SetOldStatus(firstCap(status))
        SetEdit(true)
        setId(id)
        SetSearchResult(null)
        SetSearchValue('')
        setShowModal(true)
    }
    const HandleUpdateBtn = (editItemName, oldName, selectedCategory, SetSelectedCategory, SetAddEditError, SetStatus, status,SetEditItemName) => {
        const name = (editItemName != null) ? editItemName : oldName;
        const updateItem = {
            id: id,
            name: name,
            category: selectedCategory,
            status: status,
        }

        const tempdata = [...itemlist]
        const indexValue = tempdata.findIndex(item => item.id === id)

        if (name === oldName && selectedCategory===oldSelectedCategory) {
            tempdata[indexValue] = updateItem
            SetItemList(tempdata)
            HandleModalCloseBtn(SetAddEditError, SetSelectedCategory, SetStatus,SetEditItemName);

        } else {
            const checkdata = (data) => {
                return data.category === selectedCategory
            }
            const filterData = tempdata.filter(checkdata)
          

            // console.log(filterData)
            const check = filterData.findIndex(item => item.name === name.toLowerCase())
            if (check !== -1) {
                SetAddEditError(firstCap(name) + " is alredy added in " + firstCap(selectedCategory) + " category")

            } else {
                tempdata[indexValue] = updateItem
                SetItemList(tempdata)
                HandleModalCloseBtn(SetAddEditError, SetSelectedCategory, SetStatus,SetEditItemName);

            }


        }

    }


    //Filter

    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-header p-3'>
                            <button className='btn btn-info' onClick={HandleAddItemBtn}>Add Item</button>
                        </div>
                        <div className='card-body p-3'>
                            <Itemtbl itemlist={itemlist} SetItemList={SetItemList} HandleEditBtn={HandleEditBtn} searchVal={searchVal}
                            SetSearchResult={SetSearchResult} SetSearchValue={SetSearchValue} searchResult={searchResult} showModal={showModal} />
                        </div>
                    </div>
                </div>
            </div>
            <ItemModal modalshow={showModal} setShowModal={setShowModal} itemlist={itemlist}
                SetItemList={SetItemList} id={id} setId={setId} HandleSaveBtn={HandleSaveBtn} edit={edit} SetEdit={SetEdit}
                oldName={oldName} oldSelectedCategory={oldSelectedCategory} oldStatus={oldStatus} HandleModalCloseBtn={HandleModalCloseBtn} HandleUpdateBtn={HandleUpdateBtn}  SetOldStatus={SetOldStatus}/>
        </div>

    )
}
