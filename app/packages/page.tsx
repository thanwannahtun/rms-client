"use client";

import { AutoSiteHeader } from '@/components/layout/auto-site-header';


export default function PackagesDashboard() {

    return (
        <AutoSiteHeader>

            <div className="flex flex-2 flex-col">
                <div className="@container/main flex flex-2 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <h1>Packages Management Page Here</h1>

                        <li>Packages List</li>
                        <li>Register Packages Or Add Packages</li>
                        <li>Edit Packages</li>
                        <li>Delete Packages</li>
                        <li>Packages Details</li>
                        <li>Packages Search</li>


                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <h1>Packages Operations</h1>

                            <li> ? ? ?</li>
                        </div>
                    </div>
                </div>
            </div>
        </AutoSiteHeader>
    )
}
