
import { Bell, Settings2, Users } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { getMaintenancesAnalytics, getRemaindersAnalytics, getStaffsAnalytics } from "./utils";
import { getCurrentUser } from '@/lib/session';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Progress } from "@/components/ui/progress";

export default async function Home() {


  const remainder = await getRemaindersAnalytics()
  const maintenance = await getMaintenancesAnalytics()
  const staff = await getStaffsAnalytics()

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-2">
          <Heading title="Dashboard" description="Overview" />
          <Separator />

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Reminders
                  </CardTitle>
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{remainder.total}</div>
                  <p className="text-xs text-muted-foreground">
                    Total Reminders
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance
                  </CardTitle>
                  <Settings2 className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{maintenance.total}</div>
                  <p className="text-xs text-muted-foreground">
                    Total Maintenance
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Staffs
                  </CardTitle>
                  <Users className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{staff.total}</div>
                  <p className="text-xs text-muted-foreground">
                    Total Staffs
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 space-y-10 rounded-sm border p-8 shadow-md md:grid-cols-2 md:space-y-0">
              <div className="col-span-1 flex max-w-sm flex-col gap-4">
                <h3 className="text-xl font-medium md:text-3xl">Reminders</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Pending</span>  <span>{remainder.pending}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="pending" value={calculatePercentage(remainder.total, remainder.pending)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center  justify-between">
                    <span>Inprogress</span>  <span>{remainder.inprogress}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="inprogress" value={calculatePercentage(remainder.total, remainder.inprogress)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Completed</span>  <span>{remainder.completed}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="default" value={calculatePercentage(remainder.total, remainder.completed)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Expried</span>  <span>{remainder.expried}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="destructive" value={calculatePercentage(remainder.total, remainder.expried)} />
                </div>
              </div>

              <div className="col-span-1 flex max-w-sm  flex-col gap-4" >
                <h3 className="text-xl font-medium md:text-3xl">Maintenance</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Pending</span>  <span>{maintenance.pending}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="pending" value={calculatePercentage(maintenance.total, maintenance.pending)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center  justify-between">
                    <span>Inprogress</span>  <span>{maintenance.inprogress}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="inprogress" value={calculatePercentage(maintenance.total, maintenance.inprogress)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Completed</span>  <span>{maintenance.completed}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="default" value={calculatePercentage(maintenance.total, maintenance.completed)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Rejected</span>  <span>{maintenance.rejected}</span>
                  </div>
                  <Progress className="h-2 rounded-md" variant="destructive" value={calculatePercentage(maintenance.total, maintenance.rejected)} />
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </>
  )
}


function calculatePercentage(totalValue: number, obtainedValue: number): number {
  if (totalValue === 0) {
    // Handle the case where the total value is zero to avoid division by zero.
    return 0;
  }

  const percentage = (obtainedValue / totalValue) * 100;
  return percentage;
}