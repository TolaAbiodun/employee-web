import React, {useState} from 'react';
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import { deleteEmployee } from 'services/api';
import { notifyError, notifySuccess } from 'utils/notifications';



const ConfirmModal = () => {

    const deleteEmployeeHandler = async id => {
        const deleteEmployeeRes = await deleteEmployee(id);

        if (deleteEmployeeRes.status !== 204) {
        notifyError('Entry could not be deleted');
        } else {
        notifySuccess('Entry Deleted Successfully');
        }
    };

    return( 
    Modal.confirm({
    title: 'Confirm',
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure you want to delete this entry?',
    okText: 'Yes',
    cancelText: 'No',
    onOk: () => deleteEmployeeHandler()
  })
)

};

export default ConfirmModal;;
