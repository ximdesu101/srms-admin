
const SF5 = () => (
    <SFUploadPage
        code="SF5"
        title="Report on Promotion and Level of Proficiency"
        description="End-of-year report showing each learner's grades and promotion status."
        purpose="SF5 is an end-of-year class record that lists each learner's final grades per subject, general average, and whether they are promoted, retained, or dropped. It is the basis for computing school-level promotion rates submitted in SF6."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Submit one SF5 per section at the close of the school year.",
            "Ensure all subject grades and general averages are computed correctly.",
            "Indicate clearly: Promoted, Retained, or Dropped for each learner.",
            "Must be signed by the class adviser and noted by the school head.",
            "Cross-check data against individual learner report cards (SF9).",
        ]}
    />
);

export default SF5;
