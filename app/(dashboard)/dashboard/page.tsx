import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import AdminFeatures from "@/components/navigation/adminfeatures";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import WidgetItem from "@/components/widget/widgetitem";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import "@/app/(dashboard)/dashboard/styles.css"
import BanButton from '@/components/banButton/banButton1';

const Dashboard = async () => {

    const profile = await currentProfile();
    if (!profile?.isAdmin) {
        return redirect("/")
    }

    const server = await db.server.findMany();
    const profiles = await db.profile.findMany();
    const challenges = await db.challenge.findMany({
        where: {
            serverId: {
                in: server.map(server => server.id)
            }
        }
    });
    const post = await db.post.findMany();

    const transformServers = server.map(servers => servers.name);
    const transformProfiles = profiles.map(profiles => profiles.name);
    const transformChallenges = challenges.map(challenges => challenges.name);
    const transformPost = post.map(post => post.profileId);

    const table = await db.profile.findMany({
        select:{
            id:true,
            name:true,
            servers:true,
        }
    });

    const report = await db.userReport.findMany({
        select:{
            id:true,
            reportee:true,
            reporter:true,
            content:true
        }
    })

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="pl-[10px] md:pl-[170px] pr-[40px] h-full">
                <HomeMobileToggle />
                <div className="flex items-center justify-between mt-5">
                    <div className="text-4xl ml-9 mb-5 ">
                        <strong>Dashboard</strong>
                    </div>
                </div>
                <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-2 mb-6" />
                <div className="ml-2 mt-2 flex flex-row gap-20 text-black">
                    <WidgetItem heading="Users" value={transformProfiles.length} percent={Math.round(((transformProfiles.length - 1) / transformProfiles.length) * 100 * 100) / 100} color="green" amount={true} />
                    <WidgetItem heading="Challenges" value={transformChallenges.length} percent={Math.round(((transformChallenges.length - 1) / transformChallenges.length) * 100 * 100) / 100} color="red" amount={true} />
                    <WidgetItem heading="Teams" value={transformServers.length} percent={Math.round((((transformServers.length - 1) / transformServers.length) * 100) * 100) / 100} color="blue" amount={true} />
                    <WidgetItem heading="Virtual Exhibits" value={transformPost.length} percent={Math.round((((transformPost.length - 1) / transformPost.length) * 100) * 100) / 100} color="purple" amount={true} />
                </div>
                <div className="ml-4 mt-7"><AdminFeatures servers={transformServers} users={transformProfiles} challenges={transformChallenges} name={profile.name} /></div>
                
                <div className="mb-4 ml-2 mt-7">
                <div style={{fontSize:20, fontWeight:900}}>User(s) Information</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User</th>
                                <th>Teams</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>{value.name}</td>
                                        <td>{value.servers.map((team, index) => (
                                <div key={index}>{team.name}</div>
                            ))}</td>
                                <td>
                                <BanButton profileId={value.id}/>
                                </td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </table>
                </div>
                
                <div className="mb-4 ml-2 mt-7">
                <div style={{fontSize:20, fontWeight:900}}>User Reports</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Reporter</th>
                                <th>Reported</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{value.id}</td>
                                        <td>{value.reportee}</td>
                                        <td>{value.reporter}</td>
                                        <td>{value.content}</td>
                                    </tr>
                                );
                            })}
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
