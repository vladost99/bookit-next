import React, {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomActions';
import {MDBDataTable} from 'mdbreact';
import Loader from '../layout/Loader';

import {getAdminRooms, deleteRoom} from '../../redux/actions/roomActions'
import { DELETE_ROOM_RESET } from '../../redux/constants/roomConstant';


const AllRooms = () => {
    const dispatch = useDispatch();

    const {rooms, error, loading} = useSelector(state => state.allRooms);
    const {error: deleteError, isDeleted} = useSelector(state => state.room);

    useEffect(() => {
        dispatch(getAdminRooms());

        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if(isDeleted) {
            toast.success('The room has been removed')
            dispatch({type: DELETE_ROOM_RESET});
        }

        if(deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors());
        }

    },[dispatch, deleteError, isDeleted, error]);


    const setRooms = () => {
        const data = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
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

        rooms && rooms.forEach(room => {
            data.rows.push({
                id: room._id,
                name: room.name,
                price: `$${room.pricePerNight}`,
                category: room.category,
                actions:
                  <div className='col-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center'>
                    <Link href={`/admin/rooms/${room._id}`}>
                        <a className='btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </a>
                    </Link>
                    <button onClick={() => deleteRoomHandler(room._id)} className='btn btn-danger mx-2'>
                        <i className='fa fa-trash'></i>
                    </button>
                  </div>
            })
        })
        return data;
    }

    const deleteRoomHandler = (id) => {
        dispatch(deleteRoom(id));
    }

    return (
        <div className='container-fluid'>
           { loading ? <Loader/> : <>
            <h1 className='my-5'>{`${rooms && rooms.length} Rooms`}
            
            <Link href='/admin/rooms/new'>
                <a className='mt-0 btn text-white float-right new-room-btn'>Create Room</a>
            </Link>
            </h1>
            <MDBDataTable
                data={setRooms()}
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

export default AllRooms
