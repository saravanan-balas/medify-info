import { defineEventHandler, readBody } from 'h3'
import fs from 'fs/promises'
import path from 'path'
import yaml from 'yaml'
import { marked } from 'marked'

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event)
  
  if (!query || typeof query !== 'string') {
    return { results: [] }
  }

  const searchQuery = query.toLowerCase().trim()
  const results = []

  try {
    // Search systems
    const systemsDir = path.join(process.cwd(), 'content', 'systems')
    const systemFiles = await fs.readdir(systemsDir)
    
    for (const file of systemFiles) {
      if (file.endsWith('.md')) {
        const filePath = path.join(systemsDir, file)
        const content = await fs.readFile(filePath, 'utf-8')
        
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
        if (!frontmatterMatch) continue
        
        const frontmatter = frontmatterMatch[1]
        const body = frontmatterMatch[2]
        
        const parsed = yaml.parse(frontmatter)
        const parsedBody = marked(body)
        
        // Search in title, description, and content
        const searchableText = [
          parsed.title || '',
          parsed.description || '',
          parsedBody
        ].join(' ').toLowerCase()
        
        if (searchableText.includes(searchQuery)) {
          // Extract health issues from the content
          const healthIssues = extractHealthIssues(parsedBody)
          
          // Add the system itself
          results.push({
            id: `system-${file}`,
            type: 'Body System',
            title: parsed.title,
            description: parsed.description,
            icon: parsed.icon || '🏥',
            url: `/systems/${file.replace('.md', '')}`,
            highlight: extractHighlight(searchableText, searchQuery)
          })
          
          // Add matching health issues
          healthIssues.forEach(issue => {
            const issueText = [
              issue.title,
              issue.description,
              issue.causes,
              issue.symptoms,
              issue.management
            ].join(' ').toLowerCase()
            
            if (issueText.includes(searchQuery)) {
              results.push({
                id: `issue-${file}-${issue.title}`,
                type: 'Health Condition',
                title: issue.title,
                description: issue.description,
                icon: getConditionIcon(issue.title),
                url: `/conditions/${getConditionSlug(issue.title)}`,
                highlight: extractHighlight(issueText, searchQuery)
              })
            }
          })
        }
      }
    }

    // Search conditions
    const conditionsDir = path.join(process.cwd(), 'content', 'conditions')
    try {
      const conditionFiles = await fs.readdir(conditionsDir)
      
      for (const file of conditionFiles) {
        if (file.endsWith('.md')) {
          const filePath = path.join(conditionsDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
          if (!frontmatterMatch) continue
          
          const frontmatter = frontmatterMatch[1]
          const body = frontmatterMatch[2]
          
          const parsed = yaml.parse(frontmatter)
          const parsedBody = marked(body)
          
          // Search in title, description, and content
          const searchableText = [
            parsed.title || '',
            parsed.description || '',
            parsedBody
          ].join(' ').toLowerCase()
          
          if (searchableText.includes(searchQuery)) {
            results.push({
              id: `condition-${file}`,
              type: 'Health Condition',
              title: parsed.title,
              description: parsed.description,
              icon: parsed.icon || '🏥',
              url: `/conditions/${file.replace('.md', '')}`,
              highlight: extractHighlight(searchableText, searchQuery)
            })
          }
        }
      }
    } catch (error) {
      // Conditions directory might not exist yet
      console.log('Conditions directory not found:', error.message)
    }

    // Search ailments (original digestive symptoms)
    const ailmentsDir = path.join(process.cwd(), 'content', 'ailments')
    try {
      const ailmentFiles = await fs.readdir(ailmentsDir)
      
      for (const file of ailmentFiles) {
        if (file.endsWith('.md')) {
          const filePath = path.join(ailmentsDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
          if (!frontmatterMatch) continue
          
          const frontmatter = frontmatterMatch[1]
          const body = frontmatterMatch[2]
          
          const parsed = yaml.parse(frontmatter)
          const parsedBody = marked(body)
          
          // Search in title, description, and content
          const searchableText = [
            parsed.title || '',
            parsed.description || '',
            parsedBody
          ].join(' ').toLowerCase()
          
          if (searchableText.includes(searchQuery)) {
            results.push({
              id: `ailment-${file}`,
              type: 'Digestive Symptom',
              title: parsed.title,
              description: parsed.description,
              icon: getAilmentIcon(parsed.title),
              url: `/ailments/${file.replace('.md', '')}`,
              highlight: extractHighlight(searchableText, searchQuery)
            })
          }
        }
      }
    } catch (error) {
      console.log('Ailments directory not found:', error.message)
    }

    // Search symptoms (from symptoms page data)
    const symptoms = [
      { name: 'Nausea', icon: '🤢', description: 'Feeling sick or queasy in your stomach' },
      { name: 'Stomach Pain', icon: '🤕', description: 'Discomfort or cramping in the abdomen' },
      { name: 'Changes in Bowel Movements', icon: '🚽', description: 'Unusual patterns in toilet habits' },
      { name: 'Heartburn', icon: '🔥', description: 'Burning sensation in chest or throat' },
      { name: 'Bloating', icon: '🎈', description: 'Feeling full or swollen in the belly' },
      { name: 'Dizziness', icon: '🌀', description: 'Feeling lightheaded or unsteady' },
      { name: 'Loss of Appetite', icon: '🍽️', description: 'Not feeling hungry or wanting to eat' },
      { name: 'Fatigue', icon: '😴', description: 'Feeling very tired or weak' },
      { name: 'Rectal Bleeding', icon: '🩸', description: 'Blood seen during bowel movements' },
      { name: 'Chest Pain', icon: '💔', description: 'Discomfort or pain in the chest area' },
      { name: 'Difficulty Swallowing', icon: '🥤', description: 'Trouble getting food or liquid down' },
      { name: 'Excessive Burping', icon: '💨', description: 'Frequent burping or belching' }
    ]

    symptoms.forEach(symptom => {
      const searchableText = [
        symptom.name,
        symptom.description
      ].join(' ').toLowerCase()
      
      if (searchableText.includes(searchQuery)) {
        results.push({
          id: `symptom-${symptom.name.toLowerCase().replace(/\s+/g, '-')}`,
          type: 'Symptom',
          title: symptom.name,
          description: symptom.description,
          icon: symptom.icon,
          url: `/symptoms#${symptom.name.toLowerCase().replace(/\s+/g, '-')}`,
          highlight: extractHighlight(searchableText, searchQuery)
        })
      }
    })

    // Remove duplicates and sort by relevance
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.id === result.id)
    )

    // Sort by type (systems first) and then by title
    uniqueResults.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'Body System' ? -1 : 1
      }
      return a.title.localeCompare(b.title)
    })

    return { results: uniqueResults.slice(0, 50) } // Limit to 50 results

  } catch (error) {
    console.error('Search error:', error)
    return { results: [] }
  }
})

// Helper function to extract health issues from system content
function extractHealthIssues(content) {
  const issues = []
  
  // Extract h3 titles and their following ul content
  const issueRegex = /<h3>([^<]+)<\/h3>\s*<ul>([\s\S]*?)<\/ul>/g
  
  let match
  while ((match = issueRegex.exec(content)) !== null) {
    const title = match[1].trim()
    const ulContent = match[2]
    
    // Extract What, Causes, Symptoms, Management from the ul content
    const whatMatch = ulContent.match(/<li><strong>What<\/strong>: ([^<]+)<\/li>/)
    const causesMatch = ulContent.match(/<li><strong>Causes<\/strong>: ([^<]+)<\/li>/)
    const symptomsMatch = ulContent.match(/<li><strong>Symptoms<\/strong>: ([^<]+)<\/li>/)
    const managementMatch = ulContent.match(/<li><strong>Management<\/strong>: ([^<]+)<\/li>/)
    
    issues.push({
      title: title,
      description: whatMatch ? whatMatch[1].trim() : '',
      causes: causesMatch ? causesMatch[1].trim() : '',
      symptoms: symptomsMatch ? symptomsMatch[1].trim() : '',
      management: managementMatch ? managementMatch[1].trim() : ''
    })
  }
  
  return issues
}

// Helper function to extract highlight text
function extractHighlight(text, query) {
  const index = text.indexOf(query)
  if (index === -1) return null
  
  const start = Math.max(0, index - 50)
  const end = Math.min(text.length, index + query.length + 50)
  
  let highlight = text.substring(start, end)
  
  // Add ellipsis if needed
  if (start > 0) highlight = '...' + highlight
  if (end < text.length) highlight = highlight + '...'
  
  return highlight
}

// Helper function to get condition icon
function getConditionIcon(title) {
  const iconMap = {
    // Respiratory System
    'Asthma': '🫁',
    'Chronic Obstructive Pulmonary Disease (COPD)': '🫁',
    'Pneumonia': '🫁',
    'Bronchitis': '🫁',
    'Common Cold & Flu': '🤧',
    'Sinusitis': '👃',
    'Sleep Apnea': '😴',
    'Lung Cancer': '🫁',
    'Tuberculosis (TB)': '🫁',
    'Pulmonary Embolism': '🫁',
    
    // Nervous System
    'Headaches & Migraines': '🤕',
    'Anxiety & Stress': '😰',
    'Sleep Problems': '😴',
    'Memory Issues': '🧠',
    'Depression': '😔',
    'Epilepsy': '⚡',
    'Parkinson\'s Disease': '🧠',
    'Multiple Sclerosis (MS)': '🧠',
    
    // Cardiovascular System
    'High Blood Pressure (Hypertension)': '❤️',
    'Heart Disease (Coronary Artery Disease)': '❤️',
    'Heart Attack (Myocardial Infarction)': '❤️',
    'Heart Failure': '❤️',
    'Arrhythmia (Irregular Heartbeat)': '💓',
    'Peripheral Artery Disease': '🦵',
    'Deep Vein Thrombosis (DVT)': '🦵',
    
    // Eyes & Visual System
    'Myopia (Nearsightedness)': '👓',
    'Hyperopia (Farsightedness)': '👓',
    'Astigmatism': '👓',
    'Presbyopia': '👓',
    'Cataracts': '👁️',
    'Glaucoma': '👁️',
    'Macular Degeneration': '👁️',
    'Diabetic Retinopathy': '👁️',
    'Dry Eye Syndrome': '👁️',
    'Conjunctivitis (Pink Eye)': '👁️',
    
    // Kidneys & Urinary System
    'Chronic Kidney Disease (CKD)': '🫘',
    'Kidney Stones': '🫘',
    'Urinary Tract Infection (UTI)': '🫘',
    'Bladder Infection': '🫘',
    'Prostate Problems': '🫘',
    'Incontinence': '🫘',
    'Polycystic Kidney Disease': '🫘',
    'Nephritis': '🫘',
    
    // Ears & Hearing System
    'Hearing Loss': '👂',
    'Tinnitus': '🔔',
    'Ear Infections': '👂',
    'Meniere\'s Disease': '👂',
    'Vertigo': '🌀',
    'Earwax Buildup': '👂',
    'Otosclerosis': '👂',
    'Acoustic Neuroma': '👂',
    
    // Digestive System
    'Acid Reflux (GERD)': '🤢',
    'Irritable Bowel Syndrome (IBS)': '🤢',
    'Crohn\'s Disease': '🤢',
    'Ulcerative Colitis': '🤢',
    'Celiac Disease': '🌾',
    'Gallstones': '🤢',
    'Peptic Ulcers': '🤢',
    'Hepatitis': '🫀',
    'Cirrhosis': '🫀',
    'Pancreatitis': '🫀'
  }
  
  return iconMap[title] || '🏥'
}

// Helper function to get ailment icon
function getAilmentIcon(title) {
  const iconMap = {
    'Acid Reflux': '🤢',
    'Belly Pain': '🤕',
    'Bloating': '🎈',
    'Blood in Poop': '🩸',
    'Constipation': '🚽',
    'Diarrhea': '💧',
    'Travel Sickness': '🚗',
    'Vomiting': '🤢'
  }
  
  return iconMap[title] || '🏥'
}

// Helper function to get condition slug
function getConditionSlug(title) {
  const slugMap = {
    // Respiratory System
    'Asthma': 'asthma',
    'Chronic Obstructive Pulmonary Disease (COPD)': 'copd',
    'Pneumonia': 'pneumonia',
    'Bronchitis': 'bronchitis',
    'Common Cold & Flu': 'common-cold-flu',
    'Sinusitis': 'sinusitis',
    'Sleep Apnea': 'sleep-apnea',
    'Lung Cancer': 'lung-cancer',
    'Tuberculosis (TB)': 'tuberculosis',
    'Pulmonary Embolism': 'pulmonary-embolism',
    
    // Nervous System
    'Headaches & Migraines': 'headaches-migraines',
    'Anxiety & Stress': 'anxiety-stress',
    'Sleep Problems': 'sleep-problems',
    'Memory Issues': 'memory-issues',
    'Depression': 'depression',
    'Epilepsy': 'epilepsy',
    'Parkinson\'s Disease': 'parkinsons-disease',
    'Multiple Sclerosis (MS)': 'multiple-sclerosis',
    
    // Cardiovascular System
    'High Blood Pressure (Hypertension)': 'hypertension',
    'Heart Disease (Coronary Artery Disease)': 'heart-disease',
    'Heart Attack (Myocardial Infarction)': 'heart-attack',
    'Heart Failure': 'heart-failure',
    'Arrhythmia (Irregular Heartbeat)': 'arrhythmia',
    'Peripheral Artery Disease': 'peripheral-artery-disease',
    'Deep Vein Thrombosis (DVT)': 'dvt',
    
    // Eyes & Visual System
    'Myopia (Nearsightedness)': 'myopia',
    'Hyperopia (Farsightedness)': 'hyperopia',
    'Astigmatism': 'astigmatism',
    'Presbyopia': 'presbyopia',
    'Cataracts': 'cataracts',
    'Glaucoma': 'glaucoma',
    'Macular Degeneration': 'macular-degeneration',
    'Diabetic Retinopathy': 'diabetic-retinopathy',
    'Dry Eye Syndrome': 'dry-eye',
    'Conjunctivitis (Pink Eye)': 'conjunctivitis',
    
    // Kidneys & Urinary System
    'Chronic Kidney Disease (CKD)': 'chronic-kidney-disease',
    'Kidney Stones': 'kidney-stones',
    'Urinary Tract Infection (UTI)': 'uti',
    'Bladder Infection': 'bladder-infection',
    'Prostate Problems': 'prostate-problems',
    'Incontinence': 'incontinence',
    'Polycystic Kidney Disease': 'polycystic-kidney',
    'Nephritis': 'nephritis',
    
    // Ears & Hearing System
    'Hearing Loss': 'hearing-loss',
    'Tinnitus': 'tinnitus',
    'Ear Infections': 'ear-infections',
    'Meniere\'s Disease': 'menieres-disease',
    'Vertigo': 'vertigo',
    'Earwax Buildup': 'earwax-buildup',
    'Otosclerosis': 'otosclerosis',
    'Acoustic Neuroma': 'acoustic-neuroma',
    
    // Digestive System
    'Acid Reflux (GERD)': 'acid-reflux',
    'Irritable Bowel Syndrome (IBS)': 'ibs',
    'Crohn\'s Disease': 'crohns-disease',
    'Ulcerative Colitis': 'ulcerative-colitis',
    'Celiac Disease': 'celiac-disease',
    'Gallstones': 'gallstones',
    'Peptic Ulcers': 'peptic-ulcers',
    'Hepatitis': 'hepatitis',
    'Cirrhosis': 'cirrhosis',
    'Pancreatitis': 'pancreatitis'
  }
  
  return slugMap[title] || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
