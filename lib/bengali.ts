const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(value: number | string): string {
  const str = String(value);
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch >= "0" && ch <= "9") {
      result += bengaliDigits[parseInt(ch)];
    } else {
      result += ch;
    }
  }
  return result;
}

export function bengaliToEnglishNumber(str: string): number {
  const bengaliMap: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (bengaliMap[ch] !== undefined) {
      result += bengaliMap[ch];
    } else if (ch >= "0" && ch <= "9") {
      result += ch;
    } else if (ch === "." || ch === ",") {
      result += ch === "," ? "" : ch;
    }
  }
  const num = parseFloat(result);
  return isNaN(num) ? 0 : num;
}

export function formatBengaliPrice(price: number): string {
  const formatted = price.toLocaleString("en-IN");
  return toBengaliNumber(formatted) + " টাকা";
}

export function formatBengaliPercent(percent: number): string {
  const fixed = percent.toFixed(1);
  return toBengaliNumber(fixed) + "%";
}

const bengaliMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
  "মে", "জুন", "জুলাই", "আগস্ট",
  "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
];

const bengaliDays = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার",
  "বৃহস্পতিবার", "শুক্রবার", "শনিবার"
];

export function getBengaliDate(date: Date = new Date()): string {
  const day = date.getDay();
  const dateNum = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const dayName = bengaliDays[day];
  const monthName = bengaliMonths[month];
  const bengaliDate = toBengaliNumber(dateNum);
  const bengaliYear = toBengaliNumber(year);

  return `${dayName}, ${bengaliDate} ${monthName} ${bengaliYear}`;
}

export function getChangeBadge(change: number): { symbol: string; color: string; text: string } {
  if (change > 0) {
    return { symbol: "▲", color: "text-success", text: formatBengaliPercent(change) };
  } else if (change < 0) {
    return { symbol: "▼", color: "text-error", text: formatBengaliPercent(Math.abs(change)) };
  } else {
    return { symbol: "—", color: "text-gray-400", text: formatBengaliPercent(0) };
  }
}
