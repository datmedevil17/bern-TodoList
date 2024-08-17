import React, { useEffect } from 'react'
import { useState } from 'react'

const ViewAllTask = () => {
    const [taskList,setTaskList] = useState([])

    useEffect(()=>{
        const allTasks = async()=>{
            try{
                const res = await fetch("http://localhost:3000/api/ethereum/all-tasks",{
                    method:'GET',
                    headers:{
                        "content-type":"application/json"
                    }
                })
                const data = await res.json()
                if(data.status===200){
                    console.log(data.taskList)
                }

            }catch(error){
                console.log(error)
            }
        }
        allTasks()

    },[])
  return (
    <div>
      
    </div>
  )
}

export default ViewAllTask
