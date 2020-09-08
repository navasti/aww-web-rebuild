import React, { useEffect } from "react"
import { Link } from "gatsby"

// Styled Components
import { HeaderNav, Logo, Menu } from "../styles/headerStyles"
import { Container, Flex } from "../styles/globalStyles"

// Context
import { useGlobalStateContext, useGlobalDispatchContext } from "../context/globalContext"

const Header = ({ onCursor, toggleMenu, setToggleMenu }) => {
   const dispatch = useGlobalDispatchContext()
   const { currentTheme } = useGlobalStateContext()

   const toggleTheme = () => {
      if (currentTheme === "dark") {
         dispatch({ type: "TOGGLE_THEME", theme: "light" })
      } else {
         dispatch({ type: "TOGGLE_THEME", theme: "dark" })
      }
   }

   useEffect(() => {
      window.localStorage.setItem("theme", currentTheme)
   }, [currentTheme])

   return (
      <HeaderNav
         animate={{ y: 0, opacity: 1 }}
         initial={{ y: -72, opacity: 0 }}
         transition={{ duration: 1, ease: [.6, .05, -.01, .9] }}
      >
         <Container>
            <Flex spaceBetween noHeight>
               <Logo
                  onMouseEnter={() => onCursor("hovered")}
                  onMouseLeave={onCursor}
               >
                  <Link to='/'>FURR</Link>
                  <span
                     onMouseEnter={() => onCursor("pointer")}
                     onMouseLeave={onCursor}
                     onClick={toggleTheme}></span>
                  <Link to='/'>W</Link>
               </Logo>
               <Menu onClick={() => setToggleMenu(!toggleMenu)}>
                  <button>
                     <span></span>
                     <span></span>
                  </button>
               </Menu>
            </Flex>
         </Container>
      </HeaderNav>
   )
}

export default Header