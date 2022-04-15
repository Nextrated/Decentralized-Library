import {Web3Storage} from "web3.storage";

// require('dotenv').config()

const { WEB3_TOKEN } = process.env

// put your web3.storage token here to run the function
// const token = WEB3_TOKEN
const token = ""
const client = new Web3Storage({token})

export async function storeFiles(files, name){
    const cid = await client.put(files, {
        name: name,
        maxRetries: 3
    })
    return cid;
}
