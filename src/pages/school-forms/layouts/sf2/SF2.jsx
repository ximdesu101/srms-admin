
const SF2 = () => (
    <SFUploadPage
        code="SF2"
        title="Daily Attendance Report of Learners"
        description="Monthly record of daily learner attendance per class section."
        purpose="SF2 is the official daily attendance record submitted every month. It captures each learner's daily presence, absence, or tardiness and is used to compute monthly and annual attendance rates required in promotion decisions."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Submit one SF2 file per section per month.",
            "Mark each day with P (Present), A (Absent), L (Late), or leave blank for holidays.",
            "Ensure the month and school year are clearly indicated in the filename.",
            "File must be signed by the class adviser before uploading.",
            "Upload all months by the end of the school year.",
        ]}
    />
);

export default SF2;
