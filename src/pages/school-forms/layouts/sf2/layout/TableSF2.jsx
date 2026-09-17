import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Ellipsis,
    Upload,
    Eye,
    Download,
    Pencil,
    Archive
} from "lucide-react";
import UploadVersion from "./UploadVersionSF2";

const initialFiles = [
    {
        id: 1,
        filename: "SF1_School_Register.xlsx",
        schoolYear: "2025-2026",
        version: "v3",
        uploadedDate: "03/29/2026",
        fileType: "Excel",
        fileSize: "245 KB",
        status: "Current",
    },
    {
        id: 2,
        filename: "SF1_School_Register.xlsx",
        schoolYear: "2024-2025",
        version: "v2",
        uploadedDate: "06/15/2025",
        fileType: "Excel",
        fileSize: "231 KB",
        status: "Archived",
    },
    {
        id: 3,
        filename: "SF1_School_Register.xlsx",
        schoolYear: "2023-2024",
        version: "v1",
        uploadedDate: "05/20/2024",
        fileType: "Excel",
        fileSize: "218 KB",
        status: "Archived",
    },
];

const TableSF2 = () => {
    const [search, setSearch] = useState("");

    const filteredFiles = initialFiles.filter((file) => {
        const searchValue = search.toLowerCase();

        return (
            file.filename.toLowerCase().includes(searchValue) ||
            file.schoolYear.toLowerCase().includes(searchValue) ||
            file.version.toLowerCase().includes(searchValue) ||
            file.fileType.toLowerCase().includes(searchValue) ||
            file.status.toLowerCase().includes(searchValue)
        );
    });

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                {/* Search Section */}
                <div className="flex items-center justify-between">
                    <InputGroup className="w-80">
                        <InputGroupInput
                            id="search"
                            placeholder="Search files..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <InputGroupAddon><Search /></InputGroupAddon>
                    </InputGroup>
                    <UploadVersion/>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-[#4386c2]">
                            <TableRow className="hover:bg-[#4386c2]">
                                <TableHead className="text-white">ID</TableHead>
                                <TableHead className="text-white">Filename</TableHead>
                                <TableHead className="text-white">School Year</TableHead>
                                <TableHead className="text-white">Version</TableHead>
                                <TableHead className="text-white">Uploaded Date</TableHead>
                                <TableHead className="text-white">File Type</TableHead>
                                <TableHead className="text-white">File Size</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredFiles.length > 0 ? (
                                filteredFiles.map((file) => (
                                    <TableRow key={file.id}>
                                        <TableCell className="font-medium">{file.id}</TableCell>
                                        <TableCell>{file.filename}</TableCell>
                                        <TableCell>{file.schoolYear}</TableCell>
                                        <TableCell>{file.version}</TableCell>
                                        <TableCell>{file.uploadedDate}</TableCell>
                                        <TableCell>{file.fileType}</TableCell>
                                        <TableCell>{file.fileSize}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${file.status === "Current"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {file.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost">
                                                        <Ellipsis/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem>
                                                            <Eye/>
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Download/>
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Pencil/>
                                                            Rename
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <Separator/>
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem variant="destructive">
                                                            <Archive/>
                                                            Archive
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No files found.
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

export default TableSF2;