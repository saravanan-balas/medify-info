export interface SearchItem {
  id: string
  title: string
  description: string
  category: 'system' | 'condition' | 'symptom' | 'ailment'
  icon: string
  url: string
  keywords: string[]
  priority: number
}

export const searchDatabase: SearchItem[] = [
  // Body Systems
  {
    id: 'system-nervous',
    title: 'Nervous System',
    description: 'Brain, nerves, and mental health',
    category: 'system',
    icon: '🧠',
    url: '/systems/nervous-system',
    keywords: ['brain', 'nerves', 'mental', 'neurological', 'cognitive', 'mind', 'neurology'],
    priority: 10
  },
  {
    id: 'system-heart',
    title: 'Heart & Cardiovascular',
    description: 'Heart, blood vessels, circulation',
    category: 'system',
    icon: '❤️',
    url: '/systems/heart',
    keywords: ['heart', 'cardiovascular', 'blood', 'circulation', 'cardiac', 'vessels', 'arteries', 'veins'],
    priority: 10
  },
  {
    id: 'system-lungs',
    title: 'Lungs & Respiratory',
    description: 'Breathing, lungs, airways',
    category: 'system',
    icon: '🫁',
    url: '/systems/lungs',
    keywords: ['lungs', 'breathing', 'respiratory', 'airways', 'oxygen', 'breath', 'pulmonary'],
    priority: 10
  },
  {
    id: 'system-eyes',
    title: 'Eyes & Visual System',
    description: 'Vision, eye health',
    category: 'system',
    icon: '👁️',
    url: '/systems/eyes',
    keywords: ['eyes', 'vision', 'sight', 'visual', 'optical', 'ocular', 'seeing'],
    priority: 10
  },
  {
    id: 'system-kidneys',
    title: 'Kidneys & Urinary',
    description: 'Kidneys, bladder, urinary system',
    category: 'system',
    icon: '🫘',
    url: '/systems/kidneys',
    keywords: ['kidneys', 'urinary', 'bladder', 'urine', 'renal', 'nephro', 'filtration'],
    priority: 10
  },
  {
    id: 'system-ears',
    title: 'Ears & Hearing',
    description: 'Hearing, balance, ear health',
    category: 'system',
    icon: '👂',
    url: '/systems/ears',
    keywords: ['ears', 'hearing', 'sound', 'balance', 'audio', 'auditory', 'acoustic'],
    priority: 10
  },
  {
    id: 'system-digestive',
    title: 'Digestive System',
    description: 'Stomach, intestines, digestion',
    category: 'system',
    icon: '🍽️',
    url: '/systems/digestive-system',
    keywords: ['digestive', 'stomach', 'intestines', 'gut', 'bowel', 'digestion', 'gastro', 'belly'],
    priority: 10
  },

  // Common Conditions - Respiratory
  {
    id: 'condition-asthma',
    title: 'Asthma',
    description: 'Breathing difficulties, airway inflammation',
    category: 'condition',
    icon: '🫁',
    url: '/conditions/asthma',
    keywords: ['asthma', 'breathing', 'wheezing', 'inhaler', 'airways', 'bronchial', 'respiratory'],
    priority: 9
  },
  {
    id: 'condition-copd',
    title: 'COPD',
    description: 'Chronic obstructive pulmonary disease',
    category: 'condition',
    icon: '🫁',
    url: '/conditions/copd',
    keywords: ['copd', 'emphysema', 'bronchitis', 'breathing', 'lungs', 'chronic', 'obstructive'],
    priority: 8
  },
  {
    id: 'condition-pneumonia',
    title: 'Pneumonia',
    description: 'Lung infection causing inflammation',
    category: 'condition',
    icon: '🫁',
    url: '/conditions/pneumonia',
    keywords: ['pneumonia', 'lung infection', 'chest infection', 'respiratory infection'],
    priority: 8
  },

  // Common Conditions - Neurological
  {
    id: 'condition-depression',
    title: 'Depression',
    description: 'Persistent sadness, mood disorders',
    category: 'condition',
    icon: '😔',
    url: '/conditions/depression',
    keywords: ['depression', 'sadness', 'mood', 'mental health', 'depressed', 'low mood'],
    priority: 9
  },
  {
    id: 'condition-anxiety',
    title: 'Anxiety & Stress',
    description: 'Worry, nervousness, stress',
    category: 'condition',
    icon: '😰',
    url: '/conditions/anxiety-stress',
    keywords: ['anxiety', 'stress', 'worry', 'panic', 'nervous', 'anxious', 'tension'],
    priority: 9
  },
  {
    id: 'condition-headaches',
    title: 'Headaches & Migraines',
    description: 'Head pain, migraine attacks',
    category: 'condition',
    icon: '🤕',
    url: '/conditions/headaches-migraines',
    keywords: ['headache', 'migraine', 'head pain', 'cephalalgia', 'tension headache'],
    priority: 9
  },
  {
    id: 'condition-sleep',
    title: 'Sleep Problems',
    description: 'Insomnia, sleep disorders',
    category: 'condition',
    icon: '😴',
    url: '/conditions/sleep-problems',
    keywords: ['sleep', 'insomnia', 'sleep disorder', 'can\'t sleep', 'sleepless', 'fatigue'],
    priority: 8
  },
  {
    id: 'condition-memory',
    title: 'Memory Issues',
    description: 'Forgetfulness, cognitive problems',
    category: 'condition',
    icon: '🧠',
    url: '/conditions/memory-issues',
    keywords: ['memory', 'forgetfulness', 'cognitive', 'alzheimer', 'dementia', 'forget'],
    priority: 8
  },
  {
    id: 'condition-epilepsy',
    title: 'Epilepsy',
    description: 'Seizures, neurological disorder',
    category: 'condition',
    icon: '⚡',
    url: '/conditions/epilepsy',
    keywords: ['epilepsy', 'seizures', 'convulsions', 'fits', 'neurological'],
    priority: 7
  },

  // Common Conditions - Cardiovascular
  {
    id: 'condition-hypertension',
    title: 'High Blood Pressure',
    description: 'Elevated blood pressure',
    category: 'condition',
    icon: '❤️',
    url: '/conditions/hypertension',
    keywords: ['blood pressure', 'hypertension', 'high bp', 'elevated pressure', 'cardiovascular'],
    priority: 9
  },
  {
    id: 'condition-heart-disease',
    title: 'Heart Disease',
    description: 'Coronary artery disease',
    category: 'condition',
    icon: '❤️',
    url: '/conditions/heart-disease',
    keywords: ['heart disease', 'coronary', 'cardiac', 'heart attack', 'angina'],
    priority: 9
  },
  {
    id: 'condition-arrhythmia',
    title: 'Arrhythmia',
    description: 'Irregular heartbeat',
    category: 'condition',
    icon: '💓',
    url: '/conditions/arrhythmia',
    keywords: ['arrhythmia', 'irregular heartbeat', 'palpitations', 'afib', 'atrial fibrillation'],
    priority: 7
  },

  // Digestive Ailments
  {
    id: 'ailment-acid-reflux',
    title: 'Acid Reflux',
    description: 'Heartburn and acid backup',
    category: 'ailment',
    icon: '🤢',
    url: '/ailments/acid-reflux',
    keywords: ['acid reflux', 'heartburn', 'gerd', 'indigestion', 'acid', 'reflux'],
    priority: 8
  },
  {
    id: 'ailment-constipation',
    title: 'Constipation',
    description: 'Difficulty passing stools',
    category: 'ailment',
    icon: '🚽',
    url: '/ailments/constipation',
    keywords: ['constipation', 'constipated', 'bowel', 'can\'t poop', 'blocked'],
    priority: 7
  },
  {
    id: 'ailment-diarrhea',
    title: 'Diarrhea',
    description: 'Loose, watery stools',
    category: 'ailment',
    icon: '💧',
    url: '/ailments/diarrhea',
    keywords: ['diarrhea', 'loose stools', 'watery stools', 'runny tummy', 'stomach bug'],
    priority: 7
  },
  {
    id: 'ailment-bloating',
    title: 'Bloating',
    description: 'Abdominal fullness',
    category: 'ailment',
    icon: '🎈',
    url: '/ailments/bloating',
    keywords: ['bloating', 'bloated', 'gas', 'swollen belly', 'distension'],
    priority: 6
  },
  {
    id: 'ailment-vomiting',
    title: 'Vomiting',
    description: 'Throwing up',
    category: 'ailment',
    icon: '🤢',
    url: '/ailments/vomiting',
    keywords: ['vomiting', 'throwing up', 'nausea', 'sick', 'emesis'],
    priority: 7
  },
  {
    id: 'ailment-belly-pain',
    title: 'Belly Pain',
    description: 'Abdominal discomfort',
    category: 'ailment',
    icon: '🤕',
    url: '/ailments/belly-pain',
    keywords: ['belly pain', 'stomach pain', 'abdominal pain', 'tummy ache', 'stomach ache'],
    priority: 8
  },
  {
    id: 'ailment-blood-in-poop',
    title: 'Blood in Poop',
    description: 'Blood in stool',
    category: 'ailment',
    icon: '🩸',
    url: '/ailments/blood-in-poop',
    keywords: ['blood in stool', 'blood in poop', 'rectal bleeding', 'bloody stool'],
    priority: 6
  },
  {
    id: 'ailment-travel-sickness',
    title: 'Travel Sickness',
    description: 'Motion sickness during travel',
    category: 'ailment',
    icon: '🚗',
    url: '/ailments/travel-sickness',
    keywords: ['travel sickness', 'motion sickness', 'car sick', 'sea sick', 'nausea'],
    priority: 5
  },

  // Common Symptoms
  {
    id: 'symptom-nausea',
    title: 'Nausea',
    description: 'Feeling sick or queasy in your stomach',
    category: 'symptom',
    icon: '🤢',
    url: '/symptoms#nausea',
    keywords: ['nausea', 'queasy', 'sick feeling', 'nauseated', 'sick stomach', 'morning sickness'],
    priority: 7
  },
  {
    id: 'symptom-stomach-pain',
    title: 'Stomach Pain',
    description: 'Discomfort or cramping in the abdomen',
    category: 'symptom',
    icon: '🤕',
    url: '/symptoms#stomach-pain',
    keywords: ['stomach pain', 'abdominal pain', 'belly ache', 'stomach ache', 'cramping', 'abdominal discomfort'],
    priority: 8
  },
  {
    id: 'symptom-bowel-changes',
    title: 'Changes in Bowel Movements',
    description: 'Unusual patterns in toilet habits',
    category: 'symptom',
    icon: '🚽',
    url: '/symptoms#bowel-changes',
    keywords: ['bowel movements', 'bowel changes', 'toilet habits', 'bathroom changes', 'stool changes'],
    priority: 6
  },
  {
    id: 'symptom-heartburn',
    title: 'Heartburn',
    description: 'Burning sensation in chest or throat',
    category: 'symptom',
    icon: '🔥',
    url: '/symptoms#heartburn',
    keywords: ['heartburn', 'burning chest', 'acid reflux', 'burning throat', 'indigestion'],
    priority: 7
  },
  {
    id: 'symptom-bloating',
    title: 'Bloating',
    description: 'Feeling full or swollen in the belly',
    category: 'symptom',
    icon: '🎈',
    url: '/symptoms#bloating',
    keywords: ['bloating', 'bloated', 'swollen belly', 'abdominal fullness', 'gas', 'distended'],
    priority: 6
  },
  {
    id: 'symptom-dizziness',
    title: 'Dizziness',
    description: 'Feeling lightheaded or unsteady',
    category: 'symptom',
    icon: '🌀',
    url: '/symptoms#dizziness',
    keywords: ['dizziness', 'dizzy', 'lightheaded', 'vertigo', 'spinning', 'unsteady', 'woozy'],
    priority: 6
  },
  {
    id: 'symptom-loss-appetite',
    title: 'Loss of Appetite',
    description: 'Not feeling hungry or wanting to eat',
    category: 'symptom',
    icon: '🍽️',
    url: '/symptoms#loss-of-appetite',
    keywords: ['loss of appetite', 'no appetite', 'not hungry', 'anorexia', 'don\'t want to eat'],
    priority: 5
  },
  {
    id: 'symptom-fatigue',
    title: 'Fatigue',
    description: 'Feeling very tired or weak',
    category: 'symptom',
    icon: '😴',
    url: '/symptoms#fatigue',
    keywords: ['fatigue', 'tired', 'exhausted', 'weakness', 'no energy', 'worn out', 'tiredness'],
    priority: 7
  },
  {
    id: 'symptom-rectal-bleeding',
    title: 'Rectal Bleeding',
    description: 'Blood seen during bowel movements',
    category: 'symptom',
    icon: '🩸',
    url: '/symptoms#rectal-bleeding',
    keywords: ['rectal bleeding', 'blood in stool', 'bloody stool', 'blood when pooping', 'hemorrhoids'],
    priority: 6
  },
  {
    id: 'symptom-chest-pain',
    title: 'Chest Pain',
    description: 'Discomfort or pain in the chest area',
    category: 'symptom',
    icon: '💔',
    url: '/symptoms#chest-pain',
    keywords: ['chest pain', 'chest discomfort', 'chest pressure', 'chest tightness', 'chest ache', 'angina'],
    priority: 9
  },
  {
    id: 'symptom-difficulty-swallowing',
    title: 'Difficulty Swallowing',
    description: 'Trouble getting food or liquid down',
    category: 'symptom',
    icon: '🥤',
    url: '/symptoms#difficulty-swallowing',
    keywords: ['difficulty swallowing', 'dysphagia', 'trouble swallowing', 'can\'t swallow', 'food stuck'],
    priority: 6
  },
  {
    id: 'symptom-excessive-burping',
    title: 'Excessive Burping',
    description: 'Frequent burping or belching',
    category: 'symptom',
    icon: '💨',
    url: '/symptoms#excessive-burping',
    keywords: ['burping', 'belching', 'excessive burping', 'gas', 'burp a lot'],
    priority: 4
  },
  {
    id: 'symptom-fever',
    title: 'Fever',
    description: 'High body temperature',
    category: 'symptom',
    icon: '🌡️',
    url: '/symptoms#fever',
    keywords: ['fever', 'high temperature', 'temperature', 'hot', 'pyrexia', 'febrile'],
    priority: 8
  },
  {
    id: 'symptom-cough',
    title: 'Cough',
    description: 'Persistent or chronic coughing',
    category: 'symptom',
    icon: '🤧',
    url: '/symptoms#cough',
    keywords: ['cough', 'coughing', 'dry cough', 'wet cough', 'persistent cough', 'chronic cough'],
    priority: 7
  },
  {
    id: 'symptom-shortness-breath',
    title: 'Shortness of Breath',
    description: 'Difficulty breathing or breathlessness',
    category: 'symptom',
    icon: '😮‍💨',
    url: '/symptoms#shortness-of-breath',
    keywords: ['shortness of breath', 'breathless', 'difficulty breathing', 'can\'t breathe', 'dyspnea', 'out of breath'],
    priority: 9
  },
  {
    id: 'symptom-weight-loss',
    title: 'Unexplained Weight Loss',
    description: 'Losing weight without trying',
    category: 'symptom',
    icon: '⚖️',
    url: '/symptoms#weight-loss',
    keywords: ['weight loss', 'losing weight', 'unexplained weight loss', 'weight dropping'],
    priority: 7
  },
  {
    id: 'symptom-weight-gain',
    title: 'Unexplained Weight Gain',
    description: 'Gaining weight without changes',
    category: 'symptom',
    icon: '📈',
    url: '/symptoms#weight-gain',
    keywords: ['weight gain', 'gaining weight', 'unexplained weight gain', 'getting heavier'],
    priority: 6
  },
  {
    id: 'symptom-skin-rash',
    title: 'Skin Rash',
    description: 'Red, itchy, or irritated skin',
    category: 'symptom',
    icon: '🔴',
    url: '/symptoms#skin-rash',
    keywords: ['rash', 'skin rash', 'itchy skin', 'red skin', 'skin irritation', 'hives'],
    priority: 6
  },
  {
    id: 'symptom-joint-pain',
    title: 'Joint Pain',
    description: 'Pain in joints like knees, hips, or shoulders',
    category: 'symptom',
    icon: '🦴',
    url: '/symptoms#joint-pain',
    keywords: ['joint pain', 'arthritis', 'joint ache', 'knee pain', 'hip pain', 'shoulder pain'],
    priority: 7
  },
  {
    id: 'symptom-muscle-pain',
    title: 'Muscle Pain',
    description: 'Aching or sore muscles',
    category: 'symptom',
    icon: '💪',
    url: '/symptoms#muscle-pain',
    keywords: ['muscle pain', 'muscle ache', 'sore muscles', 'myalgia', 'muscle soreness'],
    priority: 6
  },
  {
    id: 'symptom-back-pain',
    title: 'Back Pain',
    description: 'Pain in upper or lower back',
    category: 'symptom',
    icon: '🔙',
    url: '/symptoms#back-pain',
    keywords: ['back pain', 'backache', 'lower back pain', 'upper back pain', 'spine pain'],
    priority: 8
  },
  {
    id: 'symptom-frequent-urination',
    title: 'Frequent Urination',
    description: 'Needing to urinate more often than usual',
    category: 'symptom',
    icon: '🚻',
    url: '/symptoms#frequent-urination',
    keywords: ['frequent urination', 'peeing a lot', 'urinate often', 'polyuria', 'bathroom often'],
    priority: 6
  },
  {
    id: 'symptom-painful-urination',
    title: 'Painful Urination',
    description: 'Burning or pain when urinating',
    category: 'symptom',
    icon: '🔥',
    url: '/symptoms#painful-urination',
    keywords: ['painful urination', 'burning pee', 'dysuria', 'UTI', 'burning urination'],
    priority: 7
  },
  {
    id: 'symptom-swelling',
    title: 'Swelling',
    description: 'Fluid buildup in feet, ankles, or legs',
    category: 'symptom',
    icon: '🦵',
    url: '/symptoms#swelling',
    keywords: ['swelling', 'edema', 'swollen feet', 'swollen ankles', 'fluid retention', 'puffy'],
    priority: 6
  },
  {
    id: 'symptom-numbness',
    title: 'Numbness or Tingling',
    description: 'Loss of feeling or pins and needles sensation',
    category: 'symptom',
    icon: '🫥',
    url: '/symptoms#numbness',
    keywords: ['numbness', 'tingling', 'pins and needles', 'paresthesia', 'numb', 'loss of feeling'],
    priority: 6
  },
  {
    id: 'symptom-vision-changes',
    title: 'Vision Changes',
    description: 'Blurry vision or seeing double',
    category: 'symptom',
    icon: '👓',
    url: '/symptoms#vision-changes',
    keywords: ['vision changes', 'blurry vision', 'double vision', 'vision problems', 'can\'t see clearly'],
    priority: 7
  },
  {
    id: 'symptom-hearing-loss',
    title: 'Hearing Loss',
    description: 'Difficulty hearing or deafness',
    category: 'symptom',
    icon: '🔇',
    url: '/symptoms#hearing-loss',
    keywords: ['hearing loss', 'can\'t hear', 'deafness', 'hearing problems', 'hard of hearing'],
    priority: 6
  },
  {
    id: 'symptom-confusion',
    title: 'Confusion',
    description: 'Feeling confused or disoriented',
    category: 'symptom',
    icon: '😵‍💫',
    url: '/symptoms#confusion',
    keywords: ['confusion', 'confused', 'disoriented', 'mental fog', 'brain fog', 'can\'t think clearly'],
    priority: 7
  },
  {
    id: 'symptom-night-sweats',
    title: 'Night Sweats',
    description: 'Excessive sweating during sleep',
    category: 'symptom',
    icon: '💦',
    url: '/symptoms#night-sweats',
    keywords: ['night sweats', 'sweating at night', 'nocturnal sweating', 'sweaty sleep'],
    priority: 5
  }
]

export function searchItems(query: string, limit: number = 10): SearchItem[] {
  if (!query || query.trim().length < 2) return []
  
  const searchTerm = query.toLowerCase().trim()
  const results: Array<SearchItem & { score: number }> = []
  
  searchDatabase.forEach(item => {
    let score = 0
    
    // Exact title match
    if (item.title.toLowerCase() === searchTerm) {
      score += 100
    }
    // Title starts with query
    else if (item.title.toLowerCase().startsWith(searchTerm)) {
      score += 50
    }
    // Title contains query
    else if (item.title.toLowerCase().includes(searchTerm)) {
      score += 30
    }
    
    // Check keywords
    item.keywords.forEach(keyword => {
      if (keyword === searchTerm) {
        score += 40
      } else if (keyword.startsWith(searchTerm)) {
        score += 20
      } else if (keyword.includes(searchTerm)) {
        score += 10
      }
    })
    
    // Check description
    if (item.description.toLowerCase().includes(searchTerm)) {
      score += 15
    }
    
    // Add priority bonus
    score += item.priority
    
    if (score > 0) {
      results.push({ ...item, score })
    }
  })
  
  // Sort by score and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, ...item }) => item)
}

export function getCategoryLabel(category: string): string {
  const labels = {
    system: 'Body System',
    condition: 'Health Condition',
    symptom: 'Symptom',
    ailment: 'Common Issue'
  }
  return labels[category] || 'Medical Topic'
}

export function getPopularSearches(): string[] {
  return [
    'asthma',
    'heart disease',
    'depression',
    'anxiety',
    'headaches',
    'high blood pressure',
    'sleep problems',
    'diabetes',
    'acid reflux',
    'fatigue'
  ]
}