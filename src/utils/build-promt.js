


function buildPrompt(profile) {
  const goalMap = {
    bulk: "Muscle mass gain and caloric surplus phase",
    cut: "Fat loss and caloric deficit phase while maintaining muscle",
    recomp: "Body recomposition: losing fat and gaining muscle simultaneously at maintenance calories",
    strength: "Powerlifting or strength conditioning focus on maximizing neuromuscular force",
    endurance: "Cardiovascular and muscular stamina enhancement over prolonged periods",
  };
  const experienceMap = {
    begginer: "Zero to less than 1 year of consistent training, needs foundational compound movements and proper form guidance",
    intermediate: "1 to 3 years of structured training, understands progressive overload, and can handle higher volume/intensity",
    advanced: "3+ years of dedicated, continuous training with plateaus, requires advanced periodization and specialized training techniques",
  }
  const equipmentMap = {
    full_gym: "Access to a commercial gym with free weights, barbells, dumbbells, cables, and various specialized machines",
    home: "Bodyweight training only (calisthenics) with no external weights, or using basic household items",
    dumbelss: "Access only to a set of dumbbells (adjustable or fixed) and a flat/adjustable bench, without barbells or machines",
  };
  const splitMap = {
    full_body: "Train all major muscle groups in a single session, typically 3 days a week with rest days in between",
    upper_lower: "Focus on upper body muscles one day and lower body muscles the next, alternating across 4 days a week",
    ppl: "Push/Pull/Legs split: Push (Chest/Shoulders/Triceps), Pull (Back/Biceps), Legs (Quads/Hamstrings/Calves), typically 3 to 6 days a week",
    custom: "A highly personalized routine tailored to specific muscle focus, unique frequency, or specific weak points",
  }

  return `Create a personalized ${profile.daysPerWeek}-days-per-week training plan for someone with the following profile:
- Goal: ${goalMap[profile.goal] || profile.goal}
- Experience Level: ${experienceMap[profile.experience] || profile.experience}
- Available Equipment: ${equipmentMap[profile.equipment] || profile.equipment}
- Preferred Workout Split: ${splitMap[profile.preferred_split] || profile.preferred_split}

send the message in a json type with this exact sturcutur :
Generate a complete training plan in JSON format with this exact structure:

{
  "overview": {
    "goal": "brief description of the training goal",
    "frequency": "X days per week",
    "split": "training split name",
    "notes": "important notes about the program (2-3 sentences)"
  },
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "muscle group or focus area",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "rpe": 8,
          "notes": "form cues or tips (optional)",
          "alternatives": ["Alternative 1", "Alternative 2"]
        }
      ]
    }
  ],
  "progression": "detailed progression strategy (2-3 sentences explaining how to progress)"

  Requirements:
- Create exactly ${profile.daysPerWeek} workout days
- Each workout should fit within ${profile.session_length} minutes
- Include 4-6 exercises per workout
- RPE (Rate of Perceived Exertion) should be 6-9
- Include compound movements for beginners/intermediate, advanced can have more isolation
- Match the preferred split type: ${profile.preferred_split}
- ${profile.injuries ? `Avoid exercises that could aggravate: ${profile.injuries}` : ''}
- Provide exercise alternatives where appropriate
- Make it progressive and suitable for ${experienceMap[profile.experience] || profile.experience} level

Return ONLY the JSON object (no markdown, no extra text).
}

`
}
export { buildPrompt };