"use client"

import { AutoSiteHeader } from "@/components/layout/auto-site-header";
import { Button } from "@/components/ui/button";


export default function NewRoute() {

    // <AutoSiteHeader></AutoSiteHeader>

    return (
        <AutoSiteHeader>
            <div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => { window.history.back() }}>Cancel</Button>
                    <Button onClick={() => {
                        window.history.back()
                    }}>Comfirm</Button>
                </div>

                <h1>New Route</h1>
            </div>
        </AutoSiteHeader>
    )
}