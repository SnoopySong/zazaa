const FEMALE_NAMES = [
  "manon", "selena", "séléna", "zoe", "zoé", "maelle", "maëlle", 
  "gladys", "lea", "léa", "lyloo", "zoia", "zoïa", "elisa", "magata", "lilie", 
  "marie", "eva", "kymia", "clarysse", "solene", "solène", "aurore", 
  "laure-helene", "laure-hélène", "sophie", "caroline", "karine", "fanny",
  "laurence"
];

const MALE_NAMES = [
  "mederik", "médérik", "theo", "théo", "mael", "maël", "jean-noel", "jean-noël", 
  "maxence", "luis", "dylan", "pablo", "tom", "jules", "valentin", "axel", 
  "gregoire", "grégoire", "thibault", "sebastien", "sébastien",
  "maewen", "maëwen"
];

function cleanName(name: string): string {
  return name
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-zA-ZÀ-ÿ\s-]/g, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function extractFirstName(fullName: string): string {
  const cleaned = cleanName(fullName);
  const parts = cleaned.split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1] : parts[0];
}

export function getGender(name: string): "male" | "female" {
  const firstName = extractFirstName(name);
  
  const normalizedMaleNames = MALE_NAMES.map(n => cleanName(n));
  const normalizedFemaleNames = FEMALE_NAMES.map(n => cleanName(n));
  
  if (normalizedMaleNames.some(n => firstName.includes(n) || n.includes(firstName))) {
    return "male";
  }
  
  if (normalizedFemaleNames.some(n => firstName.includes(n) || n.includes(firstName))) {
    return "female";
  }
  
  if (firstName.endsWith("a") || firstName.endsWith("ie") || firstName.endsWith("ine") || 
      firstName.endsWith("elle") || firstName.endsWith("ette")) {
    return "female";
  }
  
  return "male";
}
