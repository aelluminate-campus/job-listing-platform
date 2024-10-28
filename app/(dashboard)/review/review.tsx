'use client'

import { useState } from 'react'
import { Star, Calendar, MapPin, HardHat, Trash2, UploadCloud } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function ReviewUser() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [images, setImages] = useState<File[]>([])

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleStarHover = (hoverRating: number) => {
    setHover(hoverRating)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prevImages => [...prevImages, ...files])
  }

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  // Pseudo job data
  const job = {
    title: "Commercial Building Renovation",
    company: "ABC Construction Co.",
    location: "New York, NY",
    date: "Completed on May 15, 2023",
    description: "Major renovation of a 10-story office building, including structural repairs, electrical system upgrade, and modern interior design implementation.",
    contractorName: "John Doe",
    contractorImage: "/placeholder.svg?height=40&width=40"
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 pt-24">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <HardHat className="w-4 h-4" />
            <span>{job.company}</span>
            <MapPin className="w-4 h-4 ml-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
            <Calendar className="w-4 h-4" />
            <span>{job.date}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{job.description}</p>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={job.contractorImage} alt={job.contractorName} />
              <AvatarFallback>{job.contractorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Contractor</p>
              <p className="text-sm text-muted-foreground">{job.contractorName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Your Review</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} stars out of 5`}
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">{rating} out of 5</span>
          </div>

          <Textarea
            className="w-full mb-4 rounded-md"
            rows={4}
            placeholder="Write your review here..."
          />

          {/* Image upload section */}
          <div className="w-full text-center mb-4">
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <label className="cursor-pointer text-blue-500 hover:text-blue-700 flex items-center space-x-2">
                <UploadCloud className="w-6 h-6" />
                <span>Upload Images</span>
                <Input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">You can upload up to 5 images. (Optional)</p>
          </div>

          {/* Image preview section */}
          {images.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full max-w-xs">Submit Review</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
