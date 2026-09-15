
const SF3 = () => (
    <SFUploadPage
        code="SF3"
        title="Books Issued and Returned"
        description="Record of textbooks and instructional materials issued to learners."
        purpose="SF3 tracks the issuance and return of DepEd-provided textbooks and instructional materials to each learner. It ensures accountability for school property and helps monitor the condition of books throughout the school year."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Record each book issued to a learner including the date issued and date returned.",
            "Note the condition of the book upon return (Good, Fair, Damaged).",
            "Submit at the beginning and end of the school year.",
            "Separate records per subject/book title is recommended.",
            "File must be certified by the class adviser and school librarian.",
        ]}
    />
);

export default SF3;
