import React, { useEffect, useRef, useState } from 'react'
import firstCap from '../modules/firstCap'
import activefilter from '../assets/icon/filter_active.svg'
import inactiveFilter from '../assets/icon/filter_inactive.svg'
export default function Itemtbl({ itemlist, SetItemList, HandleEditBtn, searchVal, SetSearchValue, searchResult, SetSearchResult,showModal }) {


  const [filterName, SetNameFilter] = useState(inactiveFilter)
  const [filterCategory, SetCategoryFilter] = useState(inactiveFilter)
  const [filterStatus, SetStatusFilter] = useState(inactiveFilter)
  
  
  useEffect(() => {
    if (searchResult||showModal) {
      SetNameFilter(inactiveFilter)
      SetCategoryFilter(inactiveFilter)
      SetStatusFilter(inactiveFilter)
    }
  }, [searchResult,showModal])




  const HandleSearch = (e) => {
    const result = searchbyname(e.target.value)
    SetSearchValue(e.target.value)
    SetSearchResult(result)
    //remove filter
    const searchVal = (e.target.value).trim().length;
    if (searchVal <= 0) {
      SetSearchResult(null)

    }
  }

  const searchbyname = (val) => {
    return itemlist.filter((o) =>
      Object.keys(o).some((k) =>
        o.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  }


  const deleteBtn = (indexVal, categoryName, id) => {
    console.log("indexVal:", indexVal, "CategoryName:", categoryName, "id:", id)
    const tempdata = [...itemlist]
    const indexValue = tempdata.findIndex(item => item.id === id)

    if (searchResult) {
      const tempSearch = [...searchResult]
      tempSearch.splice(indexVal, 1)
      SetSearchResult(tempSearch)
    }
    tempdata.splice(indexValue, 1)
    SetItemList(tempdata)
  }


  //Filter By Name
  const HandleNameFilter = () => {
    SetCategoryFilter(inactiveFilter)
    SetStatusFilter(inactiveFilter)
    filterByKey(filterName, SetNameFilter, 'name')
  }
  //Filte By Category
  const HandleCategoryFilter = () => {
    SetNameFilter(inactiveFilter)
    SetStatusFilter(inactiveFilter)
    filterByKey(filterCategory, SetCategoryFilter, "category")
  }

  const HandleStatusFilter = () => {
    SetNameFilter(inactiveFilter)
    SetCategoryFilter(inactiveFilter)
    filterByKey(filterStatus, SetStatusFilter, "status")
  }



  const filterByKey = (stateName, setState, keyname) => {
    if (stateName === inactiveFilter) {
      setState(activefilter)
      FilterList(keyname)
    }
    else {
      setState(inactiveFilter)
      FilterList(null)
    }
  }




  const FilterList = (filterKey) => {

    if (filterKey) {
      const sortdata = itemlist.sort((a, b) =>
        a[filterKey].localeCompare(b[filterKey])
      )

    } else {
      itemlist.reverse()
    }

  }




  return (
    <>
      <div className='w-50 mb-3'>
        <input type='text' className='form-control'  value={searchVal} onChange={HandleSearch} placeholder='Search Item'></input>
      </div>

      <table className='table table-striped '>
        <thead>
          <tr>
            <th scope='col' className='w-25'>
              <div onClick={HandleNameFilter}  style={{ cursor: 'pointer' }}>
                <img src={filterName} alt="filte icon"  role='button' value="name" onClick={HandleNameFilter} className='mr-2'></img>
                <span>Name</span>
              </div>
            </th>

            <th scope='col' className='w-25'>
              <div onClick={HandleCategoryFilter} style={{ cursor: 'pointer' }}>
                <img src={filterCategory} alt="filte icon" role='button' value="category" onClick={HandleCategoryFilter} className='mr-2'></img>
                <span>Category</span>
              </div>
            </th>

            <th scope='col' className='w-25'>
              <div onClick={HandleStatusFilter} style={{ cursor: 'pointer' }}>
                <img src={filterStatus} alt="filte icon" role='button' value="status" onClick={HandleStatusFilter} className='mr-2'></img>
                <span>Status</span>
              </div>
            </th>

            <th scope='col'>Action</th>
          </tr>

        </thead>
        <tbody>
          {(searchResult ?? itemlist).reverse().map((itm, index) => (
            <tr>
              <td><span>{firstCap(itm.name)}</span></td>
              <td><span>{firstCap(itm.category)}</span></td>
              <td><span>{firstCap(itm.status)}</span></td>
              <td>
                <button className='btn btn-outline-info btn-md mr-3' onClick={() => HandleEditBtn(index, itm.name, itm.category, itm.status, itm.id)}>Edit</button>
                <button className='btn btn-outline-danger btn-md' onClick={() => deleteBtn(index, itm.category, itm.id)}>Delete</button>
              </td>
            </tr>)
          )
          }
         
        </tbody>
      </table>

{(itemlist.length<=0)?
(<div className={`'m-auto text-center bg-light`}>
<span>Data Not Found</span>
</div>):null
}
    </>
  )
}
