"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function CreateBusBrandDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", country: "" });

  const handleSubmit = async () => {
    // TODO: POST to API
    console.log("Creating brand", formData);
    setOpen(false); // close after submit
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Create Bus Brand</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl"> {/* 👈 customize size here */}
        <DialogHeader>
          <DialogTitle>Create New Bus Brand</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Brand Name"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
          />
          <Input
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData((f) => ({ ...f, country: e.target.value }))}
          />
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
