'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/router'

export default function PostManagementPage() {
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin')
    }
    else getAllNews()

  }, [router])

  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAllNews = async () => {
    const getAllNewsApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/all`

    try {
        const response = await fetch(getAllNewsApi, {
            method: "GET",
            headers: {
                "admin": "true",
                "authorization": "Bearer " + localStorage.getItem("token")
            }, 
        })
        if (!response.ok) {
            throw new Error("Send request failed")
        }

        const res = await response.json()
        setPosts(res.data.map(a => {return {"id": a.newsId, "title": a.title, "author": a.authorId, "createdAt": new Date(a.createAt.seconds*1000).toISOString().split('T')[0]}}))
    } catch (error) {
        alert("Đã xảy ra lối, vui lòng thử lại")
        console.log(error)
    }
  }

  const handleDeletePost = async (id) => {
    setPosts(posts.filter(post => post.id !== id))
    const deleteNewsApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/delete?`

    try {
        const response = await fetch(deleteNewsApi + 
        new URLSearchParams({
          "id": id,
        }).toString(), {
            method: "DELETE",
            headers: {
                "admin": "true",
                "authorization": "Bearer " + localStorage.getItem("token")
            }, 
        })
        if (!response.ok) {
            throw new Error("Send request failed")
        }
    } catch (error) {
        alert("Đã xảy ra lối, vui lòng thử lại")
    }

    toast({
      title: "Thông báo",
      description: "Bài viết đã được xóa thành công.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto pt-10 pl-64 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Thông Tin & Bài Đăng</h1>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Link href="/admin/news/post" passHref>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
            <Plus className="mr-2 h-4 w-4" />
            BÀI VIẾT MỚI
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Ngày viết</TableHead>
            <TableHead>Tùy chỉnh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.createdAt}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/news/post?id=${post.id}`} passHref>
                    <Button variant="outline" size="icon" as="a">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the post
                          and remove it from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeletePost(post.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

