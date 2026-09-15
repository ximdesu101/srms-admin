import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, File, GitGraph, Search, X } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

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

const SCHOOL_FORMS = [
    {
        code: "SF1",
        path: "sf1",
        icon: campus,
        name: "School Register Report",
        description:
            "A register of all learners enrolled in the school, including personal data and enrollment status. Used as the official enrollment record for the school year.",
        file: 8,
        version: "v3",
        date: "Sept. 5, 2026",
    },
    {
        code: "SF2",
        path: "sf2",
        icon: attendance,
        name: "Daily Attendance Report",
        description:
            "Monthly summary of daily learner attendance per section.",
        file: 12,
        version: "v2",
        date: "Aug. 28, 2026",
    },
    {
        code: "SF3",
        path: "sf3",
        icon: book,
        name: "Books Issued and Returned",
        description:
            "Tracks textbooks and instructional materials issued to learners.",
        file: 6,
        version: "v4",
        date: "Aug. 21, 2026",
    },
    {
        code: "SF4",
        path: "sf4",
        icon: calendar,
        name: "Monthly Movement Report",
        description:
            "Records learner enrollment changes throughout the school year.",
        file: 9,
        version: "v2",
        date: "Aug. 15, 2026",
    },
    {
        code: "SF5",
        path: "sf5",
        icon: promotion,
        name: "Promotion Report",
        description:
            "End-of-year report on learner promotions, retention, and dropouts.",
        file: 14,
        version: "v5",
        date: "July 30, 2026",
    },
    {
        code: "SF6",
        path: "sf6",
        icon: summary,
        name: "Summarized Report on Promotion",
        description:
            "Consolidated school-wide summary of promotion outcomes.",
        file: 7,
        version: "v3",
        date: "July 24, 2026",
    },
    {
        code: "SF7",
        path: "sf7",
        icon: users,
        name: "School Personnel List",
        description:
            "Report of all teaching and non-teaching personnel, including position, status, and assignments.",
        file: 5,
        version: "v2",
        date: "July 18, 2026",
    },
    {
        code: "SF8",
        path: "sf8",
        icon: health,
        name: "Learner's Basic Health Profile",
        description:
            "Basic health and nutritional data for each enrolled learner.",
        file: 11,
        version: "v4",
        date: "June 29, 2026",
    },
    {
        code: "SF9",
        path: "sf9",
        icon: clipboard,
        name: "Learner Progress Report Card",
        description:
            "Official report card showing quarterly grades and remarks.",
        file: 18,
        version: "v3",
        date: "June 12, 2026",
    },
    {
        code: "SF10",
        path: "sf10",
        icon: academic,
        name: "Permanent Academic Record",
        description:
            "Cumulative academic record retained permanently by the school.",
        file: 10,
        version: "v6",
        date: "May 27, 2026",
    },
];

function SchoolFormCard({ form, onOpen }) {
    const hasMeta = form.file != null || form.version || form.date;

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(form.path);
        }
    };

    return (
        <Card
            role="button"
            tabIndex={0}
            onClick={() => onOpen(form.path)}
            onKeyDown={handleKeyDown}
            className="group cursor-pointer select-none transition-all duration-200 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
            <CardHeader className="flex items-start gap-2">
                <img
                    src={form.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-12 w-12 object-contain"
                />
                <div className="my-auto grid gap-0">
                    <CardTitle>{form.code}</CardTitle>
                    <CardDescription>{form.name}</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {form.description}
                </p>

                {hasMeta && (
                    <div className="mt-4 flex gap-6 text-xs text-muted-foreground">
                        {form.file != null && (
                            <div className="flex gap-1">
                                <File className="h-4 w-4" />
                                <span className="my-auto">{form.file} files</span>
                            </div>
                        )}

                        {form.version && (
                            <div className="flex gap-1">
                                <GitGraph className="h-4 w-4" />
                                <span className="my-auto">{form.version}</span>
                            </div>
                        )}

                        {form.date && (
                            <div className="flex gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span className="my-auto">{form.date}</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function EmptyState({ search, onClear }) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <h3 className="text-sm font-semibold">No school forms found</h3>

            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                No school forms match{" "}
                <span className="font-medium text-foreground">"{search}"</span>
            </p>

            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="mt-3"
            >
                Clear search
            </Button>
        </div>
    );
}

const SchoolForms = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredForms = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return SCHOOL_FORMS;

        return SCHOOL_FORMS.filter(
            ({ code, name, description }) =>
                code.toLowerCase().includes(query) ||
                name.toLowerCase().includes(query) ||
                description.toLowerCase().includes(query)
        );
    }, [search]);

    const openForm = (path) => navigate(`/school-forms/${path}`);
    const clearSearch = () => setSearch("");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="w-full max-w-md">
                    <InputGroup>
                        <InputGroupAddon>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </InputGroupAddon>

                        <InputGroupInput
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search school forms..."
                            aria-label="Search school forms"
                        />

                        {search && (
                            <InputGroupAddon align="inline-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    onClick={clearSearch}
                                    className="h-7 w-7"
                                    aria-label="Clear search"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </InputGroupAddon>
                        )}
                    </InputGroup>
                </div>

                <p className="hidden text-sm text-muted-foreground sm:block">
                    {filteredForms.length} {filteredForms.length === 1 ? "form" : "forms"}
                </p>
            </div>

            {filteredForms.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {filteredForms.map((form) => (
                        <SchoolFormCard key={form.code} form={form} onOpen={openForm} />
                    ))}
                </div>
            ) : (
                <EmptyState search={search} onClear={clearSearch} />
            )}
        </div>
    );
};

export default SchoolForms;