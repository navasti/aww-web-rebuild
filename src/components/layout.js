import React, { useState } from "react"
import PropTypes from "prop-types"

// Styled Components
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { normalize } from "styled-normalize"

// Components
import Header from "./header"
import Cursor from "./customCursor"
import Navigation from "./navigation"
import Footer from "./footer"

// Context
import { useGlobalStateContext, useGlobalDispatchContext } from "../context/globalContext"

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  *{
    text-decoration: none;
     cursor: none;
  }

  html{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    overscroll-behavior: none;
    background: ${props => props.theme.background};
    overflow-x: hidden;
  }
`

const Layout = ({ children }) => {
  const [hamburgerPosition, setHamburgerPosition] = useState({
    y: 0,
    x: 0
  })

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  }

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e",
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`,
  }

  const { currentTheme, cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }

  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Cursor toggleMenu={toggleMenu} />
      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        hamburgerPosition={hamburgerPosition}
        setHamburgerPosition={setHamburgerPosition}
      />
      <Navigation
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
      />
      <main>{children}</main>
      <Footer onCursor={onCursor} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
