import {Web3Storage} from "web3.storage";

// put your web3.storage token here to run the function
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZBMTg2QzhFZDUwM2I0QWJhNUQ3NmRmZWVkNDUzNUJFMTEwNUFiNmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk5MjMyNzQ0NjEsIm5hbWUiOiJEZWNlbnRyYWxpemVkIExpYnJhcnkifQ.QtiG8ZtNRgteeIuGZjfjVoHAKwChlP12EpNe6HAsfIM"
const client = new Web3Storage({token})

export async function storeFiles(files, name){
    const cid = await client.put(files, {
        name: name,
        maxRetries: 3
    })
    return cid;
}
