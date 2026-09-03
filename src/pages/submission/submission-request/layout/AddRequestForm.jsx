import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    IdCardLanyard,
    CirclePlus,
    User,
    ChevronDownIcon,
    Send
} from 'lucide-react';
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { input_class, icon_class } from "@/components/common/constant";

const AddRequestForm = () => {
    const [date, setDate] = useState(undefined);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-[#3e963f] hover:bg-[#3e963f]">
                    <CirclePlus />
                    Add Request
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Request Form
                    </DialogTitle>
                    <DialogDescription>
                        Please fill in the details below to add a new request.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Teacher's ID</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="teacher-id"
                                placeholder="Enter teacher's ID"
                                required
                            />
                            <InputGroupAddon><IdCardLanyard /></InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <FieldGroup className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="firstname"
                                    placeholder="Teacher's Firstname"
                                    required
                                />
                                <InputGroupAddon><User /></InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <FieldLabel>Last Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="lastname"
                                    placeholder="Teacher's Lastname"
                                    required
                                />
                                <InputGroupAddon><User /></InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </FieldGroup>
                    <Field>
                        <FieldLabel>Requested Document</FieldLabel>
                        <div className="relative">
                            <div className={icon_class}><User className="w-4.5 h-4.5" /></div>
                            <Select>
                                <SelectTrigger className={input_class}>
                                    <SelectValue placeholder="Select Documents" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectGroup>
                                        <SelectItem value="SF1">SF1 - School Register</SelectItem>
                                        <SelectItem value="SF2">SF2 - Daily Attendance Report of Learners</SelectItem>
                                        <SelectItem value="SF3">SF3 - Books Issued and Returned</SelectItem>
                                        <SelectItem value="SF4">SF4 - Monthly Learner Movement and Attendance</SelectItem>
                                        <SelectItem value="SF5">SF5 - Report on Promotion and Level of Proficiency</SelectItem>
                                        <SelectItem value="SF6">SF6 - Summarized Report on Promotion and Level of Proficiency</SelectItem>
                                        <SelectItem value="SF7">SF7 - School Personnel Assignment List and Basic Profile</SelectItem>
                                        <SelectItem value="SF8">SF8 - Learner's Basic Health and Nutrition Report</SelectItem>
                                        <SelectItem value="SF9">SF9 - Learner's Individual Report Card</SelectItem>
                                        <SelectItem value="SF10">SF10 - Learner's Permanent Academic Record</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </Field>
                    <FieldGroup className="grid grid-cols-3">
                        <Field className="col-span-2">
                            <FieldLabel>Due Date</FieldLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
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
                            <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
                            <Input
                                type="time"
                                id="time-picker-optional"
                                step="1"
                                defaultValue="10:30:00"
                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </Field>
                    </FieldGroup>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="bg-[#3e963f] hover:bg-[#3e963f]">
                        <Send/>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddRequestForm