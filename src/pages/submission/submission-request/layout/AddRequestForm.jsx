import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
    FieldGroup
} from "@/components/ui/field";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from "@/components/ui/select";
import { PencilLine } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const teacherAccounts = [
    {
        id: "TCH-0001",
        name: "Juan Dela Cruz",
        grade: "Grade 3",
        image: "https://github.com/shadcn.png",
    },
    {
        id: "TCH-0002",
        name: "Maria Santos",
        grade: "Grade 1",
        image: "https://github.com/shadcn.png",
    },
    {
        id: "TCH-0003",
        name: "Pedro Reyes",
        grade: "Grade 5",
        image: "https://github.com/shadcn.png",
    },
    {
        id: "TCH-0004",
        name: "Ana Garcia",
        grade: "Grade 6",
        image: "https://github.com/shadcn.png",
    },
];

const schoolForms = [
    { value: "sf1", label: "School Form 1" },
    { value: "sf2", label: "School Form 2" },
    { value: "sf3", label: "School Form 3" },
    { value: "sf4", label: "School Form 4" },
    { value: "sf5", label: "School Form 5" },
    { value: "sf6", label: "School Form 6" },
    { value: "sf7", label: "School Form 7" },
    { value: "sf8", label: "School Form 8" },
    { value: "sf9", label: "School Form 9" },
    { value: "sf10", label: "School Form 10" },
];

const administrativeForms = [
    { value: "dtr", label: "Biometrics and DTR" },
    { value: "acr", label: "Activity Completion Record" },
    { value: "dpds", label: "DepEd Partnership Database System" },
    { value: "to", label: "Travel Order" },
    { value: "lf", label: "Leave Form" },
    { value: "so", label: "Special Order" },
    { value: "snsed", label: "National Simulation Earthquake Drill" },
    { value: "transmittal-district", label: "Transmittal - District" },
    { value: "transmittal-division", label: "Transmittal-Division" },
];

const AddRequestForm = () => {
    const [date, setDate] = React.useState();
    const [title, setTitle] = useState("");
    const [document, setDocument] = useState("");
    const [note, setNote] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    const documentLabel =
        schoolForms.find((f) => f.value === document)?.label ?? "—";

    const toggleTeacher = (id) => {
        setSelectedTeachers((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <Card className="bg-secondary">
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Who to send?</CardTitle>
                                <CardDescription>
                                    You can select 1 or more user
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                {teacherAccounts.map((teacher) => (
                                    <FieldLabel key={teacher.id}>
                                        <Field
                                            orientation="horizontal"
                                            className="border-2 border-transparent rounded-md has-[[data-state=checked]]:bg-green-100 has-[[data-state=checked]]:border-green-500"
                                        >
                                            <Checkbox
                                                id={teacher.id}
                                                name={teacher.id}
                                                className="hidden"
                                                checked={selectedTeachers.includes(teacher.id)}
                                                onCheckedChange={() => toggleTeacher(teacher.id)}
                                            />
                                            <Avatar className="my-auto">
                                                <AvatarImage src={teacher.image} />
                                                <AvatarFallback>
                                                    {teacher.name
                                                        .split(" ")
                                                        .map((name) => name[0])
                                                        .join("")
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <FieldContent>
                                                <FieldTitle>{teacher.name}</FieldTitle>
                                                <FieldDescription className="text-xs">
                                                    {teacher.id} • {teacher.grade}
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    </FieldLabel>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Request Details</CardTitle>
                                <CardDescription>
                                    Select the documents and set the due date.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>Request Title</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="title"
                                                type="text"
                                                placeholder="school form 1 submission"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <InputGroupAddon><PencilLine /></InputGroupAddon>
                                        </InputGroup>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Select Document</FieldLabel>
                                        <Select value={document} onValueChange={setDocument}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Document" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectGroup>
                                                    <SelectLabel>School Forms</SelectLabel>
                                                    {schoolForms.map((form) => (
                                                        <SelectItem key={form.value} value={form.value}>
                                                            {form.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Administrative Forms</SelectLabel>
                                                    {administrativeForms.map((form) => (
                                                        <SelectItem key={form.value} value={form.value}>
                                                            {form.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Due Date</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date-picker-simple"
                                                    type="button"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    defaultMonth={date}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Note</FieldLabel>
                                        <InputGroup>
                                            <InputGroupTextarea
                                                id="note"
                                                placeholder="write a request note..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Field>
                                </FieldGroup>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>

            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Request Breakdown</CardTitle>
                    <CardDescription>
                        Review before sending the request.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm">
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">
                            Recipients
                        </span>
                        <span>
                            {selectedTeachers.length > 0
                                ? `${selectedTeachers.length} teacher(s) selected`
                                : "None selected"}
                        </span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">
                            Request Title
                        </span>
                        <span>{title || "—"}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">
                            Document
                        </span>
                        <span>{documentLabel}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">
                            Due Date
                        </span>
                        <span>{date ? format(date, "PPP") : "—"}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">
                            Note
                        </span>
                        <span className={cn(!note && "text-muted-foreground")}>
                            {note || "No note added."}
                        </span>
                    </div>

                    <Button className="w-full" type="button">
                        Send Request
                    </Button>
                    <Button variant="outline">
                        Save Draft
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddRequestForm;