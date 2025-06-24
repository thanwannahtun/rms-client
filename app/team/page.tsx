"use client";

import { AgenciesInofCard } from './_components/agencies-info-card'
import { AutoSiteHeader } from '@/components/layout/auto-site-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function TeamDashboard() {

    return (
        <AutoSiteHeader>

            <div className="flex flex-2 flex-col">
                <div className="@container/main flex flex-2 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">


                        <div className="px-4 lg:px-6">
                            <Button>
                                <Link href="/team/partners"> Partners OR Agencies Or Users ( sell or book seats on trips ) Management </Link>
                            </Button>
                        </div>
                        <div className="px-4 lg:px-6">
                            <Button>
                                <Link href="/team/partners"> Agents at Gates ( sell or book seats on trips ) Management</Link>
                            </Button>
                        </div>
                        <div className="px-4 lg:px-6">
                            <Button>
                                <Link href="/team/partners">End Customers ( buy seats on trips ) Management</Link>
                                <li>Configure End User Management</li>
                            </Button>
                        </div>

                        <div className="px-4 lg:px-6">
                            <AgenciesInofCard name="Agencies" />
                        </div>
                    </div>
                </div>
            </div>
        </AutoSiteHeader>
    )
}
