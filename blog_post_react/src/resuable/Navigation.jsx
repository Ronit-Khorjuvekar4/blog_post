import { Link } from 'react-router-dom';
import '../css/navcss.css';
import { useAuth } from '../context/AuthProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import pp from '../images/pp.jpg'

const Navigation = () => {
    const { user, logout } = useAuth();

    if (!user) return null; // No nav bar for unauthenticated users

    return (
        <>
            {/* <div className="row ok">
                <div className="col-lg-3"><b>BLOG WEBSITE</b></div>

                {user.user_type === "user" && (
                    <div className="col-lg-3">
                        <h5><Link className='link' to="/addBlog">ADD BLOG</Link></h5>
                    </div>
                )}

                {user.user_type === "admin" && (
                    <div className="col-lg-2">
                        <h5><Link className='link' to="/allUsers">VIEW ALL USERS</Link></h5>
                    </div>
                )}

                <div className="col-lg-2">
                    <h5><Link className='link' to="/viewBlog">VIEW BLOG</Link></h5>
                </div>

                <div className="col-lg-3">
                    <h5 onClick={logout} style={{ cursor: 'pointer' }}>Logout</h5>
                </div>
            </div> */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">BLOG WEBSITE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav variant='tabs' defaultActiveKey="/addBlog" className="me-auto d-flex align-items-center w-100" fill style={{ maxHeight: '150px' }} navbarScroll>
                        <Nav.Link href='#addBlog' as={Link} to="/addBlog">ADD BLOG</Nav.Link>
                        <Nav.Link eventKey="link-1" as={Link} to="/viewBlog">VIEW BLOG</Nav.Link>
                         <NavDropdown title={
                            <>
                                <img className='thumbnail-image' src={pp} alt="user pic" roundedCircle style={{ width: '40px' }}/>
                                {user.user_name}
                            </>
                        } 
                        id="basic-nav-dropdown" >
                        <Nav.Link eventKey="link-2"><NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4" onClick={logout}>Logout</NavDropdown.Item></Nav.Link>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ms-auto">

                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    );
}

export default Navigation;
