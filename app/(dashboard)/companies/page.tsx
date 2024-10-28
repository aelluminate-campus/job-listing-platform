// Next JS
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

// Supabase
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// Server Side Data Fetching
export const revalidate = 0;

// Mock data for top-rated companies
const companies = [
  {
    id: 1,
    name: "ITSquare Hub",
    title: "Full Stack Developer",
    description: "As a company, we take pride in our Full Stack Developer, who is adept at both front-end and back-end technologies. They play a crucial role in delivering seamless applications that enhance user engagement and satisfaction. With proficiency in a range of frameworks and programming languages, our Full Stack Developer builds responsive and secure solutions tailored to meet our clients’ diverse needs. Whether it's creating dynamic web applications or managing robust databases, they ensure that our technological solutions are scalable and innovative.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Scrubbed",
    title: "UX/UI Designer",
    description: "We are proud to have a talented UX Designer on our team, who is committed to crafting user-centric interfaces that elevate the user experience. By focusing on user research, prototyping, and rigorous testing, they ensure every design decision is grounded in the needs and preferences of our users. Our UX Designer's ability to create intuitive, aesthetically pleasing interfaces helps us deliver products that not only meet but exceed customer expectations, fostering increased engagement and loyalty.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Printcom",
    title: "Printer Engineer",
    description: "Our Printer Engineer is essential to our operations, specializing in the maintenance and optimization of all printing systems. They ensure that our printers, from multifunction devices to large-scale industrial models, are running at peak performance. With expertise in troubleshooting, installation, and preventative maintenance, our Printer Engineer swiftly addresses any technical issues, minimizing downtime and keeping our workflow uninterrupted. Their dedication helps us deliver high-quality printed materials efficiently and reliably.",
    rating: 4.9,
  },
];

// Change into companies
export default async function Company({
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

  return (
    <main className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        {/* Search Bar */}
        <form action="/companies" method="GET"> 
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                name="searchTerm"
                defaultValue={searchTerm}
                placeholder="Search for companies..."
                className="w-full"
              />
            </div>
          </div>
        </form>

        <Tabs defaultValue="companies" className="mb-6"> 
          <TabsList>
            <TabsTrigger value="companies">Best Matches</TabsTrigger>
            <TabsTrigger value="saved">Saved Companies</TabsTrigger>
          </TabsList>
          <TabsContent value="companies"> 
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                {companies.length > 0 ? ( 
                  companies.map((company) => (
                    <Card
                      key={company.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 hover:underline">
                          <Link href={`/home/${company.id}`}>{company.name}</Link>
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="ml-1 text-sm">{company.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{company.title}</p>
                        <p className="text-gray-600 mb-4">{company.description}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>No companies found</p> 
                )}
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Rated Companies</h3>
                    <div className="space-y-4">
                      {companies.map((company) => (
                        <div key={company.id} className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`/placeholder-avatar-${company.id}.jpg`} />
                            <AvatarFallback>
                              {company.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{company.name}</p>
                            <p className="text-sm text-gray-500">{company.title}</p>
                          </div>
                          <div className="ml-auto text-right">
                            <div className="flex items-center text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="ml-1 text-sm">{company.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Company Feed</h3>
                    <p className="text-gray-600 mb-4">
                      Personalized company recommendations based on your preferences.
                    </p>
                    <Button className="w-full">View Company Feed</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <p>Your saved companies will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
