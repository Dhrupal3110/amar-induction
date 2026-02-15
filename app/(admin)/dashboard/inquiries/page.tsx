"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { TableSkeleton } from "@/components/skeletons";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    status: "new" | "read" | "replied";
    createdAt: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        try {
            // Use query without orderBy first if index is missing, or catch the error
            const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
            let querySnapshot;
            try {
                querySnapshot = await getDocs(q);
            } catch (e) {
                console.warn("Index missing for inquiries sort, fetching unsorted", e);
                querySnapshot = await getDocs(collection(db, "inquiries"));
            }

            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Inquiry[];

            // Client-side sort if query sort failed
            if (data.length > 0 && !data[0].createdAt) {
                // If no createdAt, assume unsorted or sort by other means if needed
            } else {
                data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            setInquiries(data);
        } catch (error) {
            console.error("Error fetching inquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            // Optimistic update
            setInquiries(prev => prev.map(inq =>
                inq.id === id ? { ...inq, status: newStatus as any } : inq
            ));

            const docRef = doc(db, "inquiries", id);
            await updateDoc(docRef, { status: newStatus });
        } catch (error) {
            console.error("Error updating status:", error);
            // Revert if needed, but for now simple log
        }
    };



    // ...

    if (loading) {
        return (
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">Inquiries</h2>
                <TableSkeleton rows={5} columns={5} />
            </div>
        );
    }


    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Inquiries</h2>

            <Card className="bg-neutral-900 border-neutral-800 text-neutral-100">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                                <TableHead className="text-neutral-400 w-[150px]">Date</TableHead>
                                <TableHead className="text-neutral-400 w-[200px]">Name</TableHead>
                                <TableHead className="text-neutral-400 w-[250px]">Email</TableHead>
                                <TableHead className="text-neutral-400">Message</TableHead>
                                <TableHead className="text-neutral-400 w-[150px]">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiries.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-neutral-500">
                                        No inquiries found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                inquiries.map((inquiry) => (
                                    <TableRow key={inquiry.id} className="border-neutral-800 hover:bg-neutral-800/50">
                                        <TableCell className="text-neutral-300 whitespace-nowrap align-top">
                                            {inquiry.createdAt ? format(new Date(inquiry.createdAt), "MMM d, yyyy") : "N/A"}
                                            <div className="text-xs text-neutral-500">
                                                {inquiry.createdAt ? format(new Date(inquiry.createdAt), "h:mm a") : ""}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-white align-top">
                                            {inquiry.name}
                                        </TableCell>
                                        <TableCell className="text-neutral-300 align-top">
                                            <a href={`mailto:${inquiry.email}`} className="hover:text-primary transition-colors hover:underline">
                                                {inquiry.email}
                                            </a>
                                        </TableCell>
                                        <TableCell className="text-neutral-400 text-sm align-top">
                                            <div className="max-h-[100px] overflow-y-auto pr-2">
                                                {inquiry.message}
                                            </div>
                                        </TableCell>
                                        <TableCell className="align-top">
                                            <Select
                                                value={inquiry.status || "new"}
                                                onValueChange={(val) => handleStatusChange(inquiry.id, val)}
                                            >
                                                <SelectTrigger className={`w-[120px] h-8 border-neutral-700 ${inquiry.status === 'new' ? 'bg-primary/20 text-primary border-primary/30' :
                                                    inquiry.status === 'replied' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                                                        inquiry.status === 'read' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                                                            'bg-neutral-800 text-neutral-400'
                                                    }`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                                    <SelectItem value="new">New</SelectItem>
                                                    <SelectItem value="read">Read</SelectItem>
                                                    <SelectItem value="replied">Replied</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
