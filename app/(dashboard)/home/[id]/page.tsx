import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  DollarSign,
  Clock,
  MapPin,
  Briefcase,
  Star,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { applyJob } from "../../api/actions";

export const revalidate = 0;

export default async function JobDetails({
  params,
}: {
  params: { id: number };
}) {
  const supabase = createClient();
  const { data: job, error } = await supabase
    .from("list_jobs")
    .select("*, client_id(*)")
    .eq("id", params.id)
    .single();

  const {data: user_info} = await supabase.auth.getUser();

  const similarJobs = [
    {
      id: "2",
      title: "Backend Developer for API Integration",
      budget: "$2500 - $4000",
    },
    {
      id: "3",
      title: "Frontend React Developer for Dashboard",
      budget: "$2000 - $3500",
    },
    {
      id: "4",
      title: "Full Stack Developer for SaaS Product",
      budget: "$3500 - $6000",
    },
  ];

  const skills = ["React", "Node.js", "GraphQL", "PostgreSQL", "Tailwind CSS"];

  return (
    <div className="container mx-auto px-4 py-3">
      <Link href="/home">
        <Button variant="ghost" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
      </Link>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">
                {job.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <div className="flex items-center space-x-2 mb-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(job.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>2-3 months</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Contract</span>
                </div>
              </CardDescription>
            </div>
            <form>
              <input type="hidden" name="jobId" value={job.id} />
              <input type="hidden" name="userId" value={user_info.user?.id} />
            <Button formAction={applyJob} size="lg">Apply Now</Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-2">Job Description</h3>
              <p className="text-muted-foreground mb-4">{job.description}</p>

              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-2">About the Client</h3>
              <Card>
                <CardContent className="flex items-center space-x-4 py-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt={job.client_id.full_name}
                    />
                    <AvatarFallback>
                      {job.client_id.full_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">
                      {job.client_id.full_name}
                    </h4>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{job.client_id.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Job Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Salary
                      </dt>
                      <dd className="text-sm">$ {job.salary}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Duration
                      </dt>
                      <dd className="text-sm">2-3 months</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Location
                      </dt>
                      <dd className="text-sm">{job.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Job Type
                      </dt>
                      <dd className="text-sm">Contract</dd>
                    </div>{" "}
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Applications
                      </dt>
                      <dd className="text-sm">12</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mb-4">Similar Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarJobs.map((similarJob) => (
          <Card key={similarJob.id}>
            <CardHeader>
              <CardTitle className="text-lg">{similarJob.title}</CardTitle>
              <CardDescription>{similarJob.budget}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/jobs/${similarJob.id}`} passHref>
                <Button variant="outline" className="w-full">
                  View Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
