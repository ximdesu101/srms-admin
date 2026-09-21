import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
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
    SelectLabel
} from "@/components/ui/select";
import { 
    Send,
    Plus 
} from 'lucide-react';

const TeacherAccount = [
    {
        id: "TCH-001",
        name: "Juan Dela Cruz",
        position: "Teacher I",
        grade: "Grade 1",
    },
    {
        id: "TCH-002",
        name: "Maria Santos",
        position: "Teacher II",
        grade: "Grade 2",
    },
    {
        id: "TCH-003",
        name: "Pedro Reyes",
        position: "Teacher III",
        grade: "Grade 3",
    },
    {
        id: "TCH-004",
        name: "Ana Garcia",
        position: "Teacher I",
        grade: "Grade 4",
    },
    {
        id: "TCH-005",
        name: "Jose Mendoza",
        position: "Master Teacher I",
        grade: "Grade 5",
    },
];

const AddRequestForm = () => {
    const [date, setDate] = React.useState();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus/>
                    Create Request
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Request Form</DialogTitle>
                    <DialogDescription>
                        Create and send a document request.
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="teacher">
                            Teacher Account
                        </FieldLabel>
                        <Combobox items={TeacherAccount}>
                            <ComboboxInput
                                id="teacher"
                                placeholder="Select teacher account"
                            />
                            <ComboboxContent>
                                <ComboboxEmpty>
                                    No account found
                                </ComboboxEmpty>
                                <ComboboxList>
                                    {(account) => (
                                        <ComboboxItem
                                            key={account.id}
                                            value={account.name}
                                        >
                                            <div className="flex flex-col">
                                                <span>
                                                    {account.name} 
                                                </span>
                                                <span className="text-muted-foreground text-xs">
                                                    {account.id} • {account.position} • {account.grade}
                                                </span>
                                            </div>
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </Field>
                    <Field>
                        <FieldLabel>Forms</FieldLabel>
                        <Select>
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
                    </Field>
                    <Field>
                        <FieldLabel>Due Date</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!date}
                                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <ChevronDownIcon />
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
                        <FieldLabel>Notes</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea
                                id="note"
                                placeholder="Write a comment..."
                                required
                            />
                            <InputGroupAddon align="block-end">
                                <InputGroupText>
                                    0/300
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button variant="default">
                        <Send/>
                        Send Request
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddRequestForm;