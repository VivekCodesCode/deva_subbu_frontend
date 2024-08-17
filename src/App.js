import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function App() {
  const [validated, setValidated] = useState(false);
  const [myimg, setMyimg] = useState(null); // Capture the file object
  const [cloudinaryImg, setCloudinaryImg] = useState('');
  const[user_data,set_user_data]=useState({
    name:"",
    tags:"",
    

  })

  function fileOnChange(event) {
    console.log(event.target.files)
    setMyimg(event.target.files[0]); // Set the file object
  }
  function onChange_listner(params) {
   const {name,value}=params.target
   set_user_data(
    {
      ...user_data,[name]:value
    }
   )
   console.log(user_data)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  let uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", myimg); // Append the file object
    formData.append("upload_preset", "Vivek_10sharma"); // Cloudinary upload preset name
    formData.append("cloud_name", "dwestfefv");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwestfefv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data.secure_url);
 

     
      const ocrUrl = 'https://api.ocr.space/parse/image'; // OCR API endpoint
      const formData2 = new FormData();
      formData2.append('url', myimg); // Use the secure URL
      formData2.append('apikey', 'd82504a58a88957');
      const ocrResponse = await axios.post(ocrUrl, formData2,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'filetype': 'pdf' // Specify the file type
        }
      });
      console.log( typeof( ocrResponse.data.ParsedResults[0].ParsedText));
      axios.post("http://localhost:8000/insert_data",{
        ...user_data,file_data:ocrResponse.data.ParsedResults[0].ParsedText,image_url:data.secure_url
      })

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
    <Navbar className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand className='navbar-content' href="#home">VivekApp</Navbar.Brand>
       <Link style={{textDecoration:"none"}} to="/Search">   <Navbar.Brand className='navbar-content'>Search</Navbar.Brand></Link>
        </Container>
      </Navbar>

      <Form className='user_form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Row  className="mb-3 form_input">
          <Form.Group  onChange={onChange_listner} as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
            className='form_input'
              required
              name='name'
              type="text"
              placeholder="First name"
           
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row  className="mb-3 form_input2">
          <Form.Group   data-role="tagsinput" onChange={onChange_listner} as={Col} md="6" controlId="validationCustom03">
            <Form.Label data-role="tagsinput" >Tag</Form.Label>
            <Form.Control className='form_input' name='tags' data-role="tagsinput" placeholder="Enter Tag" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3  form_input3">
        <Form.Group className="position-relative mb-3 form_input">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            required
            name="file"
            onChange={fileOnChange} // Handle file input change
          />
        </Form.Group>
        </Row>
        <Button  className='form_button' onClick={uploadImage} type="button">Submit</Button>
      </Form>

      {cloudinaryImg && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={cloudinaryImg} alt="Uploaded to Cloudinary" />
        </div>
      )}
    </>
  );
}

export default App;
