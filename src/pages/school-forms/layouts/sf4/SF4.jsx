
const SF4 = () => (
    <SFUploadPage
        code="SF4"
        title="Monthly Learner Movement and Attendance Report"
        description="Monthly summary of enrollment changes and attendance across all grade levels."
        purpose="SF4 consolidates all monthly learner movement data — new enrolees, transferred in, transferred out, and dropped out — for the entire school. It provides the Division Office with an accurate picture of enrolment fluctuations throughout the school year."
        acceptedTypes={[".xlsx", ".xls", ".pdf"]}
        instructions={[
            "Submit one SF4 file per month covering all grade levels.",
            "Include data for both male and female learners separately.",
            "Reconcile numbers with individual class SF2 records before submitting.",
            "File must be signed by the school head.",
            "Submit within 5 working days after the end of each month.",
        ]}
    />
);

export default SF4;
