import React, {useEffect} from 'react'

export default function TestPage() {

    useEffect(() => {


        const getUsers = async () => {
        // get
            const response = await fetch('http://localhost:3001/users')
            const data = await response.json()
            console.log(data)
        }

        const postUser = async () => {
            const user = {
                name: 'Abdul',
                age: 32
            }

        const config = {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json',
                    'accept-type': 'application/json'
                }
            }

            const response = await fetch('http://localhost:3001/user', config)
            const message = await response.json()
            console.log(message)
        }
       
        postUser()
    }, [])

    return (
        <div>
            tes page
        </div>
    )
}