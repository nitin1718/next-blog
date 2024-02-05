// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import classes from './blogCard.module.css'
// import { useSession } from 'next-auth/react'
// import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
// import { format } from 'timeago.js'
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

// const BlogCard = ({ blog: { title, desc, imageUrl, likes, authorId, _id,createdAt } }) => {
//   const { data: session } = useSession()
//   const [isLiked, setIsLiked] = useState(false)
//   const [blogLikes, setBlogLikes] = useState(0)
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();


//   useEffect(() => {
//     session && likes && setIsLiked(likes.includes(session?.user?._id))
//     session && likes && setBlogLikes(likes.length)
//   }, [likes, session])

//   const handleLike = async () => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/blog/${_id}/like`, {
//         headers: {
//           'Authorization': `Bearer ${session?.user?.accessToken}`
//         },
//         method: 'PUT'
//       })

//       console.log(res)
//       if (res.ok) {
//         if (isLiked) {
//           setIsLiked(prev => !prev)
//           setBlogLikes(prev => prev - 1)
//         } else {
//           setIsLiked(prev => !prev)
//           setBlogLikes(prev => prev + 1)
//         }
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className={classes.container}>
//       <div className={classes.wrapper}>
//         <Link className={classes.imgContainer} href={`/blog/${_id}`}>
//           <Image src={imageUrl} width="350" height="350" />
//         </Link>
//         <div className={classes.blogData}>
//           <div className={classes.left}>
//             <h3>{title}</h3>
//             <p>{desc}</p>
//             <span>Created : <span>{format(createdAt)}</span></span>
//           </div>
//           <div className={classes.right}>
//             {blogLikes} {" "} {isLiked
//               ? (<AiFillLike onClick={handleLike} size={20} />)
//               : (<AiOutlineLike onClick={handleLike} size={20} />)}
//           </div>
//         </div>
//         <Button onPress={onOpen} >Open Preview</Button>
//     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//       <ModalContent >
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
//             <ModalBody>
//               {/* <h1> 
//               {title}
//               </h1> */}
//               <p>
//               <Image src={imageUrl} width="350" height="350" />
//               </p>
//               <p>
//               {desc}
//               </p>
//             </ModalBody>
//             <ModalFooter>
//               <Button color="danger" variant="light" onPress={onClose}>
//                 Close
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//       </div>
//     </div>
//   )
// }

// export default BlogCard


    
'use client'

import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@nextui-org/react";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import classes from './blogCard.module.css'
import { useSession } from 'next-auth/react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { format } from 'timeago.js'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const BlogCard = ({ blog: { title, desc, imageUrl, likes, authorId, _id,createdAt } }) => {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)
  const [blogLikes, setBlogLikes] = useState(0)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  useEffect(() => {
    session && likes && setIsLiked(likes.includes(session?.user?._id))
    session && likes && setBlogLikes(likes.length)
  }, [likes, session])

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${_id}/like`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        method: 'PUT'
      })

      console.log(res)
      if (res.ok) {
        if (isLiked) {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev - 1)
        } else {
          setIsLiked(prev => !prev)
          setBlogLikes(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="max-w-[340px]" isHoverable="true" disableAutosize="false">
  <CardHeader className="justify-between">
  <div className="flex gap-5">
    <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png"/>
    <div className="flex flex-col gap-1 items-start justify-center">
      <h4 className="text-small font-semibold leading-none text-default-700">{authorId?.username}</h4>
    </div>
  </div>
</CardHeader>

  <CardBody className="px-3 py-0 text-small text-default-400">
    <Link href={`/blog/${_id}`} >
      <Image src={imageUrl} width="350" height="350"/>
    </Link>
    <h2 className="text-large text-default-900">
      <strong>{title}</strong>
    </h2>
    <span className="pt-2 break-all">{desc}</span>
  </CardBody>
  <CardFooter className="gap-3">
    <Button onPress={onOpen}>Open Preview</Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {/* <h1>{title}</h1> */}
              <p>
                <Image src={imageUrl} width="350" height="350"/>
              </p>
              <p>{desc}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    <div className="flex gap-1">
      <p>
        {blogLikes} {" "}
        {isLiked
          ? (<AiFillLike onClick={handleLike} size={20} />)
          : (<AiOutlineLike onClick={handleLike} size={20} />)}
      </p>
    </div>
  </CardFooter>
  <p className="flex gap-5 justify-between">
    <span>Created : <span>{format(createdAt)}</span></span>
  </p>
</Card>

  );
}


export default BlogCard
