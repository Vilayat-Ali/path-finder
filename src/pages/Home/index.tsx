import { useEffect } from "react"
import { Graph } from "../../lib/graph"

const Home = () => {
  useEffect(() => {
    const g = new Graph(2, 2);

  }, []);

  return (
    <div>Home</div>
  )
}

export default Home