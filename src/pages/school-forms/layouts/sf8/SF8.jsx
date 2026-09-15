
const SF8 = () => (
    <SFUploadPage
        code="SF8"
        title="Learner's Basic Health and Nutritional Profile"
        description="Basic health and nutritional assessment data for each enrolled learner."
        purpose="SF8 contains each learner's basic health profile including weight, height, nutritional status, vision and hearing screening results, and immunization records. It is used by school nurses and health coordinators to monitor learner wellness throughout the school year."
        acceptedTypes={[".xlsx", ".xls", ".pdf", ".docx", ".doc"]}
        instructions={[
            "Conduct health assessments at the beginning of each school year.",
            "Submit one SF8 per class section.",
            "Ensure all measurements (weight, height) use standard units.",
            "Must be accomplished by the school nurse or authorized health personnel.",
            "Keep a physical copy on file alongside the uploaded digital version.",
        ]}
    />
);

export default SF8;
