import { useState } from "react"
import "../../css/common.css"
import { sendRequest } from "../../axiosreuse/axiosInstance"

const Register = () => {

    const [formData,setFormData] = useState({})

    const handleChange = (e) => {
        const {name,value} = e.target

        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleSubmit = async(e) => {
        try{

            const res = await sendRequest("POST","register",formData ? formData : null)
            if(res.statusText == "OK"){
                console.log(res)
            }
        }catch(error){
            console.log("Error: ",error)
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
                                    <h1>REGISTER</h1>
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

export default Register