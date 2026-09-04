import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/auth/Login";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Dashboard from "@/pages/dashboard/dashboard";
import ManageTeacher from "@/pages/users/teachers/TeacherAccount";
import ManageStaff from "@/pages/users/staff/StaffAccount";
import SchoolForms from "@/pages/school-forms/SchoolForms";
import DocumentRequest from "@/pages/request/DocumentRequest";
import SubmissionRequests from "@/pages/submission/submission-request/SubmissionRequest";
import SubmissionApprovals from "@/pages/submission/submission-approval/SubmissionApproval";
import ActivityLogs from "@/pages/logs/ActivityLogs";
import AuthProtector from "./guard/AuthProtector";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Login />
            },
        ],
    },
    {
        element: <AuthProtector />,
        children: [
            {
                element: <Sidebar />,
                children: [
                    { path: "dashboard", element: <Dashboard />, handle: { crumb: () => "Dashboard" } },
                    { path: "teacher-accounts", element: <ManageTeacher />, handle: { crumb: () => "Teacher" } },
                    { path: "staff", element: <ManageStaff />, handle: { crumb: () => "Staff" } },
                    { path: "school-forms", element: <SchoolForms />, handle: { crumb: () => "School Forms" } },
                    { path: "document-requests", element: <DocumentRequest />, handle: { crumb: () => "Document Requests" } },
                    { path: "submission-requests", element: <SubmissionRequests />, handle: { crumb: () => "Submission Requests" } },
                    { path: "submission-approvals", element: <SubmissionApprovals />, handle: { crumb: () => "Submission Approvals" } },
                    { path: "activity-logs", element: <ActivityLogs />, handle: { crumb: () => "Activity Logs" } }
                ],
            },
        ],
    },
]);