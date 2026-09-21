import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { ChevronDownIcon, Send, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from "@/components/ui/select";
import {
    CreateSubmissionRequest,
    GetActiveTeachers,
} from "@/services/submissionRequestService";

// --- Small debounce hook -----------------------------------------------------
function useDebouncedValue(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

const AddRequestForm = ({ onCreated }) => {
    const [open, setOpen] = useState(false);
    const [teacherSearch, setTeacherSearch] = useState("");
    const queryClient = useQueryClient();

    const debouncedTeacherSearch = useDebouncedValue(teacherSearch, 300);

    const {
        data: teachersData,
        isLoading: teachersLoading,
        isError: teachersError,
        isFetching: teachersFetching,
    } = useQuery({
        queryKey: ["active-teachers", debouncedTeacherSearch],
        queryFn: () => GetActiveTeachers({ search: debouncedTeacherSearch }),
        enabled: open,
        staleTime: 30_000,
        // Keep the previous list visible while a new search is fetching
        placeholderData: (prev) => prev,
    });

    const teachers = teachersData?.data ?? [];

    const createMutation = useMutation({
        mutationFn: CreateSubmissionRequest,
        onSuccess: (data) => {
            toast.success(data?.message || "Submission request sent successfully.");
            queryClient.invalidateQueries({ queryKey: ["submission-requests"] });
            queryClient.invalidateQueries({ queryKey: ["submission-request-metrics"] });
            onCreated?.(data);
            handleClose();
        },
        onError: (err) => {
            if (err.response?.status === 422 && err.response.data?.errors) {
                Object.entries(err.response.data.errors).forEach(([key, messages]) => {
                    const fieldMap = {
                        teacherId: "teacherId",
                        documentCode: "documentCode",
                        dueDate: "dueDate",
                        notes: "notes",
                    };
                    const fieldName = fieldMap[key] || key;
                    form.setFieldMeta(fieldName, (meta) => ({
                        ...meta,
                        errorMap: {
                            onSubmit: Array.isArray(messages) ? messages[0] : messages,
                        },
                    }));
                });
                toast.error(err.response?.data?.message || "Validation failed.");
                return;
            }
            toast.error(
                err.response?.data?.message ||
                    "Failed to send submission request. Please try again."
            );
        },
    });

    const form = useForm({
        defaultValues: {
            teacher: null,
            teacherLabel: "",
            documentCode: "",
            dueDate: undefined,
            notes: "",
        },
        onSubmit: async ({ value }) => {
            if (!value.teacher) {
                form.setFieldMeta("teacher", (meta) => ({
                    ...meta,
                    errorMap: { onSubmit: "Please select a teacher." },
                }));
                return;
            }
            if (!value.documentCode) {
                form.setFieldMeta("documentCode", (meta) => ({
                    ...meta,
                    errorMap: { onSubmit: "Please select a form." },
                }));
                return;
            }
            if (!value.dueDate) {
                form.setFieldMeta("dueDate", (meta) => ({
                    ...meta,
                    errorMap: { onSubmit: "Please select a due date." },
                }));
                return;
            }
            createMutation.mutate({
                teacherId: value.teacher.id,
                documentCode: value.documentCode,
                dueDate: format(value.dueDate, "yyyy-MM-dd"),
                notes: value.notes || null,
            });
        },
    });

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            form.reset();
            setTeacherSearch("");
        }, 200);
    };

    const isSubmitting = createMutation.isPending;

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                if (!next) handleClose();
                else setOpen(true);
            }}
        >
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create Request
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Form</DialogTitle>
                    <DialogDescription>
                        Create and send a document request.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="teacher">
                            {(field) => {
                                const selectedLabel = field.state.value
                                    ? `${field.state.value.name} (${field.state.value.teacher_id})`
                                    : "";

                                // Only show the blocking loader on the very first fetch
                                const isInitialLoading =
                                    teachersLoading && teachers.length === 0;

                                return (
                                    <Field>
                                        <FieldLabel htmlFor="teacher">
                                            Teacher Account
                                        </FieldLabel>
                                        <Combobox
                                            items={teachers}
                                            value={field.state.value}
                                            onValueChange={(item) =>
                                                field.handleChange(item ?? null)
                                            }
                                            itemToStringValue={(item) =>
                                                item
                                                    ? `${item.name} (${item.teacher_id})`
                                                    : ""
                                            }
                                            itemToStringLabel={(item) =>
                                                item
                                                    ? `${item.name} (${item.teacher_id})`
                                                    : ""
                                            }
                                            onInputValueChange={(val) => {
                                                // Only update the search term if the
                                                // input text isn't just the selected label
                                                // being re-applied by the parent render.
                                                if (val !== selectedLabel) {
                                                    setTeacherSearch(val);
                                                }
                                            }}
                                        >
                                            <ComboboxInput
                                                id="teacher"
                                                placeholder={
                                                    isInitialLoading
                                                        ? "Loading teachers..."
                                                        : "Select teacher account"
                                                }
                                                // Do NOT disable on loading — that's
                                                // what was killing the caret mid-type.
                                                disabled={isSubmitting}
                                            />
                                            <ComboboxContent>
                                                {/* List is ALWAYS mounted so items
                                                    remain clickable during refetches */}
                                                <ComboboxList>
                                                    {(account) => (
                                                        <ComboboxItem
                                                            key={account.id}
                                                            value={account}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span>{account.name}</span>
                                                                <span className="text-muted-foreground text-xs">
                                                                    {account.teacher_id}
                                                                    {account.username
                                                                        ? ` • ${account.username}`
                                                                        : ""}
                                                                    {account.position
                                                                        ? ` • ${account.position}`
                                                                        : ""}
                                                                    {account.class_advisory
                                                                        ? ` • ${account.class_advisory}`
                                                                        : ""}
                                                                </span>
                                                            </div>
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>

                                                {/* Non-blocking status shown below the list */}
                                                {teachersFetching &&
                                                    !isInitialLoading && (
                                                        <div className="px-2 py-1 text-xs text-muted-foreground">
                                                            Searching...
                                                        </div>
                                                    )}

                                                <ComboboxEmpty>
                                                    {teachersError
                                                        ? "Unable to load registered teachers. Please try again."
                                                        : isInitialLoading
                                                        ? "Loading teachers..."
                                                        : teacherSearch
                                                        ? "No teacher matches your search."
                                                        : "No registered active teachers found."}
                                                </ComboboxEmpty>
                                            </ComboboxContent>
                                        </Combobox>
                                        {field.state.meta.errors?.[0] && (
                                            <p className="text-sm text-destructive mt-1">
                                                {field.state.meta.errors[0]}
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="documentCode">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Forms</FieldLabel>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={field.handleChange}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Form" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectGroup>
                                                <SelectLabel>School Forms</SelectLabel>
                                                <SelectItem value="sf1">School Form 1</SelectItem>
                                                <SelectItem value="sf2">School Form 2</SelectItem>
                                                <SelectItem value="sf3">School Form 3</SelectItem>
                                                <SelectItem value="sf4">School Form 4</SelectItem>
                                                <SelectItem value="sf5">School Form 5</SelectItem>
                                                <SelectItem value="sf6">School Form 6</SelectItem>
                                                <SelectItem value="sf7">School Form 7</SelectItem>
                                                <SelectItem value="sf8">School Form 8</SelectItem>
                                                <SelectItem value="sf9">School Form 9</SelectItem>
                                                <SelectItem value="sf10">School Form 10</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Administrative Forms</SelectLabel>
                                                <SelectItem value="dtr">Biometrics and DTR</SelectItem>
                                                <SelectItem value="acr">Activity Completion Report</SelectItem>
                                                <SelectItem value="dpds">DepEd Partnership Database System</SelectItem>
                                                <SelectItem value="to">Travel Order</SelectItem>
                                                <SelectItem value="lf">Leave Form</SelectItem>
                                                <SelectItem value="so">Special Order</SelectItem>
                                                <SelectItem value="snsed">National Simulation Earthquake Drill</SelectItem>
                                                <SelectItem value="transmittal">Transmittal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {field.state.meta.errors?.[0] && (
                                        <p className="text-sm text-destructive mt-1">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </Field>
                            )}
                        </form.Field>

                        <form.Field name="dueDate">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Due Date</FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                data-empty={!field.state.value}
                                                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                                disabled={isSubmitting}
                                            >
                                                {field.state.value ? (
                                                    format(field.state.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.state.value}
                                                onSelect={field.handleChange}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                defaultMonth={field.state.value}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {field.state.meta.errors?.[0] && (
                                        <p className="text-sm text-destructive mt-1">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </Field>
                            )}
                        </form.Field>

                        <form.Field name="notes">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Notes</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            id="note"
                                            placeholder="Write a comment..."
                                            value={field.state.value}
                                            onChange={(e) => {
                                                const val = e.target.value.slice(0, 300);
                                                field.handleChange(val);
                                            }}
                                            disabled={isSubmitting}
                                            maxLength={300}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText>
                                                {(field.state.value || "").length}/300
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            )}
                        </form.Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting}>
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="default" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send />
                                    Send Request
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddRequestForm;