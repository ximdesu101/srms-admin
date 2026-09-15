
const SF10 = () => (
    <SFUploadPage
        code="SF10"
        title="Permanent Academic Record"
        description="Cumulative academic record retained permanently by the school."
        purpose="SF10 is the permanent academic record of a learner. It consolidates all grades from Grade 1 through Grade 6, general averages, and promotion status for each school year. Unlike SF9, SF10 stays with the school permanently and is used for credential verification, transferring, and graduation clearance."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Encode the learner's complete academic history across all grade levels.",
            "Cross-check all entries against the corresponding SF9 records.",
            "SF10 must be updated every end of school year.",
            "Must be signed by both the class adviser and the school head.",
            "Once finalized, do not alter entries — file an amendment request if corrections are needed.",
        ]}
    />
);

export default SF10;
