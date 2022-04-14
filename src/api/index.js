import { ethers } from "ethers"

import contractAbi from "../contracts/abi.json"
import contractAddress from "../contracts/contract_address.json"

const getProvider = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    await provider.send("eth_requestAccounts", []);
    return provider
}

const getSigner = async (ethereum) => {
    const provider = await getProvider(ethereum)
    return provider.getSigner()
}

const getAccount = async (ethereum) => {
    const accounts = await ethereum.request ({method: 'eth_accounts'});
        
    if (accounts.length !== 0) {
          return accounts[0];
    }

    return null
}

const parseResult = (txnResult) => {
    const ids = txnResult[0]
    
    const names = txnResult[1]
    const time = txnResult[2]
    const owners = txnResult[3]
  
    let files = []
  
    for(let i = 0; i < ids.length; i++) {
        const file = {
            cid: ids[i],
            title: names[i], 
            uploaded_at: new Date(time[i].toBigInt()), 
            uploaded_by: owners[i],
        }
      
        files.push(file)
    }

    return files
}

export const getContract = async (ethereum) => {
    const signer = await getSigner(ethereum)

    const contract = new ethers.Contract(contractAddress.contractAddress, contractAbi.abi, signer)

    return contract
}

export const getPublicFiles = async (ethereum) => {
    const contract = await getContract(ethereum)
    const txnResult = await contract.getAllPublicUploads()

    const publicFiles = parseResult(txnResult)

    // const ids = txnResult[0]
    
    // const names = txnResult[1]
    // const time = txnResult[2]
    // const owners = txnResult[3]
  
    // let publicFiles = []
  
    // for(let i = 0; i < ids.length; i++) {
    //     const file = {
    //         cid: ids[i],
    //         title: names[i], 
    //         uploaded_at: time[i].toBigInt(), 
    //         uploaded_by: owners[i],
    //     }
      
    //     publicFiles.push(file)
    // }

    return publicFiles
}

export const getPrivateFiles = async (ethereum) => {
    const contract = await getContract(ethereum)
    const txnResult = await contract.getAllPrivateUploads()

    const privateFiles = parseResult(txnResult)

    // const ids = txnResult[0]
    
    // const names = txnResult[1]
    // const time = txnResult[2]
    // const owners = txnResult[3]
  
    // let privateFiles = []
  
    // const account = await getAccount(ethereum)

    // for(let i = 0; i < ids.length; i++) {
    //     if (owners[i] === account) {
    //         const file = {
    //             cid: ids[i],
    //             title: names[i], 
    //             uploaded_at: time[i].toBigInt(), 
    //             uploaded_by: owners[i],
    //         }
            
    //         privateFiles.push(file)
    //     }
    // }

    return privateFiles
}

export const getSharedFiles = async (ethereum) => {
    const contract = await getContract(ethereum)
    const txnResult = await contract.getSharedFiles()

    const sharedFiles = parseResult(txnResult)

    // const ids = txnResult[0]
    
    // const names = txnResult[1]
    // const time = txnResult[2]
    // const owners = txnResult[3]
  
    // let sharedFiles = []

    // const account = await getAccount(ethereum)
  
    // for(let i = 0; i < ids.length; i++) {
    //     if (owners[i] !== account) {
    //         const file = {
    //             cid: ids[i],
    //             title: names[i], 
    //             uploaded_at: time[i].toBigInt(), 
    //             uploaded_by: owners[i],
    //         }

    //         sharedFiles.push(file)
    //     }
    // }

    return sharedFiles
}