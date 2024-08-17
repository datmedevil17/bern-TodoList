const express = require('express');
const ABI = require("./Todo.json").abi; // Make sure ABI is an array of objects.
const cors = require("cors")
const { ethers } = require("ethers");

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())

const privateKey = "529038177e54eb14bb591eaf0e7517112d7f4189f372f4a15a7d0229236adf7f"
const alchemyProvider = new ethers.AlchemyProvider("sepolia", "Mjw7qJFpq1xej0naP40Q-aWSgfs3DPrv");
const contractAddress = "0x4bfE73852B98F3f23F6DeB9C3F5b07b2c7aE9dE8";
const signer = new ethers.Wallet(privateKey,alchemyProvider)

const contract = new ethers.Contract(contractAddress, ABI, signer);

app.get("/api/ethereum/view-task/:taskId", async(req,res)=>{
  try {
    const {taskId} = req.params;
    const task = await contract.viewTask(taskId)
    const {id,name,date} = task
    const numId = Number(id)
    const taskObj={
      numId,name,date
    }
    res.status(200).json({status:200,taskObj,message:"Task Exist"})    

  } catch (error) {
    res.status(500).json({status:500,message:"Task doesn't exist."})  
  }
})
app.get("/api/ethereum/all-tasks", async(req,res)=>{
  try {
    const tasks = await contract.allTask()
    if(tasks.length<0){
      res.status(400).json({status:404,message:"No tasks available."})
    }else{
      const taskList = tasks.map(({id,name,date})=>{
        const numId = Number(id)
        return {numId,name,date}
      })
      res.status(200).json({status:200,taskList,message:"Tasks Exist"})
    }
    

  } catch (error) {
    console.log(error)
  }
})

const dateClashCheck=async(taskDate)=>{
  const tasks = await contract.allTask()
  const foundTask= tasks.find(task=>task.date===taskDate)
  if(foundTask){
    return foundTask.name;
  }
  return "No Task Found"
}

app.post("/api/ethereum/create-task", async(req,res)=>{
  const {date} = req.body;
  console.log(req.body) 
  const task = await dateClashCheck(date);
  try{
    if(task!=="No Task Found"){
      res.status(409).json({status:409,message:"Date Clash"})
    }else{
      res.status(200).json({status:200,message:"Task can be added"})
    }
 
  }catch(error){ 
    console.log(error)     
  }
   

})


app.listen(port, () => {
  console.log(`Server Running At Port ${port}`);
});
