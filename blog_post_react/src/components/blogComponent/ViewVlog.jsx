import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../context/BlogProvider";
import { Card,CardGroup, ModalDialog  } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import AddVlog from "./AddVlog";
import { Modal } from "react-bootstrap";
import { sendRequest,axiosInstance } from "../../axiosreuse/axiosInstance";
import BoldSpinner from "../../resuable/BoldSpinner";

const ViewVlog = () => {

    const [blog,setBlog] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBlog, setEditBlog] = useState(null);
    const [wait,setWait] = useState(false)

    const deleteBlog = async (e,id) => {
        try{
            const res = await axiosInstance.delete("/delete/"+id)
            if(res.statusText === "OK"){
                setWait(true)
            }
        }catch(error){
            console.log("Error sending request",error)
        }
    }

    const updateBlog = (blog) => {

        setEditBlog(blog);
        setIsModalOpen(true);
    }

    const handleSave = async (updatedBlog) => {
        setWait(true)
        let id = updatedBlog.id
        try {
            const res = await axiosInstance.put(`/edit/${id}`,updatedBlog)
            if(res.statusText === "OK"){
                setIsModalOpen(false);
                setWait(false)
            }
            } catch (error) {
                console.log('Error sending request',error);
            }
    };

    const handleClose = () => setIsModalOpen(false);

    const getBlogData = async () => {
        try {
            const res = await axiosInstance.get("get")
            if(res.statusText === "OK"){
                setBlog(res.data.data)
                setWait(false)
            }
          } catch (error) {
            console.log('Error sending request');
          }
    }

    useEffect(() => {

        getBlogData()

    },[])

    useEffect(() => {
        getBlogData()
    },[wait])
    
    return(
        <>
        {wait ? <BoldSpinner animation="border"/> :
           <div> View Vlog

            <div className="container">
                <div className="row">
                        
                        
                        {blog &&
                            blog.map((b,index) => (
                                <div className="col-lg-3">
                                    <CardGroup className="mt-3" id={b.id}>
                                        <Card border="success" style={{ width: '18rem' }} >
                                            <Card.Body>
                                                <Card.Title>{b.blog_name}</Card.Title>
                                                <Card.Subtitle>{b.blog_subject}</Card.Subtitle>
                                                <Card.Text>
                                                {/* {b.blog_details} */}
                                                </Card.Text>
                                                <div className="row">

                                                    <div className="col-lg-4">
                                                        <Button variant="danger" onClick={(e) => updateBlog(b)}>EDIT</Button>
                                                    </div>
                                                    <div className="col-lg-2"></div>
                                                    <div className="col-lg-4">
                                                        <Button variant="dark" onClick={(e) => deleteBlog(e,b.id)}>DELETE</Button>
                                                    </div>

                                                    <div className="col-lg-2"></div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                              </div>
                        ))}
                        
                    
                </div>
            </div>


            {
                <ModalDialog  animation={true}>
                    <Modal show={isModalOpen} centered size="lg" fullscreen="sm-down"
                    aria-labelledby="contained-modal-title-vcenter" onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>EDIT BLOG</Modal.Title>
                        </Modal.Header>
                        <Modal.Body scrollable={true}>

                            <AddVlog
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSave={handleSave}
                                initialData={editBlog}
                                spin={wait}
                                />
                                
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </ModalDialog>
                
            }
            </div>}
        </>
    )
}

export default ViewVlog;