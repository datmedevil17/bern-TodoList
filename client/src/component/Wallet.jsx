import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import abi from '../contract/Todo.json'

const Wallet = ({saveState}) => {
    const navigateTo = useNavigate()
    const connectWallet =async()=>{
        try{
            const { ethereum } = window;
            if (!ethereum) {
              console.log("Metamask is not installed");
              return;
            }
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
            if (accounts.length === 0) {
              console.log("No account found");
              return;
            }
            console.log(accounts)
            const contractAbi = abi.abi;
            const contractAddress = "0xd72A3749e12e552eEEDee81Fd36Dccb99033C557";
            const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress()
        
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log(signer)

        saveState({ provider:provider,signer: signer,contract: contract,address:address,account: accounts[0]});
        navigateTo("/view-all-task")

            
        }catch(e){
            console.log(e)
        }
    }
  return (
    <div>
        <button onClick={connectWallet}> click</button>
      
    </div>
  )
}

export default Wallet
