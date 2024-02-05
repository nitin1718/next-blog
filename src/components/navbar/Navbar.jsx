'use client'

import Image from 'next/image'

import React, { useState } from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

export default function App() {


  const [showDropdown, setShowDropdown] = useState(false)
  const { data: session } = useSession()

  const handleShowDropdown = () => setShowDropdown(prev => true)

  const handleHideDropdown = () => setShowDropdown(prev => false)

  const loggedIn = false
  return (
    <Navbar>
      <NavbarBrand >
        <AcmeLogo />
        <h1 >
         <Link size="xl" href="/">Next-Blog</Link>       
           </h1>
      </NavbarBrand>



      {session?.user ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="create"><Link onClick={handleHideDropdown} href='/create-blog' >Create</Link></DropdownItem>
              <DropdownItem key="logout" color="danger">
              <button onClick={() => {signOut(); handleHideDropdown()}} >Logout</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) :
        (
          <>
            <button onClick={() => { signIn() }} >Log in</button>
            <Link href='/register'>Register</Link>            
          </>)
      }
    </Navbar>
  );
}
