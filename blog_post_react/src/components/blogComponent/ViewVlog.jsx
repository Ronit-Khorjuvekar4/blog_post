import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../context/BlogProvider";
import { Card,CardGroup, ModalDialog  } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import AddVlog from "./AddVlog";
import { Modal } from "react-bootstrap";
import { sendRequest,axiosInstance } from "../../axiosreuse/axiosInstance";
import BoldSpinner from "../../resuable/BoldSpinner";
import AddBlogForm from "./AddBlogForm";
import { useAuth } from "../../context/AuthProvider";

const ViewVlog = ({ wait = false, setWait = () => {} }) => {

    const [blog,setBlog] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBlog, setEditBlog] = useState(null);
    const {user} = useAuth()
    const [newwait,setNewWait] = useState(false)

    const deleteBlog = async (e,id,user_id) => {

        try{
            const res = await axiosInstance.delete(`/delete/${id}/${user_id}`)
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
        if (typeof setWait !== "function") return;
        setWait(false)
        let id = updatedBlog.blog_id
        let user_id = updatedBlog.user_id
        try {
            const res = await axiosInstance.put(`/edit/${id}/${user_id}`, updatedBlog);
            if (res.status === 200 || res.status === 201) {
                setIsModalOpen(false);
                setWait(true); // Trigger a re-fetch
                setNewWait(true)
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
        console.log("use effect:",wait)
        getBlogData()
    },[wait,newwait])
    
    return(
        <>
        {wait ? <BoldSpinner animation="border"/> :
           <div>

            <div className="container">
                <div className="row">
                        
                        
                    {blog &&
                        blog.map((b,index) => (
                            <div className="col-lg-12" id={b.blog_id}>
                                <CardGroup className="mt-3" >
                                    <Card border="success" style={{ width: '18rem' }} >
                                        <Card.Header as="h5">{b.blog_title}</Card.Header>
                                        <Card.Body>
                                            <Card.Subtitle>{b.blog_subject}</Card.Subtitle>
                                            <Card.Subtitle>{b.blog_content}</Card.Subtitle>
                                        </Card.Body>
                                            <Card.Text>
                                            </Card.Text>
                                        <Card.Body>
                                                <Button variant="danger" onClick={(e) => updateBlog(b)}>EDIT</Button>
                                                <Button variant="dark" onClick={(e) => deleteBlog(e,b.blog_id,b.user_id)}>DELETE</Button>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </div>
                    ))}
                        
                    
                </div>
            </div>

            <AddBlogForm 

                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editBlog}
                setWait={setWait}
            />
        
            </div>}
        </>
    )
}

export default ViewVlog;