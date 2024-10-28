// Next JS
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, CircleDollarSign, Dot } from "lucide-react";

// Supabase
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Description } from "@radix-ui/react-toast";

// Server Side Data Fetching
export const revalidate = 0;

// Mock data for top rated freelancers
const topRatedFreelancers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Full Stack Developer",
    description:  "Hey there! I'm a Full Stack Developer with a passion for building seamless web applications from start to finish. I enjoy diving into both front-end and back-end challenges, whether it's crafting responsive, user-friendly interfaces or designing efficient databases and APIs. With every project, my goal is to deliver clean, maintainable code that solves real problems. Let’s create something amazing together!",
    rate: "$65/hr",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "UX/UI Designer",
    description : "Hi! I’m a UX Designer who loves shaping digital experiences that feel natural and intuitive. My work revolves around understanding users' needs and translating them into designs that are both functional and enjoyable. I’m all about creating smooth interactions and layouts that make sense without users even thinking about it. If you're looking for someone to bring clarity and simplicity to your product, I'm your designer!",
    rate: "$55/hr",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Charlie Brown",
    title: "DevOps Engineer",
    description : "Hello! I’m a DevOps Engineer with a focus on streamlining workflows and ensuring smooth collaboration between development and operations teams. I specialize in automating processes, optimizing infrastructure, and improving deployment pipelines to deliver faster, more reliable software. I thrive on solving complex problems and keeping systems running efficiently, so teams can focus on innovation without worrying about the tech behind it. Let’s keep your systems robust and scalable!",
    rate: "$75/hr",
    rating: 4.9,
  },
];

// Change into freelancers
export default async function Workers({
  searchParams,
}: {
  searchParams: { searchTerm?: string };
}) {
  const searchTerm = searchParams.searchTerm || "";
  const supabase = createClient();
  const { data: Jobs, error } = await supabase
    .from("list_jobs")
    .select("*")
    .ilike("title", `%${searchTerm}%`);
  if (error) {
   
    redirect(`/error?code=${error.code}`);
  }

  return (
    <main className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        {/* Search Bar */}
        <form action="/workers" method="GET">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search for workers..."
                className="w-full"
              />
            </div>
          </div>
        </form>

        <Tabs defaultValue="jobs" className="mb-6">
          <TabsList>
            <TabsTrigger value="jobs">Best Matches</TabsTrigger>
            <TabsTrigger value="saved">Saved Workers</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                {topRatedFreelancers.length > 0 ? (
                  topRatedFreelancers.map((freelancer) => (
                    <Card
                      key={freelancer.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2  hover:underline">
                          <Link href={`/home/${freelancer.id}`}>{freelancer.name}</Link>
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <CircleDollarSign className="h-4 w-4 mr-1 mt-[2px]" />
                          <span className="font-medium text-sm">
                            {freelancer.rate}
                          </span>
                          <Dot className="h-4 w-4 mx-1 mt-[2px]" />
                      
                          <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">
                                {freelancer.rating}
                              </span>
                            </div>
                        </div>
                        </div>
                        <p className="text-gray-600 mb-4">{freelancer.title}</p>
                        <p className="text-gray-600 mb-4">{freelancer.description}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No worker found</p>
                )}
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Top Rated Freelancers
                    </h3>
                    <div className="space-y-4">
                      {topRatedFreelancers.map((freelancer) => (
                        <div key={freelancer.id} className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={`/placeholder-avatar-${freelancer.id}.jpg`}
                            />
                            <AvatarFallback>
                              {freelancer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{freelancer.name}</p>
                            <p className="text-sm text-gray-500">
                              {freelancer.title}
                            </p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="font-medium">{freelancer.rate}</p>
                            <div className="flex items-center text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">
                                {freelancer.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Worker Feed</h3>
                    <p className="text-gray-600 mb-4">
                      Personalized worker recommendations based on your preferences.
                    </p>
                    <Button className="w-full">View Worker Feed</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <p>Your saved workers will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
