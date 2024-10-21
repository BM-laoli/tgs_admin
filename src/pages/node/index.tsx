import {Outlet} from '@umijs/max'
const Node = (props) => {
  return (
    <div>
        <p>title</p>
      <div>-----</div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Node