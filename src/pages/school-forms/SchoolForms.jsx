import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group";
import { 
    ArrowRight,
    Search
} from 'lucide-react';

import campus from "@/assets/sf-icons/campus.png";
import attendance from "@/assets/sf-icons/attendance.png";
import book from "@/assets/sf-icons/book.png";
import calendar from "@/assets/sf-icons/calendar.png";
import promotion from "@/assets/sf-icons/promotion.png";
import summary from "@/assets/sf-icons/summary.png";
import users from "@/assets/sf-icons/users.png";
import health from "@/assets/sf-icons/health.png";
import clipboard from "@/assets/sf-icons/clipboard.png";
import academic from "@/assets/sf-icons/academic.png";


const schoolForms = [
    {
        code: "SF1",
        icon: campus,
        name: "School Register Report",
    },
    {
        code: "SF2",
        icon: attendance,
        name: "Daily Attendance Report",
    },
    {
        code: "SF3",
        icon: book,
        name: "Books Issued and Returned",
    },
    {
        code: "SF4",
        icon: calendar,
        name: "Monthly Movement ",
    },
    {
        code: "SF5",
        icon: promotion,
        name: "Promotion Report",
    },
    {
        code: "SF6",
        icon: summary,
        name: "Summarized Report on Promotion",
    },
    {
        code: "SF7",
        icon: users,
        name: "School Personnel List",
    },
    {
        code: "SF8",
        icon: health,
        name: "Learner's Basic Health Profile",
    },
    {
        code: "SF9",
        icon: clipboard,
        name: "Learner Progress Report Card",
    },
    {
        code: "SF10",
        icon: academic,
        name: "Permanent Academic Record",
    },
];

const SchoolForms = () => {
    return (
        <div className="grid gap-4">
            <Field>
                <InputGroup>
                    <InputGroupInput
                        id="search"
                        type="search"
                        placeholder="Search school forms"
                    />
                    <InputGroupAddon><Search/></InputGroupAddon>
                </InputGroup>
            </Field>
            <div className="grid grid-cols-5 gap-4">
                {schoolForms.map((form) => (
                    <Card
                        key={form.code}
                        className="border border-transparent transition-colors duration-200 hover:border-primary cursor-pointer"
                    >
                        <CardHeader>
                            <img src={form.icon} alt={form.name} className="w-16 h-16" />
                            <CardTitle>
                                {form.code} - {form.name}
                            </CardTitle>
                            <CardDescription>
                                {form.description}
                            </CardDescription>
                            <p className="flex text-sm text-muted-foreground gap-1">
                                <ArrowRight className="w-4 h-4 my-auto" />
                                Click to manage
                            </p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SchoolForms;