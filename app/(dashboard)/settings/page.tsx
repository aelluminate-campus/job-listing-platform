import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Lock, FileText, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { uploadResume } from "@/app/(dashboard)/api/actions";

export default async function UserSettings() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: user_info } = await supabase
    .from("emp_users")
    .select("*")
    .eq("id", user?.id)
    .single();
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
              <AvatarFallback>
                <div
                  className="
               text-5xl"
                >
                  {user_info?.full_name[0]}
                </div>
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user_info?.full_name}</CardTitle>
              <CardDescription>{user_info?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security">
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <form>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Resume</Label>
                    <div className="flex items-center justify-center w-full">
                      
                        
                        <Input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                        />
                        <Input
                          type="hidden"
                          name="userId"
                          value={user?.id}
                          readOnly
                        />
                      
                    </div>
                  </div>
                </div>
                <Button formAction={uploadResume} className="w-full mt-6">
                  Upload Resume
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
          <Button className="w-full mt-6">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
