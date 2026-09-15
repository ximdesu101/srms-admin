import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/auth/Login";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Dashboard from "@/pages/dashboard/dashboard";
import ManageTeacher from "@/pages/users/teachers/TeacherAccount";
import ManageStaff from "@/pages/users/staff/StaffAccount";
import SchoolForms from "@/pages/school-forms/SchoolForms";
import SF1 from "@/pages/school-forms/layouts/sf1/SF1";
import SF2 from "@/pages/school-forms/layouts/sf2/SF2";
import SF3 from "@/pages/school-forms/layouts/sf3/SF3";
import SF4 from "@/pages/school-forms/layouts/sf4/SF4";
import SF5 from "@/pages/school-forms/layouts/sf5/SF5";
import SF6 from "@/pages/school-forms/layouts/sf6/SF6";
import SF7 from "@/pages/school-forms/layouts/sf7/SF7";
import SF8 from "@/pages/school-forms/layouts/sf8/SF8";
import SF9 from "@/pages/school-forms/layouts/sf9/SF9";
import SF10 from "@/pages/school-forms/layouts/sf10/SF10";
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
                    { path: "dashboard",           element: <Dashboard />,           handle: { crumb: () => "Dashboard" } },
                    { path: "teacher-accounts",    element: <ManageTeacher />,       handle: { crumb: () => "Teacher" } },
                    { path: "staff",               element: <ManageStaff />,         handle: { crumb: () => "Staff" } },
                    { path: "school-forms",        element: <SchoolForms />,         handle: { crumb: () => "School Forms" } },
                    { path: "school-forms/sf1",    element: <SF1 />,                 handle: { crumb: () => "SF1 – School Register" } },
                    { path: "school-forms/sf2",    element: <SF2 />,                 handle: { crumb: () => "SF2 – Daily Attendance" } },
                    { path: "school-forms/sf3",    element: <SF3 />,                 handle: { crumb: () => "SF3 – Books Issued" } },
                    { path: "school-forms/sf4",    element: <SF4 />,                 handle: { crumb: () => "SF4 – Monthly Movement" } },
                    { path: "school-forms/sf5",    element: <SF5 />,                 handle: { crumb: () => "SF5 – Promotion Report" } },
                    { path: "school-forms/sf6",    element: <SF6 />,                 handle: { crumb: () => "SF6 – Summarized Promotion" } },
                    { path: "school-forms/sf7",    element: <SF7 />,                 handle: { crumb: () => "SF7 – School Personnel" } },
                    { path: "school-forms/sf8",    element: <SF8 />,                 handle: { crumb: () => "SF8 – Health Profile" } },
                    { path: "school-forms/sf9",    element: <SF9 />,                 handle: { crumb: () => "SF9 – Progress Report Card" } },
                    { path: "school-forms/sf10",   element: <SF10 />,                handle: { crumb: () => "SF10 – Academic Record" } },
                    { path: "document-requests",   element: <DocumentRequest />,     handle: { crumb: () => "Document Requests" } },
                    { path: "submission-requests", element: <SubmissionRequests />,  handle: { crumb: () => "Submission Requests" } },
                    { path: "submission-approvals",element: <SubmissionApprovals />, handle: { crumb: () => "Submission Approvals" } },
                    { path: "activity-logs",       element: <ActivityLogs />,        handle: { crumb: () => "Activity Logs" } },
                ],
            },
        ],
    },
]);
