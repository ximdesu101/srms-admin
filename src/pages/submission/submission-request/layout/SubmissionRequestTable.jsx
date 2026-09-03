import React, { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import AddRequestForm from "./AddRequestForm";

const initialSubmissionRequests = [
    {
        id: "SR-2026-001",
        requestedTo: "Juan Dela Cruz",
        document: "Personal Data Sheet",
        requestDate: "09/02/26",
        dueDate: "09/05/26",
        status: "Pending",
    },
    {
        id: "SR-2026-002",
        requestedTo: "Maria Clara Mendoza",
        document: "Service Record",
        requestDate: "09/01/26",
        dueDate: "09/04/26",
        status: "Completed",
    },
    {
        id: "SR-2026-003",
        requestedTo: "Angela Grace Bautista",
        document: "Daily Time Record",
        requestDate: "08/30/26",
        dueDate: "09/01/26",
        status: "Overdue",
    },
    {
        id: "SR-2026-004",
        requestedTo: "Juan Dela Cruz",
        document: "Certificate of Service",
        requestDate: "08/29/26",
        dueDate: "09/02/26",
        status: "Completed",
    },
];

const SubmissionRequestTable = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredSubmissionRequests = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return initialSubmissionRequests.filter((request) => {
            const matchesSearch =
                !keyword ||
                [
                    request.id,
                    request.requestedTo,
                    request.document,
                    request.status,
                ].some((value) =>
                    value.toLowerCase().includes(keyword)
                );

            const matchesStatus =
                status === "All" || request.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    return (
        <div className="grid gap-2">
            {/* Tabs and Search */}
            <div className="flex items-center justify-between gap-4">
                <Tabs value={status} onValueChange={setStatus}>
                    <TabsList>
                        <TabsTrigger value="All">
                            All
                        </TabsTrigger>

                        <TabsTrigger value="Pending">
                            Pending
                        </TabsTrigger>

                        <TabsTrigger value="Completed">
                            Completed
                        </TabsTrigger>

                        <TabsTrigger value="Overdue">
                            Overdue
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex gap-4">
                    <Field className="w-full max-w-sm">
                        <InputGroup>
                            <InputGroupInput
                                id="search"
                                placeholder="Search submission requests"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <AddRequestForm />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-[#4386c2]">
                        <TableRow className="hover:bg-[#4386c2]">
                            <TableHead className="text-white">
                                Request ID
                            </TableHead>

                            <TableHead className="text-white">
                                Requested To
                            </TableHead>

                            <TableHead className="text-white">
                                Document
                            </TableHead>

                            <TableHead className="text-white">
                                Request Date
                            </TableHead>

                            <TableHead className="text-white">
                                Due Date
                            </TableHead>

                            <TableHead className="text-white">
                                Status
                            </TableHead>

                            <TableHead className="text-right text-white">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredSubmissionRequests.length > 0 ? (
                            filteredSubmissionRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        {request.id}
                                    </TableCell>

                                    <TableCell>
                                        {request.requestedTo}
                                    </TableCell>

                                    <TableCell>
                                        {request.document}
                                    </TableCell>

                                    <TableCell>
                                        {request.requestDate}
                                    </TableCell>

                                    <TableCell>
                                        {request.dueDate}
                                    </TableCell>

                                    <TableCell>
                                        {request.status}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="View Submission Request"
                                        >
                                            <Eye />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-muted-foreground"
                                >
                                    No submission requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Separator />

                {/* Pagination */}
                <div className="flex items-center justify-end px-2 py-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page 1 of 3
                    </div>

                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className="pointer-events-none opacity-50"
                                    />
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink isActive>
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink>
                                        2
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink>
                                        3
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationNext className="cursor-pointer" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionRequestTable;