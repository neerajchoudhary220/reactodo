import React, { useRef, useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap';
import firstCap from '../modules/firstCap';
import { Itemlist } from '../modules/Itemslist';
import activeFilter from '../assets/icon/filter_active.svg';
import inactiveFilter from '../assets/icon/filter_inactive.svg';

export default function Item() {
    const categories = [
        {
            name: "fruits",
            value: "fruits",
        },
        {
            name: "vegitables",
            value: "vegitables",
        }
    ]
    const itemsList = Itemlist
    const [showModal, setModalToggle] = useState(false);
    const [status, setStatus] = useState('Active')
    const [list, SetItemList] = useState(itemsList)
    const [itemName, setItemName] = useState()
    const [category, setCategory] = useState('vegitables')
    const [disableSaveBtn, setSaveDisableBtn] = useState()
    const [disableUpdateBtn, setUpdateDisableBtn] = useState(false)
    const [searchResult, setSearchResult] = useState(null)
    const [EditInput, setEditInput] = useState(null)
    const [EditItem, setEditItem] = useState(false)
    const [Olditem, setOldItem] = useState(null)
    const [oldStatus, setOldStatus] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const [addEditerror, setAddEditError] = useState(null)
    const [ids, setId] = useState(3)
    const [searchVal, setSearchVal] = useState()
    const [oldCategory, setOldCategory] = useState(null)
    const [oldId,setOldId] =useState(null)
    const [nameFilter,setNameFilter] = useState(inactiveFilter)
    const [categoryFilter, setCategoryFilter] =useState(inactiveFilter)
    const [statusFilter, setStatusFilter] =useState(inactiveFilter)

    const closeModal = () => {
        setModalToggle(false)
        setEditInput(null)
        setAddEditError(null)
        setEditIndex(null)
    }



    const modalCloseBtn = () => {
        closeModal();
    }

    const HandleRadioButton = (e) => {
        setStatus(e.target.value)

    }

    //select option
    const selectOption = (e) => {
        setCategory(e.target.value)
        setAddEditError(null)
    }
    const HandleNewItemInput = (e) => {
        setAddEditError(null)
        setItemName(e.target.value)
        let itemvalue = (e.target.value) ? e.target.value.trim() : 0

        if (itemvalue.length > 0) {
            setSaveDisableBtn(false)

        } else {
            setSaveDisableBtn(true)

        }

    }

    const AddItemBtnClick = () => {
        setOldItem(null)
        setCategory('vegitables')
        setStatus('Active')
        setEditItem(false)
        setEditIndex(null)
        setEditInput(null)
        openModal()
    }

    const openModal = () => {
        setModalToggle(true)
        setSaveDisableBtn(true)
        clearSearchResult()

    }

    const saveBtn = () => {
        let id = ids;
        let newitems = {
            id: id+1,
            name: itemName,
            status: status,
            category: category,

        }
        let tempdata = [...list]



        function checkexist(d) {
            if (d.category == category) {
                return d
            }
        }

        let existdata = tempdata.filter(checkexist)

        let check = existdata.findIndex(item => item.name == itemName.toLowerCase())

        if (check !== -1) {
            setAddEditError(firstCap(itemName) + " is alredy added in " + firstCap(category) + " category")
        } else {
            SetItemList(list => [...list, newitems])
            closeModal();
        }

    }

    //clear search bar
    const clearSearchResult = () => {
        setSearchResult(null)
        setSearchVal('')
    }


    //Delete Item 
    const deleteBtn = (indexVal, categoryName, id) => {
        console.log("indexVal:", indexVal, "CategoryName:", categoryName, "id:", id)
        let tempdata = [...list]
        let indexValue = tempdata.findIndex(item => item.id === id)

        if (searchResult) {
            let tempSearch = [...searchResult]

            tempSearch.splice(indexVal, 1)
            setSearchResult(tempSearch)
        }


        tempdata.splice(indexValue, 1)
        SetItemList(tempdata)
    }
    const edtBtn = (indexVal, categoryName, itemName, status, id) => {
        setCategory(categoryName)
        setOldItem(itemName)
        setEditItem(true)
        setOldCategory(categoryName)
        setOldId(id)
        let indexValue = list.findIndex(item => item.id === id)
        setEditIndex(indexValue)
        setStatus(status)
        openModal()


    }

    //Edit input handle
    const HandleUpdateInput = (e) => {
        setAddEditError(null)
        let editValue = (e.target.value).trim().length;
        if (editValue > 0) {
            setUpdateDisableBtn(false)
        } else {
            setUpdateDisableBtn(true)

        }
        setEditInput(e.target.value)

    }


    const updateBtn = () => {
        let name = (EditInput) ? EditInput : Olditem;
        let edititemList = {
            id:oldId,
            name: name,
            category: category,
            status: status
        }

        let tempdata = [...list]

        if (name === Olditem) {
            tempdata[editIndex] = edititemList
            SetItemList(tempdata)
            closeModal()
        } else {
            let filterData = tempdata.filter(checkdata)
            function checkdata(data) {
                return data.category === category
            }

            // console.log(filterData)
            let check = filterData.findIndex(item => item.name === name.toLowerCase())
            // console.log(check)
            if (check !== -1) {
                setAddEditError(firstCap(name) + " is alredy added in " + firstCap(category) + " category")
            } else {
                tempdata[editIndex] = edititemList
                SetItemList(tempdata)
                closeModal()
            }
        }





    }
    function allitemlist() {

        return (searchResult ?? list).reverse().map((itm, index) => (
            <tr>
                <td><span>{firstCap(itm.name)}</span></td>
                <td><span>{firstCap(itm.category)}</span></td>
                <td><span>{firstCap(itm.status)}</span></td>
                <td>
                    <button className='btn btn-outline-info btn-md mr-3' onClick={() => edtBtn(index, itm.category, itm.name, firstCap(itm.status), itm.id)}>Edit</button>
                    <button className='btn btn-outline-danger btn-md' onClick={() => deleteBtn(index, itm.category, itm.id)}>Delete</button>
                </td>
            </tr>
        ))

    }

    const HandleSearch = (e) => {
        let result = searchbyname(e.target.value)
        setSearchVal(e.target.value)
        setSearchResult(result)
        let searchVal = (e.target.value).trim().length;
        if (searchVal <= 0) {
            setSearchResult(null)
        }
    }
    const searchbyname = (val) => {
        return list.filter((o) =>
            Object.keys(o).some((k) =>
                o.name.toLowerCase().includes(val.toLowerCase())
            )
        );
    }

    const FilterList=(filterKey)=>{
        
        if(filterKey)
        {
            const sortdata = list.sort((a,b)=>
            a[filterKey].localeCompare(b[filterKey])
            )
            console.log(sortdata)
        }else{
            list.reverse()
        }
        
        
    }

    const HandleNameFilter=()=>{
        let filter = (nameFilter===inactiveFilter)?activeFilter:inactiveFilter
        setCategoryFilter(inactiveFilter)
        setStatusFilter(inactiveFilter)
        setNameFilter(filter)
        if(filter===activeFilter){
            FilterList('name')
        }else{
            FilterList(null)
        }

    }

    const HandleCategoryFilter=()=>{
        let filter = (categoryFilter===inactiveFilter)?activeFilter:inactiveFilter
        setStatusFilter(inactiveFilter)
        setNameFilter(inactiveFilter)
        setCategoryFilter(filter)

        if(filter===activeFilter){
            FilterList('category')
        }else{
            FilterList(null)
        }

    }

    const HandleStatusFilter=()=>{
        let filter = (statusFilter===inactiveFilter)?activeFilter:inactiveFilter
        setNameFilter(inactiveFilter)
        setCategoryFilter(inactiveFilter)
        setStatusFilter(filter)
        if(filter===activeFilter){
            FilterList('status')
        }else{
            FilterList(null)
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-header p-3'>
                            <div className='d-flex'>
                                <button className='btn btn-info' onClick={AddItemBtnClick}>Add Item</button>
                            </div>

                        </div>
                        <div className='card-body p-3'>

                            <div className='w-50 mb-3'>
                                <input type='text' value={searchVal} className='form-control' placeholder='Search Item' onChange={HandleSearch}></input>
                            </div>
                            <table className='table table-striped '>
                                <thead>
                                    <tr>
                                        <th scope='col' className='w-25'><img src={nameFilter} alt="filte icon" onClick={HandleNameFilter} role='button' className='mr-2' style={{cursor:'pointer'}}></img><span style={{cursor:'pointer'}} onClick={HandleNameFilter}>Items</span></th>
                                        <th scope='col' className='w-25'><img src={categoryFilter} alt="filte icon" onClick={HandleCategoryFilter} role='button' className='mr-2' style={{cursor:'pointer'}}></img><span style={{cursor:'pointer'}} onClick={HandleCategoryFilter}>Category</span></th>
                                        <th scope='col' className='w-25'><img src={statusFilter} alt="filte icon" onClick={HandleStatusFilter} role='button' className='mr-2' style={{cursor:'pointer'}}></img><span style={{cursor:'pointer'}} onClick={HandleStatusFilter}>Status</span></th>
                                        <th scope='col'>Action</th>
                                    </tr>

                                </thead>
                                <tbody>

                                    {allitemlist()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} size='lg'>
                <Modal.Header>
                    <Modal.Title>{(EditItem) ? "Edit Items" : ("Add Items")}</Modal.Title>
                    <Button variant='danger' closeButton onClick={modalCloseBtn}>&times;</Button>

                </Modal.Header>
                <Modal.Body>
                    <div className='mt-2'>
                        <span class="text-danger"> {(addEditerror)}</span>
                    </div>
                    <div className='d-flex mt-3'>
                        {(EditItem) ? (
                            <input type="text" value={EditInput ?? firstCap(Olditem)} onChange={HandleUpdateInput} className='w-50 mr-auto form-control'></input>

                        ) : (
                            <input type="text" placeholder='Enter Your Item Name' onChange={HandleNewItemInput} className='w-50 mr-auto form-control'></input>

                        )}

                        <select className='w-50 ml-3 form-control' onChange={selectOption}>
                            {
                                categories.reverse().map((opt) => (<option value={opt.value} selected={(category === opt.value)}>{firstCap(opt.name)}</option>
                                )
                                )}
                        </select>



                    </div>
                    <div className='d-flex mt-3'>
                        <div >
                            <label>
                                <input type="radio" name="status" onChange={HandleRadioButton} value="Active" checked={status === 'Active'} />Active
                            </label>
                            <label className='ml-3'>
                                <input type='radio' name="status" onChange={HandleRadioButton} value="Inactive" checked={status === "Inactive"} />Inactive
                            </label>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='mt-3'>
                        {(EditItem) ? (<Button variant='warning' disabled={disableUpdateBtn} onClick={updateBtn}>Update</Button>) : (
                            <Button varient="info" onClick={saveBtn} disabled={disableSaveBtn}>Save</Button>
                        )}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
