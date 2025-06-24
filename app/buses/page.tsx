"use client";

import { AutoSiteHeader } from '@/components/layout/auto-site-header';


export default function BusesDashboard() {

    return (
        <AutoSiteHeader>

            <div className="flex flex-2 flex-col">
                <div className="@container/main flex flex-2 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <h1>Buses Management Page Here</h1>

                        <li>Buses List</li>
                        <li>Register Buses Or Add Buses</li>
                        <li>Edit Buses</li>
                        <li>Delete Buses</li>
                        <li>Buses Details</li>
                        <li>Buses Search</li>


                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <h1>Buses Operations</h1>

                            <li> ? ? ?</li>
                        </div>
                    </div>
                </div>
            </div>
        </AutoSiteHeader>
    )
}
