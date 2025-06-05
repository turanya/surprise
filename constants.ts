
import { LoveLetter, LetterCategory } from './types';

export const LETTER_CATEGORIES: LetterCategory[] = [
  { name: "Memories That Shaped Us", symbol: "🌠", total: 4 },
  { name: "Reasons I Love You", symbol: "💖", total: 4 },
  { name: "Moments I Never Want to Forget", symbol: "📷", total: 4 },
  { name: "Dreams I Have With You", symbol: "🌙", total: 4 },
  { name: "Messages From My Heart", symbol: "💌", total: 4 },
];

export const LOVE_LETTERS_MESSAGES: LoveLetter[] = [
  // Memories That Shaped Us - 🌠
  { id: 1, category: "Memories That Shaped Us", categorySymbol: "🌠", text: "Remember the evening walks in the month of July where we actually bonded a lot." },
  { id: 2, category: "Memories That Shaped Us", categorySymbol: "🌠", text: "The day after proposing you when we had our first kiss." },
  { id: 3, category: "Memories That Shaped Us", categorySymbol: "🌠", text: "Our first late night chatting when u proposed me." },
  { id: 4, category: "Memories That Shaped Us", categorySymbol: "🌠", text: "The way you carried me when I was unconcious at the Ganesh Puja event." },
  // Reasons I Love You - 💖
  { id: 5, category: "Reasons I Love You", categorySymbol: "💖", text: "I love the way your eyes light up when you talk about things you're passionate about." },
  { id: 6, category: "Reasons I Love You", categorySymbol: "💖", text: "Your kindness to everyone, even strangers, constantly inspires me." },
  { id: 7, category: "Reasons I Love You", categorySymbol: "💖", text: "You make me laugh until my sides hurt, even on my toughest days." },
  { id: 8, category: "Reasons I Love You", categorySymbol: "💖", text: "The way you listen, truly listen, makes me feel so understood and valued." },
  // Moments I Never Want to Forget - 📷
  { id: 9, category: "Moments I Never Want to Forget", categorySymbol: "📷", text: "The moment you first said 'I love you'. My world stopped and restarted, brighter." },
  { id: 10, category: "Moments I Never Want to Forget", categorySymbol: "📷", text: "The day when I first saw you." },
  { id: 11, category: "Moments I Never Want to Forget", categorySymbol: "📷", text: "Holding your hand fro the first time." },
  { id: 12, category: "Moments I Never Want to Forget", categorySymbol: "📷", text: "The quiet comfort of leaning on your shoulder to watch a movie with you." },
  // Dreams I Have With You - 🌙
  { id: 13, category: "Dreams I Have With You", categorySymbol: "🌙", text: "I dream of exploring ancient cities with you, hand in hand, discovering history together." },
  { id: 14, category: "Dreams I Have With You", categorySymbol: "🌙", text: "Building a home filled with warmth, books, and the scent of your favorite flowers and our two small versions." },
  { id: 15, category: "Dreams I Have With You", categorySymbol: "🌙", text: "Growing old with you, our laughter lines telling the story of a life well-loved." },
  { id: 16, category: "Dreams I Have With You", categorySymbol: "🌙", text: "One day, I hope we dance under the Northern Lights, wrapped in a cosmic embrace." },
  // Messages From My Heart - 💌
  { id: 17, category: "Messages From My Heart", categorySymbol: "💌", text: "You are my anchor in the storm and my brightest star in the darkest night." },
  { id: 18, category: "Messages From My Heart", categorySymbol: "💌", text: "With you, I've found a love that feels like coming home." },
  { id: 19, category: "Messages From My Heart", categorySymbol: "💌", text: "Every day I discover something new to love about you. It's an endless journey of joy." },
  { id: 20, category: "Messages From My Heart", categorySymbol: "💌", text: "My heart beats in time with yours. You are its favorite song." }
];

export const FINAL_LETTER_MESSAGE: LoveLetter = {
  id: 99, // Special ID for the final letter
  category: "The Final Letter",
  categorySymbol: "🌟", // Special symbol for the final letter
  text: "My Dearest Rohaniya,\n\nI tried putting it all into words, but a love this deep, this cosmic, is too vast for paper. It's written in the stars we gaze at, in the way our hands fit together, in every shared smile and quiet moment.\n\nSo here's my promise: I’ll keep writing this love, every day, in every way, with you by my side. This is not just a chapter; it's our forever story.\n\nWith all my love, now and always."
};


export const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
