"use client";

import { AutoSiteHeader } from '@/components/layout/auto-site-header';
import { AgenciesInofCard } from '../../_components/agencies-info-card';


export default function TeamDashboard() {

    return (
        <AutoSiteHeader>

            <div className="flex flex-2 flex-col">
                <div className="@container/main flex flex-2 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <h1>Partners Management Page Here</h1>

                        <li>Partner List</li>
                        <li>Register Partner Or Add Partner</li>
                        <li>Edit Partner</li>
                        <li>Delete Partner</li>
                        <li>Partner Details</li>
                        <li>Partner Search</li>


                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <h1>Partner Operations</h1>

                            <li>Partners can book/sell Seats on Trips</li>
                        </div>
                    </div>
                </div>
            </div>
        </AutoSiteHeader>
    )
}
