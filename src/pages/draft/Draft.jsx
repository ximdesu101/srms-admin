import React, { useState } from "react";
import { Search, Ellipsis } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

const drafts = [
    {
        id: 1,
        requestID: "SR-2026-001",
        teacher: "Juan Dela Cruz",
        RequestedDocument: "School Form 1",
        RequestedDate: "9/22/2026",
        DueDate: "9/30/2026",
    },
    {
        id: 2,
        requestID: "SR-2026-002",
        teacher: "Maria Santos",
        RequestedDocument: "School Form 2",
        RequestedDate: "9/23/2026",
        DueDate: "10/01/2026",
    },
    {
        id: 3,
        requestID: "SR-2026-003",
        teacher: "Pedro Reyes",
        RequestedDocument: "School Form 3",
        RequestedDate: "9/24/2026",
        DueDate: "10/02/2026",
    },
];

const Draft = () => {
    const [search, setSearch] = useState("");

    const filteredDrafts = drafts.filter((draft) =>
        draft.teacher.toLowerCase().includes(search.toLowerCase()) ||
        draft.requestID.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                {/* Search Section */}
                <div className="flex items-center justify-between">
                    <InputGroup className="w-80">
                        <InputGroupInput
                            id="search"
                            placeholder="Search teachers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <InputGroupAddon><Search /></InputGroupAddon>
                    </InputGroup>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-[#4386c2]">
                            <TableRow className="hover:bg-[#4386c2]">
                                <TableHead className="text-white">Request ID</TableHead>
                                <TableHead className="text-white">Teacher</TableHead>
                                <TableHead className="text-white">Document</TableHead>
                                <TableHead className="text-white">Requested Date</TableHead>
                                <TableHead className="text-white">Due Date</TableHead>
                                <TableHead className="text-right text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredDrafts.length > 0 ? (
                                filteredDrafts.map((draft) => (
                                    <TableRow key={draft.id}>
                                        <TableCell>{draft.requestID}</TableCell>
                                        <TableCell>{draft.teacher}</TableCell>
                                        <TableCell>{draft.RequestedDocument}</TableCell>
                                        <TableCell>{draft.RequestedDate}</TableCell>
                                        <TableCell>{draft.DueDate}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost">
                                                <Ellipsis />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-muted-foreground"
                                    >
                                        No drafts found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Separator />

                    {/* Pagination */}
                    <div className="flex items-center justify-end px-2 py-2">
                        <div className="flex-1 text-sm text-muted-foreground">
                            Page 1 of 1
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious className="pointer-events-none opacity-50" />
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink isActive>1</PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationNext className="pointer-events-none opacity-50" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Draft;