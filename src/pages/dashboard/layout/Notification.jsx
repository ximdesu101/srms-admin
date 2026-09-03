import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import {
    FileWarning,
    ClipboardList,
    FileText,
    CalendarClock
} from 'lucide-react';

const notifications = [
    {
        icon: FileWarning,
        iconColor: 'text-red-500',
        iconBg: 'bg-red-100',
        text: 'students have missing "Certificate of Good Moral"'
    },
    {
        icon: ClipboardList,
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-100',
        text: 'students still have incomplete "Report Cards"'
    },
    {
        icon: FileText,
        iconColor: 'text-green-500',
        iconBg: 'bg-green-100',
        text: 'Form 137 have been updated'
    },
    {
        icon: CalendarClock,
        iconColor: 'text-red-600',
        iconBg: 'bg-red-100',
        text: 'Documents Submission deadline is on May 20, 2026'
    }
];

const Notification = () => {
    return (
        <Card >
            <CardHeader >
                <CardTitle >
                    Notifications
                </CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent >
                <div className="space-y-4">
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-all hover:bg-gray-100/70"
                        >
                            <div className={`${notification.iconBg} ${notification.iconColor} rounded-lg p-2.5 shadow-sm`}>
                                <notification.icon className="h-5 w-5" />
                            </div>
                            <p className="flex-1 pt-1 text-sm leading-relaxed text-gray-700">{notification.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Notification