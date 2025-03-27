import { axiosInstance, sendRequest } from "../../axiosreuse/axiosInstance";
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';
import BoldSpinner from "../../resuable/BoldSpinner";
import { useAuth } from "../../context/AuthProvider";

const AddBlogForm = ({handleClose,handleShow,show,isOpen, onClose, onSave, initialData,setWait}) =>{

    const [formData, setFormData] = useState({}); 
    const [count,setCount] = useState("")
    const {user} = useAuth()
    
    const handleSubmit = async(e) => {
        e.preventDefault(); 

        if(initialData){
            onSave(formData)
        }
        else{
            setWait(true);
            try {
                    const res = await axiosInstance.post("create",formData)
                    if(res.statusText === "OK"){
                        setWait(true);
                        handleClose()
                    }
                    } catch (error) {
                        console.log('Error sending request',error);
                    }
                
                    setFormData({ blog_title: "", blog_subject: "", blog_content: "" })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "blog_subject"){
            setCount(value)
        }

        setFormData({
          ...formData,
          user_id:user.user_id,
          [name]: value,
        });
        
    };

    

    useEffect(() => {
        if (initialData) {
          setFormData(initialData); 
        } else {
            setFormData({ blog_title: "", blog_subject: "", blog_content: "" })
        }
    }, [initialData]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Subject Should be 40 Characters long!
        </Tooltip>
      );

    return(
        <>
        {/* {wait ? <BoldSpinner animation="border"/> :  */}
            <Modal
                show={initialData ? isOpen : handleShow}
                onHide={initialData ? onClose :  handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>{initialData ? "Edit Blog" : "Add Blog"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                            <Row className="mb-3">
                                <Form.Group className="mb3" as={Col} controlId="formGridAddBlog">
                                <Form.Label>Blog Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm" 
                                    placeholder="Enter Blog Title" 
                                    name="blog_title" 
                                    value={formData.blog_title} 
                                    onChange={handleChange}
                                />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridBlogSubject">
                                <Form.Label>Blog Subject</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm" 
                                    placeholder="Add Blog Subject" 
                                    name="blog_subject"
                                    value={formData.blog_subject} 
                                    onChange={handleChange} 
                                    maxLength={40}
                                />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridBlogDetails">
                                <Form.Label>Blog Details</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    size="sm" 
                                    rows={5} 
                                    placeholder="Blog Details...." 
                                    name="blog_content" 
                                    value={formData.blog_content} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
            {/* } */}
        </>
    )
}

export default AddBlogForm;