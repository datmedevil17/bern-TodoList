import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import CreateTask from './component/CreateTask'
import DeleteTask from './component/DeleteTask'
import UpdateTask from './component/UpdateTask'
import Navigation from './component/Navigation'
import ViewAllTask from './component/ViewAllTask'
import ViewTask from './component/ViewTask'
import Wallet from './component/Wallet'
import './App.css'

function App() {
  const [state,setState] = useState({
    provider:'',
    signer:'',
    contract:'',
    address:'',
    account:''
  })
  const saveState=({provider,signer,contract,address,account})=>{
    setState({provider:provider,signer:signer,contract:contract,address:address,account:account})
  }
  const router = createBrowserRouter([
    {path:'/',element:<Wallet saveState={saveState}/>},
    {path:'/view-all-task',element:<ViewAllTask/>},
    {path:'/create-task',element:<CreateTask state={state}/>},
    {path:'/view-task',element:<ViewTask/>},
    {path:'/update-task',element:<UpdateTask state={state}/>},
    {path:'/delete-task',element:<DeleteTask state={state}/>}
    
  ])

  
  

  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
      
    </>
  )
}

export default App
