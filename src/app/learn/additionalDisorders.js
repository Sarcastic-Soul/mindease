const additionalDisorders = [
    {
        name: "Eating Disorder",
        description: "Eating disorders are characterized by abnormal or disturbed eating habits that negatively affect health, emotions, and quality of life. They include conditions such as anorexia nervosa, bulimia nervosa, and binge-eating disorder.",
        image: "/images/eat.jpg",
        symptoms: [
            "Extreme concern about weight",
            "Preoccupation with food and dieting",
            "Dramatic weight loss or fluctuations",
            "Social withdrawal"
        ],
        problems: [
            "Severe health complications (heart issues, malnutrition)",
            "Social isolation",
            "Emotional distress",
            "Increased risk of substance abuse"
        ],
        cureMethods: ["Nutritional counseling", "Therapy (CBT, family-based therapy)", "Medication"],
        popularPeople: ["Elton John", "Princess Diana"],
        prevalence: "About 9% of the population will have an eating disorder in their lifetime",
        ageGroup: "Commonly begins in adolescence and young adulthood",
        resources: [
            { title: "NEDA - Eating Disorders Overview", url: "https://www.nationaleatingdisorders.org/" }
        ],
    },
    {
        name: "Schizophrenia",
        description: "Schizophrenia is a severe mental disorder that affects how a person thinks, feels, and behaves. It often manifests as delusions, hallucinations, and disorganized thinking.",
        image: "/images/sz.jpg",
        symptoms: [
            "Delusions (false beliefs)",
            "Hallucinations (seeing or hearing things that are not there)",
            "Disorganized speech",
            "Impaired functioning"
        ],
        problems: [
            "Difficulty maintaining relationships",
            "Challenges in daily functioning",
            "Increased risk of substance use",
            "Stigmatization"
        ],
        cureMethods: ["Antipsychotic medication", "Psychotherapy", "Community support services"],
        popularPeople: ["John Nash", "Vincent van Gogh"],
        prevalence: "About 1% of the population worldwide",
        ageGroup: "Typically emerges in late adolescence to early adulthood",
        resources: [
            { title: "NAMI - Schizophrenia Overview", url: "https://nami.org/About-Mental-Illness/Mental-Health-Conditions/Schizophrenia" }
        ],
    },
    {
        name: "Bipolar Disorder",
        description: "Bipolar disorder is a mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression).",
        image: "/images/bd.jpg",
        symptoms: [
            "Mood changes from high energy to hopelessness",
            "Increased activity or energy during manic phases",
            "Depressive symptoms like sadness and fatigue",
            "Impulsive or risky behavior during manic episodes"
        ],
        problems: [
            "Impact on daily life and relationships",
            "Increased risk of suicide",
            "Substance abuse",
            "Challenges with employment"
        ],
        cureMethods: ["Mood stabilizers", "Psychotherapy", "Lifestyle changes"],
        popularPeople: ["Carrie Fisher", "Marilyn Monroe"],
        prevalence: "Approximately 1% of the global population",
        ageGroup: "Typically develops in late teens to early 20s",
        resources: [
            { title: "DBSA - Bipolar Disorder Overview", url: "https://www.dbsalliance.org/education/bipolar-disorder/" }
        ],
    }
];

export default additionalDisorders;