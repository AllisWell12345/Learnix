import React from 'react'
import SearchIcon from '../../assets/img/common/searchIcon.svg'
import './Searchbar.css'

function Searchbar() {
  return (
    <div className='searchbar-container'>
      <input type='text' placeholder='검색어를 입력해주세요!' className='searchbar-input'/>
      <button className='search-btn'>
        <img src={SearchIcon} alt='검색 아이콘' className='search-icon'/>
      </button>
    </div>
  )
}

export default Searchbar