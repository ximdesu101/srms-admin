import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Eye, Loader2, CheckCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    GetDocumentSubmissions,
    GetDocumentSubmission,
    ApproveDocumentSubmission,
    RequestRevision,
} from "@/services/documentSubmissionService";

const statusClass = {
    Submitted: "bg-blue-100 text-blue-800",
    "Under Review": "bg-yellow-100 text-yellow-800",
    "Revision Required": "bg-amber-100 text-amber-800",
    Resubmitted: "bg-purple-100 text-purple-800",
    Approved: "bg-green-100 text-green-800",
};

const SubmissionApprovalTable = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [reviewId, setReviewId] = useState(null);
    const [revisionOpen, setRevisionOpen] = useState(false);
    const [revisionNote, setRevisionNote] = useState("");
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["document-submissions", search, status, page],
        queryFn: () => GetDocumentSubmissions({ page, search, status }),
        keepPreviousData: true,
    });

    const { data: detailData, isLoading: detailLoading } = useQuery({
        queryKey: ["document-submission", reviewId],
        queryFn: () => GetDocumentSubmission(reviewId),
        enabled: !!reviewId,
    });

    const approveMutation = useMutation({
        mutationFn: ApproveDocumentSubmission,
        onSuccess: (res) => {
            toast.success(res.message || "Document approved.");
            setReviewId(null);
            queryClient.invalidateQueries({ queryKey: ["document-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["document-submission-metrics"] });
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to approve."),
    });

    const revisionMutation = useMutation({
        mutationFn: ({ id, note }) => RequestRevision(id, note),
        onSuccess: (res) => {
            toast.success(res.message || "Revision requested.");
            setRevisionOpen(false);
            setRevisionNote("");
            setReviewId(null);
            queryClient.invalidateQueries({ queryKey: ["document-submissions"] });
            queryClient.invalidateQueries({ queryKey: ["document-submission-metrics"] });
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to request revision."),
    });

    const submissions = data?.data ?? [];
    const lastPage = data?.last_page ?? 1;
    const detail = detailData?.submission;

    const openReview = (id) => setReviewId(id);

    return (
        <div className="grid gap-4">
            <div className="grid gap-2">
                {/* Search + Status Filter */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Tabs
                        value={status}
                        onValueChange={(v) => {
                            setStatus(v);
                            setPage(1);
                        }}
                    >
                        <TabsList className="flex-wrap">
                            <TabsTrigger value="All">All</TabsTrigger>
                            <TabsTrigger value="Submitted">Submitted</TabsTrigger>
                            <TabsTrigger value="Resubmitted">Resubmitted</TabsTrigger>
                            <TabsTrigger value="Revision Required">Revision</TabsTrigger>
                            <TabsTrigger value="Approved">Approved</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Field className="w-full sm:w-72">
                        <InputGroup>
                            <InputGroupAddon>
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="search"
                                placeholder="Search submissions..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </InputGroup>
                    </Field>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-[#4386c2]">
                            <TableRow className="hover:bg-[#4386c2]">
                                <TableHead className="text-white">Submission ID</TableHead>
                                <TableHead className="text-white">Teacher</TableHead>
                                <TableHead className="text-white">Request ID</TableHead>
                                <TableHead className="text-white">Document</TableHead>
                                <TableHead className="text-white">Submitted Date</TableHead>
                                <TableHead className="text-white">Revision</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-right text-white">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-12">
                                        <div className="flex justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && isError && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="py-12 text-center text-destructive"
                                    >
                                        Failed to load submissions.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading && !isError && submissions.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="py-12 text-center text-muted-foreground"
                                    >
                                        No pending submissions.
                                    </TableCell>
                                </TableRow>
                            )}

                            {!isLoading &&
                                !isError &&
                                submissions.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-medium">
                                            {s.submission_code}
                                        </TableCell>
                                        <TableCell>{s.teacher?.name ?? "—"}</TableCell>
                                        <TableCell>{s.request_code}</TableCell>
                                        <TableCell>{s.document_name}</TableCell>
                                        <TableCell>{s.submitted_date ?? "—"}</TableCell>
                                        <TableCell>{s.revision_count}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[s.status] || "bg-gray-100"
                                                    }`}
                                            >
                                                {s.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openReview(s.id)}
                                            >
                                                <Eye className="mr-1 h-4 w-4" />
                                                Review
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    <Separator />

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex-1 text-sm text-muted-foreground">
                            Page {page} of {lastPage}
                        </div>
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            className={
                                                page <= 1
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink isActive>{page}</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                            className={
                                                page >= lastPage
                                                    ? "pointer-events-none opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Dialog */}
            <Dialog open={!!reviewId} onOpenChange={(open) => !open && setReviewId(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Review Submission</DialogTitle>
                        <DialogDescription>
                            Review the submitted document and approve or request a revision.
                        </DialogDescription>
                    </DialogHeader>

                    {detailLoading && (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    )}

                    {detail && (
                        <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-muted-foreground">Submission ID</span>
                                    <p className="font-medium">{detail.submission_code}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Teacher</span>
                                    <p className="font-medium">{detail.teacher?.name}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Request ID</span>
                                    <p className="font-medium">{detail.request_code}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Document</span>
                                    <p className="font-medium">{detail.document_name}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">File</span>
                                    {detail.file_url ? (
                                        <a
                                            href={detail.file_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800"
                                        >
                                            {detail.original_name}
                                        </a>
                                    ) : (
                                        <p className="font-medium">{detail.original_name}</p>
                                    )}
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Revisions</span>
                                    <p className="font-medium">{detail.revision_count}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Status</span>
                                    <p className="font-medium">{detail.status}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Submitted</span>
                                    <p className="font-medium">
                                        {detail.submitted_at
                                            ? format(
                                                new Date(detail.submitted_at),
                                                "MMM d, yyyy h:mm a"
                                            )
                                            : "—"}
                                    </p>
                                </div>
                            </div>

                            {detail.revision_note && (
                                <div className="rounded border border-amber-200 bg-amber-50 p-2 text-amber-900">
                                    <strong>Last revision note:</strong> {detail.revision_note}
                                </div>
                            )}

                            {detail.versions?.length > 0 && (
                                <div>
                                    <p className="mb-1 font-medium">History</p>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        {detail.versions.map((v) => (
                                            <li key={v.version_number}>
                                                Version {v.version_number} — {v.status}
                                                {v.file_url && (
                                                    <>
                                                        {" — "}
                                                        <a
                                                            href={v.file_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
                                                        >
                                                            {v.original_name}
                                                        </a>
                                                    </>
                                                )}
                                                {v.submitted_at
                                                    ? ` — ${format(
                                                        new Date(v.submitted_at),
                                                        "MMM d"
                                                    )}`
                                                    : ""}
                                                {v.revision_note
                                                    ? ` — "${v.revision_note}"`
                                                    : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        {detail &&
                            ["Submitted", "Under Review", "Resubmitted"].includes(
                                detail.status
                            ) && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => setRevisionOpen(true)}
                                        disabled={revisionMutation.isPending}
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Request Revision
                                    </Button>
                                    <Button
                                        onClick={() => approveMutation.mutate(detail.id)}
                                        disabled={approveMutation.isPending}
                                    >
                                        {approveMutation.isPending ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                        )}
                                        Approve
                                    </Button>
                                </>
                            )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Revision Note Dialog */}
            <Dialog open={revisionOpen} onOpenChange={setRevisionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Revision</DialogTitle>
                        <DialogDescription>
                            Provide a clear note explaining what the teacher needs to correct.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        placeholder="Please correct the learner's date of birth information on page 2 and resubmit the document."
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        rows={4}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRevisionOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={
                                !revisionNote.trim() ||
                                revisionNote.trim().length < 5 ||
                                revisionMutation.isPending
                            }
                            onClick={() =>
                                revisionMutation.mutate({
                                    id: reviewId,
                                    note: revisionNote.trim(),
                                })
                            }
                        >
                            {revisionMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Send Revision Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SubmissionApprovalTable;