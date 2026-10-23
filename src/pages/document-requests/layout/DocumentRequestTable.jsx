import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import {
    Search, Eye, Loader, Ban, CheckCircle, Settings2, Upload,
    FileText, X, AlertCircle, MessageSquare, DatabaseX, SearchX,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Pagination, PaginationContent, PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    GetDocumentRequests,
    GetDocumentRequest,
    AcknowledgeDocumentRequest,
    MarkDocumentRequestProcessing,
    FulfillDocumentRequest,
    MarkDocumentRequestUnavailable,
    CancelDocumentRequest,
} from "@/services/documentRequestService";

const statusClassName = {
    Pending:      "bg-blue-100 text-blue-800",
    Acknowledged: "bg-yellow-100 text-yellow-800",
    Processing:   "bg-purple-100 text-purple-800",
    Fulfilled:    "bg-green-100 text-green-800",
    Unavailable:  "bg-red-100 text-red-800",
    Cancelled:    "bg-gray-100 text-gray-600",
};

const statusVariant = {
    Pending:      "secondary",
    Acknowledged: "secondary",
    Processing:   "default",
    Fulfilled:    "default",
    Unavailable:  "secondary",
    Cancelled:    "outline",
};

const statusBadgeClass = {
    Pending:      "bg-blue-100 text-blue-800 hover:bg-blue-100",
    Acknowledged: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Processing:   "bg-purple-100 text-purple-800 hover:bg-purple-100",
    Fulfilled:    "bg-green-100 text-green-800 hover:bg-green-100",
    Unavailable:  "bg-red-100 text-red-800 hover:bg-red-100",
    Cancelled:    "bg-gray-100 text-gray-600 hover:bg-gray-100",
};

const formatDate = (value) => {
    if (!value) return "—";
    try { return format(new Date(value), "MMM d, yyyy"); } catch { return value; }
};

// ── Fulfill dialog ────────────────────────────────────────────────────────────
const FulfillDialog = ({ requestId, open, onClose, onSuccess }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [adminMessage, setAdminMessage] = useState("");

    const fulfillMutation = useMutation({
        mutationFn: ({ id, file, message }) => FulfillDocumentRequest(id, file, message),
        onSuccess: (res) => {
            toast.success(res.message || "Request fulfilled successfully.");
            setSelectedFile(null);
            setAdminMessage("");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            const data = err.response?.data;
            if (err.response?.status === 422 && data?.errors) {
                const msg = Object.values(data.errors).flat()[0];
                toast.error(msg || "Validation failed.");
            } else {
                toast.error(data?.message || "Failed to fulfill request.");
            }
        },
    });

    const handleFileChange = (file) => {
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) { toast.error("File must be smaller than 10 MB."); return; }
        setSelectedFile(file);
    };

    const handleSubmit = () => {
        if (!selectedFile) { toast.error("Please select a file to upload."); return; }
        fulfillMutation.mutate({ id: requestId, file: selectedFile, message: adminMessage.trim() || null });
    };

    const handleClose = () => {
        setSelectedFile(null);
        setAdminMessage("");
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Fulfill Document Request</DialogTitle>
                    <DialogDescription>
                        Upload the requested document and optionally include a message for the teacher.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* File upload zone */}
                    <div>
                        <p className="text-sm font-medium mb-2">Document File <span className="text-destructive">*</span></p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".xlsx,.xls,.pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                            disabled={fulfillMutation.isPending}
                        />
                        {selectedFile ? (
                            <div className="flex items-center gap-3 rounded-md border p-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{selectedFile.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedFile(null)}
                                    className="text-muted-foreground hover:text-destructive"
                                    disabled={fulfillMutation.isPending}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files?.[0]); }}
                                disabled={fulfillMutation.isPending}
                                className={`flex w-full flex-col items-center justify-center rounded-md border border-dashed px-5 py-8 text-center transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${isDragging ? "border-primary bg-accent" : "hover:border-muted-foreground/50 hover:bg-muted/40"}`}
                            >
                                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    <Upload className="h-5 w-5 text-muted-foreground" />
                                </span>
                                <p className="text-sm font-medium">Click or drag to upload</p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Excel, PDF, Word, or image · up to 10 MB
                                </p>
                            </button>
                        )}
                    </div>

                    {/* Optional message */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">
                            Message to Teacher <span className="text-muted-foreground text-xs">(optional)</span>
                        </p>
                        <Textarea
                            placeholder="Add any notes or instructions for the teacher..."
                            value={adminMessage}
                            onChange={(e) => setAdminMessage(e.target.value)}
                            disabled={fulfillMutation.isPending}
                            className="resize-none"
                            rows={3}
                            maxLength={1000}
                        />
                        <p className="text-xs text-muted-foreground text-right">{adminMessage.length} / 1000</p>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleClose} disabled={fulfillMutation.isPending}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={fulfillMutation.isPending || !selectedFile}>
                        {fulfillMutation.isPending
                            ? <><Loader className="h-4 w-4 animate-spin mr-2" /> Uploading...</>
                            : <><CheckCircle className="h-4 w-4 mr-2" /> Fulfill Request</>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ── Unavailable dialog ────────────────────────────────────────────────────────
const UnavailableDialog = ({ requestId, open, onClose, onSuccess }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const unavailableMutation = useMutation({
        mutationFn: ({ id, msg }) => MarkDocumentRequestUnavailable(id, msg),
        onSuccess: (res) => {
            toast.success(res.message || "Request marked as unavailable.");
            setMessage("");
            setError("");
            onSuccess?.();
            onClose();
        },
        onError: (err) => {
            const data = err.response?.data;
            if (err.response?.status === 422 && data?.errors) {
                const msg = Object.values(data.errors).flat()[0];
                setError(msg || "A message is required.");
            } else {
                toast.error(data?.message || "Failed to update request.");
            }
        },
    });

    const handleSubmit = () => {
        if (!message.trim() || message.trim().length < 5) {
            setError("Please provide a message of at least 5 characters.");
            return;
        }
        setError("");
        unavailableMutation.mutate({ id: requestId, msg: message.trim() });
    };

    const handleClose = () => { setMessage(""); setError(""); onClose(); };

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Mark as Unavailable</DialogTitle>
                    <DialogDescription>
                        Send a message to the teacher explaining why the document cannot be provided.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    <Textarea
                        placeholder="Explain why the document is currently unavailable..."
                        value={message}
                        onChange={(e) => { setMessage(e.target.value); setError(""); }}
                        disabled={unavailableMutation.isPending}
                        className={`resize-none ${error ? "border-destructive" : ""}`}
                        rows={4}
                        maxLength={1000}
                    />
                    <div className="flex items-center justify-between">
                        {error
                            ? <p className="text-sm text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {error}</p>
                            : <span />
                        }
                        <p className="text-xs text-muted-foreground">{message.length} / 1000</p>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleClose} disabled={unavailableMutation.isPending}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleSubmit}
                        disabled={unavailableMutation.isPending || !message.trim()}
                    >
                        {unavailableMutation.isPending
                            ? <><Loader className="h-4 w-4 animate-spin mr-2" /> Sending...</>
                            : <><MessageSquare className="h-4 w-4 mr-2" /> Send & Mark Unavailable</>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ── View/Detail dialog ────────────────────────────────────────────────────────
const ViewDialog = ({ requestId, open, onClose, onActionTaken }) => {
    const [fulfillOpen, setFulfillOpen] = useState(false);
    const [unavailableOpen, setUnavailableOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-document-request", requestId],
        queryFn: () => GetDocumentRequest(requestId),
        enabled: !!requestId && open,
    });

    const request = data?.request;

    const acknowledgeMutation = useMutation({
        mutationFn: () => AcknowledgeDocumentRequest(requestId),
        onSuccess: (res) => {
            toast.success(res.message || "Request acknowledged.");
            queryClient.invalidateQueries({ queryKey: ["admin-document-request", requestId] });
            onActionTaken?.();
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to acknowledge."),
    });

    const processingMutation = useMutation({
        mutationFn: () => MarkDocumentRequestProcessing(requestId),
        onSuccess: (res) => {
            toast.success(res.message || "Request marked as processing.");
            queryClient.invalidateQueries({ queryKey: ["admin-document-request", requestId] });
            onActionTaken?.();
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to update status."),
    });

    const handleFulfillSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["admin-document-request", requestId] });
        onActionTaken?.();
    };

    const handleUnavailableSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["admin-document-request", requestId] });
        onActionTaken?.();
    };

    return (
        <>
            <Dialog open={open && !fulfillOpen && !unavailableOpen} onOpenChange={(o) => !o && onClose()}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Document Request</DialogTitle>
                        <DialogDescription>Review the teacher's request and take action.</DialogDescription>
                    </DialogHeader>

                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {request && (
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-muted-foreground">Request ID</p>
                                    <p className="font-medium">{request.request_code}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClassName[request.status] || "bg-gray-100 text-gray-600"}`}>
                                        {request.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Teacher</p>
                                    <p className="font-medium">{request.teacher?.name ?? "—"}</p>
                                    {request.teacher?.teacher_id && (
                                        <p className="text-xs text-muted-foreground">{request.teacher.teacher_id}</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Document</p>
                                    <p className="font-medium">{request.document_name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Request Date</p>
                                    <p className="font-medium">{formatDate(request.request_date)}</p>
                                </div>
                                {request.acknowledged_at && (
                                    <div>
                                        <p className="text-muted-foreground">Acknowledged</p>
                                        <p className="font-medium">{formatDate(request.acknowledged_at)}</p>
                                    </div>
                                )}
                                {request.fulfilled_at && (
                                    <div>
                                        <p className="text-muted-foreground">Fulfilled</p>
                                        <p className="font-medium">{formatDate(request.fulfilled_at)}</p>
                                    </div>
                                )}
                            </div>

                            {request.purpose && (
                                <div className="rounded-md bg-muted p-3">
                                    <p className="text-muted-foreground text-xs mb-1">Purpose</p>
                                    <p>{request.purpose}</p>
                                </div>
                            )}

                            {request.admin_message && (
                                <div className={`rounded-md border p-3 ${request.status === "Unavailable" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
                                    <p className="text-xs font-semibold uppercase mb-1 text-muted-foreground">Your message to teacher</p>
                                    <p className="whitespace-pre-wrap">{request.admin_message}</p>
                                </div>
                            )}

                            {request.file && (
                                <div className="flex items-center gap-3 rounded-md border p-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <a
                                            href={request.file.file_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="truncate font-medium text-blue-600 underline underline-offset-2 hover:text-blue-800 text-sm"
                                        >
                                            {request.file.original_name}
                                        </a>
                                        <p className="text-xs text-muted-foreground mt-0.5">{request.file.formatted_size}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action buttons based on status */}
                            {!["Fulfilled", "Unavailable", "Cancelled"].includes(request.status) && (
                                <div className="flex flex-wrap gap-2 pt-1 border-t">
                                    {request.status === "Pending" && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => acknowledgeMutation.mutate()}
                                            disabled={acknowledgeMutation.isPending}
                                        >
                                            {acknowledgeMutation.isPending
                                                ? <Loader className="h-3 w-3 animate-spin mr-1" />
                                                : <Eye className="h-3 w-3 mr-1" />
                                            }
                                            Acknowledge
                                        </Button>
                                    )}
                                    {["Pending", "Acknowledged"].includes(request.status) && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => processingMutation.mutate()}
                                            disabled={processingMutation.isPending}
                                        >
                                            {processingMutation.isPending
                                                ? <Loader className="h-3 w-3 animate-spin mr-1" />
                                                : <Settings2 className="h-3 w-3 mr-1" />
                                            }
                                            Mark Processing
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => setFulfillOpen(true)}
                                    >
                                        <Upload className="h-3 w-3 mr-1" />
                                        Fulfill (Upload)
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => setUnavailableOpen(true)}
                                    >
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Unavailable
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <FulfillDialog
                requestId={requestId}
                open={fulfillOpen}
                onClose={() => setFulfillOpen(false)}
                onSuccess={handleFulfillSuccess}
            />
            <UnavailableDialog
                requestId={requestId}
                open={unavailableOpen}
                onClose={() => setUnavailableOpen(false)}
                onSuccess={handleUnavailableSuccess}
            />
        </>
    );
};

// ── Main Table ────────────────────────────────────────────────────────────────
const DocumentRequestTable = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [page, setPage] = useState(1);
    const [viewId, setViewId] = useState(null);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-document-requests", { page, search, status }],
        queryFn: () => GetDocumentRequests({ page, search, status }),
        placeholderData: keepPreviousData,
    });

    const cancelMutation = useMutation({
        mutationFn: CancelDocumentRequest,
        onSuccess: (res) => {
            toast.success(res?.message || "Request cancelled.");
            queryClient.invalidateQueries({ queryKey: ["admin-document-requests"] });
            queryClient.invalidateQueries({ queryKey: ["document-request-metrics"] });
        },
        onError: (err) => toast.error(err.response?.data?.message || "Failed to cancel."),
    });

    const requests = data?.data ?? [];
    const lastPage = data?.last_page ?? 1;
    const currentPage = data?.current_page ?? 1;

    const handleActionTaken = () => {
        queryClient.invalidateQueries({ queryKey: ["admin-document-requests"] });
        queryClient.invalidateQueries({ queryKey: ["document-request-metrics"] });
    };

    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <Tabs value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                    <TabsList>
                        <TabsTrigger value="All">All</TabsTrigger>
                        <TabsTrigger value="Pending">Pending</TabsTrigger>
                        <TabsTrigger value="Acknowledged">Acknowledged</TabsTrigger>
                        <TabsTrigger value="Processing">Processing</TabsTrigger>
                        <TabsTrigger value="Fulfilled">Fulfilled</TabsTrigger>
                        <TabsTrigger value="Unavailable">Unavailable</TabsTrigger>
                        <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Field className="w-full max-w-sm">
                    <InputGroup>
                        <InputGroupInput
                            id="search"
                            placeholder="Search document requests..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                        <InputGroupAddon>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-[#4386c2]">
                        <TableRow className="hover:bg-[#4386c2]">
                            <TableHead className="text-white">Request ID</TableHead>
                            <TableHead className="text-white">Teacher</TableHead>
                            <TableHead className="text-white">Document</TableHead>
                            <TableHead className="text-white">Purpose</TableHead>
                            <TableHead className="text-white">Request Date</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-right text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    <Loader className="mx-auto animate-spin" />
                                    Loading document requests...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-destructive">
                                    <DatabaseX className="mx-auto" />
                                    Failed to load document requests.
                                </TableCell>
                            </TableRow>
                        ) : requests.length > 0 ? (
                            requests.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-medium">{r.request_code}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{r.teacher?.name ?? "—"}</span>
                                            {r.teacher?.teacher_id && (
                                                <span className="text-xs text-muted-foreground">{r.teacher.teacher_id}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.document_name}</TableCell>
                                    <TableCell className="max-w-[180px]">
                                        <span className="truncate block text-sm text-muted-foreground">
                                            {r.purpose ?? "—"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{formatDate(r.request_date)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={statusVariant[r.status] || "secondary"}
                                            className={statusBadgeClass[r.status] || ""}
                                        >
                                            {r.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {!["Fulfilled", "Unavailable", "Cancelled"].includes(r.status) && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            title="Cancel Request"
                                                            disabled={cancelMutation.isPending}
                                                        >
                                                            <Ban className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Cancel document request?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will cancel request <strong>{r.request_code}</strong>. This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Keep request</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => cancelMutation.mutate(r.id)}>
                                                                Cancel request
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="View Request"
                                                onClick={() => setViewId(r.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    <SearchX className="mx-auto" />
                                    No document requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Separator />

                <div className="flex items-center justify-end px-2 py-2">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {currentPage} of {lastPage}
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                    className={currentPage >= lastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

            <ViewDialog
                requestId={viewId}
                open={!!viewId}
                onClose={() => setViewId(null)}
                onActionTaken={handleActionTaken}
            />
        </div>
    );
};

export default DocumentRequestTable;
