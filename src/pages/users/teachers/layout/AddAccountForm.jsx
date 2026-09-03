import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Plus,
    Send,
    IdCardLanyard,
    UserPen,
    UserStar,
    Lock,
    KeyRound,
    ArrowBigUpDash,
    GraduationCap
} from 'lucide-react';
import { input_class, icon_class } from "@/components/common/constant";

const AddAccountForm = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-[#3e963f] hover:bg-[#3e963f]">
                    <Plus />
                    Add Teacher
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add Teacher Account
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <FieldGroup>
                    <Field>
                        <FieldLabel>Employee ID</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="employee-id"
                                placeholder="26-0001"
                                required
                            />
                            <InputGroupAddon><IdCardLanyard /></InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <FieldGroup className="grid grid-cols-2">
                        <Field>
                            <FieldLabel>First Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="first-name"
                                    placeholder="Juan"
                                    required
                                />
                                <InputGroupAddon><UserPen /></InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <FieldLabel>Middle Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="middle-name"
                                    placeholder="Ted"
                                    required
                                />
                                <InputGroupAddon><UserPen /></InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </FieldGroup>

                    <FieldGroup className="grid grid-cols-3">
                        <div className="col-span-2">
                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        id="last-name"
                                        placeholder="Dela Cruz"
                                        required
                                    />
                                    <InputGroupAddon><UserPen /></InputGroupAddon>
                                </InputGroup>
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel>Suffix</FieldLabel>
                            <div className="relative">
                                <div className={icon_class}><UserPen className="w-4.5 h-4.5" /></div>
                                <Select>
                                    <SelectTrigger className={input_class}>
                                        <SelectValue placeholder="Select Suffix" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup>
                                            <SelectItem value="Jr.">Jr.</SelectItem>
                                            <SelectItem value="Sr.">Sr.</SelectItem>
                                            <SelectItem value="II">II</SelectItem>
                                            <SelectItem value="III">III</SelectItem>
                                            <SelectItem value="IV">IV</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </Field>
                    </FieldGroup>
                    <Field>
                        <FieldLabel>Username</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="username"
                                placeholder="Juan.DelaCruz"
                                required
                            />
                            <InputGroupAddon><UserStar /></InputGroupAddon>
                        </InputGroup>
                    </Field>
                    <Field>
                        <FieldLabel>Position</FieldLabel>
                        <div className="relative">
                            <div className={icon_class}><ArrowBigUpDash className="w-4.5 h-4.5" /></div>
                            <Select>
                                <SelectTrigger className={input_class}>
                                    <SelectValue placeholder="Select Position" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectGroup>
                                        <SelectItem value="T1">Teacher I</SelectItem>
                                        <SelectItem value="T2">Teacher II</SelectItem>
                                        <SelectItem value="T3">Teacher III</SelectItem>
                                        <SelectItem value="T4">Teacher IV</SelectItem>
                                        <SelectItem value="T5">Teacher V</SelectItem>
                                        <SelectItem value="T6">Teacher VI</SelectItem>
                                        <SelectItem value="T7">Teacher VII</SelectItem>
                                        <SelectItem value="MT1">Master Teacher I</SelectItem>
                                        <SelectItem value="MT2">Master Teacher II</SelectItem>
                                        <SelectItem value="MT3">Master Teacher III</SelectItem>
                                        <SelectItem value="MT4">Master Teacher IV</SelectItem>
                                        <SelectItem value="MT5">Master Teacher V</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="bg-[#3e963f] hover:bg-[#3e963f]">
                        <Send className="h-4 w-4 my-auto" />
                        Create Account
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddAccountForm;