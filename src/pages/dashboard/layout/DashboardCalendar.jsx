import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

const DashboardCalendar = () => {
    const [date, setDate] = React.useState(new Date())

    const handleToday = () => {
        setDate(new Date())
    }

    return (
        <div className="space-y-2">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="
                    w-full
                    border
                    rounded-lg
                    [&_table]:w-full
                    [&_table]:border-collapse
                    [&_tbody]:border-spacing-0
                    [&_tbody_tr]:m-0
                    [&_td]:p-0
                    [&_th]:p-0
                "
                captionLayout="dropdown"
                fixedWeeks
                formatters={{
                    formatMonthDropdown: (date) =>
                        date.toLocaleString("en-US", {
                            month: "long",
                        }),
                }}
            />
        </div>
    )
}

export default DashboardCalendar