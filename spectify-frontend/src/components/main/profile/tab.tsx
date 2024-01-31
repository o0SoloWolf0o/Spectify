import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabComponent() {
  return (
    <Tabs defaultValue="build" className="w-[64rem]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="build">Build</TabsTrigger>
        <TabsTrigger value="like">Like</TabsTrigger>
      </TabsList>
      <TabsContent value="build">
        <Card>
          <CardHeader>
            <CardDescription>
              My build.
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
