import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/router';

export default function NewsPostingPage() {
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin')
    }
    if(id) {
      getNewsById()
    }
  }, [id])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData  = new FormData();
    formData.append("news-image", image)
    formData.append("title", title)
    formData.append("content", content)
    formData.append("authorId", "test")
    const createNewsApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/create`
  
    try {
        const response = await fetch(createNewsApi, {
            method: "POST",
            headers: {
                "admin": "true",
                "authorization": "Bearer " + localStorage.getItem("token")
            }, 
            body: formData
        })
        if (!response.ok) {
            throw new Error("failed")
        }
        alert("success")
    } catch (error) {
        alert("Đã xảy ra lỗi, vui lòng thử lại")
        console.log(error)
    }
    // console.log({ title, description, content, image });
    setTitle('');
    setDescription('');
    setContent('');
    setImage(null);
  };

  const getNewsById = async () => {
    const getNewsByIdApi = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news?id=${id}`

    try {
        const response = await fetch(getNewsByIdApi, {
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
        setTitle(res.data.title)
        setDescription(res.data.description)
        setContent(res.data.content)
        setPreviewImage(res.data.image)
    } catch (error) {
        alert("Đã xảy ra lối, vui lòng thử lại")
        console.log(error)
    }
  };

  return (
    <div className="container mx-auto pt-10 pl-64">
      {id ? <h1 className="text-2xl font-semibold mb-4">Chỉnh sửa bài viết</h1> : <h1 className="text-2xl font-semibold mb-4">Tạo Bài Viết Mới</h1>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Tiêu Đề</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề của bài đăng"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Mô Tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả hoặc tóm tắt bài đăng"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="content">Nội Dung</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập chi tiết nội dung bài đăng"
              required
              className="h-40"
            />
          </div>

          <div>
            <Label>Ảnh Minh Họa</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDragActive ? 'border-primary' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Kéo và thả hình ảnh vào đây hoặc click để chọn ảnh</p>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">Đăng Bài</Button>
        </form>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Xem Trước</CardTitle>
          </CardHeader>
          <CardContent>
            {image && (
              <div className="mb-4">
                <Image
                  src={previewImage}
                  alt="News article illustration"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">{title || 'Tiêu Đề'}</h2>
            <p className="text-gray-600 mb-4">{description || 'Mô tả'}</p>
            <div className="prose max-w-none">
              {content ? (
                <p>{content}</p>
              ) : (
                <p className="text-gray-400">Nội dung sẽ xuất hiện tại đây</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

