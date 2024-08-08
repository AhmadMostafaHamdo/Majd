import React from 'react'

export default function CardJob({item, setPop, setIsOpen}){
  const handelPop = () => {
    setPop(item);
    setIsOpen(v => !v)
  }
  return (
    <div class="cardjob">
            <div class="cardjob-details">
                <p class="cardjob-title">{item.title}</p>
                <p class="cardjob-body">{item.price} $</p>
            </div>
            <button class="cardjob-button" onClick={handelPop}>More info</button>
     </div>
  )
}
