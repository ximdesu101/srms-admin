import React, { useState } from "react";
import { Search, X } from "lucide-react";
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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import AddAccountForm from "./AddAccountForm";
import EditAccountForm from "./EditAccountForm";
import DeleteAccount from "./DeleteAccount";
import CardMetrics from "./CardMetrics";

const initialTeachers = [
    {
        id: "2026-001",
        firstName: "Tom Ribert",
        middleName: "Dela Cruz",
        lastName: "Calinao",
        suffix: "Jr.",
        username: "tomcalinao",
        position: "Teacher I",
        status: "Active",
        dateAdded: "03/29/26",
    },
    {
        id: "2026-002",
        firstName: "Maria Clara",
        middleName: "Santos",
        lastName: "Mendoza",
        suffix: "",
        username: "mcmendoza",
        position: "Master Teacher I",
        status: "Active",
        dateAdded: "04/05/26",
    },
    {
        id: "2026-003",
        firstName: "Juan",
        middleName: "Reyes",
        lastName: "Dalisay",
        suffix: "III",
        username: "juandalisay",
        position: "Principal I",
        status: "Active",
        dateAdded: "04/12/26",
    },
    {
        id: "2026-004",
        firstName: "Angela Grace",
        middleName: "Villanueva",
        lastName: "Bautista",
        suffix: "",
        username: "agbautista",
        position: "Teacher III",
        status: "Inactive",
        dateAdded: "05/01/26",
    },
];

const TeacherAccount = () => {
    const [search, setSearch] = useState("");

    const filteredTeachers = initialTeachers.filter((teacher) => {
        const searchValue = search.toLowerCase();

        return (
            teacher.firstName.toLowerCase().includes(searchValue) ||
            teacher.lastName.toLowerCase().includes(searchValue) ||
            teacher.username.toLowerCase().includes(searchValue) ||
            teacher.email.toLowerCase().includes(searchValue)
        );
    });

    return (
        <div className="grid gap-4">
            <CardMetrics />
            <div className="grid gap-2">
                {/* Search Section */}
                <div className="flex items-center justify-between">
                    <InputGroup className="w-80">
                        <InputGroupInput
                            id="search"
                            placeholder="Search teacher's account"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>

                        {search && (
                            <InputGroupAddon align="inline-end">
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X />
                                </button>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                    <AddAccountForm />
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-[#4386c2]">
                            <TableRow className="hover:bg-[#4386c2]">
                                <TableHead className="text-white">ID</TableHead>
                                <TableHead className="text-white">First Name</TableHead>
                                <TableHead className="text-white">Middle Name</TableHead>
                                <TableHead className="text-white">Last Name</TableHead>
                                <TableHead className="text-white">Suffix</TableHead>
                                <TableHead className="text-white">Username</TableHead>
                                <TableHead className="text-white">Position</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Date Added</TableHead>
                                <TableHead className="text-right text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell>{teacher.id}</TableCell>
                                        <TableCell>{teacher.firstName}</TableCell>
                                        <TableCell>{teacher.middleName}</TableCell>
                                        <TableCell>{teacher.lastName}</TableCell>
                                        <TableCell>{teacher.suffix}</TableCell>
                                        <TableCell>{teacher.username}</TableCell>
                                        <TableCell>{teacher.position}</TableCell>                                        <TableCell>{teacher.status}</TableCell>
                                        <TableCell>{teacher.dateAdded}</TableCell>
                                        <TableCell className="text-right">
                                            <EditAccountForm />
                                            <DeleteAccount />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground"
                                    >
                                        No teacher accounts found.
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
        </div>
    );
};

export default TeacherAccount;