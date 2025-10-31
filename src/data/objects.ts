import appleImg from "@/assets/objects/apple.png";
import bananaImg from "@/assets/objects/banana.png";
import orangeImg from "@/assets/objects/orange.png";
import bookImg from "@/assets/objects/book.png";
import cupImg from "@/assets/objects/cup.png";
import pencilImg from "@/assets/objects/pencil.png";
import treeImg from "@/assets/objects/tree.png";
import sunImg from "@/assets/objects/sun.png";
import carImg from "@/assets/objects/car.png";
import houseImg from "@/assets/objects/house.png";
import flowerImg from "@/assets/objects/flower.png";
import waterImg from "@/assets/objects/water.png";

export interface ObjectData {
  id: string;
  image: string;
  translations: {
    [key: string]: string;
  };
}

export const objects: ObjectData[] = [
  {
    id: "apple",
    image: appleImg,
    translations: {
      english: "Apple",
      hindi: "सेब",
      tamil: "ஆப்பிள்",
      telugu: "ఆపిల్",
      kannada: "ಸೇಬು",
      malayalam: "ആപ്പിൾ",
      bengali: "আপেল",
      gujarati: "સફરજન",
      marathi: "सफरचंद",
    },
  },
  {
    id: "banana",
    image: bananaImg,
    translations: {
      english: "Banana",
      hindi: "केला",
      tamil: "வாழைப்பழம்",
      telugu: "అరటి",
      kannada: "ಬಾಳೆಹಣ್ಣು",
      malayalam: "വാഴപ്പഴം",
      bengali: "কলা",
      gujarati: "કેળું",
      marathi: "केळी",
    },
  },
  {
    id: "orange",
    image: orangeImg,
    translations: {
      english: "Orange",
      hindi: "संतरा",
      tamil: "ஆரஞ்சு",
      telugu: "నారింజ",
      kannada: "ಕಿತ್ತಳೆ",
      malayalam: "ഓറഞ്ച്",
      bengali: "কমলা",
      gujarati: "સંતરા",
      marathi: "संत्रा",
    },
  },
  {
    id: "book",
    image: bookImg,
    translations: {
      english: "Book",
      hindi: "किताब",
      tamil: "புத்தகம்",
      telugu: "పుస్తకం",
      kannada: "ಪುಸ್ತಕ",
      malayalam: "പുസ്തകം",
      bengali: "বই",
      gujarati: "પુસ્તક",
      marathi: "पुस्तक",
    },
  },
  {
    id: "cup",
    image: cupImg,
    translations: {
      english: "Cup",
      hindi: "कप",
      tamil: "கப்",
      telugu: "కప్పు",
      kannada: "ಕಪ್",
      malayalam: "കപ്പ്",
      bengali: "কাপ",
      gujarati: "કપ",
      marathi: "कप",
    },
  },
  {
    id: "pencil",
    image: pencilImg,
    translations: {
      english: "Pencil",
      hindi: "पेंसिल",
      tamil: "பென்சில்",
      telugu: "పెన్సిల్",
      kannada: "ಪೆನ್ಸಿಲ್",
      malayalam: "പെൻസിൽ",
      bengali: "পেন্সিল",
      gujarati: "પેન્સિલ",
      marathi: "पेन्सिल",
    },
  },
  {
    id: "tree",
    image: treeImg,
    translations: {
      english: "Tree",
      hindi: "पेड़",
      tamil: "மரம்",
      telugu: "చెట్టు",
      kannada: "ಮರ",
      malayalam: "മരം",
      bengali: "গাছ",
      gujarati: "વૃક્ષ",
      marathi: "झाड",
    },
  },
  {
    id: "sun",
    image: sunImg,
    translations: {
      english: "Sun",
      hindi: "सूरज",
      tamil: "சூரியன்",
      telugu: "సూర్యుడు",
      kannada: "ಸೂರ್ಯ",
      malayalam: "സൂര്യൻ",
      bengali: "সূর্য",
      gujarati: "સૂર્ય",
      marathi: "सूर्य",
    },
  },
  {
    id: "car",
    image: carImg,
    translations: {
      english: "Car",
      hindi: "कार",
      tamil: "கார்",
      telugu: "కారు",
      kannada: "ಕಾರು",
      malayalam: "കാർ",
      bengali: "গাড়ি",
      gujarati: "કાર",
      marathi: "कार",
    },
  },
  {
    id: "house",
    image: houseImg,
    translations: {
      english: "House",
      hindi: "घर",
      tamil: "வீடு",
      telugu: "ఇల్లు",
      kannada: "ಮನೆ",
      malayalam: "വീട്",
      bengali: "বাড়ি",
      gujarati: "ઘર",
      marathi: "घर",
    },
  },
  {
    id: "flower",
    image: flowerImg,
    translations: {
      english: "Flower",
      hindi: "फूल",
      tamil: "பூ",
      telugu: "పువ్వు",
      kannada: "ಹೂವು",
      malayalam: "പൂവ്",
      bengali: "ফুল",
      gujarati: "ફૂલ",
      marathi: "फूल",
    },
  },
  {
    id: "water",
    image: waterImg,
    translations: {
      english: "Water",
      hindi: "पानी",
      tamil: "தண்ணீர்",
      telugu: "నీరు",
      kannada: "ನೀರು",
      malayalam: "വെള്ളം",
      bengali: "জল",
      gujarati: "પાણી",
      marathi: "पाणी",
    },
  },
];

export const languages = [
  { code: "english", name: "English", nativeName: "English" },
  { code: "hindi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "tamil", name: "Tamil", nativeName: "தமிழ்" },
  { code: "telugu", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kannada", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "malayalam", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "bengali", name: "Bengali", nativeName: "বাংলা" },
  { code: "gujarati", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "marathi", name: "Marathi", nativeName: "मराठी" },
];
