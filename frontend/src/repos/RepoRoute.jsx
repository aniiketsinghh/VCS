import React from 'react'
import RepoNabvar from './RepoNavbar.jsx'
import './RepoNavbar.css'
import AllRepos from './AllRepos.jsx'

const ReposRoute = () => {
  return (
    <div>
      <RepoNabvar />
        <AllRepos />
    </div>
  )
}

export default ReposRoute
