
const SF9 = () => (
    <SFUploadPage
        code="SF9"
        title="Learner's Progress Report Card"
        description="Official quarterly report card showing learner grades and conduct remarks."
        purpose="SF9 is the official DepEd report card issued to each learner every quarter. It reflects grades in all learning areas, conduct rating, and teacher remarks. The end-of-year SF9 is the basis for the learner's promotion and serves as an interim record before SF10 is issued."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Upload one file per section containing all learners' report cards.",
            "Ensure grades reflect the final computed ratings per quarter.",
            "Report cards must be signed by the class adviser and parent/guardian.",
            "Upload after each grading period — Q1, Q2, Q3, and Q4.",
            "Final (Q4) report card must also be noted by the school head.",
        ]}
    />
);

export default SF9;
