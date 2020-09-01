import React, { useState, useEffect } from "react"

import { Cursor } from "../styles/globalStyles"

// Contex
import { useGlobalStateContext } from "../context/globalContext"

const CustomCursor = () => {
   const { cursorType } = useGlobalStateContext()

   const [mousePosition, setMousePosition] = useState({
      x: 400,
      y: 400
   })
   const onMouseMove = event => {
      const { pageX, pageY } = event
      setMousePosition({ pageX, pageY })
   }
   useEffect(() => {
      document.addEventListener("mousemove", onMouseMove)
      return () => {
         document.removeEventListener("mousemove", onMouseMove)
      }
   }, [])
   return (
      <>
         <Cursor
            className={`${!!cursorType ? "hovered" : ""} ${cursorType}`}
            style={{ left: `${mousePosition.pageX}px`, top: `${mousePosition.pageY}px` }} />
      </>
   )
}

export default CustomCursor