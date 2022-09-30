/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div id='App'>
      <Menu width={250} />
      <Header id='header' />
      <main id='page-wrap'>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
