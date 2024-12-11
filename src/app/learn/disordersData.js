const disorders = [
    {
        name: "Depression",
        description: "A mental health disorder characterized by persistently depressed mood.",
        image: "/images/depr.png",
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
        image: "/images/anx.png",
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
        image: "/images/adhd.png",
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
        image: "/images/ptsd.jpg",
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
];

export default disorders;