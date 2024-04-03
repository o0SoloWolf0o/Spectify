"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useEffect, useState } from "react";
import BuildPopupComponent from "../build/buildPopup";
import { getBuildByUserId } from "@/database/build";


export default function TabComponent({userId}: {userId: string}) {
  const [isFetching, setIsFetching] = useState(true);
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
      const fetchBuilds = async () => {
      const builds = await getBuildByUserId(userId);
      setBuilds(builds as never[]);
      setIsFetching(false);
    }
    fetchBuilds();
  }
  , [userId]);
  

  return (
    <Tabs defaultValue="build" className="w-[64rem]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger className="disable" value="build">Build</TabsTrigger>
        <TabsTrigger value="like">Like</TabsTrigger>
      </TabsList>
      <TabsContent value="build">
        <Card>
          <CardHeader>
            <CardDescription className="flex justify-center">
              <div className="grid grid-cols-3 gap-16">
              {(builds as {id: string}[]).map((build) => (
                <div key={build.id} className="flex justify-start">
                   <BuildPopupComponent buildId={build.id} />
                </div>
              ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="like">
        <Card>
          <CardHeader>
            <CardDescription>
              My favorite build.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
