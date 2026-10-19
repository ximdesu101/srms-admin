import React, { useCallback, useEffect, useState } from "react";
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
    Search,
    SearchX,
    Download,
    Loader,
    FileText,
} from "lucide-react";
import { toast } from "sonner";
import {
    GetApprovedDocumentsByForm,
    DownloadDocumentSubmission,
} from "@/services/documentSubmissionService";

/**
 * Displays approved teacher-submitted documents for a given form category (SF1–SF10).
 *
 * @param {{
 *   formCode: string,
 *   formName?: string,
 *   onCountChange?: (count: number) => void,
 * }} props
 */
const SharedTable = ({ formCode, formName, onCountChange }) => {
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
    });

    const loadDocuments = useCallback(async () => {
        if (!formCode) {
            setLoading(false);
            setDocuments([]);
            onCountChange?.(0);
            return;
        }

        setLoading(true);
        try {
            const data = await GetApprovedDocumentsByForm({
                formCode,
                page,
                search: search.trim(),
            });

            const items = Array.isArray(data?.data) ? data.data : [];
            setDocuments(items);
            setMeta({
                current_page: data?.current_page ?? 1,
                last_page: data?.last_page ?? 1,
                total: data?.total ?? 0,
                per_page: data?.per_page ?? 10,
            });
            onCountChange?.(data?.total ?? 0);
        } catch (err) {
            console.error("Failed to load approved documents:", err);
            toast.error("Failed to load approved documents.");
            setDocuments([]);
            onCountChange?.(0);
        } finally {
            setLoading(false);
        }
    }, [formCode, page, search, onCountChange]);

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const handleDownload = async (doc) => {
        if (!doc?.id || downloadingId) return;
        setDownloadingId(doc.id);
        try {
            const response = await DownloadDocumentSubmission(doc.id);
            const blob = new Blob([response.data], {
                type: response.headers?.["content-type"] || "application/octet-stream",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = doc.original_name || `${formCode}_document`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            toast.success("Download started.");
        } catch (err) {
            console.error("Download failed:", err);
            toast.error("Failed to download document.");
        } finally {
            setDownloadingId(null);
        }
    };

    const formatDate = (iso) => {
        if (!iso) return "—";
        try {
            return new Date(iso).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            });
        } catch {
            return "—";
        }
    };

    const totalPages = Math.max(1, meta.last_page || 1);
    const pageNumbers = [];
    const start = Math.max(1, meta.current_page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                {/* Search Section */}
                <div className="flex items-center justify-between">
                    <InputGroup className="w-80">
                        <InputGroupInput
                            id="search"
                            placeholder="Search approved documents..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                    <div className="text-sm text-muted-foreground">
                        {formName ? `${formName} · ` : ""}
                        {meta.total} approved document{meta.total !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-[#4386c2]">
                            <TableRow className="hover:bg-[#4386c2]">
                                <TableHead className="text-white">Document Name</TableHead>
                                <TableHead className="text-white">Teacher</TableHead>
                                <TableHead className="text-white">Submission Code</TableHead>
                                <TableHead className="text-white">Submitted</TableHead>
                                <TableHead className="text-white">Approved</TableHead>
                                <TableHead className="text-white">File Size</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-center text-muted-foreground"
                                    >
                                        <Loader className="mx-auto animate-spin" />
                                        Loading approved documents...      
                                    </TableCell>
                                </TableRow>
                            ) : documents.length > 0 ? (
                                documents.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                <span className="truncate max-w-[220px]" title={doc.original_name}>
                                                    {doc.original_name || "—"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {doc.teacher?.name || "—"}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">
                                            {doc.submission_code || "—"}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(doc.submitted_at) || doc.submitted_date || "—"}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(doc.approved_at)}
                                        </TableCell>
                                        <TableCell>
                                            {doc.formatted_size || "—"}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                                                {doc.status || "Approved"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={downloadingId === doc.id}
                                                onClick={() => handleDownload(doc)}
                                            >
                                                {downloadingId === doc.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Download className="h-4 w-4" />
                                                )}
                                                <span className="ml-1.5">Download</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-center text-muted-foreground"
                                    >
                                        <SearchX className="mx-auto"/>
                                        No approved documents found for this form.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Separator />

                    {/* Pagination */}
                    <div className="flex items-center justify-end px-2 py-2">
                        <div className="flex-1 text-sm text-muted-foreground">
                            {meta.total > 0
                                ? `Page ${meta.current_page} of ${totalPages}`
                                : "No results"}
                        </div>
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className={
                                                meta.current_page <= 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                            onClick={() => {
                                                if (meta.current_page > 1) {
                                                    setPage((p) => Math.max(1, p - 1));
                                                }
                                            }}
                                        />
                                    </PaginationItem>
                                    {pageNumbers.map((num) => (
                                        <PaginationItem key={num}>
                                            <PaginationLink
                                                isActive={num === meta.current_page}
                                                className="cursor-pointer"
                                                onClick={() => setPage(num)}
                                            >
                                                {num}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            className={
                                                meta.current_page >= totalPages
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                            onClick={() => {
                                                if (meta.current_page < totalPages) {
                                                    setPage((p) => p + 1);
                                                }
                                            }}
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

export default SharedTable;