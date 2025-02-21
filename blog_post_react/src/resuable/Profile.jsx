import pp from "../images/pp.jpg"
import { useAuth } from "../context/AuthProvider"
import '../css/profile.css'
import { useEffect, useState } from "react"
import { axiosInstance } from "../axiosreuse/axiosInstance"
import BoldSpinner from "./BoldSpinner"

const Profile = () =>{

    const {user} = useAuth()
    const [profile,setProfile] = useState({})
    const [flag,setFlag] = useState(false)
    const handleChange = (e) => {
        const {name,value} = e.target
        
        setProfile({
            ...profile,
            user_id:user.id,
            [name]:value
        })
    }

    const handleSubmit = async() => {
        console.log(profile)

        try{

            const res = await axiosInstance.post("profile",profile)
            if(res.data.message === "Data Added Successfully!!"){
                setFlag(true)
            }

        }catch(error){
            console.log("Error occures:",error)
        }

    }

    const getProfileInfo = async() => {
        const res = await axiosInstance.get("get_profile")
        if(res.statusText === "OK"){
            setProfile(res.data.data[0])
            setFlag(false)
        }
    }

    useEffect(() => {
        getProfileInfo()
    },[])

    return(
        <>
        {flag && <BoldSpinner />}
            <h3>Profile</h3>
            <div className="container">
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-lg-4">
                        <img className='thumbnail-image' src={pp} alt="user pic" roundedCircle style={{ width: '150px' }}/>
                        <h3>{user.user_name}</h3>
                    </div>
                    <div className="col-lg-8 ">
                        <form className="p-0 m-0" >
                            <div className="input-wrapper mt-0">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    placeholder="Email" 
                                    name="email" 
                                    onChange={handleChange}
                                    value={profile.email}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <label>Age</label>
                                <input 
                                    type="text" 
                                    placeholder="Age" 
                                    name="age"
                                    onChange={handleChange}
                                    value={profile.age}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <label>About</label>
                                <textarea 
                                    placeholder="About" 
                                    required
                                    name="about"
                                    value={profile.about}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row p-0">
                                <div className="col-lg-4"></div>
                                <div className="col-lg-3"></div>
                                <div className="col-lg-5">
                                    <input type="button" value="SAVE" className="save" onClick={handleSubmit}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile