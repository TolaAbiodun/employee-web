import { Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Tooltip, Modal } from 'antd';
import { deleteEmployee, getEmployee } from 'services/api';
import { notifyError, notifySuccess } from 'utils/notifications';
import { useParams } from 'react-router-dom';




const deleteEmployeeHandler = async id => {
  
    const deleteEmployeeRes = await deleteEmployee(id);

    if (deleteEmployeeRes.status !== 204) {
      notifyError("Entry could not be deleted");
    } else {
      notifySuccess("Entry Deleted Successfully");
    }

};

// const confirm = async id => {
//     const getEmployeeRes = await getEmployee(id);
//     console.log(getEmployeeRes.data)

//     Modal.confirm({
//       title: 'Confirm',
//       icon: <ExclamationCircleOutlined />,
//       content: 'Are you sure you want to delete this entry?',
//       okText: 'Yes',
//       cancelText: 'No',
//       // onOk: () => deleteEmployeeHandler(id)
//     });
//   };

export const columns = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
    render: text => <a>{text}</a>
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last name'
  },
  {
    title: 'Staff ID',
    dataIndex: 'staff_id',
    key: 'staff_id'
  },
  {
    title: 'Date of Birth',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth'
  },

  {
    title: 'Action',
    key: 'action',
    render: record => (
      <Space size="middle">
        <Tooltip title="Edit Employee Info">
          <EditOutlined
            style={{ color: 'green', fontSize: 18, cursor: 'pointer' }}
          />
        </Tooltip>
        <Tooltip title="Delete Employee">
          <DeleteOutlined
            style={{ color: 'red', fontSize: 18, cursor: 'pointer' }}
            onClick={() => deleteEmployeeHandler(record.key.toString())}
          />
        </Tooltip>
      </Space>
    )
  }
];
