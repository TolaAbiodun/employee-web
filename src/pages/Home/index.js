import React, { useState, useEffect } from 'react';
import Navigation from 'components/Header';
import { getEmployees, createEmployee } from 'services/api';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
import { Container, Form } from 'react-bootstrap';
import { notifyError, notifySuccess } from 'utils/notifications';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { Link, useHistory } from 'react-router-dom';

// material ui table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import {Link as MuiLink} from '@mui/material';

import axios from 'axios';

// material tabel customization
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));


const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [firstname, setUserFirstName] = useState('');
  const [lastname, setUserLastName] = useState('');
  const [staffid, setStaffId] = useState('');
  const [resume, setResume] = useState(null);
  const [dob, setDob] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ROOT_URL = process.env.REACT_APP_BASE_BACKEND_URL;
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserFirstName('');
    setUserLastName('');
    setStaffId('');
    setDob('');
  };

  const validateForm = () => {
    return (
      staffid.length > 0 &&
      dob !== '' &&
      firstname.length &&
      lastname.length &&
      resume !== null
    );
  };

  useEffect(() => {
    fetchEmployees();
  }, [history]);




  const fetchEmployees = async () => {
    const employees = await getEmployees();
    console.log(employees.data)
    setEmployees(employees.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    var formData = new FormData();

    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('staff_id', staffid);
    formData.append('date_of_birth', dob);
    formData.append('resume', resume);

    console.log(formData);

    const register_res = await createEmployee(formData);

    console.log(register_res);

    if (register_res.status !== 201) {
      const err = register_res.response.data;
      const errMsg = Object.keys(err).map(key => {
        return `${err[key]}`;
      });
      setError(errMsg[0]);
      setHasError(true);
      setSuccess(false);
      notifyError(error);
    } else {
      setHasError(false);
      setSuccess(true);
      notifySuccess('Employee created successfully!');
      setIsModalVisible(false);
      setTimeout(() => window.location.reload(false), 2000);
    }
  };

  const deleteEmployeeHandler = id => {
    axios
      .delete(`${ROOT_URL}/api/v1/employee/employees/${id}/`)
      .then(res => {
        if (res.status === 204) {
          notifySuccess('Employee deleted successfully');
          setTimeout(() => window.location.reload(false), 2000);
        }
      })
      .catch(err => {
        notifyError(err.response.message);
      });
  };

    if (isAuthenticated === 'false') {
      history.push('/login');
    }

  return (
    <>
      <Navigation />
      <Container style={{ marginTop: 50 }}>
        <div className="d-flex justify-content-end mb-4">
          <Button onClick={showModal}>Add Staff</Button>
        </div>
        <h3 className="text-muted">Employees</h3>
        {/* display all employees */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Staff ID</StyledTableCell>
                <StyledTableCell align="right">Date of Birth</StyledTableCell>
                <StyledTableCell align="right">Resume</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { employees.sort((a, b) => b.id - a.id).map(employee => (
                <StyledTableRow key={employee.id}>
                  <StyledTableCell component="th" scope="row">
                    {employee.first_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.staff_id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {employee.date_of_birth}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <MuiLink href={employee.resume}>
                      {employee.resume.split(`${ROOT_URL}/media/`)}
                    </MuiLink>
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {' '}
                    <Tooltip title="Edit Employee Info">
                      <Link
                        color="textPrimary"
                        to={'/employee/edit/' + employee.id}>
                        <EditOutlined
                          style={{
                            color: 'green',
                            fontSize: 18,
                            cursor: 'pointer',
                            marginRight: 10
                          }}
                        />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete Employee">
                      <DeleteOutlined
                        style={{
                          color: 'red',
                          fontSize: 18,
                          cursor: 'pointer'
                        }}
                        onClick={() => deleteEmployeeHandler(employee.id)}
                      />
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
          </Table>
        </TableContainer>

        {/* <Table columns={columns} dataSource={employees} /> */}

        {/* Add employee Modal */}
        <Modal
          title="Add Employee Information"
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
                value={firstname}
                onChange={e => setUserFirstName(e.target.value)}
                className="signupFormInput"
              />
            </Form.Group>
            <Form.Group size="lg" controlId="lastname" className="mb-3">
              <Form.Label style={{ fontSize: 16 }}>Last Name</Form.Label>
              <Form.Control
                placeholder="Enter Last Name"
                type="text"
                value={lastname}
                onChange={e => setUserLastName(e.target.value)}
                className="signupFormInput"
              />
            </Form.Group>
            <Form.Group size="lg" controlId="staffid" className="mb-3">
              <Form.Label style={{ fontSize: 16 }}>Staff ID</Form.Label>
              <Form.Control
                placeholder="Enter Staff ID"
                type="text"
                value={staffid}
                onChange={e => setStaffId(e.target.value)}
                className="signupFormInput"
              />
            </Form.Group>

            <Form.Group size="lg" controlId="dob" className="mb-3">
              <Form.Label style={{ fontSize: 16 }}>Date of Birth</Form.Label>
              <Form.Control
                placeholder="Date of Birth"
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="signupFormInput"
              />
            </Form.Group>

            <Form.Group size="lg" controlId="resume" className="mb-3">
              <Form.Label style={{ fontSize: 16 }}>Upload CV</Form.Label>
              <Form.Control
                placeholder="upload cv"
                type="file"
                onChange={e => setResume(e.target.files[0])}
                className="signupFormInput"
              />
            </Form.Group>
            {/* <input
              type="file"
              onChange={e => setResume(e.target.files[0])}
              ref={React.createRef()}
            /> */}
            <div className="d-flex justify-content-center mt-4">
              <Button onClick={handleCancel} style={{ marginRight: 10 }}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={!validateForm()}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
