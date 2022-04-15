import {Web3Storage} from "web3.storage";

// require('dotenv').config()

const { WEB3_TOKEN } = process.env

// put your web3.storage token here to run the function
// const token = WEB3_TOKEN
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI2NThCNzZGMzcxNTE2NDUxNjY2NDBlN2NmQTlDOTYyYzU1MDIxNkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTAwMTg3NzQ2ODIsIm5hbWUiOiJkZWNlbnRyYWxpemVkLWxpYnJhcnkifQ.JhlQJhLnHGAt32E0zaDvmGEHZ_rXLqgIsZpcGNB-L28"
const client = new Web3Storage({token})

export async function storeFiles(files, name){
    const cid = await client.put(files, {
        name: name,
        maxRetries: 3
    })
    return cid;
}

export async function getFile() {
    console.log("Hello")
    const file = await client.get("bafybeicue55qzxz2igdokimgz4zy7fzoaeprvupax4vqo3mbwfctdnxgoi")
    console.log("File: ", file.url)
}
