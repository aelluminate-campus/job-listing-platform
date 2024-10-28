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

// Server Side Data Fetching
export const revalidate = 0;

// Mock data for top rated freelancers
const topRatedFreelancers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "Full Stack Developer",
    rate: "$65/hr",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Bob Smith",
    title: "UX/UI Designer",
    rate: "$55/hr",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Charlie Brown",
    title: "DevOps Engineer",
    rate: "$75/hr",
    rating: 4.9,
  },
];

export default async function Home({
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
    // Redirect to a custom error page with an error code
    redirect(`/error?code=${error.code}`);
  }



  const { data: usery } = await supabase.auth.getUser()
  console.log(usery?.user?.id)

  const {data, error: roleError} = await supabase.from("users").select("role").eq("user_id", usery?.user?.id).single()
  console.log(data?.role)
  return (
    <main className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        {/* Search Bar */}
        <form action="/home" method="GET">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search for jobs..."
                className="w-full"
              />
            </div>
          </div>
        </form>

        <Tabs defaultValue="jobs" className="mb-6">
          <TabsList>
            <TabsTrigger value="jobs">Best Matches</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                {Jobs.length > 0 ? (
                  Jobs.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2  hover:underline">
                          <Link href={`/home/${job.id}`}>{job.title}</Link>
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <CircleDollarSign className="h-4 w-4 mr-1 mt-[2px]" />
                          <span className="font-medium text-sm">
                            {job.salary}
                          </span>
                          <Dot className="h-4 w-4 mx-1 mt-[2px]" />
                          <Clock className="h-4 w-4 mr-1 mt-[2px]" />
                          <span className="font-medium">
                            {formatDistanceToNow(new Date(job.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No jobs found</p>
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
                    <h3 className="text-lg font-semibold mb-4">Job Feed</h3>
                    <p className="text-gray-600 mb-4">
                      Personalized job recommendations based on your skills and
                      preferences.
                    </p>
                    <Button className="w-full">View Job Feed</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <p>Your saved jobs will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
