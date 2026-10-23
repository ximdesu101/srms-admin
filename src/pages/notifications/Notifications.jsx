import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    GetAdminNotifications,
    MarkAdminNotificationAsRead,
    MarkAllAdminNotificationsAsRead,
} from "@/services/documentRequestService";

const Notifications = () => {
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-notifications", filter, page],
        queryFn: () => GetAdminNotifications({ page, filter }),
    });

    const markReadMutation = useMutation({
        mutationFn: MarkAdminNotificationAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
            queryClient.invalidateQueries({ queryKey: ["admin-unread-count"] });
        },
    });

    const markAllMutation = useMutation({
        mutationFn: MarkAllAdminNotificationsAsRead,
        onSuccess: () => {
            toast.success("All notifications marked as read.");
            queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
            queryClient.invalidateQueries({ queryKey: ["admin-unread-count"] });
        },
        onError: () => toast.error("Failed to mark all as read."),
    });

    const notifications = data?.data ?? [];

    const handleNotificationClick = (n) => {
        if (n.is_unread) markReadMutation.mutate(n.id);
        if (n.data?.link) navigate(n.data.link);
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Stay updated with teacher document requests, submissions, and other activities.
                        </CardDescription>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAllMutation.mutate()}
                        disabled={markAllMutation.isPending}
                    >
                        {markAllMutation.isPending
                            ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            : <CheckCheck className="h-4 w-4 mr-2" />
                        }
                        Mark all as read
                    </Button>
                </CardHeader>
                <CardContent>
                    <Tabs value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }} className="mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unread">Unread</TabsTrigger>
                            <TabsTrigger value="read">Read</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {isLoading && (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {isError && (
                        <p className="text-center text-destructive py-8">Failed to load notifications.</p>
                    )}

                    {!isLoading && !isError && notifications.length === 0 && (
                        <p className="text-center text-muted-foreground py-12">No notifications found.</p>
                    )}

                    <div className="space-y-2">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`flex items-start gap-3 rounded-lg border p-4 transition ${n.is_unread ? "bg-primary/5 border-primary/20" : "bg-background"}`}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-medium ${n.is_unread ? "text-foreground" : "text-muted-foreground"}`}>
                                            {n.title}
                                        </h4>
                                        {n.is_unread && (
                                            <span className="h-2 w-2 rounded-full bg-[#3e963f] shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-xs text-muted-foreground">
                                            {n.created_at ? format(new Date(n.created_at), "MMM d, yyyy h:mm a") : ""}
                                        </span>
                                        {n.data?.link && (
                                            <button
                                                type="button"
                                                className="text-xs text-[#3e963f] hover:underline"
                                                onClick={() => handleNotificationClick(n)}
                                            >
                                                View details
                                            </button>
                                        )}
                                        {n.is_unread && (
                                            <button
                                                type="button"
                                                className="text-xs text-muted-foreground hover:text-foreground"
                                                onClick={() => markReadMutation.mutate(n.id)}
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Notifications;
