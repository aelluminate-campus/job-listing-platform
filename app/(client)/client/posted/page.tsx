// pages/client/posted.tsx

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

export default async function PostedJobs({
  searchParams,
}: {
  searchParams: { searchTerm?: string };
}) {
  const searchTerm = searchParams.searchTerm || "";
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: Jobs, error } = await supabase
    .from("list_jobs")
    .select("*")
    .eq("client_id", user?.id) // Filter jobs by client ID
    .ilike("title", `%${searchTerm}%`);

  if (error) {
    console.error("Error fetching jobs:", error);
    // Redirect to a custom error page with an error code
    redirect(`/error?code=${error.code}`);
  }

  const { data: activeJobs, error: activeJobsError } = await supabase.from("list_jobs").select("*").eq("client_id", user?.id).eq('is_active', true);

  console.log(activeJobs);

  return (
    <main className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        {/* Search Bar */}
        <form action="/client/posted" method="GET">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search for your posted jobs..."
                className="w-full"
              />
            </div>
          </div>
        </form>

        <Tabs defaultValue="jobs" className="mb-6">
          <TabsList>
            <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
            <TabsTrigger value="saved">Active Jobs</TabsTrigger>
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
                          <Link href={`/client/posted/${job.id}`}>{job.title}</Link>
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
          <div className="md:col-span-2 space-y-6">
                {activeJobs && activeJobs.length > 0 ? (
                  activeJobs?.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2  hover:underline">
                          <Link href={`/client/posted/${job.id}`}>{job.title}</Link>
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
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
