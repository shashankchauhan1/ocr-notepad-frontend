import React,{useEffect,useState} from 'react'
import axios from 'axios'

const GetUserData = () => {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchUsers = async() =>{
            try{
                // no need to write the full url, http://localhost:8000/api/getUsers
                // because of the proxy setting in vite.config.js
                  // it will automatically redirect the request to the backend server

                const response=await axios.get("/api/getUsers");
                console.log(response);
                setUsers(response.data);
                setLoading(false);
            } catch(error){
                console.error("Error fetching users:", error);
            }
        }
        
        const timer = setTimeout(()=>{
            fetchUsers();
        },2000);

        return () => clearTimeout(timer);
       
    },[]);

    return (
    <>
        <div style={{color:"black"}}>
            {loading ? ( <h1>Fetching Data........</h1> ) : ( 
                users.map((user) => (
                    <div>
                        Name : {user.name} <br />
                        Company : {user.company} <br />
                        <hr />
                    </div> 
                    
                ))
            )}

        </div>
    </>
    )
}

export default GetUserData
