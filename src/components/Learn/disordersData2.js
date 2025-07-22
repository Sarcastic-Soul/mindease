const disordersData2 = [
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
    },
    {
        name: "OCD",
        description: "Obsessive-Compulsive Disorder (OCD) is a chronic mental disorder where a person has uncontrollable, recurring thoughts (obsessions) and behaviors (compulsions) that they feel the urge to repeat over and over.",
        image: "/images/ocd.jpg",
        symptoms: [
            "Excessive fear of contamination",
            "Unwanted thoughts of harm or taboo topics",
            "Repetitive behaviors (e.g., handwashing, checking)",
            "Rigid adherence to routines"
        ],
        problems: [
            "Disruption in daily life",
            "Difficulty maintaining relationships",
            "Excessive time spent on rituals",
            "Heightened stress and anxiety"
        ],
        cureMethods: ["Exposure Response Prevention (ERP)", "Cognitive Behavioral Therapy (CBT)", "Medication (SSRIs)"],
        popularPeople: ["Leonardo DiCaprio", "Howard Hughes"],
        prevalence: "Approximately 1-2% of the global population",
        ageGroup: "Typically develops in adolescence or early adulthood",
        resources: [
            { title: "IOCDF - OCD Overview", url: "https://iocdf.org/about-ocd/" }
        ],
    },
    {
        name: "Autism",
        description: "A developmental disorder that affects communication and behavior, often marked by repetitive behaviors and challenges with social interactions.",
        image: "/images/autism.png",
        symptoms: [
            "Difficulty with social communication",
            "Repetitive behaviors or interests",
            "Sensitivity to sensory input",
            "Preference for routines and order"
        ],
        problems: [
            "Difficulty forming relationships",
            "Challenges in academic or occupational settings",
            "Stigma and misunderstanding",
            "Increased anxiety and stress"
        ],
        cureMethods: ["Behavioral therapy", "Speech and occupational therapy", "Supportive educational programs"],
        popularPeople: ["Temple Grandin", "Greta Thunberg"],
        prevalence: "1 in 100 children globally",
        ageGroup: "Usually diagnosed in early childhood",
        resources: [
            { title: "Autism Speaks - Overview", url: "https://www.autismspeaks.org/" }
        ],
    },
    {
        name: "Panic Disorder",
        description: "A type of anxiety disorder characterized by recurrent, unexpected panic attacks.",
        image: "/images/panic.png",
        symptoms: [
            "Sudden and intense fear",
            "Racing heart or palpitations",
            "Shortness of breath",
            "Sweating or chills"
        ],
        problems: [
            "Avoidance of situations that trigger attacks",
            "Disruption in daily activities",
            "Increased risk of depression",
            "Physical health impacts from chronic stress"
        ],
        cureMethods: ["Cognitive Behavioral Therapy (CBT)", "Relaxation techniques", "Medication (SSRIs, Benzodiazepines)"],
        popularPeople: ["Kim Basinger", "Johnny Depp"],
        prevalence: "Approximately 2-3% of adults globally",
        ageGroup: "Typically begins in late teens or early adulthood",
        resources: [
            { title: "APA - Panic Disorder Overview", url: "https://www.apa.org/topics/anxiety/panic-disorder" }
        ],
    },
];

export default disordersData2;