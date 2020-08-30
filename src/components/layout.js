import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// Styled Components
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { normalize } from "styled-normalize"

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  *{
    text-decoration: none;
     /* cursor: none; */
  }

  html{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overscroll-behavior: none;
    background: ${props => props.theme.background};
    overflow-x: hidden;
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const darkTheme = {
    background: '#000',
    text: '#fff'
  }

  const lightTheme = {
    background: '#fff',
    text: '#000'
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout