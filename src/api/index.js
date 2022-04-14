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

const timeConv = (t) => {
    let x = t.toString(16) * 1000
    x = new Date(+x);
    return x.toDateString();
}

const parseResult = (txnResult, fileType) => {
    if (txnResult[0].length > 0) {
        const ids = txnResult[0]
        
        const names = txnResult[1]
        const time = txnResult[2]
        const owners = txnResult[3]
      
        let files = []
      
        for(let i = 0; i < ids.length; i++) {
            const file = {
                cid: ids[i],
                title: names[i], 
                uploaded_at: timeConv(time[i]._hex), 
                uploaded_by: owners[i],
                fileType: fileType
            }
            files.push(file)
        }
        return files
    }

    return []
}

const getContract = async (ethereum) => {
    const signer = await getSigner(ethereum)

    const contract = new ethers.Contract(contractAddress.contractAddress, contractAbi.abi, signer)

    return contract
}

export const fetchPublicFiles = async (ethereum) => {
    try {
        const contract = await getContract(ethereum)
        const txnResult = await contract.getAllPublicUploads()
    
        const publicFiles = parseResult(txnResult, "Public")
    
        return publicFiles
    } catch(error) {
        console.log("Error: ", error)
        return []
    }
}

export const fetchPrivateFiles = async (ethereum) => {
    try {
        const contract = await getContract(ethereum)
        const txnResult = await contract.getAllPrivateUploads()
    
        const privateFiles = parseResult(txnResult, "Private")
    
        return privateFiles
    } catch(error) {
        console.log("Error: ", error)
        return []
    }
}

export const fetchSharedFiles = async (ethereum) => {
    try {
        const contract = await getContract(ethereum)
        const txnResult = await contract.getSharedFiles()
    
        const sharedFiles = parseResult(txnResult, "Shared")
    
        return sharedFiles
    } catch(error) {
        console.log("Error: ", error)
        return []
    }
}