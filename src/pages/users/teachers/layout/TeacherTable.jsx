import { useState } from "react";
import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
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
import AddAccountForm from "./AddAccountForm";
import EditAccountForm from "./EditAccountForm";
import DeleteAccount from "./DeleteAccount";
import CardMetrics from "./CardMetrics";
import { GetTeachers } from "@/services/teacherService";

const TeacherAccount = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["teachers", { page, search }],
        queryFn: () => GetTeachers({ page, search }),
        placeholderData: keepPreviousData,
    });

    const teachers = data?.data ?? [];
    const lastPage = data?.last_page ?? 1;
    const currentPage = data?.current_page ?? 1;

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1); // reset to page 1 whenever the search term changes
    };

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
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />

                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>

                        {search && (
                            <InputGroupAddon align="inline-end">
                                <button
                                    type="button"
                                    onClick={() => handleSearchChange("")}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X />
                                </button>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                    <AddAccountForm onCreated={() => {
                            setPage(1);
                            queryClient.invalidateQueries({ queryKey: ["teacher-metrics"] });
                        }} />
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center text-muted-foreground">
                                        Loading teacher accounts...
                                    </TableCell>
                                </TableRow>
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center text-destructive">
                                        Failed to load teacher accounts.
                                    </TableCell>
                                </TableRow>
                            ) : teachers.length > 0 ? (
                                teachers.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell>{teacher.teacher_id}</TableCell>
                                        <TableCell>{teacher.first_name}</TableCell>
                                        <TableCell>{teacher.middle_name}</TableCell>
                                        <TableCell>{teacher.last_name}</TableCell>
                                        <TableCell>{teacher.suffix}</TableCell>
                                        <TableCell>{teacher.username}</TableCell>
                                        <TableCell>{teacher.position}</TableCell>
                                        <TableCell>{teacher.status}</TableCell>
                                        <TableCell>
                                            {new Date(teacher.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <EditAccountForm teacher={teacher} />
                                            <DeleteAccount teacher={teacher} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center text-muted-foreground">
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
                            Page {currentPage} of {lastPage}
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                                        <PaginationItem key={p}>
                                            <PaginationLink
                                                isActive={p === currentPage}
                                                className="cursor-pointer"
                                                onClick={() => setPage(p)}
                                            >
                                                {p}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            className={currentPage >= lastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            onClick={() => currentPage < lastPage && setPage(currentPage + 1)}
                                        />
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