import React, {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/userActions';
import {MDBDataTable} from 'mdbreact';
import Loader from '../layout/Loader';

import {getAdminUsers, deleteUser} from '../../redux/actions/userActions'
import { DELETE_AGENT_RESET } from '../../redux/constants/userConstant';

const AllUsers = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {loading, error, users} = useSelector(state => state.allUsers);
    const {isDeleted,  error: errorDeleted} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAdminUsers());

        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if(isDeleted) {
            toast.success('User was removed');
            dispatch({type: DELETE_AGENT_RESET});
        }

        if(errorDeleted) {
            toast.error(errorDeleted);
            dispatch(clearErrors());
        }
       

    },[dispatch, error, isDeleted, errorDeleted]);


    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
        ],
            rows: []
        }

        users && users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                  <div className='col-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center'>
                    <Link href={`/admin/users/${user._id}`}>
                        <a className='btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </a>
                    </Link>
                    <button onClick={() => dispatch(deleteUser(user._id))} className='btn btn-danger mx-2'>
                        <i className='fa fa-trash'></i>
                    </button>
                  </div>
            })
        })
        return data;
    }

    

    return (
        <div className='container-fluid'>
           { loading ? <Loader/> : <>
            <h1 className='my-5'>{`${users && users.length} Users`}
        
            </h1>
            <MDBDataTable
                data={setUsers()}
                className='px-3'
                responsive
                bordered
                striped
                hover
            />
           </>}
        </div>
    )
}

export default AllUsers
