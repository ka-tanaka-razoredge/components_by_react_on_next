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
      <Header id='header'>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js' />
        <link rel='https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/components/prism-css.min.js' />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/themes/prism.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/components/prism-core.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/plugins/autoloader/prism-autoloader.min.js"></script>
      </Header>
      <main id='page-wrap'>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
