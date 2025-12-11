import React from 'react'
import RepoNabvar from './RepoNavbar.jsx'
import './RepoNavbar.css'
import Issue from './Issue.jsx'
const IssueRoute = () => {
  return (
    <div>
      <RepoNabvar />
        <Issue />
    </div>
  )
}

export default IssueRoute
