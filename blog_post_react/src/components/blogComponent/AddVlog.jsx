import { useEffect, useState } from "react";
import '../../css/common.css'
import { axiosInstance, sendRequest } from "../../axiosreuse/axiosInstance";
import BoldSpinner from "../../resuable/BoldSpinner";
import { HiInformationCircle } from "react-icons/hi2";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import pp from '../../images/pp.jpg'
import { Card } from "react-bootstrap";
import AddBlogForm from "./AddBlogForm";
import Modal from 'react-bootstrap/Modal';
import ViewVlog from "./ViewVlog";



const AddVlog = () => {
    
    const [formData, setFormData] = useState({}); 
    const [wait,setWait] = useState(false)
    const [count,setCount] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(

        <>
            <div>
                <Container className="d-flex justify-content-center mt-3">
                    <Card className="post-box">
                        <div className="d-flex align-items-center ok">
                            <img
                                src={pp}
                                alt="User"
                                className="rounded-circle me-2"
                                width="40"
                                height="40"
                            />
                            {/* Clickable Input */}
                            <p className="mb-0 flex-grow-1 post-input" onClick={handleShow}>What's on your mind?</p>
                        </div>
                    </Card>
                </Container>                             
            {show && 
                <AddBlogForm 
                    handleClose= {handleClose}
                    handleShow={handleShow}
                    show={show}
                    setWait={setWait}
                />
            }
            
            <ViewVlog 
                wait={wait}
                setWait={setWait}
            />
                    

            </div>
        </>
    )
}

export default AddVlog;