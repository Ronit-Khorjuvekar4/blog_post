import { useEffect, useState } from "react";
import '../../css/common.css'
import { axiosInstance, sendRequest } from "../../axiosreuse/axiosInstance";
import BoldSpinner from "../../resuable/BoldSpinner";
import { HiInformationCircle } from "react-icons/hi2";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ProgressBar from 'react-bootstrap/ProgressBar';

const AddVlog = ({ isOpen, onClose, onSave, initialData }) => {
    
    const [formData, setFormData] = useState({}); 
    const [wait,setWait] = useState(false)
    const [count,setCount] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e)
        
        if(name === "blog_subject"){
            setCount(value)
        }

        setFormData({
          ...formData,
          blog_id:Date.now(),
          [name]: value,
        });
        
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        if(initialData){
            onSave(formData)
        }
        else{
            setWait(true)
            try {
                    const res = await axiosInstance.post("create",formData)
                    if(res.statusText === "OK"){
                        setWait(false)
                    }
                    } catch (error) {
                        console.log('Error sending request',error);
                        setWait(false)
                    }
                
                    // setFormData({ blog_name: "", blog_subject: "", blog_details: "" })
        }
    }

    useEffect(() => {
        if (initialData) {
          setFormData(initialData); 
        } else {
            setFormData({ blog_name: "", blog_subject: "", blog_details: "" })
        }
    }, [initialData]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Subject Should be 40 Characters long!
        </Tooltip>
      );

    return(

        <>

        {wait ? <BoldSpinner animation="border"/> : 
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 ok"></div>
                    <div className="col-lg-6 ok formdesign">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1>ADD BLOG</h1>
                            </div>

                            <div className='input-wrapper'>
                                <label htmlFor="blog_name">Enter Blog Name</label><br/>
                                <input 
                                    type="text" 
                                    id="blog_name" 
                                    name="blog_name" 
                                    value={formData.blog_name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            
                            <div className='input-wrapper'>
                                <label htmlFor="blog_subject">Enter Blog Subject</label> 
                                <OverlayTrigger
                                    placement="top"
                                    overlay={renderTooltip}>
                                    <span> <HiInformationCircle /></span> 
                                </OverlayTrigger> <br/>
                                    
                                <input 
                                    type="text" 
                                    id="blog_subject" 
                                    name="blog_subject"
                                    alue={formData.blog_subject} 
                                    onChange={handleChange} 
                                    maxLength={40}
                                    required
                                /> {count.length}
                                {<ProgressBar variant="danger" max={40} now={count.length} />}
                            </div>

                            <div className='input-wrapper'>
                                <label htmlFor="blog_details">Enter Blog Details</label><br/>
                                <textarea 
                                    id="blog_details" 
                                    name="blog_details" 
                                    value={formData.blog_details} 
                                    onChange={handleChange} 
                                    required
                                ></textarea>    
                            </div>

                            <input type="submit" value="Submit"/>

                        </form>
                   
                    </div>
                    <div className="col-lg-3 ok"></div>
                </div>
            </div>

            </div>
}
        </>
    )
}

export default AddVlog;