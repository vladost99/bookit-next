import Link from 'next/link';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loadUser} from '../../redux/actions/userActions';
import {signOut} from 'next-auth/client';

function Header() {
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(state => state.loadedUser);

   useEffect(() => {
    if (!user && !error) {
      dispatch(loadUser())
    }
   }, [dispatch, user, error])

   const logoutHandler = () => {
     signOut();
   }

    return (
        <nav className="navbar justify-content-center sticky-top">
      <div className="container" style={{paddingRight: 0,paddingLeft: 0}}>
      <div className="col-3 p-0">
        <div className="navbar-brand">
          <Link href='/'>
              <img style={{cursor: 'pointer'}} src="/images/bookit_logo.png" alt="BookIT"/>
          </Link>
        </div>
      </div>

      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-8 mt-3 mt-md-0 text-center">

        {user ? (
          <div className='ml-4 dropdown d-line'>
             <a 
              className='btn dropdown-toggle mr-4'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
             >
               <figure className='avatar avatar-nav'>
                  <img 
                  src={user.avatar && user.avatar.url} 
                  alt={user && user.name}
                  className='rouded-circle'
                   />
               </figure>
               <span>{user && user.name}</span>
             </a>
             <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  {user.role === 'admin' && (
                    <>
                      <Link href='/admin/rooms'>
                        <a className='dropdown-item'>Rooms</a>
                      </Link>

                      <Link href='/admin/bookings'>
                        <a className='dropdown-item'>Bookings</a>
                      </Link>

                      <Link href='/admin/users'>
                        <a className='dropdown-item'>Users</a>
                      </Link>

                      <Link href='/admin/reviews'>
                        <a className='dropdown-item'>Reviews</a>
                      </Link>

                      <hr/>
                    </>
                  )}
                  <Link href='/bookings/me'>
                    <a className='dropdown-item'>My Bookings</a>
                  </Link>
                  <Link href='/me/update'>
                    <a className='dropdown-item'>Profile</a>
                  </Link>
                  <Link href='/'>
                    <a onClick={logoutHandler} className='dropdown-item  text-danger'>Logout</a>
                  </Link>
             </div>
          </div>
        ) : (
          
      !loading && <Link href='/login'>
          <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
        </Link>

        )}

      </div>
    </div>
    </nav>
    )
}

export default Header
