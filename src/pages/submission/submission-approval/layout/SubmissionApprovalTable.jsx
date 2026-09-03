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

const initialSubmissions = [
    {
        id: "SUB-2026-001",
        submittedBy: "Juan Dela Cruz",
        document: "Personal Data Sheet",
        submittedDate: "09/02/26",
        status: "Pending Review",
    },
    {
        id: "SUB-2026-002",
        submittedBy: "Maria Clara Mendoza",
        document: "SF7",
        submittedDate: "09/01/26",
        status: "Accepted",
    },
    {
        id: "SUB-2026-003",
        submittedBy: "Angela Grace Bautista",
        document: "Daily Time Record",
        submittedDate: "08/30/26",
        status: "Needs Revision",
    },
    {
        id: "SUB-2026-004",
        submittedBy: "Juan Dela Cruz",
        document: "Service Record",
        submittedDate: "08/29/26",
        status: "Rejected",
    },
];

const SubmissionApprovalTable = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filteredSubmissions = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        return initialSubmissions.filter((submission) => {
            const matchesSearch =
                !keyword ||
                [
                    submission.id,
                    submission.submittedBy,
                    submission.document,
                    submission.status,
                ].some((value) =>
                    value.toLowerCase().includes(keyword)
                );

            const matchesStatus =
                status === "All" || submission.status === status;

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

                        <TabsTrigger value="Pending Review">
                            Pending Review
                        </TabsTrigger>

                        <TabsTrigger value="Accepted">
                            Accepted
                        </TabsTrigger>

                        <TabsTrigger value="Needs Revision">
                            Needs Revision
                        </TabsTrigger>

                        <TabsTrigger value="Rejected">
                            Rejected
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <Field className="w-full max-w-sm">
                    <InputGroup>
                        <InputGroupInput
                            id="search"
                            placeholder="Search submissions"
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
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-[#4386c2]">
                        <TableRow className="hover:bg-[#4386c2]">
                            <TableHead className="text-white">
                                Submission ID
                            </TableHead>

                            <TableHead className="text-white">
                                Submitted By
                            </TableHead>

                            <TableHead className="text-white">
                                Document
                            </TableHead>

                            <TableHead className="text-white">
                                Submitted Date
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
                        {filteredSubmissions.length > 0 ? (
                            filteredSubmissions.map((submission) => (
                                <TableRow key={submission.id}>
                                    <TableCell>
                                        {submission.id}
                                    </TableCell>

                                    <TableCell>
                                        {submission.submittedBy}
                                    </TableCell>

                                    <TableCell>
                                        {submission.document}
                                    </TableCell>

                                    <TableCell>
                                        {submission.submittedDate}
                                    </TableCell>

                                    <TableCell>
                                        {submission.status}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            title="View Submission"
                                        >
                                            <Eye />
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
                                    No submissions found.
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

export default SubmissionApprovalTable;