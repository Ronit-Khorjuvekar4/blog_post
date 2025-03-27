import { useContext, useState } from "react"
import "../../css/common.css"
import { sendRequest, axiosInstance } from "../../axiosreuse/axiosInstance"
import { useAuth } from "../../context/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    const { user,login } = useAuth();

    const [formData,setFormData] = useState({})

    const handleChange = async (e) =>{
        const {name,value} = e.target

        setFormData({
            ...formData,
            user_type:"user",
            [name]:value
        })
    }

    const handleSubmit = async (e) => {

        try{
            const res = await axiosInstance.post("login",formData)

            if(res.statusText === "OK"){
                
                let cred = login({ 
                    access_token: res.data.access_token, 
                    refresh_token: res.data.refresh_token 
                });
                
                {cred && navigate(cred && cred.user_type === "user" ? "/addBlog" : "/allUsers")}
            }

        }catch(error){
            console.log(error)
        }

    }

    return(
        <>
            <div></div>

                <div className="component">
                    <div className="row">
                        <div className="col-lg-4 ok"></div>
                        <div className="col-lg-4 ok formdesign">

                            <form action={handleSubmit}>
                                <div>
                                    <h1>Login</h1>
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="user_name">Username</label>
                                    <input 
                                        type="text" 
                                        id="user_name" 
                                        name="user_name" 
                                        onChange={handleChange} 
                                        value={formData.user_name} 
                                        required
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        type="text" 
                                        id="password" 
                                        name="password" 
                                        onChange={handleChange} 
                                        value={formData.password} 
                                        required
                                    />
                                </div>

                                <input type="submit" value="SUBMIT" className="mt-3"/>
                            

                            </form>

                        </div>
                        <div className="col-lg-4 ok"></div>
                    </div>
                </div>

                <div></div>
        </>
    )
}

export default Login