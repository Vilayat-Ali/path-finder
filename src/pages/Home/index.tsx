import React, { useEffect } from 'react'

import { Graph } from '../../lib/graph'


const Home = () => {
  useEffect(() => {
    const g = new Graph(3,3);
    console.log(g);
    console.log(g.s);
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home