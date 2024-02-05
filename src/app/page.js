import BlogCard from '@/components/blogCard/BlogCard'
import { blogs } from '@/lib/data'
import Image from 'next/image'
import classes from './page.module.css'

export async function fetchBlogs(){
  const res = await fetch('http://localhost:3000/api/blog', {cache: 'no-store'})

  return res.json()


}


export default async function Home() {
  const blogs = await fetchBlogs()

  return (
   <div className={classes.container}>
    {blogs?.length > 0}
     <div className={classes.wrapper}>
      {blogs?.length > 0 
       ? blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} className="break-all"/>
      )) : <h3 className={classes.noBlogs}>No blogs are currently in the database</h3>}
     </div>
   </div>
  )
}
