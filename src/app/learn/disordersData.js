const disorders = [
    {
        name: "Depression",
        description: "A mental health disorder characterized by persistently depressed mood.",
        symptoms: ["Feeling sad", "Loss of interest", "Fatigue", "Anxiety"],
        problems: ["Difficulty focusing", "Low self-esteem", "Social withdrawal"],
        cureMethods: ["Therapy", "Medication", "Lifestyle changes"],
        popularPeople: ["Abraham Lincoln", "Lady Gaga"],
        prevalence: "5% of the global population",
        ageGroup: "Typically 18-45 years",
        resources: [
            { title: "WHO Depression Overview", url: "https://www.who.int/news-room/fact-sheets/detail/depression" }
        ],
    },
    {
        name: "Anxiety Disorder",
        description: "A disorder involving excessive worry and fear.",
        symptoms: ["Restlessness", "Difficulty concentrating", "Irritability"],
        problems: ["Sleep issues", "Muscle tension", "Avoidance behavior"],
        cureMethods: ["CBT", "Medication", "Mindfulness practices"],
        popularPeople: ["Emma Stone", "Oprah Winfrey"],
        prevalence: "6% of the global population",
        ageGroup: "Typically 18-60 years",
        resources: [
            { title: "Mayo Clinic - Anxiety Overview", url: "https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961" }
        ],
    },
    {
        name: "ADHD",
        description: "Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder that affects both children and adults. It is characterized by difficulty maintaining attention, impulsiveness, and hyperactivity.",
        symptoms: [
            "Inattention to details",
            "Difficulty organizing tasks",
            "Forgetfulness",
            "Impulsiveness",
            "Excessive talking",
            "Fidgeting or restlessness"
        ],
        problems: [
            "Challenges in academic and occupational performance",
            "Difficulty with time management",
            "Strained relationships",
            "Increased risk of accidents"
        ],
        cureMethods: ["Behavioral therapy", "Medication (stimulants)", "Support groups"],
        popularPeople: ["Michael Phelps", "Simone Biles"],
        prevalence: "Approximately 5% of children and 2.5% of adults globally",
        ageGroup: "Can be diagnosed as early as 4 years old, typically persists into adulthood",
        resources: [
            { title: "CHADD - ADHD Overview", url: "https://chadd.org/understanding-adhd/" }
        ],
    },
    {
        name: "PTSD",
        description: "Post-Traumatic Stress Disorder (PTSD) occurs in some people after experiencing or witnessing a life-threatening event. It is marked by persistent re-experiencing of the trauma, avoidance of reminders, and heightened arousal.",
        symptoms: [
            "Flashbacks or nightmares",
            "Severe anxiety",
            "Avoidance of places or activities",
            "Negative changes in mood",
            "Difficulty concentrating"
        ],
        problems: [
            "Social isolation",
            "Depression",
            "Substance abuse",
            "Problems with work or relationships"
        ],
        cureMethods: ["Cognitive Processing Therapy (CPT)", "Eye Movement Desensitization and Reprocessing (EMDR)", "Medication"],
        popularPeople: ["Dwayne Johnson", "Lady Gaga"],
        prevalence: "About 7-8% of the U.S. population will experience PTSD at some point in their lives",
        ageGroup: "Can occur at any age, often seen in adults after traumatic events",
        resources: [
            { title: "NIMH - PTSD Overview", url: "https://www.nimh.nih.gov/health/statistics/post-traumatic-stress-disorder-ptsd" }
        ],
    },
    {
        name: "Eating Disorder",
        description: "Eating disorders are characterized by abnormal or disturbed eating habits that negatively affect health, emotions, and quality of life. They include conditions such as anorexia nervosa, bulimia nervosa, and binge-eating disorder.",
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

export default disorders;