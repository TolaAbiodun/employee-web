import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { Container, Form } from 'react-bootstrap';
import { notifyError, notifySuccess } from 'utils/notifications';
import { Link } from "react-router-dom";

import { getEmployee, updateEmployee } from 'services/api';

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();


const ROOT_URL_BACKEND = process.env.REACT_APP_BASE_BACKEND_URL;


  const [resume, setResume] = useState('');

  const initialFormData = Object.freeze({
    first_name: '',
    last_name: '',
    staff_id: '',
    date_of_birth: '',
    resume: resume
  });

  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push('/');
  };

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    const employee = await getEmployee(id);
    updateFormData({
      ...formData,
      first_name: employee.data.first_name,
      last_name: employee.data.last_name,
      staff_id: employee.data.staff_id,
      date_of_birth: employee.data.date_of_birth,
      resume:  ROOT_URL_BACKEND + employee.data.resume

    });
  };

  const handleChange = e => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    var form = new FormData();

    form.append('first_name', formData.first_name);
    form.append('last_name', formData.last_name);
    form.append('staff_id', formData.staff_id);
    form.append('date_of_birth', formData.date_of_birth);
    form.append('resume', resume);

    const updateEmployeeRes = await updateEmployee(id, form);

    if (updateEmployeeRes.status === 200) {
      history.push({
        pathname: '/'
      });
      notifySuccess('Employee updated successfully');
    } else {
      const err = updateEmployeeRes.response.data;
      const errMsg = Object.keys(err).map(key => {
        return `${err[key]}`;
      });
      notifyError(errMsg[0]);
      history.push({
        pathname: `/employee/edit/${id}`
      });
    }
  };

  console.log(formData.resume)


  return (
    <Container>
      <Modal
        visible={isModalVisible}
        footer={null}
        centered={true}
        onCancel={handleCancel}>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="firstname" className="mb-3">
            <Form.Label style={{ fontSize: 16 }}>Firstname</Form.Label>
            <Form.Control
              placeholder="Enter First Name"
              autoFocus
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="signupFormInput"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastname" className="mb-3">
            <Form.Label style={{ fontSize: 16 }}>Last Name</Form.Label>
            <Form.Control
              placeholder="Enter Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="signupFormInput"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="staffid" className="mb-3">
            <Form.Label style={{ fontSize: 16 }}>Staff ID</Form.Label>
            <Form.Control
              placeholder="Enter Staff ID"
              type="text"
              name="staff_id"
              value={formData.staff_id}
              onChange={handleChange}
              className="signupFormInput"
            />
          </Form.Group>

          <Form.Group size="lg" controlId="dob" className="mb-3">
            <Form.Label style={{ fontSize: 16 }}>Date of Birth</Form.Label>
            <Form.Control
              placeholder="Date of Birth"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="signupFormInput"
            />
          </Form.Group>

          <Form.Group size="lg" controlId="dob" className="mb-3">
            <Form.Label style={{ fontSize: 16 }}>Upload CV</Form.Label>
            <Form.Control
              type="file"
              name="resume"
              // value={file}
              onChange={e => setResume(e.target.files[0])}
              className="signupFormInput"
              ref={React.createRef()}
            />
            <a href={formData.resume} target="_blank" rel="noreferrer">
              <span>{formData.resume.split(`${ROOT_URL_BACKEND}/media/`)}</span>
            </a>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button onClick={handleCancel} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </Container>
  );
};

export default Edit;
